### **1. Elegibilidad General y Equipos**

- **Elegibilidad:** El hackathon está abierto a todo el mundo, de todos los países, incluyendo a menores de edad. Premios específicos como las becas de viaje pueden tener restricciones regionales (ver Sección 5).
- **Tamaño del Equipo:** Los equipos pueden estar conformados por 1 a 5 miembros.
- **Composición del Equipo:** Fomentamos la creación de equipos multidisciplinarios (ej. desarrolladores, diseñadores, product managers). Aunque no es obligatorio, la diversidad del equipo puede ser considerada como un factor positivo en la evaluación.

---

### **2. Categorías de Competición**

Los proyectos deben ser presentados en una de las siguientes categorías principales.

### **2.1. Ideas: (no requiere código)**

Para equipos que quieren definir un problema, diseñar una solución y demostrar que es necesaria —no se requiere código.

- **Tarea Principal:** Producir una propuesta de proyecto convincente con una fuerte evidencia de validación de problema.
- **Entregables Clave:**
    - **Video Pitch de 3 minutos:** Explicando el problema, la solución y el impacto potencial.
    - **Documento del Proyecto:** Un único documento (Notion, Google Docs) que contenga:
        - Definición del Problema y del Usuario Objetivo.
        - Propuesta de Solución (mockups, storyboards).
        - Roles y contribuciones del equipo.
        - Un plan claro para evolucionar a un Prototipo o Producto.
        - **Prueba de Validación (se debe cumplir al menos una):**
            - **Encuesta Online:** Mínimo 12 respuestas, con al menos el 30% confirmando que enfrentan el problema. Entregables: link de la encuesta, resumen de resultados y 3 aprendizajes clave.
            - **Landing Page:** Una página que explique la solución con una lista de espera que logre al menos 5 registros o un CTR del 2%. Entregables: URL, capturas de pantalla de la promoción y métricas.

### **2.2. Prototipo**

Para equipos listos para construir el corazón funcional de un proyecto y probar su viabilidad técnica.

- **Tarea Principal:** Construir una prueba de concepto que ejecute **una acción esencial**, de principio a fin, en una testnet. Las funcionalidades secundarias deben ser simuladas u omitidas.
- **Entregables Clave:**
    - **Prototipo Funcional:** Una aplicación funcional que demuestre el "camino feliz" principal.
    - **Video Pitch de 3 minutos:** Una demostración del prototipo en acción.
    - **Repositorio de Código:** Un repositorio público con un README (red, dirección del contrato, cómo probar).
    - **Página `/test` Obligatoria:** Una interfaz simple para que los jueces interactúen directamente con tu smart contract, incluyendo un botón de escritura ("write") y una visualización de lectura ("read") que muestre el resultado on-chain.

### **2.3. Producto**

Para equipos enfocados en la ejecución, la experiencia de usuario y en entregar una aplicación pulida y lista para sus primeros usuarios.

- **Tarea Principal:** Construir y desplegar una aplicación completa, intuitiva y funcional que resuelva un problema real de principio a fin.
- **Entregables Clave:**
    - **Aplicación Pulida:** Una V1 de tu producto, desplegada y funcionando en vivo.
    - **Showcase de Producto de 3 minutos:** Un video pitch enfocado en el beneficio para el usuario y la experiencia.
    - **Repositorio de Código y Página `/test`:** Igual que en la categoría Prototipo.

### **Requisitos Técnicos (Para Categorías Prototipo y Producto)**

El objetivo de LATIN HACK es resolver problemas reales usando la tecnología blockchain de Polkadot. Todos los proyectos en las categorías Prototipo y Producto deben integrar smart contracts como parte central de su solución.

**Smart Contracts y Despliegue**

- **Red:** Todos los smart contracts deben ser desplegados en la **testnet Paseo de Polkadot**.
- **Lenguaje:** Recomendamos ampliamente desarrollar los smart contracts en **Solidity** para compatibilidad con EVM.
- **Integración:** El smart contract debe estar completamente integrado en el flujo de usuario principal de tu aplicación. No puede ser un elemento independiente.

**Checklist de Entregables de la Postulación**

Tu postulación final para las categorías técnicas debe incluir:

