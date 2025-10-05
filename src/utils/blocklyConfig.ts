import * as Blockly from 'blockly'

// Función auxiliar para obtener valores de bloques de forma segura
const getBlockValue = (block: any, fieldName: string, defaultValue: string = ''): string => {
  try {
    const field = block.getField(fieldName)
    return field ? field.getValue() : defaultValue
  } catch (error) {
    console.error(`Error getting field ${fieldName}:`, error)
    return defaultValue
  }
}

// Función auxiliar para obtener valores de inputs de forma segura
const getInputValue = (block: any, inputName: string, defaultValue: string = '0'): string => {
  try {
    const input = block.getInputTargetBlock(inputName)
    if (input) {
      // Para bloques de número
      if (input.type === 'math_number') {
        return getBlockValue(input, 'NUM', defaultValue)
      }
      // Para bloques de texto
      if (input.type === 'text') {
        return `"${getBlockValue(input, 'TEXT', defaultValue)}"`
      }
      // Para otros tipos, intentar obtener el valor directamente
      return getBlockValue(input, 'VALUE', defaultValue)
    }
    return defaultValue
  } catch (error) {
    console.error(`Error getting input ${inputName}:`, error)
    return defaultValue
  }
}

// Configuración personalizada de Blockly para contratos inteligentes
export const BLOCKLY_CONFIG = {
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  toolbox: {
    kind: 'categoryToolbox',
    contents: [
      // Bloques de control básicos
      {
        kind: 'category',
        name: 'Control',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
          {
            kind: 'block',
            type: 'controls_repeat_ext',
          },
          {
            kind: 'block',
            type: 'logic_compare',
          },
        ],
      },
      // Bloques de lógica
      {
        kind: 'category',
        name: 'Lógica',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'logic_operation',
          },
          {
            kind: 'block',
            type: 'logic_negate',
          },
          {
            kind: 'block',
            type: 'logic_boolean',
          },
        ],
      },
      // Bloques matemáticos
      {
        kind: 'category',
        name: 'Matemáticas',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'math_number',
          },
          {
            kind: 'block',
            type: 'math_arithmetic',
          },
          {
            kind: 'block',
            type: 'math_single',
          },
        ],
      },
      // Bloques de texto
      {
        kind: 'category',
        name: 'Texto',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'text',
          },
          {
            kind: 'block',
            type: 'text_length',
          },
          {
            kind: 'block',
            type: 'text_join',
          },
        ],
      },
    ],
  },
}

