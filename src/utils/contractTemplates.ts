// Plantillas de contratos inteligentes para Polkadot
// Cumple con las reglas del hackathon: Solidity ^0.8.28, testnet Paseo

export const CONTRACT_TEMPLATES = {
  // Sistema de Lealtad - Programa de puntos para clientes
  loyalty: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LoyaltyProgram {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * 10**_decimals;
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
        
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf[from] >= amount, "Saldo insuficiente");
        require(allowance[from][msg.sender] >= amount, "Permiso insuficiente");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function burn(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}`,

  // Certificados Digitales - Sistema de certificados verificables
  certificates: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DigitalCertificates {
    string public name;
    string public symbol;
    uint256 public nextTokenId;
    
    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => string) public tokenURI;
    
    address public owner;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Mint(address indexed to, uint256 indexed tokenId);
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        nextTokenId = 1;
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    function mint(address to, string memory _tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        ownerOf[tokenId] = to;
        balanceOf[to]++;
        tokenURI[tokenId] = _tokenURI;
        
        emit Transfer(address(0), to, tokenId);
        emit Mint(to, tokenId);
        
        return tokenId;
    }
    
    function transfer(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender, "No eres el propietario");
        ownerOf[tokenId] = to;
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        
        emit Transfer(msg.sender, to, tokenId);
    }
    
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(ownerOf[tokenId] == msg.sender, "No eres el propietario");
        tokenURI[tokenId] = _tokenURI;
    }
}`,

  // Gobernanza Comunitaria - Sistema de votación para decisiones comunitarias
  governance: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CommunityGovernance {
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        address proposer;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public isMember;
    
    uint256 public nextProposalId;
    uint256 public votingDuration;
    address public owner;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);
    
    constructor(uint256 _votingDuration) {
        votingDuration = _votingDuration;
        owner = msg.sender;
        isMember[msg.sender] = true;
    }
    
    modifier onlyMember() {
        require(isMember[msg.sender], "No eres miembro");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    function addMember(address member) public onlyOwner {
        isMember[member] = true;
    }
    
    function createProposal(string memory description) public onlyMember returns (uint256) {
        uint256 proposalId = nextProposalId++;
        proposals[proposalId] = Proposal({
            description: description,
            yesVotes: 0,
            noVotes: 0,
            startTime: block.timestamp,
            endTime: block.timestamp + votingDuration,
            executed: false,
            proposer: msg.sender
        });
        
        emit ProposalCreated(proposalId, msg.sender);
        return proposalId;
    }
    
    function vote(uint256 proposalId, bool support) public onlyMember {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp <= proposal.endTime, "Votación cerrada");
        require(!hasVoted[proposalId][msg.sender], "Ya votaste");
        
        hasVoted[proposalId][msg.sender] = true;
        
        if (support) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
        
        emit VoteCast(proposalId, msg.sender, support);
    }
    
    function executeProposal(uint256 proposalId) public onlyMember {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.endTime, "Votación aún abierta");
        require(!proposal.executed, "Propuesta ya ejecutada");
        require(proposal.yesVotes > proposal.noVotes, "Propuesta rechazada");
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
}`,

  // Mercado Local - Plataforma para productos locales
  marketplace: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LocalMarketplace {
    struct Item {
        uint256 id;
        address seller;
        uint256 price;
        bool isActive;
        string metadata;
    }
    
    mapping(uint256 => Item) public items;
    mapping(address => uint256[]) public userItems;
    
    uint256 public nextItemId;
    address public owner;
    uint256 public platformFee; // en basis points (100 = 1%)
    
    event ItemListed(uint256 indexed itemId, address indexed seller, uint256 price);
    event ItemSold(uint256 indexed itemId, address indexed buyer, uint256 price);
    event ItemDelisted(uint256 indexed itemId);
    
    constructor(uint256 _platformFee) {
        platformFee = _platformFee;
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    function listItem(uint256 price, string memory metadata) public payable returns (uint256) {
        require(price > 0, "Precio debe ser mayor a 0");
        
        uint256 itemId = nextItemId++;
        items[itemId] = Item({
            id: itemId,
            seller: msg.sender,
            price: price,
            isActive: true,
            metadata: metadata
        });
        
        userItems[msg.sender].push(itemId);
        
        emit ItemListed(itemId, msg.sender, price);
        return itemId;
    }
    
    function buyItem(uint256 itemId) public payable {
        Item storage item = items[itemId];
        require(item.isActive, "Item no disponible");
        require(msg.value >= item.price, "Pago insuficiente");
        require(msg.sender != item.seller, "No puedes comprar tu propio item");
        
        item.isActive = false;
        
        uint256 fee = (item.price * platformFee) / 10000;
        uint256 sellerAmount = item.price - fee;
        
        payable(item.seller).transfer(sellerAmount);
        if (fee > 0) {
            payable(owner).transfer(fee);
        }
        
        if (msg.value > item.price) {
            payable(msg.sender).transfer(msg.value - item.price);
        }
        
        emit ItemSold(itemId, msg.sender, item.price);
    }
    
    function delistItem(uint256 itemId) public {
        Item storage item = items[itemId];
        require(item.seller == msg.sender, "No eres el vendedor");
        require(item.isActive, "Item ya no está activo");
        
        item.isActive = false;
        emit ItemDelisted(itemId);
    }
    
    function updatePlatformFee(uint256 newFee) public onlyOwner {
        require(newFee <= 1000, "Fee no puede ser mayor al 10%");
        platformFee = newFee;
    }
}`
}

// Función para obtener plantilla por tipo
export const getContractTemplate = (type: keyof typeof CONTRACT_TEMPLATES): string => {
  return CONTRACT_TEMPLATES[type] || CONTRACT_TEMPLATES.erc20
}

// Función para generar contrato personalizado
export const generateCustomContract = (
  type: keyof typeof CONTRACT_TEMPLATES,
  name: string,
  symbol: string,
  additionalParams: Record<string, any> = {}
): string => {
  let template = getContractTemplate(type)
  
  // Reemplazar placeholders con valores personalizados
  template = template.replace(/ERC20Token/g, name)
  template = template.replace(/NFTCollection/g, name)
  template = template.replace(/VotingSystem/g, name)
  template = template.replace(/Marketplace/g, name)
  
  // Reemplazar parámetros específicos según el tipo
  switch (type) {
    case 'erc20':
      template = template.replace(/_name/g, `"${name}"`)
      template = template.replace(/_symbol/g, `"${symbol}"`)
      template = template.replace(/_decimals/g, additionalParams.decimals || '18')
      template = template.replace(/_initialSupply/g, additionalParams.initialSupply || '1000000')
      break
    case 'nft':
      template = template.replace(/_name/g, `"${name}"`)
      template = template.replace(/_symbol/g, `"${symbol}"`)
      break
    case 'voting':
      template = template.replace(/_votingDuration/g, additionalParams.votingDuration || '604800') // 7 días
      break
    case 'marketplace':
      template = template.replace(/_platformFee/g, additionalParams.platformFee || '250') // 2.5%
      break
  }
  
  return template
}
