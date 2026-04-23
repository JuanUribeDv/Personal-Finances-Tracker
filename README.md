💰 Personal-Finances-Tracker

Una aplicación web intuitiva y poderosa para gestionar las finanzas personales. Controla deudas, deudores, ahorros y proyectos, todo desde una interfaz amigable y sencilla. Ideal para individuos que buscan organizar su economía de manera eficiente, cada módulo fue pensado para cubrir las áreas básicas de una vida financiera como lo son los ahorros o las deudas, el módulo de proyectos se creó con la intención de registrar aquellos posibles "negocios" u oportunidades para generar ingresos. 

✨ Características Principales
📊 Dashboard sencillo: Permite visualizar un calendario donde se pueden modificar fechas importantes.
💳 Gestión de Deudas: Registra deudas con descripciones detalladas.
💳 Gestión de Deudores: Registra deudores con la descripción de cuánto dinero nos deben.
💸 Ahorros: Rastrea metas de ahorro.
📁 Proyectos Financieros: Registra oportunidades de negocios o inversiones.


🛠️ Tecnologías Usadas
Backend: Node.js, Express.js
Frontend: HTML5, CSS3, JavaScript (Vanilla)
Base de Datos: MySQL
Herramientas: Git, VS Code

⚙️ Proceso de instalación y configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- MySQL instalado y configurado
- Git

### Pasos para instalar:

1. Clona el repositorio:
   ```
   git clone https://github.com/JuanUribeDv/Personal-Finances-Tracker.git
   ```
-- 
2. Navega a la carpeta del backend:
   ```
   cd Backend
   ```
-- 
3. Instala las dependencias del backend:
   ```
   npm install
   ```
--
4. Crea un archivo `.env` basado en `.env.example`:
   ```
   cp .env.example .env
   ```
   Edita el archivo `.env` con tus configuraciones de base de datos MySQL, con base en el archivo de .env.example
--
5. Inicia el servidor backend:
   ```
   node server.js
   ```
--
6. Abre el frontend en tu navegador:
   - Navega a la carpeta `Frontend` y abre los archivos HTML directamente en el navegador usando Live Server