// Definiciones de bloques personalizados para contratos
export const CUSTOM_BLOCKS = {
  // Bloques básicos de contrato
  contract_start: {
    type: 'contract_start',
    message: 'Iniciar Contrato',
    args: [],
    colour: '#FF6B35',
    tooltip: 'Inicia la definición de un contrato inteligente',
    helpUrl: '',
  },
  
  variable_declare: {
    type: 'variable_declare',
    message: 'Declarar variable %1 de tipo %2',
    args: [
      { type: 'field_input', name: 'NAME', text: 'miVariable' },
      { 
        type: 'field_dropdown', 
        name: 'TYPE', 
        options: [
          ['uint256', 'uint256'],
          ['address', 'address'],
          ['string', 'string'],
          ['bool', 'bool'],
          ['mapping', 'mapping']
        ]
      }
    ],
    colour: '#4A90E2',
    tooltip: 'Declara una nueva variable en el contrato',
    helpUrl: '',
  },

  function_public: {
    type: 'function_public',
    message: 'Función pública %1',
    args: [
      { type: 'field_input', name: 'NAME', text: 'miFuncion' }
    ],
    colour: '#7ED321',
    tooltip: 'Define una función pública',
    helpUrl: '',
  },

  function_private: {
    type: 'function_private',
    message: 'Función privada %1',
    args: [
      { type: 'field_input', name: 'NAME', text: 'miFuncion' }
    ],
    colour: '#F5A623',
    tooltip: 'Define una función privada',
    helpUrl: '',
  },

  modifier_onlyowner: {
    type: 'modifier_onlyowner',
    message: 'Solo el propietario puede ejecutar',
    args: [],
    colour: '#D0021B',
    tooltip: 'Modificador que restringe acceso al propietario del contrato',
    helpUrl: '',
  },

  require_statement: {
    type: 'require_statement',
    message: 'Verificar que %1',
    args: [
      { type: 'input_value', name: 'CONDITION', check: 'Boolean' }
    ],
    colour: '#9013FE',
    tooltip: 'Verifica una condición, si es falsa revierte la transacción',
    helpUrl: '',
  },

  emit_event: {
    type: 'emit_event',
    message: 'Emitir evento %1',
    args: [
      { type: 'field_input', name: 'EVENT_NAME', text: 'MiEvento' }
    ],
    colour: '#50E3C2',
    tooltip: 'Emite un evento del contrato',
    helpUrl: '',
  },

  // Bloques para tokens
  token_create: {
    type: 'token_create',
    message: 'Crear Token %1 %2',
    args: [
      { type: 'field_input', name: 'NAME', text: 'MiToken' },
      { type: 'field_input', name: 'SYMBOL', text: 'MTK' },
    ],
    colour: '#4CAF50',
    tooltip: 'Crea un nuevo token ERC20',
    helpUrl: '',
  },
  token_mint: {
    type: 'token_mint',
    message: 'Acuñar %1 tokens para %2',
    args: [
      { type: 'input_value', name: 'AMOUNT', check: 'Number' },
      { type: 'input_value', name: 'TO', check: 'String' },
    ],
    colour: '#4CAF50',
    tooltip: 'Acuña nuevos tokens para una dirección',
    helpUrl: '',
  },
  token_transfer: {
    type: 'token_transfer',
    message: 'Transferir %1 tokens a %2',
    args: [
      { type: 'input_value', name: 'AMOUNT', check: 'Number' },
      { type: 'input_value', name: 'TO', check: 'String' },
    ],
    colour: '#4CAF50',
    tooltip: 'Transfiere tokens a otra dirección',
    helpUrl: '',
  },

  // Bloques para NFTs
  nft_create: {
    type: 'nft_create',
    message: 'Crear NFT %1 %2',
    args: [
      { type: 'field_input', name: 'NAME', text: 'MiNFT' },
      { type: 'field_input', name: 'SYMBOL', text: 'MNF' },
    ],
    colour: '#9C27B0',
    tooltip: 'Crea una nueva colección NFT',
    helpUrl: '',
  },
  nft_mint: {
    type: 'nft_mint',
    message: 'Acuñar NFT #%1 para %2',
    args: [
      { type: 'input_value', name: 'TOKEN_ID', check: 'Number' },
      { type: 'input_value', name: 'TO', check: 'String' },
    ],
    colour: '#9C27B0',
    tooltip: 'Acuña un nuevo NFT con ID específico',
    helpUrl: '',
  },

  // Bloques para votación
  proposal_create: {
    type: 'proposal_create',
    message: 'Crear Propuesta: %1',
    args: [
      { type: 'field_input', name: 'DESCRIPTION', text: 'Nueva propuesta' },
    ],
    colour: '#FF9800',
    tooltip: 'Crea una nueva propuesta de votación',
    helpUrl: '',
  },
  vote_cast: {
    type: 'vote_cast',
    message: 'Votar %1 en propuesta %2',
    args: [
      { 
        type: 'field_dropdown', 
        name: 'VOTE', 
        options: [
          ['Sí', 'yes'],
          ['No', 'no'],
          ['Abstención', 'abstain']
        ]
      },
      { type: 'input_value', name: 'PROPOSAL_ID', check: 'Number' },
    ],
    colour: '#FF9800',
    tooltip: 'Emite un voto en una propuesta',
    helpUrl: '',
  },

  // Bloques para marketplace
  item_list: {
    type: 'item_list',
    message: 'Listar item %1 por %2 tokens',
    args: [
      { type: 'input_value', name: 'ITEM_ID', check: 'Number' },
      { type: 'input_value', name: 'PRICE', check: 'Number' },
    ],
    colour: '#2196F3',
    tooltip: 'Lista un item en el marketplace',
    helpUrl: '',
  },
  item_buy: {
    type: 'item_buy',
    message: 'Comprar item %1',
    args: [
      { type: 'input_value', name: 'ITEM_ID', check: 'Number' },
    ],
    colour: '#2196F3',
    tooltip: 'Compra un item del marketplace',
    helpUrl: '',
  },
}

