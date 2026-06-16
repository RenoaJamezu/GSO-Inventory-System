# GSO Inventory System

Web-based inventory management application for LGU Sibagat General Services Office, built with React, TypeScript, and Vite.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Supabase (auth + database)
- Zustand (state)
- Zod (validation)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will run at the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Type-check and create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## Project Structure

```text
src/
├── app/                  # App shell, providers, lazy routes
├── layouts/              # AppLayout (sidebar + outlet)
├── features/
│   ├── auth/             # Login, profile, protected routes
│   ├── land/             # PPE land inventory (CRUD)
│   ├── home/
│   ├── dashboard/
│   └── inventory/
└── shared/
    ├── components/ui/    # Reusable UI (Table, Modal, PageHeader, etc.)
    ├── config/           # Nav items, shared config
    └── lib/              # Supabase client
```

## Current Status

- Authentication with Supabase (login, profile setup)
- Protected routes with lazy-loaded pages
- Land PPE inventory module with full CRUD
- Dashboard, Home, and Inventory pages (placeholder UI)

## Roadmap

- Additional PPE modules (buildings, equipment, etc.)
- Role-based access control
- Reporting dashboard with live metrics
- Stock in/out tracking

## License

No license specified yet.
