import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { motion } from 'framer-motion'
import {
  Build,
  Code,
  Preview,
  Add,
  Save,
  PlayArrow,
} from '@mui/icons-material'
import * as Blockly from 'blockly'
import { ContractFeature, BlockDefinition } from '../types'
import { BLOCKLY_CONFIG, CUSTOM_BLOCKS, createCustomBlocks, generateSolidityCode } from '../utils/blocklyConfig'
import { getContractTemplate, generateCustomContract } from '../utils/contractTemplates'

interface ContractBuilderProps {
  onCodeGenerated: (code: string) => void
  onNext: () => void
  onBack: () => void
}

const CONTRACT_FEATURES: ContractFeature[] = [
  {
    id: 'loyalty',
    name: 'Sistema de Lealtad',
    description: 'Programa de puntos y recompensas para clientes',
    category: 'retail',
    blocks: [
      {
        type: 'token_create',
        message: 'Crear Token de Recompensas',
        args: [{ type: 'field_input', name: 'NAME' }, { type: 'field_input', name: 'SYMBOL' }],
        colour: '#4CAF50',
        tooltip: 'Crea un token para el programa de lealtad',
      },
      {
        type: 'token_mint',
        message: 'Otorgar %1 puntos a %2',
        args: [{ type: 'input_value', name: 'AMOUNT' }, { type: 'input_value', name: 'TO' }],
        colour: '#4CAF50',
        tooltip: 'Otorga puntos de recompensa',
      },
    ],
  },
  {
    id: 'certificates',
    name: 'Certificados Digitales',
    description: 'Emitir certificados verificables en blockchain',
    category: 'education',
    blocks: [
      {
        type: 'nft_create',
        message: 'Crear Certificado',
        args: [{ type: 'field_input', name: 'NAME' }, { type: 'field_input', name: 'SYMBOL' }],
        colour: '#9C27B0',
        tooltip: 'Crea un sistema de certificados NFT',
      },
      {
        type: 'nft_mint',
        message: 'Emitir certificado para %1',
        args: [{ type: 'input_value', name: 'TO' }],
        colour: '#9C27B0',
        tooltip: 'Emite un certificado digital',
      },
    ],
  },
  {
    id: 'governance',
    name: 'Gobernanza Comunitaria',
    description: 'Sistema de votación para decisiones comunitarias',
    category: 'dao',
    blocks: [
      {
        type: 'proposal_create',
        message: 'Crear Propuesta: %1',
        args: [{ type: 'field_input', name: 'DESCRIPTION' }],
        colour: '#FF9800',
        tooltip: 'Crea una propuesta de gobernanza',
      },
      {
        type: 'vote_cast',
        message: 'Votar %1 en propuesta %2',
        args: [{ type: 'dropdown', name: 'VOTE', options: [['Sí', 'yes'], ['No', 'no'], ['Abstención', 'abstain']] }, { type: 'input_value', name: 'PROPOSAL_ID' }],
        colour: '#FF9800',
        tooltip: 'Emite un voto en la propuesta',
      },
    ],
  },
  {
    id: 'marketplace',
    name: 'Mercado Local',
    description: 'Plataforma para compra/venta de productos locales',
    category: 'ecommerce',
    blocks: [
      {
        type: 'item_list',
        message: 'Listar producto por %1 tokens',
        args: [{ type: 'input_value', name: 'PRICE' }],
        colour: '#2196F3',
        tooltip: 'Lista un producto en el mercado',
      },
      {
        type: 'item_buy',
        message: 'Comprar producto %1',
        args: [{ type: 'input_value', name: 'ITEM_ID' }],
        colour: '#2196F3',
        tooltip: 'Compra un producto del mercado',
      },
    ],
  },
]