// Función para crear bloques personalizados
export const createCustomBlocks = () => {
  try {
    console.log('Creando bloques personalizados...')
    
    Object.entries(CUSTOM_BLOCKS).forEach(([key, blockDef]) => {
      console.log(`Registrando bloque: ${key}`)
      
      // Registrar el bloque en Blockly
      if (Blockly && Blockly.Blocks) {
        Blockly.Blocks[key] = {
          init: function() {
            this.setColour(blockDef.colour)
            this.setTooltip(blockDef.tooltip)
            this.setHelpUrl(blockDef.helpUrl || '')
            
            // Configurar el bloque de forma más simple y robusta
            if (blockDef.args && blockDef.args.length > 0) {
              // Crear un input dummy para el texto principal
              const dummyInput = this.appendDummyInput()
              dummyInput.appendField(blockDef.message.split('%')[0] || blockDef.message)
              
              // Añadir campos basados en los argumentos
              blockDef.args.forEach((arg, index) => {
                if (arg.type === 'field_input') {
                  dummyInput.appendField(new Blockly.FieldTextInput(arg.text || ''), arg.name)
                } else if (arg.type === 'field_dropdown') {
                  dummyInput.appendField(new Blockly.FieldDropdown(arg.options || []), arg.name)
                } else if (arg.type === 'input_value') {
                  this.appendValueInput(arg.name).setCheck(arg.check || null)
                }
              })
            } else {
              // Si no hay argumentos, solo mostrar el mensaje
              this.appendDummyInput().appendField(blockDef.message)
            }

            this.setPreviousStatement(true)
            this.setNextStatement(true)
          }
        }
      }

      // Registrar el generador de código JavaScript
      if (Blockly && Blockly.JavaScript) {
        Blockly.JavaScript[key] = function(block) {
          const blockType = block.type
          let code = ''
          
          switch (blockType) {
            case 'contract_start':
              code = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.28;\n\ncontract MiContrato {\n`
              break
            case 'variable_declare':
              const varName = block.getFieldValue('NAME') || 'miVariable'
              const varType = block.getFieldValue('TYPE') || 'uint256'
              code = `    ${varType} public ${varName};\n`
              break
            case 'function_public':
              const funcName = block.getFieldValue('NAME') || 'miFuncion'
              code = `    function ${funcName}() public {\n        // Lógica de la función\n    }\n`
              break
            case 'function_private':
              const privFuncName = block.getFieldValue('NAME') || 'miFuncion'
              code = `    function ${privFuncName}() private {\n        // Lógica de la función\n    }\n`
              break
            case 'modifier_onlyowner':
              code = `    modifier onlyOwner() {\n        require(msg.sender == owner, "No autorizado");\n        _;\n    }\n`
              break
            case 'require_statement':
              const condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'true'
              code = `        require(${condition}, "Condición no cumplida");\n`
              break
            case 'emit_event':
              const eventName = block.getFieldValue('EVENT_NAME') || 'MiEvento'
              code = `        emit ${eventName}();\n`
              break
            case 'token_create':
              const name = block.getFieldValue('NAME') || 'MiToken'
              const symbol = block.getFieldValue('SYMBOL') || 'MTK'
              code = `// Crear token ${name} (${symbol})\n`
              break
            case 'token_mint':
              const amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC) || '0'
              const to = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC) || 'msg.sender'
              code = `mint(${to}, ${amount});\n`
              break
            case 'nft_create':
              const nftName = block.getFieldValue('NAME') || 'MiNFT'
              const nftSymbol = block.getFieldValue('SYMBOL') || 'MNF'
              code = `// Crear NFT ${nftName} (${nftSymbol})\n`
              break
            case 'nft_mint':
              const nftTo = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC) || 'msg.sender'
              code = `mintNFT(${nftTo});\n`
              break
            case 'proposal_create':
              const description = block.getFieldValue('DESCRIPTION') || 'Nueva propuesta'
              code = `createProposal("${description}");\n`
              break
            case 'vote_cast':
              const vote = block.getFieldValue('VOTE') || 'yes'
              const proposalId = Blockly.JavaScript.valueToCode(block, 'PROPOSAL_ID', Blockly.JavaScript.ORDER_ATOMIC) || '0'
              code = `vote(${proposalId}, ${vote === 'yes'});\n`
              break
            case 'item_list':
              const itemId = Blockly.JavaScript.valueToCode(block, 'ITEM_ID', Blockly.JavaScript.ORDER_ATOMIC) || '0'
              const price = Blockly.JavaScript.valueToCode(block, 'PRICE', Blockly.JavaScript.ORDER_ATOMIC) || '0'
              code = `listItem(${price});\n`
              break
            case 'item_buy':
              const buyItemId = Blockly.JavaScript.valueToCode(block, 'ITEM_ID', Blockly.JavaScript.ORDER_ATOMIC) || '0'
              code = `buyItem(${buyItemId});\n`
              break
            default:
              code = `// ${blockDef.tooltip}\n`
          }
          
          return code
        }
      }
    })
    
    console.log('Bloques personalizados creados exitosamente')
  } catch (error) {
    console.error('Error creating custom blocks:', error)
  }
}