1. **Hub del Proyecto:** Un único link público (ej. Notion, Google Docs) que sirva como la fuente principal de toda la información de tu proyecto.
2. **Repositorio de Código:** Un repositorio público en GitHub (o similar) que contenga tu código y un archivo `README.md` corto especificando:
    - La red utilizada (Paseo).
    - La dirección del contrato desplegado.
    - El ABI del contrato (Application Binary Interface).
    - Instrucciones simples sobre cómo probar el proyecto.
3. **Video Pitch de 3 minutos:** Un video conciso que demuestre tu proyecto y su funcionalidad.

**La Página `/test` Obligatoria**

Para asegurar la transparencia y permitir que los jueces verifiquen fácilmente la funcionalidad on-chain, cada proyecto debe incluir una página `/test`. Esta es una interfaz simple para la interacción directa con las funciones centrales de tu smart contract. Recomendamos usar una herramienta como **v0.dev** para construir esta página rápidamente.

Tu página `/test` **debe** incluir los siguientes elementos:

- **Conexión de Wallet:** Un botón para conectar una wallet y una indicación que muestre que el usuario está en la red correcta (testnet Paseo de Polkadot).
- **Dirección del Contrato:** La dirección del contrato desplegado, presentada como un link a un explorador de bloques.
- **Función de Escritura ("Write"):** Al menos un botón principal que active una función clave de escritura (`write`) en tu smart contract.
- **Visualización de Lectura ("Read"):** Una sección que lea datos de la blockchain y refleje claramente el cambio de estado on-chain después de que se complete una transacción.
- **Prueba de Transacción:** Una visualización del hash de la transacción (tx hash) y cualquier evento relevante emitido por el contrato tras una transacción exitosa.

**Notas de Seguridad Importantes:**

- **Solo Testnet:** Recuerda, todos los despliegues son en una testnet y no involucran activos de valor real.
- **Funciones de Administrador:** Evita incluir funciones de administrador peligrosas en tu página `/test`. Si es necesario, asegúrate de que estén protegidas con un control de acceso basado en roles adecuado.
- **Privacidad:** No permitas que tu página `/test` sea indexada por los motores de búsqueda (usa una meta etiqueta `noindex`) y nunca expongas llaves privadas u otras credenciales en tu código front-end.

---

### **3. Bounties**

Además de las categorías principales, los equipos pueden competir por lo siguiente.

- **Viral Hack (Categoría Creativa) $600:** Haz que LATIN HACK se vuelva viral. Los participantes con más impresiones en sus publicaciones sobre LATIN HACK en X ganarán el premio.
- **Bounties de Partners:** Desafíos especiales con premios dedicados. Cualquier proyecto puede aplicar a todos los bounties para los que sea elegible, además de su categoría principal.
    - **Bounty Universitario $2000:** Para equipos donde al menos el 60% de los miembros son estudiantes de universidades aliadas. La categoría **University Track** sigue las mismas reglas que la **Categoría Ideas** —los equipos deben presentar un concepto en un video corto— pero la participación es **exclusiva para estudiantes universitarios** de instituciones aliadas.
    - **Bounty de IA / v0 / Vercel $600:** Gana un **premio extra** construyendo el sitio web de tu proyecto con **v0**. Este bounty está abierto a **todas las categorías principales**: tu sitio web es opcional, pero si haces uno con v0, competirás por este premio adicional —además de los premios principales del hackathon.
    - **Bounty de San Francisco / ZO House $1000:** La categoría **San Francisco Track** es exclusiva para participantes que se unan desde nuestro hub de San Francisco. Sigue las mismas reglas que las **categorías principales** —puedes unirte con tu propia idea y competir en Ideas, MVP o App Completa— pero incluye un **premio extra solo para la edición de San Francisco**.

---

### **4. Reglas de Proyecto y Participación**

- **Originalidad del Proyecto:** Los proyectos deben ser creados durante las fechas oficiales del hackathon. Proyectos desarrollados previamente en otros eventos no son elegibles, con una excepción: los proyectos iniciados en NERDATHON 2024 o NERD CAMP 2025 pueden ser presentados.
- **Una Categoría por Proyecto:** Cada proyecto solo puede ser postulado en **una** categoría principal (Ideas, Prototipo o Producto). Por ejemplo, no puedes postular el mismo proyecto de NFTs tanto en la categoría de Ideas como en la de Producto.
- **Múltiples Proyectos por Equipo:** Un equipo puede presentar más de un proyecto, siempre y cuando cada uno sea un concepto distinto.
- **Un Participante, Múltiples Equipos:** Una persona puede ser miembro de un máximo de 3 equipos.

