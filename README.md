# Employee Management Dashboard

## Project Overview

This is a Next.js-based Employee Management Dashboard that allows users to manage employee records with features including authentication, CRUD operations, search, filtering, and printing capabilities.

## Features

- User authentication with login/logout
- Dashboard displaying total employee count
- Employee list with detailed information
- Add, edit, and delete employees
- Search employees by name
- Filter by gender and active/inactive status
- Print employee list
- Image upload with preview for employee profiles
- Responsive UI with modern design

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Data Persistence:** Local Storage
- **Build Tool:** Turbopack
- **Code Formatting:** Prettier
- **Linting:** ESLint

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.0 or higher (Download from [nodejs.org](https://nodejs.org/))
- **npm**: Usually comes with Node.js (or use yarn/pnpm if preferred)
- **Git**: For cloning the repository

You can check your versions by running:

```bash
node --version
npm --version
```

### Local Development Setup

Follow these steps to set up the project locally:

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-management-dashboard
```

#### 2. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

This will install all the dependencies listed in `package.json`, including:

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- ESLint and Prettier
- Development dependencies

#### 3. Environment Setup

No additional environment configuration is required for this project. All settings are handled through the default Next.js configuration.

#### 4. Start Development Server

Run the development server:

```bash
npm run dev
```

The application will start on `http://localhost:3000` by default. The development server includes:

- Hot reloading for instant updates
- TypeScript compilation
- Automatic browser refresh

#### 5. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the login page of the Employee Management Dashboard.

### Available Scripts

The following npm scripts are available:

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (after build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run format` - Format code using Prettier

### Troubleshooting

#### Common Issues:

1. **Port 3000 already in use:**

   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or run on a different port
   npm run dev -- -p 3001
   ```

2. **Node version issues:**
   - Ensure you're using Node.js 18+
   - Consider using nvm (Node Version Manager) to manage multiple Node versions

3. **Dependencies installation fails:**

   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build fails:**
   ```bash
   # Run linting first
   npm run lint
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

### Building for Production

To build the application for production deployment:

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm start
```

The production build will:

- Optimize and minify the code
- Generate static assets
- Create server-side rendering bundles
- Output to the `.next/` directory

### Development Workflow

#### Code Quality

- **Linting**: `npm run lint` - Check code quality and style
- **Formatting**: `npm run format` - Auto-format code with Prettier
- **Type Checking**: `npx tsc --noEmit` - Check TypeScript types without emitting files

#### Recommended Development Flow:

1. Make changes to the code
2. Run `npm run lint` to check for issues
3. Run `npm run format` to ensure consistent formatting
4. Test your changes in the browser at `http://localhost:3000`

## Usage

1. Navigate to the application
2. Log in with any username and password (mock authentication)
3. View the dashboard with employee statistics
4. Use the search bar and filters to find employees
5. Add new employees using the "Add Employee" button
6. Edit or delete employees using the action buttons
7. Print the employee list using the "Print List" button

## Assumptions and Design Decisions

- Authentication is mock-based for simplicity; any username/password combination works
- Employee data is stored in browser local storage
- Profile images are stored as base64 strings in local storage
- No backend API; all operations are client-side
- Print functionality uses browser's native print dialog
- Form validation is basic client-side validation
- Initial mock data is loaded on first visit

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── EmployeeForm.tsx
│   └── EmployeeTable.tsx
├── types/
│   └── employee.ts
└── utils/
    └── storage.ts
```