// Función para generar código Solidity desde los bloques
export const generateSolidityCode = (workspace: Blockly.WorkspaceSvg, contractName: string): string => {
  try {
    // Verificar que el workspace existe
    if (!workspace) {
      return `// Error: Workspace no disponible`
    }

    // Obtener todos los bloques del workspace
    const blocks = workspace.getTopBlocks(false)
    
    if (!blocks || blocks.length === 0) {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ${contractName} {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    // No hay bloques en el workspace
    // Agrega bloques desde el panel lateral para generar código
}`
    }
    
    let solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ${contractName} {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    // Funciones generadas desde bloques:`
    
    // Variables para rastrear qué funcionalidades se han añadido
    const addedFeatures = new Set<string>()
    
    // Procesar cada bloque y generar código Solidity
    blocks.forEach(block => {
      const blockType = block.type
      const blockData = CUSTOM_BLOCKS[blockType as keyof typeof CUSTOM_BLOCKS]
      
      if (blockData) {
        solidityCode += `\n\n    // ${blockData.tooltip}`
        
        // Generar función basada en el tipo de bloque
        switch (blockType) {
          case 'token_create':
            if (!addedFeatures.has('token')) {
              const name = getBlockValue(block, 'NAME', 'MiToken')
              const symbol = getBlockValue(block, 'SYMBOL', 'MTK')
              solidityCode += `\n    string public name = "${name}";`
              solidityCode += `\n    string public symbol = "${symbol}";`
              solidityCode += `\n    uint8 public decimals = 18;`
              solidityCode += `\n    uint256 public totalSupply = 0;`
              solidityCode += `\n    mapping(address => uint256) public balanceOf;`
              solidityCode += `\n    mapping(address => mapping(address => uint256)) public allowance;`
              addedFeatures.add('token')
            }
            break
            
          case 'token_mint':
            if (!addedFeatures.has('token_mint')) {
              solidityCode += `\n    function mint(address to, uint256 amount) public onlyOwner {`
              solidityCode += `\n        require(to != address(0), "Dirección inválida");`
              solidityCode += `\n        totalSupply += amount;`
              solidityCode += `\n        balanceOf[to] += amount;`
              solidityCode += `\n        emit Transfer(address(0), to, amount);`
              solidityCode += `\n    }`
              addedFeatures.add('token_mint')
            }
            break
            
          case 'token_transfer':
            if (!addedFeatures.has('token_transfer')) {
              solidityCode += `\n    function transfer(address to, uint256 amount) public returns (bool) {`
              solidityCode += `\n        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente");`
              solidityCode += `\n        balanceOf[msg.sender] -= amount;`
              solidityCode += `\n        balanceOf[to] += amount;`
              solidityCode += `\n        emit Transfer(msg.sender, to, amount);`
              solidityCode += `\n        return true;`
              solidityCode += `\n    }`
              addedFeatures.add('token_transfer')
            }
            break
            
          case 'nft_create':
            if (!addedFeatures.has('nft')) {
              const nftName = getBlockValue(block, 'NAME', 'MiNFT')
              const nftSymbol = getBlockValue(block, 'SYMBOL', 'MNF')
              solidityCode += `\n    string public name = "${nftName}";`
              solidityCode += `\n    string public symbol = "${nftSymbol}";`
              solidityCode += `\n    uint256 public nextTokenId = 1;`
              solidityCode += `\n    mapping(uint256 => address) public ownerOf;`
              solidityCode += `\n    mapping(address => uint256) public balanceOf;`
              addedFeatures.add('nft')
            }
            break
            
          case 'nft_mint':
            if (!addedFeatures.has('nft_mint')) {
              solidityCode += `\n    function mint(address to) public onlyOwner returns (uint256) {`
              solidityCode += `\n        require(to != address(0), "Dirección inválida");`
              solidityCode += `\n        uint256 tokenId = nextTokenId++;`
              solidityCode += `\n        ownerOf[tokenId] = to;`
              solidityCode += `\n        balanceOf[to]++;`
              solidityCode += `\n        emit Transfer(address(0), to, tokenId);`
              solidityCode += `\n        return tokenId;`
              solidityCode += `\n    }`
              addedFeatures.add('nft_mint')
            }
            break
            
          case 'proposal_create':
            if (!addedFeatures.has('governance')) {
              solidityCode += `\n    struct Proposal {`
              solidityCode += `\n        string description;`
              solidityCode += `\n        uint256 yesVotes;`
              solidityCode += `\n        uint256 noVotes;`
              solidityCode += `\n        bool executed;`
              solidityCode += `\n        uint256 deadline;`
              solidityCode += `\n    }`
              solidityCode += `\n    mapping(uint256 => Proposal) public proposals;`
              solidityCode += `\n    uint256 public nextProposalId = 1;`
              solidityCode += `\n    uint256 public votingDuration = 7 days;`
              solidityCode += `\n    function createProposal(string memory description) public onlyOwner returns (uint256) {`
              solidityCode += `\n        uint256 proposalId = nextProposalId++;`
              solidityCode += `\n        proposals[proposalId] = Proposal(description, 0, 0, false, block.timestamp + votingDuration);`
              solidityCode += `\n        emit ProposalCreated(proposalId, description);`
              solidityCode += `\n        return proposalId;`
              solidityCode += `\n    }`
              addedFeatures.add('governance')
            }
            break
            
          case 'vote_cast':
            if (!addedFeatures.has('voting')) {
              solidityCode += `\n    mapping(uint256 => mapping(address => bool)) public hasVoted;`
              solidityCode += `\n    function vote(uint256 proposalId, bool support) public {`
              solidityCode += `\n        require(proposals[proposalId].deadline > block.timestamp, "Votación cerrada");`
              solidityCode += `\n        require(!hasVoted[proposalId][msg.sender], "Ya votaste");`
              solidityCode += `\n        hasVoted[proposalId][msg.sender] = true;`
              solidityCode += `\n        if (support) {`
              solidityCode += `\n            proposals[proposalId].yesVotes++;`
              solidityCode += `\n        } else {`
              solidityCode += `\n            proposals[proposalId].noVotes++;`
              solidityCode += `\n        }`
              solidityCode += `\n        emit VoteCast(proposalId, msg.sender, support);`
              solidityCode += `\n    }`
              addedFeatures.add('voting')
            }
            break
            
          case 'item_list':
            if (!addedFeatures.has('marketplace')) {
              solidityCode += `\n    struct Item {`
              solidityCode += `\n        uint256 id;`
              solidityCode += `\n        address seller;`
              solidityCode += `\n        uint256 price;`
              solidityCode += `\n        bool isListed;`
              solidityCode += `\n    }`
              solidityCode += `\n    mapping(uint256 => Item) public items;`
              solidityCode += `\n    uint256 public nextItemId = 1;`
              solidityCode += `\n    function listItem(uint256 price) public returns (uint256) {`
              solidityCode += `\n        uint256 itemId = nextItemId++;`
              solidityCode += `\n        items[itemId] = Item(itemId, msg.sender, price, true);`
              solidityCode += `\n        emit ItemListed(itemId, msg.sender, price);`
              solidityCode += `\n        return itemId;`
              solidityCode += `\n    }`
              addedFeatures.add('marketplace')
            }
            break
            
          case 'item_buy':
            if (!addedFeatures.has('marketplace_buy')) {
              solidityCode += `\n    function buyItem(uint256 itemId) public payable {`
              solidityCode += `\n        Item storage item = items[itemId];`
              solidityCode += `\n        require(item.isListed, "Item no disponible");`
              solidityCode += `\n        require(msg.value >= item.price, "Pago insuficiente");`
              solidityCode += `\n        item.isListed = false;`
              solidityCode += `\n        payable(item.seller).transfer(item.price);`
              solidityCode += `\n        if (msg.value > item.price) {`
              solidityCode += `\n            payable(msg.sender).transfer(msg.value - item.price);`
              solidityCode += `\n        }`
              solidityCode += `\n        emit ItemBought(itemId, msg.sender, item.price);`
              solidityCode += `\n    }`
              addedFeatures.add('marketplace_buy')
            }
            break
        }
      }
    })
    
    // Añadir eventos necesarios
    if (addedFeatures.has('token') || addedFeatures.has('token_mint') || addedFeatures.has('token_transfer')) {
      solidityCode += `\n\n    event Transfer(address indexed from, address indexed to, uint256 value);`
    }
    if (addedFeatures.has('governance')) {
      solidityCode += `\n    event ProposalCreated(uint256 indexed proposalId, string description);`
    }
    if (addedFeatures.has('voting')) {
      solidityCode += `\n    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);`
    }
    if (addedFeatures.has('marketplace')) {
      solidityCode += `\n    event ItemListed(uint256 indexed itemId, address indexed seller, uint256 price);`
    }
    if (addedFeatures.has('marketplace_buy')) {
      solidityCode += `\n    event ItemBought(uint256 indexed itemId, address indexed buyer, uint256 price);`
    }
    
    solidityCode += `
    
    // Funciones de utilidad
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    receive() external payable {}
}`

    return solidityCode
  } catch (error) {
    console.error('Error generating Solidity code:', error)
    return `// Error generando código: ${error.message}`
  }
}
