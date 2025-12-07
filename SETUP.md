# 🚀 Setup Guide - Sierra Leone Business Directory

This guide will walk you through setting up the Business Directory application from scratch, whether you're developing locally or deploying to production.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Database Operations](#database-operations)
7. [Troubleshooting](#troubleshooting)
8. [Production Deployment](#production-deployment)

---

## System Requirements

### Minimum Requirements

- **Node.js**: v20.x or higher ([Download](https://nodejs.org/))
- **Package Manager**: pnpm 9.x or npm 10.x
  - Install pnpm: `npm install -g pnpm`
- **PostgreSQL**: v14 or higher
  - Or use managed service: Neon, Supabase, AWS RDS
- **Git**: For version control
- **RAM**: Minimum 4GB available
- **Disk Space**: Minimum 2GB free

### Recommended Setup

- **Node.js**: v20.13.0 or latest LTS
- **Package Manager**: pnpm (faster, more efficient)
- **Database**: Neon PostgreSQL (free tier available)
- **OS**: macOS, Linux, or Windows (WSL2)

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/Walon-Foundation/business-directory.git
cd business-directory

# Or using SSH (if configured)
git clone git@github.com:Walon-Foundation/business-directory.git
cd business-directory
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

**What gets installed:**
- React 19.2.0 & React DOM
- Next.js 16.0.7 with Turbopack
- Drizzle ORM & PostgreSQL drivers
- Tailwind CSS 4 & UI components
- Development tools (TypeScript, Biome, etc.)

**Verify installation:**
```bash
node --version  # Should be v20.x+
pnpm --version  # Should be 9.x+
npx tsc --version  # Should be 5.x+
```

### Step 3: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section):

```env
DATABASE_URL="postgresql://user:password@host:5432/business_directory"
NODE_ENV="development"
```

### Step 4: Create/Connect Database

#### Option A: Using Neon (Recommended for Development)

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (free tier includes 3 projects)
3. Create a new project named `business-directory`
4. Copy the connection string from the dashboard
5. Paste it into your `.env` file as `DATABASE_URL`

**Format:** `postgresql://user:password@host.neon.tech/database?sslmode=require`

#### Option B: Using Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your PostgreSQL connection string from Settings → Database
4. Add to `.env` file

#### Option C: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download and install from postgresql.org
```

Create a database:
```bash
createdb business_directory

# Set connection string in .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/business_directory"
```

### Step 5: Initialize Database Schema

```bash
# Generate Drizzle migrations
pnpm db:generate

# Push the schema to your database
pnpm db:push
```

**What happens:**
- Creates all necessary tables (business, complaints, etc.)
- Sets up indexes for optimal query performance
- Initializes database constraints and relationships

**Verify schema creation:**
```bash
# Option 1: Using Drizzle Studio (UI)
pnpm db:studio

# Option 2: Using psql (command line)
psql -d business_directory -c "\dt"
```

### Step 6: Seed Database (Optional but Recommended)

```bash
# Populate with 50+ sample businesses
pnpm db:seed
```

This creates realistic sample data including:
- Businesses from various industries
- Sample directors and financial data
- Compliance records
- Different verification statuses

**Verify seed data:**
```bash
# Check row count
psql -d business_directory -c "SELECT COUNT(*) FROM business;"
```

---

## Database Configuration

### Connection String Formats

#### PostgreSQL (Standard)
```
postgresql://username:password@localhost:5432/database_name
```

#### Neon (Cloud-Hosted)
```
postgresql://user:password@host.neon.tech/database?sslmode=require
```

#### Supabase (Cloud-Hosted)
```
postgresql://postgres:password@host.supabase.co:5432/postgres
```

#### Azure PostgreSQL
```
postgresql://user@servername:password@servername.postgres.database.azure.com:5432/database
```

### Connection Pool Configuration

For production, configure connection pooling:

**Using Neon with Connection Pooling:**
```
postgresql://user:password@host-pooler.neon.tech/database?sslmode=require
```

**Using PgBouncer (Self-Hosted):**
```
postgresql://user:password@pgbouncer-host:6432/database
```

### SSL/TLS Configuration

For secure connections:

```env
# Neon (includes SSL by default)
DATABASE_URL="postgresql://user:password@host.neon.tech/db?sslmode=require"

# Azure
DATABASE_URL="postgresql://user@server:password@server.postgres.database.azure.com/db?sslmode=require"
```

---

## Environment Variables

### Development Environment

```bash
# .env (Development)
DATABASE_URL="postgresql://user:password@localhost:5432/business_directory"
NODE_ENV="development"
```

### Production Environment

```bash
# .env.production (Production)
DATABASE_URL="postgresql://user:password@host:5432/business_directory?sslmode=require"
NODE_ENV="production"
```

### Optional Configuration

For future features, reserve these variables:

```bash
# Email/Notifications (Future)
# SMTP_HOST="smtp.gmail.com"
# SMTP_PORT="587"
# SMTP_USER="your-email@gmail.com"
# SMTP_PASSWORD="your-app-password"

# API Key Management (Future)
# API_ENCRYPTION_KEY="your-secret-key"

# Rate Limiting (Future)
# RATE_LIMIT_REQUESTS=100
# RATE_LIMIT_WINDOW_MS=60000

# Analytics (Future)
# ANALYTICS_KEY="your-analytics-key"
```

### Validation

The application validates all required environment variables on startup. If a required variable is missing:

```
Error: Invalid environment variable DATABASE_URL
```

---

## Running the Application

### Development Mode

```bash
# Start development server with hot reload
pnpm dev

# The app will be available at:
# - Local: http://localhost:3000
# - Network: http://192.168.x.x:3000
```

**Features in Development Mode:**
- Hot Module Replacement (HMR) for instant reload
- Detailed error messages
- Source maps for debugging
- Turbopack compiler (faster than webpack)

### Build & Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start

# Or use Node directly
node .next/standalone/server.js
```

**Build Output:**
```
✓ Created Next.js standalone build
✓ Optimized CSS and JavaScript
✓ Generated static pages
✓ Created API routes bundle
```

### Preview Production Build

```bash
# Build and start production server locally
pnpm build
pnpm start

# Navigate to http://localhost:3000
```

---

## Database Operations

### Drizzle ORM Commands

```bash
# Generate migrations from schema changes
pnpm db:generate

# Push schema directly to database (development only)
pnpm db:push

# Run migrations from migration files
pnpm db:migrate

# Open Drizzle Studio (visual database editor)
pnpm db:studio

# Seed database with sample data
pnpm db:seed
```

### Schema Changes Workflow

**When you modify `db/schema.ts`:**

```bash
# 1. Generate migration file
pnpm db:generate

# You'll be prompted:
# "What would you like to call this migration?"
# Enter a descriptive name (e.g., "add_new_field")

# 2. Review generated migration in db/drizzle/migrations/

# 3. Push to database
pnpm db:push

# Or run migration explicitly
pnpm db:migrate
```

### Manual Database Operations

```bash
# Connect to database directly
psql $DATABASE_URL

# Useful queries:
SELECT COUNT(*) FROM business;
SELECT * FROM business LIMIT 5;
SELECT DISTINCT industry FROM business;
SELECT COUNT(*) FROM complaint WHERE status = 'pending';

# Exit psql
\q
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. "Cannot find module" Errors

```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

#### 2. Database Connection Issues

```bash
# Test connection string
psql $DATABASE_URL -c "\dt"

# Check database URL format
echo $DATABASE_URL

# For Neon: Ensure URL ends with ?sslmode=require
```

#### 3. Port 3000 Already in Use

```bash
# Find and kill process using port 3000
# macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or specify different port
PORT=3001 pnpm dev
```

#### 4. TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf .next

# Rebuild
pnpm dev
```

#### 5. Database Migrations Failed

```bash
# Check migration status
pnpm db:studio

# View recent migrations
ls -la db/drizzle/migrations/

# Reset database (development only)
# WARNING: This deletes all data!
# 1. Drop database: dropdb business_directory
# 2. Create new: createdb business_directory
# 3. Re-push schema: pnpm db:push
```

#### 6. Hot Reload Not Working

```bash
# Restart development server
# Kill current process (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Start again
pnpm dev
```

---

## Production Deployment

### Vercel (Recommended)

**Step 1: Prepare Repository**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Select project root: `./`
5. Add environment variables:
   - `DATABASE_URL`: Your production database URL
   - `NODE_ENV`: `production`
6. Deploy!

**Vercel Settings:**
- **Node Version**: 20.x
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set DATABASE_URL "your-production-url"
railway variables set NODE_ENV "production"

# Deploy
railway up
```

### Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `pnpm build`
5. Set start command: `pnpm start`
6. Add environment variables
7. Deploy!

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build
RUN pnpm build

# Start
EXPOSE 3000
CMD ["pnpm", "start"]
```

**Build and run:**
```bash
docker build -t business-directory .
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NODE_ENV="production" \
  business-directory
```

### Environment Variables for Production

```bash
# Required
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
NODE_ENV="production"

# Optional (for future features)
# NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database is set up and accessible
- [ ] Schema migrations are applied
- [ ] Test build succeeds: `pnpm build`
- [ ] Start command works: `pnpm start`
- [ ] No hardcoded secrets in code
- [ ] `.env` is in `.gitignore`
- [ ] Database backups configured
- [ ] Monitoring/alerts set up (optional)

### Post-Deployment

```bash
# Verify deployment
curl https://yourdomain.com

# Check API
curl https://yourdomain.com/api/explore

# View logs (platform-specific)
# Vercel: Dashboard → Logs
# Railway: railway logs
# Render: Dashboard → Logs
```

---

## Development Tips

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint --fix

# Format code
pnpm format

# Check TypeScript
pnpm tsc --noEmit
```

### Database Inspection

```bash
# Open Drizzle Studio (visual editor)
pnpm db:studio

# Or use command line
psql $DATABASE_URL

# Common queries:
# List tables: \dt
# Describe table: \d business
# Query count: SELECT COUNT(*) FROM business;
```

### Performance Optimization

```bash
# Analyze bundle size
pnpm build
npm install -g @next/bundle-analyzer
ANALYZE=true pnpm build

# Check database indexes
psql $DATABASE_URL -c "\d business"
```

---

## Next Steps

1. **Set up your development environment** following the steps above
2. **Explore the codebase**:
   - Check `README.md` for feature overview
   - Review `db/schema.ts` for data structure
   - Examine `app/api/explore/route.ts` for API implementation
3. **Read `SECURITY.md`** for security best practices
4. **Start developing**:
   - Create a feature branch: `git checkout -b feature/your-feature`
   - Make changes
   - Test locally
   - Submit pull request

---

## Support & Resources

- **Documentation**: See `README.md` for API reference
- **Issues**: Report bugs on [GitHub Issues](https://github.com/Walon-Foundation/business-directory/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/Walon-Foundation/business-directory/discussions)

---

**Happy coding! 🚀**

Built with ❤️ for Sierra Leone
