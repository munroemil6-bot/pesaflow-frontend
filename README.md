# PesaFlow Frontend

PesaFlow is a React and Vite money-transfer application for managing wallets, beneficiaries, transfers, transaction history, and platform analytics. It includes separate protected user and administrator workspaces.

## Features

### User workspace

- Register, log in, recover a password, and manage a profile
- View wallet balance and add funds
- Send money using a phone number or saved beneficiary
- Review and filter personal transactions
- Add, edit, and remove beneficiaries
- Confirm transfers and view transfer status

### Admin workspace

- Dashboard metrics for users, transactions, volume, and revenue
- User list with balances, transaction counts, account status, and account details
- Activate or deactivate user accounts
- Platform transaction search and status summaries
- Analytics for transaction volume, revenue, user growth, transaction types, and active users

## Demo credentials

### Administrator

- Email: `admin@gmail.com`
- Password: `admin1234`

### Seeded user accounts

| User  | Email             | Password    |
| ----- | ----------------- | ----------- |
| Mason | `mason@gmail.com` | `mason1234` |
| Myles | `myles@gmail.com` | `myles1234` |
| Nasra | `nasra@gmail.com` | `nasra1234` |
| Naomi | `naomi@gmail.com` | `naomi1234` |

The application also seeds additional support accounts for admin analytics and user-management testing. Newly registered users start with a zero balance and no transactions or beneficiaries.

## Technology stack

- React 19
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit and React Redux
- Oxlint

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

The development server normally runs at `http://localhost:5173/`. If that port is busy, Vite selects another available port.

To test the frontend against the deployed backend locally, create a `.env.local` file with:

```bash
VITE_API_URL=/api
```

The Vite development proxy forwards `/api` to `https://pesaflow-backend-wdbv.onrender.com`, avoiding browser CORS issues. Vercel uses the API proxy function in `api/[...path].js`, so production requests use the deployed backend too. Then start the frontend with `npm run dev`. The `.env.local` file is ignored by git.

### Deploy to Vercel

Import this repository into Vercel with the `Vite` framework preset. Use `npm run build` as the build command and `dist` as the output directory. No API environment variable is required because the Vercel function proxies `/api` to the deployed backend. If `VITE_API_URL` already exists in Vercel, set it to `/api` or remove it, then redeploy.

### Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run Oxlint
```

## Data and persistence

This frontend currently uses a localStorage-backed mock database. Users, wallets, beneficiaries, transactions, sessions, account statuses, and seeded analytics data are stored in the browser under the PesaFlow local database key.

This is suitable for demonstration and frontend testing only. It is not production authentication: passwords are stored in browser data and each browser has its own separate dataset. A production release should replace the mock data layer with a secure backend, database, password hashing, and server-side authorization.

## Deployment

The project is configured for Vercel with `vercel.json`, which rewrites client-side routes to `index.html`. This allows direct navigation and browser refreshes on routes such as `/admin/users` and `/admin/analytics`.

Vercel settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Root directory: repository root

## Project structure

- `src/pages/Auth/` - Login, registration, and password recovery
- `src/pages/Dashboards/` - User dashboard, admin dashboard, users, transactions, and analytics
- `src/pages/Transfer/` - Send, confirm, and transfer status flows
- `src/pages/Wallet/` - Wallet and add-funds screens
- `src/pages/Benefeciaries/` - Beneficiary management
- `src/redux/` - Store and application slices
- `src/data/mockData.js` - Local demo database and seeded records
- `src/routes/` - Route definitions
