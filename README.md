# 🎵 Your Vinyl - Frontend

> Una aplicación web moderna para coleccionistas de vinilos que permite gestionar, explorar y comentar sobre colecciones de discos de vinilo.


---

## 📖 Descripción del Proyecto

**Your Vinyl** es una plataforma interactiva diseñada para amantes de la música en vinilo. Los usuarios pueden crear sus propias colecciones, filtrar por género musical, y compartir opiniones sobre sus álbumes favoritos en una interfaz con estética vintage/retro.

### ✨ Características Principales

- 🎵 **Catálogo completo** - Explora una amplia colección de vinilos con filtros por género
- 🔐 **Autenticación segura** - Sistema completo de registro e inicio de sesión
- ➕ **Gestión de colección** - Crea, edita y elimina vinilos de tu colección personal
- 💬 **Sistema de comentarios** - Comparte opiniones y lee reviews de otros coleccionistas
- 📱 **Diseño responsive** - Experiencia optimizada en todos los dispositivos
- 🎨 **UI moderna** - Interfaz elegante construida con Tailwind CSS

---

## 🚀 Inicio Rápido

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- npm (incluido con Node.js)
- El backend de la aplicación debe estar corriendo

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd our-cool-project-frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_API_URL=http://localhost:5005
   ```

   > ⚠️ **Nota:** Asegúrate de que la URL apunte a tu servidor backend.

4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

5. **Compilar para producción** (opcional)

   ```bash
   npm run build
   ```

   Los archivos optimizados se generarán en la carpeta `dist/`

---

## 🌐 Demo en Vivo

Visita la aplicación desplegada en Vercel:

### 🔗 [https://your-vinil.vercel.app/](https://your-vinil.vercel.app/)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.x | Librería UI principal |
| **Vite** | Latest | Build tool y dev server |
| **React Router DOM** | 6.x | Enrutamiento |
| **Axios** | Latest | Cliente HTTP |
| **Tailwind CSS** | 3.x | Framework de estilos |
| **Context API** | - | Gestión de estado global |

---

## 📋 Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)
- El **backend** de la aplicación debe estar corriendo (ver repositorio `our-cool-project-backend`)

---

## 📁 Estructura del Proyecto

```
our-cool-project-frontend/
│
├── public/                 # Archivos estáticos
│
├── src/
│   ├── api/               # Configuración de Axios
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Context API (AuthContext)
│   ├── pages/             # Páginas principales
│   ├── App.jsx            # Componente raíz
│   └── main.jsx           # Punto de entrada
│
├── .env                   # Variables de entorno (crear manualmente)
├── package.json           # Dependencias del proyecto
├── tailwind.config.js     # Configuración de Tailwind
├── vite.config.js         # Configuración de Vite
└── vercel.json            # Configuración de despliegue
```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la versión compilada |
| `npm run lint` | Ejecuta ESLint |


---

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en contactar al equipo de desarrollo.

---

<div align="center">

**¡Disfruta coleccionando tus vinilos! 🎶**

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub

</div>