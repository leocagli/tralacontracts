# 🚀 Contrato Desplegado - LATIN HACK 2024

## ✅ Información del Contrato Real

- **Dirección**: `0x5Fcc96e3f54Fa0775b870257Eeb43cD9eFA73f19`
- **Red**: Polkadot Hub TestNet (Paseo)
- **Chain ID**: 420420422
- **RPC**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io/address/0x5Fcc96e3f54Fa0775b870257Eeb43cD9eFA73f19
- **Clave Privada**: `4ace1d904d766b93e513e67de170f76997ae1b03efcf33cce0a812fe9a719b79`
- **Dirección Wallet**: `0xBcF15541A89979F6Ca33725c295D3f1814cC4432`

## 🎯 Cumplimiento LATIN HACK 2024

- ✅ Smart contract desplegado en testnet Paseo de Polkadot
- ✅ Solidity ^0.8.28
- ✅ Página /test funcional
- ✅ Integración completa con la aplicación
- ✅ Contrato verificable en explorer
- ✅ Tokens PAS reales utilizados para deployment

## 🔧 Funciones del Contrato

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Storage {
    uint256 private number;
    event NumberChanged(uint256 newNumber);

    function store(uint256 newNumber) public {
        number = newNumber;
        emit NumberChanged(newNumber);
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}
```

## 🧪 Cómo Probar

1. **Ejecutar la app**: `npm run dev`
2. **Ir a**: http://localhost:3000/test
3. **Conectar wallet** con la clave privada
4. **Probar funciones**:
   - `store(42)` - Almacenar un número
   - `retrieve()` - Leer el número almacenado

¡Contrato real funcionando en Polkadot Hub TestNet!