---

### **5. Premios y Pagos**

### **5.1. Premios de las Categorías Principales: $9,500 USD**

- **Producto (User-Ready): $4,500**
    - 1er Lugar: $2,000
    - 2do Lugar: $1,500
    - 3er Lugar: $1,000
- **Prototipo (MVP): $2,700**
    - 1er Lugar: $1,300
    - 2do Lugar: $900
    - 3er Lugar: $500
- **Ideas: $1,800**
    - 1er Lugar: $700
    - 2do Lugar: $600
    - 3er Lugar: $500
- **Menciones Especiales: $500** (5 menciones de $100 cada una, abiertas a todas las categorías).

### **5.2. VIRAL HACK: $500 USD**

- **Viral Hack:** Distribuido entre 3 ganadores.

### **5.3. Premios de Bounties de Partners**

- **Bounty Universitario — Pozo de $2,000**
    - **¿Para quién es?**
    Este bounty es exclusivamente para equipos donde al menos el 60% de los miembros son estudiantes de nuestras universidades aliadas.
    - **La Recompensa:**
    Los mejores proyectos liderados por estudiantes compartirán un pozo de premios dedicado de $2,000.
- **Bounty de San Francisco: $1000**
    - **¿Para quién es?**
    Este premio es exclusivamente para equipos que participen en persona desde nuestro **hub de San Francisco (Zo House).**
    - **La Recompensa:**
    El equipo mejor evaluado del hub de San Francisco ganará $1,000 adicionales.
- **Bounty de IA $600 en créditos de v0:**
    - **¿Para quién es?**
    Cualquier equipo que compita en las categorías de Ideas, Prototipo o Producto.
    - **El Beneficio para Todos:**
    ¡Todos los participantes de LATIN HACK recibirán **$20 en créditos gratis** para usar en la plataforma v0!
    - **El Desafío:**
    Usa la IA generativa de v0.dev para construir un sitio web o landing page increíble para tu proyecto. Aunque un sitio web no es obligatorio para las categorías principales, crear uno con v0 inscribe automáticamente a tu equipo para ganar este bounty especial.
    - **La Recompensa:**
    El equipo con el mejor sitio web construido en v0 ganará $600 adicionales en créditos de la plataforma para seguir construyendo.

### **5.4. Pagos de Premios y Programa de Mentorías**

- **Para Ganadores de Ideas, Prototipo y Producto:** Los premios están vinculados a un programa de mentorías post-hackathon obligatorio de 6 semanas.
    - **Esquema de Pagos:**
        - El **50%** se paga al anunciarse los ganadores.
        - El **25%** se paga después de 3 semanas al completar el Hito #1 (Milestone #1).
        - El **25%** se paga después de 6 semanas al completar el Hito #2 (Milestone #2).
    - **Condiciones:** Para recibir el 50% final, los equipos deben asistir al menos al 80% de las reuniones de mentoría y demostrar un progreso significativo en los objetivos definidos con sus mentores.
- **Para Todos los Ganadores de Bounties, Menciones Especiales y la Categoría Creativa:** Los premios se pagan al 100% al momento del anuncio.

### **5.5. Becas de Viaje a Sub0 en Buenos Aires: $6,000 USD**

- **Objetivo:** Financiar a 5 participantes de equipos ganadores para que asistan y compitan en el Sub0 Hackathon.
- **Financiamiento:** Cada beca es de aproximadamente $1,200, cubriendo primero el pasaje aéreo. Los fondos restantes pueden destinarse a alojamiento y comida.
- **Elegibilidad:** Esta beca es exclusiva para participantes que compitan desde los hubs oficiales (Mendoza, Curitiba, Monterrey, Medellín) y un ganador de la comunidad online de LATAM (excluyendo los países de los hubs).
- **Requisitos:** Los beneficiarios deben tener un pasaporte válido y las visas necesarias. Es obligatorio contar con un seguro de viaje, el cual debe ser cubierto por el participante.