const ContractBuilder: React.FC<ContractBuilderProps> = ({ onCodeGenerated, onNext, onBack }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null)
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [contractName, setContractName] = useState('')
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')

  useEffect(() => {
    if (selectedFeatures.length > 0 && blocklyDiv.current) {
      // Reinicializar Blockly cuando cambien las features
      initializeBlockly()
    }
  }, [selectedFeatures])

  const initializeBlockly = () => {
    if (!blocklyDiv.current) {
      console.log('blocklyDiv.current no está disponible')
      return
    }

    try {
      console.log('Inicializando Blockly...')
      
      // Limpiar workspace anterior si existe
      if (workspace.current) {
        console.log('Disponiendo workspace anterior...')
        workspace.current.dispose()
        workspace.current = null
      }

      // Verificar que Blockly esté disponible
      if (!Blockly || !Blockly.inject) {
        console.error('Blockly no está disponible')
        setGeneratedCode('// Error: Blockly no está disponible')
        return
      }

      console.log('Blockly está disponible, creando bloques personalizados...')
      
      // Crear bloques personalizados ANTES de inicializar el workspace
      createCustomBlocks()

      // Crear toolbox dinámico basado en features seleccionadas
      const toolbox = createDynamicToolbox()

      console.log('Inyectando Blockly en el div...')
      
      // Inicializar workspace con configuración básica
      const workspaceOptions = {
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
        toolbox: toolbox,
      }

      workspace.current = Blockly.inject(blocklyDiv.current, workspaceOptions)

      console.log('Workspace creado exitosamente:', workspace.current)

      // Escuchar cambios en el workspace
      workspace.current.addChangeListener(() => {
        if (workspace.current) {
          try {
            const code = generateSolidityCode(workspace.current, contractName || 'MyContract')
            setGeneratedCode(code)
            onCodeGenerated(code)
          } catch (error) {
            console.error('Error generating code from blocks:', error)
            setGeneratedCode(`// Error generando código: ${error.message}`)
          }
        }
      })

      // Generar código inicial
      if (workspace.current) {
        const initialCode = generateSolidityCode(workspace.current, contractName || 'MyContract')
        setGeneratedCode(initialCode)
        onCodeGenerated(initialCode)
        console.log('Código inicial generado')
      }
    } catch (error) {
      console.error('Error initializing Blockly:', error)
      setGeneratedCode(`// Error inicializando Blockly: ${error.message}`)
    }
  }

  const createDynamicToolbox = () => {
    console.log('Creando toolbox dinámico para features:', selectedFeatures)
    
    // Toolbox base con bloques estándar y bloques de construcción de contratos
    const baseContents = [
      {
        kind: 'category',
        name: 'Construcción de Contratos',
        colour: '#FF6B35',
        contents: [
          { kind: 'block', type: 'contract_start' },
          { kind: 'block', type: 'variable_declare' },
          { kind: 'block', type: 'function_public' },
          { kind: 'block', type: 'function_private' },
          { kind: 'block', type: 'modifier_onlyowner' },
          { kind: 'block', type: 'require_statement' },
          { kind: 'block', type: 'emit_event' },
        ]
      },
      {
        kind: 'category',
        name: 'Lógica',
        colour: '#5C81A6',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_boolean' },
        ]
      },
      {
        kind: 'category',
        name: 'Matemáticas',
        colour: '#5C81A6',
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
        ]
      },
      {
        kind: 'category',
        name: 'Texto',
        colour: '#5C81A6',
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
        ]
      }
    ]

    // Añadir categorías basadas en features seleccionadas
    const featureCategories = []

    selectedFeatures.forEach(featureId => {
      const feature = CONTRACT_FEATURES.find(f => f.id === featureId)
      if (feature) {
        console.log(`Añadiendo categoría para feature: ${feature.name}`)
        featureCategories.push({
          kind: 'category',
          name: feature.name,
          colour: feature.blocks[0]?.colour || '#5C81A6',
          contents: feature.blocks.map(block => {
            console.log(`  - Añadiendo bloque: ${block.type}`)
            return {
              kind: 'block',
              type: block.type,
            }
          })
        })
      }
    })

    const finalToolbox = {
      kind: 'categoryToolbox',
      contents: [...baseContents, ...featureCategories]
    }

    console.log('Toolbox final:', finalToolbox)
    return finalToolbox
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const generateCode = () => {
    try {
      if (workspace.current) {
        // Generar código desde Blockly
        const code = generateSolidityCode(workspace.current, contractName || 'MyContract')
        setGeneratedCode(code)
        onCodeGenerated(code)
      } else {
        // Generar código usando plantillas basadas en features seleccionadas
        let solidityCode = ''
        
        if (selectedFeatures.length === 1) {
          // Si solo hay una feature, usar plantilla específica
          const featureId = selectedFeatures[0]
          const feature = CONTRACT_FEATURES.find(f => f.id === featureId)
          
          if (feature) {
            const templateType = featureId as keyof typeof CONTRACT_TEMPLATES
            solidityCode = generateCustomContract(
              templateType,
              contractName || 'MyContract',
              contractName?.substring(0, 3).toUpperCase() || 'MC',
              {
                decimals: 18,
                initialSupply: 1000000,
                votingDuration: 604800, // 7 días
                platformFee: 250 // 2.5%
              }
            )
          }
        } else if (selectedFeatures.length > 1) {
          // Si hay múltiples features, generar contrato combinado
          solidityCode = generateCombinedContract()
        } else {
          // Si no hay features seleccionadas, generar contrato básico
          solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ${contractName || 'MyContract'} {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }
    
    // Selecciona funcionalidades desde el panel lateral
    // o arrastra bloques al área de trabajo para generar código
}`
        }
        
        setGeneratedCode(solidityCode)
        onCodeGenerated(solidityCode)
      }
    } catch (error) {
      console.error('Error generating code:', error)
      const errorCode = `// Error generando código: ${error.message}
// Por favor, verifica que los bloques estén correctamente configurados`
      setGeneratedCode(errorCode)
      onCodeGenerated(errorCode)
    }
  }

  const generateCombinedContract = () => {
    const contractName = 'MyContract'
    
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
    }`
    
    // Añadir funcionalidades basadas en features seleccionadas
    selectedFeatures.forEach(featureId => {
      const feature = CONTRACT_FEATURES.find(f => f.id === featureId)
      if (feature) {
        solidityCode += `\n\n    // Funciones de ${feature.name}:`
        
        switch (featureId) {
          case 'loyalty':
            solidityCode += `
    string public name = "Puntos de Lealtad";
    string public symbol = "PTS";
    uint8 public decimals = 18;
    uint256 public totalSupply = 0;
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public lastPurchase;
    
    function awardPoints(address to, uint256 amount) public onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        lastPurchase[to] = block.timestamp;
    }
    
    function redeemPoints(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Puntos insuficientes");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
    }`
            break
          case 'certificates':
            solidityCode += `
    uint256 public nextTokenId = 1;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) public certificateData;
    mapping(address => uint256) public certificateBalance;
    
    function issueCertificate(address to, string memory data) public onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        ownerOf[tokenId] = to;
        certificateData[tokenId] = data;
        certificateBalance[to]++;
        return tokenId;
    }
    
    function verifyCertificate(uint256 tokenId) public view returns (bool) {
        return ownerOf[tokenId] != address(0);
    }`
            break
          case 'governance':
            solidityCode += `
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 endTime;
        bool executed;
        address proposer;
    }
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public nextProposalId = 1;
    uint256 public votingDuration = 7 days;
    
    function createProposal(string memory description) public onlyOwner returns (uint256) {
        uint256 proposalId = nextProposalId++;
        proposals[proposalId] = Proposal({
            description: description,
            yesVotes: 0,
            noVotes: 0,
            endTime: block.timestamp + votingDuration,
            executed: false,
            proposer: msg.sender
        });
        return proposalId;
    }
    
    function vote(uint256 proposalId, bool support) public {
        require(block.timestamp <= proposals[proposalId].endTime, "Votación cerrada");
        require(!hasVoted[proposalId][msg.sender], "Ya votaste");
        
        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            proposals[proposalId].yesVotes++;
        } else {
            proposals[proposalId].noVotes++;
        }
    }`
            break
          case 'marketplace':
            solidityCode += `
    struct Product {
        uint256 id;
        address seller;
        string name;
        uint256 price;
        bool isActive;
        string description;
    }
    mapping(uint256 => Product) public products;
    uint256 public nextProductId = 1;
    uint256 public platformFee = 250; // 2.5%
    
    function listProduct(string memory name, uint256 price, string memory description) public returns (uint256) {
        uint256 productId = nextProductId++;
        products[productId] = Product({
            id: productId,
            seller: msg.sender,
            name: name,
            price: price,
            isActive: true,
            description: description
        });
        return productId;
    }
    
    function buyProduct(uint256 productId) public payable {
        Product storage product = products[productId];
        require(product.isActive, "Producto no disponible");
        require(msg.value >= product.price, "Pago insuficiente");
        
        product.isActive = false;
        
        uint256 fee = (product.price * platformFee) / 10000;
        uint256 sellerAmount = product.price - fee;
        
        payable(product.seller).transfer(sellerAmount);
        if (fee > 0) {
            payable(owner).transfer(fee);
        }
    }`
            break
        }
      }
    })
    
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
  }

  const handleNext = () => {
    if (selectedFeatures.length === 0) {
      return
    }
    
    if (!contractName) {
      setShowNameDialog(true)
      return
    }
    
    generateCode()
    onNext()
  }

  const handleNameConfirm = () => {
    if (contractName.trim()) {
      setShowNameDialog(false)
      generateCode()
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Selección de Features */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Build color="primary" />
              Funcionalidades del Contrato
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Selecciona las funcionalidades que quieres incluir en tu contrato inteligente:
            </Typography>

            <Grid container spacing={2}>
              {CONTRACT_FEATURES.map((feature) => (
                <Grid item xs={12} sm={6} md={3} key={feature.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedFeatures.includes(feature.id) ? '2px solid' : '1px solid',
                        borderColor: selectedFeatures.includes(feature.id) ? 'primary.main' : 'divider',
                        backgroundColor: selectedFeatures.includes(feature.id) ? 'primary.50' : 'background.paper',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => handleFeatureToggle(feature.id)}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {feature.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                        <Chip
                          label={feature.category.toUpperCase()}
                          size="small"
                          sx={{ mt: 1 }}
                          color={selectedFeatures.includes(feature.id) ? 'primary' : 'default'}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Workspace de Blockly */}
        {selectedFeatures.length > 0 && (
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                  <Tab label="Diseñador Visual" icon={<Build />} />
                  <Tab label="Código Generado" icon={<Code />} />
                  <Tab label="Vista Previa" icon={<Preview />} />
                </Tabs>
              </Box>

              <Box sx={{ p: 2, minHeight: 400 }}>
                {activeTab === 0 && (
                  <Box sx={{ height: 500, position: 'relative' }}>
                    {selectedFeatures.length > 0 ? (
                      <Box
                        ref={blocklyDiv}
                        sx={{
                          height: '100%',
                          width: '100%',
                          border: '1px solid #ddd',
                          borderRadius: 1,
                        }}
                      />
                    ) : (
                      <Box sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        p: 4
                      }}>
                        <Typography variant="h6" gutterBottom>
                          🧩 Workspace de Bloques
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Selecciona las funcionalidades arriba para ver los bloques disponibles.
                          <br />
                          Arrastra y conecta bloques para crear la lógica de tu contrato.
                        </Typography>
                        <Alert severity="info" sx={{ maxWidth: 400 }}>
                          Selecciona al menos una funcionalidad para comenzar a diseñar tu contrato.
                        </Alert>
                      </Box>
                    )}
                  </Box>
                )}

                {activeTab === 1 && (
                  <Paper sx={{ p: 2, backgroundColor: 'grey.50', minHeight: 400 }}>
                    <Typography variant="h6" gutterBottom>
                      Código Solidity Generado:
                    </Typography>
                    <TextField
                      multiline
                      fullWidth
                      rows={15}
                      value={generatedCode}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        sx: { fontFamily: 'monospace', fontSize: '0.875rem' }
                      }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={generateCode}
                      >
                        {workspace.current ? 'Regenerar Código' : 'Generar Código'}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Save />}
                        onClick={() => {
                          const blob = new Blob([generatedCode], { type: 'text/plain' })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `${contractName || 'contract'}.sol`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                      >
                        Descargar
                      </Button>
                    </Box>
                    {workspace.current && (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        Arrastra bloques desde el panel lateral al área de trabajo para generar código automáticamente.
                      </Alert>
                    )}
                  </Paper>
                )}

                {activeTab === 2 && (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Vista Previa del Contrato
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Aquí podrás ver una representación visual de tu contrato antes del deploy
                    </Typography>
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Esta funcionalidad estará disponible en la próxima versión
                    </Alert>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Botones de navegación */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onBack}>
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={selectedFeatures.length === 0}
            startIcon={<Add />}
          >
            Continuar
          </Button>
        </Box>
      </Box>

      {/* Dialog para nombre del contrato */}
      <Dialog open={showNameDialog} onClose={() => setShowNameDialog(false)}>
        <DialogTitle>Nombre del Contrato</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del contrato"
            fullWidth
            variant="outlined"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            placeholder="MiContratoInteligente"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            El nombre debe seguir las convenciones de Solidity (CamelCase, sin espacios)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNameDialog(false)}>Cancelar</Button>
          <Button onClick={handleNameConfirm} disabled={!contractName.trim()}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default ContractBuilder
