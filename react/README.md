# Arafah - React Landing Page

A modern landing page built with React, Vite, TanStack Router, and Tailwind CSS.

## Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/           # Page components
│   ├── Root.tsx    # Root layout component
│   └── Home.tsx    # Landing page
├── router.tsx      # TanStack Router configuration
├── App.tsx         # Main App component
├── App.css         # App styles
├── index.css       # Global Tailwind styles
└── main.tsx        # Application entry point
```

## Features

- ⚡ Lightning-fast builds with Vite
- 🧭 Type-safe routing with TanStack Router
- 🎨 Beautiful, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- 🔥 Hot Module Replacement (HMR) for fast development

## Customization

### Tailwind Configuration

Edit `tailwind.config.ts` to customize your Tailwind theme.

### Pages

Add new pages in `src/pages/` and configure routes in `src/router.tsx`.

### Styling

Global styles are in `src/index.css`. Component-specific styles use Tailwind classes directly in JSX.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

MIT
