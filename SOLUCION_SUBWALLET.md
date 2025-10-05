# 🔐 Solución para Problemas con SubWallet

## 🚨 Problema Común

```
web3Enable: Enabled 0 extensions
no me deja clickear en subwallet a pesar que la tengo descargada a la extension
```

## ✅ Soluciones Paso a Paso

### 1. Verificar Instalación de SubWallet

**Chrome/Edge:**

1. Ve a `chrome://extensions/` o `edge://extensions/`
2. Busca "SubWallet" en la lista
3. Asegúrate de que esté **habilitada** (toggle activado)
4. Si no está, instálala desde [subwallet.app](https://subwallet.app/)

**Firefox:**

1. Ve a `about:addons`
2. Busca "SubWallet" en extensiones instaladas
3. Asegúrate de que esté **habilitada**

### 2. Configurar SubWallet Correctamente

1. **Abrir SubWallet:**

   - Haz clic en el icono de SubWallet en la barra de extensiones
   - O ve a `chrome-extension://[ID]/index.html`

2. **Crear/Importar Cuenta:**

   - Crea una nueva cuenta o importa una existente
   - **IMPORTANTE:** Asegúrate de que la cuenta esté **desbloqueada**

3. **Configurar Red:**
   - Ve a Settings → Networks
   - Busca "Polkadot Hub" o "Paseo"
   - Activa la red si no está habilitada
   - **Cambia a la red de prueba** (no mainnet)

### 3. Obtener Tokens de Prueba

1. Ve al [Faucet de Polkadot](https://faucet.polkadot.io/?parachain=1111)
2. Conecta SubWallet
3. Solicita tokens DOT de prueba
4. Espera a que lleguen a tu cuenta

### 4. Recargar y Verificar

1. **Cierra todas las pestañas** de Tralala Contracts
2. **Recarga la página** completamente
3. SubWallet debería aparecer como disponible

## 🔧 Soluciones Técnicas Avanzadas

### Si SubWallet sigue sin detectarse:

**Opción 1: Reiniciar Navegador**

```bash
# Cierra completamente el navegador
# Vuelve a abrirlo
# Ve a Tralala Contracts
```

**Opción 2: Limpiar Cache**

```bash
# Chrome: Ctrl+Shift+Delete
# Selecciona "Cached images and files"
# Haz clic en "Clear data"
```

**Opción 3: Verificar Permisos**

1. Ve a `chrome://extensions/`
2. Busca SubWallet
3. Haz clic en "Details"
4. Verifica que tenga permisos para:
   - "Read and change all your data on all websites"
   - "Access your data for all websites"

### Debugging en Consola

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Verificar si SubWallet está disponible
console.log("SubWallet disponible:", !!window.injectedWeb3?.["subwallet-js"]);

// Verificar extensiones detectadas
import("@polkadot/extension-dapp").then(({ web3Enable }) => {
  web3Enable("Tralala Contracts").then((extensions) => {
    console.log(
      "Extensiones:",
      extensions.map((ext) => ext.name)
    );
  });
});
```

## 🆘 Alternativas si SubWallet no funciona

### Opción 1: Usar Talisman

1. Instala [Talisman](https://talisman.xyz/)
2. Configura una cuenta
3. Cambia a Polkadot Hub TestNet
4. Usa el faucet para obtener tokens

### Opción 2: Usar Polkadot.js Extension

1. Instala [Polkadot.js Extension](https://polkadot.js.org/extension/)
2. Crea una cuenta
3. Configura la red de prueba
4. Obtén tokens del faucet

## 📱 Configuración Móvil

Si usas SubWallet en móvil:

1. **Android:** Instala desde Google Play Store
2. **iOS:** Instala desde App Store
3. **Configuración:** Sigue los mismos pasos que en desktop
4. **Conectar:** Usa el navegador móvil compatible

## 🎯 Verificación Final

Para confirmar que todo funciona:

1. ✅ SubWallet está instalado y habilitado
2. ✅ Tienes una cuenta creada y desbloqueada
3. ✅ Estás en la red Polkadot Hub TestNet
4. ✅ Tienes tokens DOT de prueba
5. ✅ Recargaste la página de Tralala Contracts
6. ✅ SubWallet aparece como "Disponible" en lugar de "No detectado"

## 🆘 Si Nada Funciona

1. **Prueba otro navegador:** Chrome, Firefox, Edge
2. **Reinstala SubWallet:** Desinstala y vuelve a instalar
3. **Usa otra extensión:** Talisman o Polkadot.js
4. **Contacta soporte:** [Discord de SubWallet](https://discord.gg/subwallet)

---

**Nota:** Este problema es común con extensiones de Polkadot. La mayoría de las veces se soluciona recargando la página después de configurar correctamente la extensión.





