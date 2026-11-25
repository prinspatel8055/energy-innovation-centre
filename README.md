# Energy Innovation Centre (EIC) — Ganpat University

A modern, full-stack Content Management System (CMS) and public website built for the **Energy Innovation Centre (EIC)** at **Ganpat University (GUNI)** — *"Energy is Next Generation Of Life"*.

This application provides a dynamic public website with interactive animations, responsive layouts, customizable themes, and a secure, role-based Admin CMS portal to manage all content, pages, media, leadership profiles, and global navigation settings.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL (Database: `eic`) |
| **ORM** | Prisma v6 |
| **Authentication** | JWT via `jose` library (HttpOnly cookies) + bcryptjs |
| **Notifications** | Sonner |
| **Icons** | Lucide React |
| **Media Storage** | Local filesystem (`/public/uploads/`) |

---

## Key Highlights

- **100% EIC Content**: All data migrated directly from EIC WordPress & database dump (`eicgunia_eic.sql`) — clean energy, solar, wind, biomass, biogas, smart microgrids, electric vehicles, and battery storage.
- **Identical Look & Feel to HTML Site**: Built using the exact same code architecture, layout modules, navbar, footer, dynamic themes, and administrative backend as the reference `public_html-22` application.
- **Zero Obsolete Branding**: Completely sanitized of all prior ATCNN, AM CoE, and Gunish references; branded throughout as **EIC** / **Energy Innovation Centre**.
- **Dynamic CMS Pages**: Custom block-based modular architecture allowing admins to edit, reorder, create, and publish pages on the fly.
- **Role-Based Admin Portal**: Secure login (`/admin/login`), page management, media library, faculty/people directory, global header/footer editor, appearance/themes, and user management.
- **Real-Time Media Server**: `server.js` dynamically serves uploaded images directly from disk, bypassing Next.js static asset caching.

---

## Project Structure

```
├── src/
│   ├── app/            # Next.js App Router (Public website & Admin dashboard)
│   ├── components/     # UI components, CMS block editors, and module renderers
│   ├── lib/            # Prisma client, auth utilities, and database helpers
│   ├── styles/         # Global styles and customizable theme system
│   └── types/          # TypeScript type definitions
├── prisma/
│   ├── schema.prisma   # PostgreSQL Prisma schema
│   └── seed-data.json  # Complete snapshot of 22 EIC pages & global settings
├── public/
│   └── uploads/        # EIC media library (original images & logos)
├── scripts/            # Database seeding and backup scripts
├── server.js           # Production server with live media streaming
└── .env.example        # Environment variables template
```

---

## Getting Started

### 1. Database Setup
Ensure PostgreSQL is running locally on port 5432:
```bash
npx prisma db push --accept-data-loss
npm run seed
```

### 2. Development Server
```bash
npm run dev
# Running on http://localhost:5000
```

### 3. Production Server
```bash
npm run build
npm run server
# Or specify custom port:
PORT=5001 node server.js
```

---

## Admin CMS Credentials

- **Login URL**: `/admin/login` (e.g. `http://localhost:5001/admin/login`)
- **Username**: `admin`
- **Password**: `admin@2026`
