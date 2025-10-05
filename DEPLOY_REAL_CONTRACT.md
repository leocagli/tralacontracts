# 🚀 Desplegar Contrato Real - Pasos Simples

## Método 1: Remix IDE (Recomendado)

1. **Ir a Remix**: https://remix.ethereum.org
2. **Crear archivo**: `Storage.sol`
3. **Pegar código**:
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

4. **Compilar**: Solidity Compiler > Compile
5. **Conectar wallet**: Deploy & Run > Injected Provider - MetaMask
6. **Configurar red**: 
   - Network: Custom RPC
   - URL: `https://testnet-passet-hub-eth-rpc.polkadot.io`
   - Chain ID: `420420422`
7. **Deploy**: Click "Deploy"
8. **Copiar dirección** del contrato desplegado

## Método 2: MetaMask + Remix

1. **Agregar red en MetaMask**:
   - Network Name: Polkadot Hub TestNet
   - RPC URL: https://testnet-passet-hub-eth-rpc.polkadot.io
   - Chain ID: 420420422
   - Currency: DOT

2. **Importar tu clave privada** en MetaMask
3. **Obtener tokens**: https://faucet.polkadot.io/?parachain=1111
4. **Usar Remix** con MetaMask conectado

## Actualizar la App

Una vez desplegado, actualiza en `TestPage.tsx`:
```typescript
contractAddress = 'TU_DIRECCION_REAL_AQUI'
```