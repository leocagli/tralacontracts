# 🎵 Instrucciones de Uso - Tralala Contracts

## 🚀 Inicio Rápido

### 1. Instalación

```bash
# Clonar el proyecto
git clone <tu-repo>
cd tralalacontracts-dot

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### 2. Configurar Wallet

Antes de usar la aplicación, necesitas instalar una extensión de wallet para Polkadot:

#### Opción 1: Talisman (Recomendado)

1. Ve a [talisman.xyz](https://talisman.xyz/)
2. Descarga e instala la extensión
3. Crea una cuenta nueva o importa una existente
4. Asegúrate de tener fondos en Polkadot Hub TestNet

#### Opción 2: Polkadot.js Extension

1. Ve a [polkadot.js.org/extension](https://polkadot.js.org/extension/)
2. Instala la extensión en tu navegador
3. Crea una cuenta
4. Configura la red de prueba

#### Opción 3: SubWallet

1. Ve a [subwallet.app](https://subwallet.app/)
2. Descarga e instala la extensión
3. Configura tu cuenta

### 3. Obtener Tokens de Prueba

Para desplegar contratos necesitas tokens DOT de prueba:

1. Ve al [Faucet de Polkadot](https://faucet.polkadot.io/?parachain=1111)
2. Conecta tu wallet
3. Solicita tokens de prueba
4. Espera a que lleguen a tu cuenta

## 📋 Guía Paso a Paso

### Paso 1: Conectar Wallet

1. Abre la aplicación en tu navegador
2. Haz clic en "Conectar" en el wallet que prefieras
3. Autoriza la conexión en la extensión de tu wallet
4. Selecciona la cuenta que quieres usar

### Paso 2: Diseñar tu Contrato

1. Selecciona las funcionalidades que quieres incluir:

   - **Token ERC20**: Para crear tokens fungibles
   - **NFT Collection**: Para crear tokens no fungibles
   - **Sistema de Votación**: Para implementar gobernanza
   - **Marketplace**: Para crear un mercado de compra/venta

2. Arrastra bloques del panel izquierdo al área de trabajo
3. Conecta los bloques para crear la lógica de tu contrato
4. Haz clic en "Generar Código" para ver el código Solidity

### Paso 3: Desplegar Contrato

1. Revisa el código generado
2. Haz clic en "Desplegar Contrato"
3. Confirma la transacción en tu wallet
4. Espera a que se complete el deployment

### Paso 4: Explorar tu Contrato

1. Ve la información de tu contrato desplegado
2. Copia la dirección del contrato
3. Haz clic en "Ver en Explorer" para verlo en el block explorer
4. Usa los enlaces para interactuar con tu contrato

## 🎨 Características de la Interfaz

### Stepper Navigation

- **Navegación Intuitiva**: Usa los pasos numerados para navegar
- **Validación**: Cada paso valida que tengas todo listo antes de continuar
- **Retroceso**: Puedes volver a pasos anteriores en cualquier momento

### Blockly Workspace

- **Bloques Arrastrables**: Arrastra bloques del panel izquierdo
- **Conexiones Visuales**: Conecta bloques para crear lógica
- **Validación en Tiempo Real**: Los bloques se validan automáticamente
- **Zoom y Pan**: Usa los controles para navegar por el workspace

### Generación de Código

- **Vista Previa**: Ve el código Solidity antes de desplegar
- **Descarga**: Descarga el código como archivo .sol
- **Validación**: El código se valida automáticamente

## 🔧 Solución de Problemas

### Error: "No se encontraron extensiones de wallet"

- **Solución**: Instala una extensión de wallet compatible (Talisman, Polkadot.js, o SubWallet)
- **Verificación**: Asegúrate de que la extensión esté habilitada en tu navegador

### Error: "No se encontraron cuentas"

- **Solución**: Crea una cuenta en tu wallet o importa una existente
- **Verificación**: Asegúrate de que la cuenta esté desbloqueada

### Error: "Gas insuficiente"

- **Solución**: Obtén más tokens DOT del faucet
- **Verificación**: Verifica que tengas suficiente balance en tu cuenta

### Error: "Transacción fallida"

- **Solución**: Verifica que el código del contrato sea válido
- **Verificación**: Asegúrate de que la red esté funcionando correctamente

## 📚 Tipos de Contratos Disponibles

### Token ERC20

- Crear tokens fungibles
- Acuñar nuevos tokens
- Transferir tokens entre cuentas
- Aprobar gastos de tokens

### NFT Collection

- Crear colecciones de NFTs
- Acuñar NFTs individuales
- Transferir NFTs
- Establecer metadatos

### Sistema de Votación

- Crear propuestas
- Emitir votos
- Ejecutar propuestas
- Cancelar propuestas

### Marketplace

- Listar items para venta
- Comprar items
- Cancelar listados
- Actualizar precios

## 🌐 Redes Soportadas

### Polkadot Hub TestNet (Paseo)

- **Chain ID**: 420420422
- **RPC URL**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io
- **Faucet**: https://faucet.polkadot.io/?parachain=1111

## 🔒 Seguridad

- **Claves Privadas**: Nunca se almacenan en la aplicación
- **Firma Local**: Todas las transacciones se firman en tu wallet
- **Red de Prueba**: Solo funciona en testnets, no en mainnet
- **Código Abierto**: Todo el código es visible y auditable

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Revisa esta documentación**
2. **Consulta el README.md**
3. **Abre un issue en GitHub**
4. **Únete al Discord de Polkadot**

## 🚀 Próximas Características

- [ ] Más tipos de contratos
- [ ] Editor de código avanzado
- [ ] Testing integrado
- [ ] Deploy a mainnet
- [ ] Colaboración en tiempo real
- [ ] Templates predefinidos

---

¡Disfruta creando contratos inteligentes con Tralala Contracts! 🎵





