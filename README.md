# PesaFlow Frontend

A modern financial transaction platform built with React and Vite, designed to facilitate secure money transfers, wallet management, and financial analytics.

## Overview

PesaFlow is a comprehensive frontend application that enables users to send money, manage beneficiaries, track transactions, and handle their digital wallets. The application includes both user and admin interfaces for complete financial management.

## Technology Stack

- React 18+ - Modern user interface framework
- Vite - Fast build tool and development server with Hot Module Replacement
- TailwindCSS - Utility-first CSS framework for responsive design
- React Router - Client-side routing and navigation
- Redux Toolkit - State management (setup ready)

## Project Structure

```
src/
├── Components/       # Reusable UI components
├── pages/           # Page components organized by feature
│   ├── Auth/        # Authentication pages
│   ├── Dashboards/  # Admin and user dashboards
│   ├── Wallet/      # Wallet management
│   ├── Transactions/# Transaction history and details
│   ├── Transfer/    # Money transfer flow
│   ├── Beneficiaries/# Beneficiary management
│   └── Landing/     # Landing and profile pages
├── layouts/         # Layout wrappers
├── redux/          # State management (to be implemented)
├── services/       # API service layer (to be implemented)
└── data/           # Mock data and constants
```

## Features

### User Features
- User authentication (login, register, password recovery)
- Dashboard with account overview
- Wallet management with fund additions
- Transaction history and filtering
- Beneficiary management
- Money transfer workflow with confirmation
- User profile management

### Admin Features
- Admin dashboard with key metrics
- User management interface
- Analytics and transaction reports
- System monitoring

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

## Team Structure

This project is developed by a team of four developers working on a 5-day sprint:

- Myles: Project leader, landing page, navigation, architecture oversight
- Mason: Authentication flows, dashboards, analytics
- Naomi: Wallet management, beneficiaries, admin pages
- Nasra: Transactions, transfer flows, transaction management

## Development Guidelines

All page components include detailed comment instructions with:
- Component requirements and wireframes
- Form validation specifications
- State management patterns
- API integration points
- Mock data structures

Refer to `TEAM_INSTRUCTIONS.md` for comprehensive development guidelines and task breakdown.

## Architecture

The application follows a component-based architecture with:
- Protected routes for authenticated features
- Lazy loading for optimized performance
- Shared component library for consistency
- Redux state management (ready for setup)
- RESTful API integration pattern

## Next Steps

1. Set up Redux store and slices
2. Implement API service layer
3. Build reusable UI components
4. Implement page components following team assignments
5. Integration testing and deployment

## Documentation

- TEAM_INSTRUCTIONS.md - Complete sprint plan and team assignments
- COMPONENT_TEMPLATE.md - Component building patterns and guidelines
- WEEK1_BUILD_CHECKLIST.md - Daily milestones and checklist
