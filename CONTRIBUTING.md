# Contributing to Sierra Leone Business Directory (SLBizRegistry)

Thank you for your interest in contributing to the Sierra Leone Business Directory! We welcome contributions from the community to help improve business verification and transparency in Sierra Leone.

This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v9.x or higher (we use pnpm for dependency management)
- **PostgreSQL**: A running PostgreSQL instance (local or cloud like Neon/Supabase)

### Installation

1. **Fork and Clone**
   Fork the repository to your GitHub account and clone it locally:
   ```bash
   git clone https://github.com/Walon-Foundation/business-directory.git
   cd business-directory
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/business_directory"
   ```

4. **Database Setup**
   Initialize the database schema and seed sample data:
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- **`app/`**: Next.js App Router pages and API routes.
  - **`api/`**: Backend API endpoints.
  - **`explore/`**: Main business browsing pages.
- **`components/`**: React components.
  - **`ui/`**: Reusable UI components (shadcn/ui).
- **`db/`**: Database configuration and Drizzle ORM schemas.
- **`lib/`**: Utility functions, environment validation, and shared logic.
- **`public/`**: Static assets.

## 💻 Development Guidelines

### Tech Stack & Tools

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui + Radix UI
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod
- **Linting/Formatting**: Biome

### Coding Standards

1. **TypeScript**:
   - Use strict type safety. Avoid `any` whenever possible.
   - Define interfaces/types for all props and API responses.

2. **Components**:
   - Use functional components with hooks.
   - Keep components small and focused.
   - Place reusable components in `components/ui` or `components/shared`.
   - Use `lucide-react` for icons.

3. **Styling**:
   - Use Tailwind CSS utility classes.
   - Avoid inline styles.
   - Use `cn()` utility for conditional class merging.
   - Follow the existing design system (colors, spacing).

4. **Database**:
   - Define schemas in `db/schema.ts`.
   - Use Drizzle ORM for all database queries.
   - **Never** commit `.env` files.

5. **Code Quality**:
   - We use **Biome** for linting and formatting.
   - Run `pnpm format` before committing to ensure code style consistency.
   - Run `pnpm lint` to catch potential errors.

### Database Changes

If you modify the database schema (`db/schema.ts`):

1. Generate migrations (if using migrations workflow) or push changes:
   ```bash
   pnpm db:push
   ```
2. If adding new tables/fields, consider updating `db/seed.ts` to include sample data.

### WhatsApp Integration

The project integrates with the **Wasender API** to provide business verification via WhatsApp.
- The webhook handler is located at `app/api/webhook/route.ts`.
- If you are working on WhatsApp features, refer to `SETUP.md` 
- You can test the webhook locally using tools like `ngrok` to expose your local server.

## 🔀 Workflow

1. **Create a Branch**
   Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Changes**
   Implement your changes, adhering to the coding standards.

3. **Verify Changes**
   - Ensure the app builds: `pnpm build`
   - Check for linting errors: `pnpm lint`
   - Format code: `pnpm format`

4. **Commit**
   Write clear, descriptive commit messages. We recommend following [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add whatsapp integration`
   - `fix: resolve complaint form validation error`
   - `docs: update readme`

5. **Push and Pull Request**
   Push your branch to your fork and open a Pull Request (PR) against the `main` branch of the original repository.
   - Provide a clear description of your changes.
   - Link to any relevant issues.
   - Attach screenshots for UI changes.

## 🤝 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. Be respectful and constructive.

## ❓ Getting Help

If you have questions or need help, please open an issue or contact the maintainers.

Happy Coding! 🚀
