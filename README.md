# YeRN Studios

> **Next-gen video editing and digital development studio.**

YeRN Studios is a full-stack client-service web application for presenting digital services, collecting project enquiries, managing customer accounts, and tracking orders and projects.

**Live application:** https://yernstudio.netlify.app/

## Overview

YeRN Studios combines a public-facing service experience with authenticated customer and administrative workflows.

Core services:
- Video Editing
- Web Development
- App Development
- Photography / videography shoots

## Features

### Public experience
- Responsive cyber/cinematic landing page
- Service and package catalogue
- Video editing, web development and app development packages
- Shoot services
- Contact/project enquiry form
- Login and registration entry points

### Customer experience
- Supabase authentication
- Customer profiles and membership level
- Package ordering
- Shoot ordering
- Project tracking
- Order history and status
- Project progress
- Account logout

### Admin experience
- Protected admin dashboard
- Order management
- Shoot-order management
- Contact-message management
- Project overview
- Order, message and project statistics
- Order status updates

## Services

### Video Editing
- Short Form Content — up to 1 minute
- Medium Form Content — up to 10 minutes
- Long Form Content — over 10 minutes

Package capabilities represented in the application include editing, color correction, music synchronization, motion graphics, audio enhancement, animation and sound design.

### Web Development
- Landing Page
- Small Business Website
- E-commerce Website

Package descriptions include responsive design, modern UI/UX, contact forms, SEO, CMS integration, analytics, e-commerce functionality and admin capabilities.

### App Development
- Simple App
- Feature-Rich App
- Complex App

Package descriptions include authentication, cloud sync, notifications, analytics, social integrations, custom backends, AI integrations, real-time features and third-party APIs.

### Shoots
- Outdoor Shoot — Tadepalligudem, Tanuku and Bhimavaram
- Event Covering — Tadepalligudem, Tanuku and Bhimavaram
- Shortfilm Cinematography — Tadepalligudem, Tanuku and Bhimavaram

## Contact Workflow

The contact form collects name, email, requested service and project message.

Submissions are stored in the Supabase `contact_messages` table. The application also invokes the `send-contact-email` Supabase Edge Function for email delivery.

## Order Workflow

Authenticated customers can select a package and provide their contact number and project requirements. The application creates an order record in Supabase and redirects the customer to the dashboard.

Orders contain package, customer, amount, currency, status, contact/details and timestamps.

> **Payment note:** The repository contains an `orders` field named `stripe_session_id`, but the current package-selection flow creates an order record directly. This README therefore does not claim a verified live Stripe checkout flow.

## Project Management

Supabase projects contain fields for title, description, project type, status, progress, budget, due date, client name, owner and timestamps.

Customers can view their own projects through the dashboard, while administrators can review project records.

## Authentication & Authorization

Supabase provides authentication and the database authorization layer.

Database roles:
- `admin`
- `customer`

Primary tables:
- `profiles`
- `user_roles`
- `orders`
- `projects`
- `contact_messages`

Row Level Security policies are included for user-owned data and administrative access.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| UI | shadcn/ui, Radix UI |
| Routing | React Router |
| Data / state | TanStack React Query |
| Backend platform | Supabase |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| Serverless | Supabase Edge Functions |
| Forms | React Hook Form, Zod |
| Icons | Lucide React |
| Notifications | Sonner / custom toast |

## Architecture

~~~text
YeRN Studios
├── React + TypeScript frontend
│   ├── Public landing experience
│   ├── Services / packages
│   ├── Contact
│   ├── Authentication
│   ├── Customer dashboard
│   └── Admin dashboard
├── Supabase
│   ├── Auth
│   ├── PostgreSQL
│   ├── Row Level Security
│   └── Edge Functions
└── Vite production build
~~~

## Repository Structure

~~~text
src/
├── assets/
├── components/
│   ├── auth/
│   ├── contact/
│   ├── dashboard/
│   ├── packages/
│   └── ui/
├── integrations/supabase/
├── hooks/
├── lib/
├── pages/
├── App.tsx
└── main.tsx
supabase/
├── functions/send-contact-email/
├── migrations/
└── config.toml
~~~

## Local Development

Requirements: Node.js 18+ and npm.

~~~bash
npm install
npm run dev
~~~

Production build:

~~~bash
npm run build
~~~

Lint:

~~~bash
npm run lint
~~~

Preview:

~~~bash
npm run preview
~~~

## Environment & Security

Keep Supabase service-role keys and other private credentials out of source control. Use the deployment environment for secrets and public client configuration.

Database migrations include role helpers, profile creation on signup, timestamp triggers and Row Level Security policies.

## Deployment

The application is a Vite React project and can be deployed to compatible static hosting. The currently referenced live application is:

https://yernstudio.netlify.app/

## Project Status

YeRN Studios is an actively developed full-stack studio/service application. This README describes functionality represented in the repository and avoids claiming unverified payment or production capabilities.

## License

No open-source license is currently declared.

---

**YeRN Studios** · Video Editing · Web Development · App Development