# 🔧 Setup de Deployment - Pasos Rápidos

## 1. Configurar Clave Privada
```bash
npx hardhat vars set PRIVATE_KEY "0aa33ccb12e955f61c64bb83dee93704f1436701a42392b86228a11369572be4"
```

## 2. Instalar Dependencias
```bash
npm install
```

## 3. Compilar Contrato
```bash
npx hardhat compile
```

## 4. Probar Deployment
```bash
npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network passetHub
```

## 5. Verificar en Explorer
- URL: https://blockscout-passet-hub.parity-testnet.parity.io
- Buscar la dirección del contrato desplegado

## 6. Probar la App
```bash
npm run dev
```
- Ir a http://localhost:3000/test
- Verificar que la página /test funciona correctamente