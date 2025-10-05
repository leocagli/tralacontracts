# 🧪 Probar Deployment de Contratos Generados

## Flujo Completo

1. **Abrir la app**: `npm run dev`
2. **Ir al paso 2**: "Diseñar Contrato" 
3. **Usar Blockly**: Arrastra bloques para crear un contrato
4. **Generar código**: El código Solidity se genera automáticamente
5. **Ir al paso 3**: "Desplegar"
6. **Deploy real**: El contrato se despliega en Polkadot Hub TestNet
7. **Obtener dirección**: Se guarda la dirección real del contrato
8. **Ir a /test**: Probar el contrato desplegado

## Ejemplo de Contrato Generado

Cuando uses los bloques de Blockly, se genera algo como:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TokenContract {
    string public name = "Mi Token";
    string public symbol = "MTK";
    uint256 public totalSupply = 1000000;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
```

## Verificación

- El contrato se despliega realmente en Polkadot
- La dirección se muestra en la app
- Se puede verificar en el explorer
- La página /test interactúa con el contrato real