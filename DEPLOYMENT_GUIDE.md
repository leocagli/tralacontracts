# 🚀 Guía de Deployment Real en Polkadot

## Configuración Inicial

1. **Instalar dependencias de Hardhat:**
```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox@^5.0.0 @parity/hardhat-polkadot@^0.1.9 hardhat@^2.22.18 solc@^0.8.28
```

2. **Configurar clave privada:**
```bash
npx hardhat vars set PRIVATE_KEY "TU_CLAVE_PRIVADA_AQUI"
```

3. **Obtener tokens de prueba:**
- Visita: https://faucet.polkadot.io/?parachain=1111
- Conecta tu wallet y solicita tokens PAS

## Deployment Manual

Para desplegar un contrato manualmente:

```bash
# Compilar contratos
npx hardhat compile

# Desplegar a Polkadot Hub TestNet
npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network passetHub
```

## Deployment desde la App

La app usa `deployContractMock` por defecto. Para usar deployment real:

1. Cambiar en `DeploymentPanel.tsx`:
```typescript
// Cambiar esta línea:
const deployedContract = await deployContractMock(contractCode, contractName)

// Por esta:
const deployedContract = await deployContractToPolkadot(contractCode, contractName)
```

2. Configurar un endpoint API para manejar deployments desde el frontend.

## Verificación

Después del deployment, verifica en:
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io
- **Página /test**: http://localhost:3000/test

## Requisitos del Hackathon ✅

- ✅ **Red**: Polkadot Hub TestNet (Paseo)
- ✅ **Lenguaje**: Solidity ^0.8.28
- ✅ **Página /test**: Disponible en `/test`
- ✅ **Integración**: Contratos integrados en el flujo principal
- ✅ **Meta noindex**: Agregado para seguridad