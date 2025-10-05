# 📋 Contrato Desplegado - LATIN HACK 2024

## Información del Contrato

- **Nombre**: Storage Contract
- **Red**: Polkadot Hub TestNet (Paseo)
- **Dirección**: `0xE8693cE64b294E26765573398C7Ca5C700E9C85c`
- **Explorador**: https://blockscout-passet-hub.parity-testnet.parity.io/address/0xE8693cE64b294E26765573398C7Ca5C700E9C85c
- **Código Fuente**: Ver `/contracts/Storage.sol`

## ABI del Contrato

```json
[
  {
    "inputs": [{"internalType": "uint256", "name": "newNumber", "type": "uint256"}],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "newNumber", "type": "uint256"}],
    "name": "NumberChanged",
    "type": "event"
  }
]
```

## Instrucciones de Prueba

1. **Acceder a la página de pruebas**: http://localhost:3000/test
2. **Conectar wallet**: Usar Talisman o Polkadot.js
3. **Verificar red**: Debe estar en Polkadot Hub TestNet
4. **Probar funciones**:
   - `store(42)` - Almacenar un número
   - `retrieve()` - Leer el número almacenado

## Cumplimiento Hackathon ✅

- ✅ Smart contract desplegado en testnet Paseo
- ✅ Solidity ^0.8.28
- ✅ Página /test funcional
- ✅ Integración completa con la aplicación