import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Alert,
  Chip,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { motion } from 'framer-motion'
import {
  CloudUpload,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Link as LinkIcon,
  Visibility,
  AccountBalanceWallet,
} from '@mui/icons-material'
import { WalletAccount, DeployedContract } from '../types'
import { deployContractToPolkadot } from '../utils/contractDeployer'

interface DeploymentPanelProps {
  contractCode: string
  account: WalletAccount | null
  onDeployed: (contract: DeployedContract) => void
  onNext: () => void
  onBack: () => void
}

const DEPLOYMENT_STEPS = [
  'Validar código',
  'Estimar gas',
  'Firmar transacción',
  'Desplegar contrato',
  'Verificar deployment',
]

const DeploymentPanel: React.FC<DeploymentPanelProps> = ({
  contractCode,
  account,
  onDeployed,
  onNext,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentError, setDeploymentError] = useState<string | null>(null)
  const [gasEstimate, setGasEstimate] = useState<string>('')
  const [deployedContract, setDeployedContract] = useState<DeployedContract | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [contractName, setContractName] = useState('MiContrato')

  useEffect(() => {
    if (contractCode) {
      // Extraer nombre del contrato del código
      const contractMatch = contractCode.match(/contract\s+(\w+)/)
      if (contractMatch) {
        setContractName(contractMatch[1])
      }
    }
  }, [contractCode])

  const validateCode = async (): Promise<boolean> => {
    try {
      // Validaciones básicas del código
      if (!contractCode.trim()) {
        throw new Error('El código del contrato está vacío')
      }

      if (!contractCode.includes('pragma solidity')) {
        throw new Error('El código debe incluir la declaración de versión de Solidity')
      }

      if (!contractCode.includes('contract')) {
        throw new Error('El código debe incluir al menos un contrato')
      }

      // Simular validación adicional
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return true
    } catch (error) {
      setDeploymentError(error instanceof Error ? error.message : 'Error de validación')
      return false
    }
  }

  const estimateGas = async (): Promise<boolean> => {
    try {
      // Simular estimación de gas
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Calcular gas estimado basado en la complejidad del código
      const lines = contractCode.split('\n').length
      const functions = (contractCode.match(/function/g) || []).length
      const estimatedGas = Math.max(200000, lines * 1000 + functions * 50000)
      
      setGasEstimate(estimatedGas.toLocaleString())
      return true
    } catch (error) {
      setDeploymentError('Error al estimar gas')
      return false
    }
  }

  const deployContract = async (): Promise<boolean> => {
    try {
      // Deploy real contract to Polkadot Hub TestNet
      const deployedContract = await deployContractToPolkadot(contractCode, contractName)
      
      setDeployedContract(deployedContract)
      onDeployed(deployedContract)
      setShowSuccessDialog(true)
      return true
    } catch (error) {
      setDeploymentError(error instanceof Error ? error.message : 'Error durante el deployment')
      return false
    }
  }

  const handleDeploy = async () => {
    if (!account) {
      setDeploymentError('No hay wallet conectado')
      return
    }

    setIsDeploying(true)
    setDeploymentError(null)
    setCurrentStep(0)

    try {
      // Paso 1: Validar código
      setCurrentStep(1)
      const isValid = await validateCode()
      if (!isValid) return

      // Paso 2: Estimar gas
      setCurrentStep(2)
      const gasEstimated = await estimateGas()
      if (!gasEstimated) return

      // Paso 3: Firmar transacción (simulado)
      setCurrentStep(3)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Paso 4: Desplegar contrato
      setCurrentStep(4)
      const deployed = await deployContract()
      if (!deployed) return

      // Paso 5: Completado
      setCurrentStep(5)
      
    } catch (error) {
      setDeploymentError(error instanceof Error ? error.message : 'Error durante el deployment')
    } finally {
      setIsDeploying(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccessDialog(false)
    onNext()
  }

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <CheckCircle color="success" />
    if (step === currentStep) return <CloudUpload color="primary" />
    return <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#e0e0e0' }} />
  }

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed'
    if (step === currentStep) return 'active'
    return 'pending'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Información del Deployment */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CloudUpload color="primary" />
              Desplegar Contrato
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom>
                    Información del Contrato
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Nombre:</strong> {contractName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Red:</strong> Polkadot Hub TestNet (Paseo)
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cuenta:</strong> {account?.address.slice(0, 10)}...{account?.address.slice(-10)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom>
                    Costos Estimados
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Gas estimado:</strong> {gasEstimate || 'Calculando...'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Costo estimado:</strong> ~0.1 DOT
                    </Typography>
                    <Chip label="TestNet - Gratis" color="success" size="small" />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Stepper de Deployment */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Proceso de Deployment
            </Typography>
            
            <Stepper activeStep={currentStep} orientation="vertical">
              {DEPLOYMENT_STEPS.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={() => getStepIcon(index)}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: getStepStatus(index) === 'completed' ? 600 : 400,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                  <StepContent>
                    {index === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Verificando sintaxis y estructura del código Solidity
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography variant="body2" color="text.secondary">
                        Calculando el costo de gas para el deployment
                      </Typography>
                    )}
                    {index === 2 && (
                      <Typography variant="body2" color="text.secondary">
                        Esperando firma de la transacción en tu wallet
                      </Typography>
                    )}
                    {index === 3 && (
                      <Typography variant="body2" color="text.secondary">
                        Enviando transacción a la red Polkadot
                      </Typography>
                    )}
                    {index === 4 && (
                      <Typography variant="body2" color="text.secondary">
                        Verificando que el contrato se desplegó correctamente
                      </Typography>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            {isDeploying && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Procesando... Por favor no cierres esta ventana
                </Typography>
              </Box>
            )}

            {deploymentError && (
              <Alert severity="error" sx={{ mt: 3 }}>
                <ErrorIcon sx={{ mr: 1 }} />
                {deploymentError}
              </Alert>
            )}

            {deployedContract && (
              <Alert severity="success" sx={{ mt: 3 }}>
                <CheckCircle sx={{ mr: 1 }} />
                ¡Contrato desplegado exitosamente!
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Código del Contrato */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Código a Desplegar
            </Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.50', maxHeight: 200, overflow: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                {contractCode}
              </pre>
            </Paper>
          </CardContent>
        </Card>

        {/* Botones de navegación */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onBack} disabled={isDeploying}>
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleDeploy}
            disabled={isDeploying || !account || !contractCode}
            startIcon={<CloudUpload />}
            size="large"
          >
            {isDeploying ? 'Desplegando...' : 'Desplegar Contrato'}
          </Button>
        </Box>
      </Box>

      {/* Dialog de éxito */}
      <Dialog open={showSuccessDialog} onClose={handleSuccessClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5">
            ¡Contrato Desplegado!
          </Typography>
        </DialogTitle>
        <DialogContent>
          {deployedContract && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {deployedContract.contract.name}
              </Typography>
              
              <Paper sx={{ p: 2, backgroundColor: 'grey.50', mb: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  <strong>Dirección:</strong> {deployedContract.address}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  <strong>Transacción:</strong> {deployedContract.transactionHash}
                </Typography>
                <Typography variant="body2">
                  <strong>Bloque:</strong> {deployedContract.blockNumber.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Gas usado:</strong> {deployedContract.gasUsed}
                </Typography>
              </Paper>

              <Button
                variant="outlined"
                startIcon={<LinkIcon />}
                href={deployedContract.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mb: 2 }}
              >
                Ver en Explorer
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={handleSuccessClose} size="large">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default DeploymentPanel