### **5.6. Un Programa de Aceleración de 6 Semanas**

Ganar LATIN HACK es solo el comienzo. Este programa exclusivo de mentorías de 6 semanas está diseñado para ayudar a nuestros mejores equipos a convertir sus proyectos de hackathon en emprendimientos viables y reales. Trabajarán directamente con expertos de la industria para refinar su estrategia, asegurar oportunidades y acelerar su crecimiento.

**Elegibilidad:**
Este programa es un premio exclusivo para los equipos ganadores de las categorías **Ideas, Prototipo y Producto**.

**Durante las 6 semanas, tu equipo podrá:**

- **Refinar su Visión:** Trabajar de cerca con mentores para afinar su propuesta de valor, identificar su mercado objetivo y definir claramente qué hace único a su proyecto.
- **Encontrar Financiamiento:** Recibir orientación experta para navegar el panorama de inversiones y subvenciones (grants), identificando las mejores oportunidades para impulsar el crecimiento de su proyecto.
- **Dominar su Pitch:** Aprender a construir una presentación (pitch deck) profesional y convincente, y a crear una narrativa que resuene con inversores, socios y futuros usuarios.
- **Acelerar su Desarrollo:** Continuarán desarrollando su solución con objetivos claros y revisiones técnicas, convirtiendo el impulso del hackathon en un progreso tangible.
- **Construir su Red de Contactos:** Conectar con una comunidad de élite de otros ganadores de LATIN HACK y nuestra amplia red de mentores, fomentando colaboraciones que perduren mucho después de que termine el programa.

**Tu Compromiso:**
La participación en este programa es una parte fundamental del premio para los ganadores de las categorías principales. El compromiso de tu equipo con las reuniones semanales y el progreso continuo en su proyecto es esencial para el éxito y está directamente vinculado a los hitos de pago del premio final.

### **5.7. Gran Premio: Viaje a Miami para ver a Messi**

Un ganador de Latinoamérica recibirá un viaje a Miami. Una persona del equipo de NERDCONF documentará toda la experiencia.

- **Incluye:** Pasaje aéreo de ida y vuelta (hasta $1,200), alojamiento (hasta $300), traslados y una entrada de Admisión General para el partido del Inter Miami el sábado 11 de octubre de 2025. El valor total del premio está limitado a $1,600.
- **Condiciones:**
    - El ganador debe ser residente de Latinoamérica y haber postulado su proyecto antes de la fecha límite "early bird" del 4 de octubre a las 23:59.
    - El ganador debe tener un pasaporte válido y visa de EE. UU. vigente. Es obligatorio contar con un seguro de viaje, no cubierto por la organización.
    - Si los costos del viaje exceden los $1,600, el ganador es responsable de cubrir la diferencia.
    - El ganador debe aceptar el uso de su imagen para fines promocionales.

---

### **6. Evaluación y Jurado**

- **Jueces:** El panel consistirá en 5 jueces. Todas las decisiones son finales e inapelables.
- **Criterios de Evaluación:** Los proyectos serán juzgados en base a una combinación de lo siguiente:
    - **Innovación e Impacto:** ¿Qué tan original y significativa es la solución?
    - **Ejecución y Viabilidad:** ¿Qué tan bien está construido o planeado el proyecto? (Aplica a la categoría específica).
    - **Validación del Problema:** ¿Qué tan bien entiende y demuestra el equipo el problema? (Especialmente para la categoría de Ideas).
    - **Experiencia de Usuario:** ¿Qué tan intuitivo y pulido es el producto final? (Especialmente para la categoría de Producto).
    - **Claridad de la Presentación:** ¿Qué tan efectivamente comunicó el equipo su proyecto?
    - **Despliegue en Polkadot:**

---

### **7. Requisitos Técnicos (Para Prototipo y Producto)**

- **Red:** Todos los smart contracts deben ser desplegados en la **testnet Paseo de Polkadot**.
- **Lenguaje:** Recomendamos desarrollar los smart contracts en **Solidity**.
- **Integración:** El smart contract debe estar completamente integrado en el flujo de trabajo principal de su aplicación.
- **Transparencia:** Todos los proyectos deben incluir la página **/test** obligatoria para demostrar la funcionalidad principal on-chain.