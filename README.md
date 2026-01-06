# Dashboard

A modern React + Vite dashboard application for managing clients, transactions, and business profiles with an intuitive user interface.

## Features

- **Client Management** - View and manage client profiles with contact information and activity tracking
- **Transaction Tracking** - Monitor transactions with detailed history and status updates
- **Dashboard Overview** - Get quick insights with an analytics dashboard
- **Store Profiles** - Manage multiple store locations and their information
- **User Profile** - Personal profile management and settings
- **Scan Entry** - Quick entry system for scanning and recording data
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Dashboard
```

2. Install dependencies
```bash
npm install
```

### Development

Start the development server with hot module reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── clientProfile/     - Client profile related components
│   ├── common/            - Reusable UI components
│   ├── layout/            - Layout components (Header, Sidebar, etc.)
│   └── profile/           - User profile components
├── pages/                 - Page components for routing
├── utils/                 - Utility functions
├── App.jsx                - Main App component
└── main.jsx               - Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is proprietary and confidential.
