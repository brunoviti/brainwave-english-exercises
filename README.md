# Welcome to your Lovable project

## Project info

/
├── public/                  # Archivos públicos estáticos
│   ├── favicon.ico         # Favicon del sitio
│   ├── og-image.png        # Imagen para compartir en redes sociales
│   └── placeholder.svg     # Imagen placeholder
│
├── src/                     # Código fuente principal
│   ├── components/         # Componentes React reutilizables
│   │   ├── ui/             # Componentes de interfaz de usuario (shadcn/ui)
│   │   ├── AddVideoForm.tsx    # Formulario para agregar videos
│   │   ├── ExerciseSection.tsx # Sección genérica para ejercicios
│   │   ├── Header.tsx          # Encabezado del sitio
│   │   ├── PodcastSection.tsx  # Sección específica para podcasts
│   │   └── VideoCard.tsx       # Tarjeta para mostrar videos/podcasts
│   │
│   ├── context/            # Contextos de React
│   │   └── VideoContext.tsx    # Contexto para gestionar videos/podcasts
│   │
│   ├── hooks/              # Hooks personalizados
│   │   ├── use-mobile.tsx  # Hook para detectar dispositivos móviles
│   │   └── use-toast.ts    # Hook para mostrar notificaciones
│   │
│   ├── lib/                # Utilidades y funciones auxiliares
│   │   └── utils.ts        # Funciones utilitarias (formateo de URLs, etc.)
│   │
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Index.tsx       # Página principal
│   │   └── NotFound.tsx    # Página 404
│   │
│   ├── types/              # Definiciones de tipos TypeScript
│   │   └── index.ts        # Tipos para videos, ejercicios, etc.
│   │
│   ├── App.tsx             # Componente principal de la aplicación
│   ├── index.css           # Estilos CSS globales
│   └── main.tsx            # Punto de entrada de la aplicación
│
├── index.html              # Archivo HTML principal
├── tailwind.config.ts      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── vite.config.ts          # Configuración de Vite
└── package.json            # Dependencias y scripts del proyecto


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```


**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3951e637-fba3-4b4f-b7e1-9186cfb90ad2) and click on Share -> Publish.

