# Yernstudios

Yernstudios is a React + TypeScript web project built with Vite, Tailwind CSS, shadcn/ui, and Supabase.

## Development

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Run linting with:

```bash
npm run lint
```

## Project structure

- `src/` — application source
- `src/integrations/supabase/` — Supabase client and generated database types
- `supabase/` — database configuration, migrations, and edge functions

## Configuration

Supabase configuration is supplied through the project's existing client integration. Keep private credentials and service-role keys out of source control.

## Deployment

The repository contains a Vite production build and can be deployed to any compatible static hosting provider. No deployment claim is made here for the current project.

## License

No license is currently declared in this repository.
