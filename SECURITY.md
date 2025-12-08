# 🔐 Security Guide - Sierra Leone Business Directory

This document outlines security practices, threat mitigation strategies, and compliance guidelines for the Sierra Leone Business Directory application.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Data Protection](#data-protection)
3. [Authentication & Authorization](#authentication--authorization)
4. [Input Validation](#input-validation)
5. [API Security](#api-security)
6. [Database Security](#database-security)
7. [Deployment Security](#deployment-security)
8. [Compliance & Privacy](#compliance--privacy)
9. [Incident Response](#incident-response)
10. [Security Checklist](#security-checklist)

---

## Security Overview

### Current Security Measures

The application implements the following security best practices:

✅ **Input Validation** - Zod schema validation on all API endpoints  
✅ **SQL Injection Prevention** - Parameterized queries via Drizzle ORM  
✅ **XSS Protection** - React/Next.js built-in XSS protection  
✅ **Environment Variables** - Sensitive data in `.env` (never committed)  
✅ **Type Safety** - TypeScript for compile-time type checking  
✅ **Error Handling** - Secure error messages (no stack traces in production)  

### Security Goals

1. **Confidentiality** - Protect sensitive business data
2. **Integrity** - Ensure data accuracy and prevent tampering
3. **Availability** - Maintain service reliability
4. **Compliance** - Meet regulatory requirements

### Threat Model

**Potential Threats:**
- Unauthorized data access
- SQL injection attacks
- Cross-site scripting (XSS)
- API abuse and rate limiting
- Data breaches
- Man-in-the-middle (MITM) attacks
- Denial of Service (DoS)

---

## Data Protection

### Sensitive Data Classification

#### Public Data (Low Risk)
- Business names
- Registration numbers
- Industry classification
- Location information
- Public ratings and reviews

#### Confidential Data (Medium Risk)
- Financial information (revenue, investments)
- Contact information
- Director details
- Compliance scores

#### Restricted Data (High Risk)
- Database credentials
- API keys
- User authentication tokens
- System logs with sensitive info

### Data at Rest

#### Database Encryption

```bash
# For production, ensure database encryption:

# Neon: Encryption included by default
# Supabase: Enable database encryption in settings
# Azure PostgreSQL: Enable "Enforce SSL connection" and encryption at rest

DATABASE_URL should use sslmode=require
```

#### Backup Security

```bash
# Automated backups with encryption
# Example with Neon:
# - Daily automated backups
# - Backups encrypted at rest
# - 7-day retention by default

# For self-hosted PostgreSQL:
# 1. Enable WAL (Write-Ahead Logging)
# 2. Store backups in encrypted storage
# 3. Restrict backup file permissions
# 4. Test restore procedures regularly
```

### Data in Transit

#### HTTPS/TLS Configuration

```typescript
// next.config.ts - Force HTTPS in production
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
```

### Environment Variables

```bash
# ❌ NEVER commit these to git
DATABASE_URL
API_KEYS
SECRETS
PASSWORDS
WASENDER_API_KEY

# ✅ Always use .env files (add to .gitignore)
# .gitignore should contain:
.env
.env.local
.env.*.local
```

---

## Third-Party Integrations (Wasender API)

The application can optionally integrate with **Wasender API** to provide WhatsApp-based company verification via the `/api/webhook` endpoint.

### Security Considerations

- Treat `WASENDER_API_KEY` as a **highly sensitive secret**:
  - Store it only in environment variables or your hosting provider's secret store.
  - Rotate it periodically and immediately if you suspect compromise.
- Restrict webhook access as much as possible:
  - Configure any IP allowlisting features offered by Wasender.
  - Prefer HTTPS-only URLs for the webhook (`https://.../api/webhook`).
- Logging:
  - Do **not** log full WhatsApp message bodies or phone numbers in production logs unless strictly necessary.
  - When debugging, sanitize logs to avoid storing personal data from end users.
- Abuse protection:
  - Add rate limiting in front of `/api/webhook` in production (at the reverse proxy / platform level) to prevent abuse.
  - Monitor for unusual spikes in webhook traffic.
- Future hardening (recommended):
  - If Wasender supports signed webhooks, add signature verification in `app/api/webhook/route.ts` and reject unsigned/invalid requests.

These measures help ensure that the WhatsApp channel remains secure and that user phone numbers and message contents are handled responsibly.

---

## Authentication & Authorization

### Current State

The application currently has **no authentication system**. It's designed as a public directory.

### Future Authentication Implementation

When adding authentication, follow these practices:

#### Password Security

```typescript
// Do NOT implement password hashing yourself
// Use established libraries like bcrypt or argon2

import bcrypt from "bcrypt";

// Hash password (development only - use proper auth library)
const hash = await bcrypt.hash(password, 12);

// Verify password
const isValid = await bcrypt.compare(password, hash);
```

#### Session Management

```typescript
// Use established session libraries
// Examples:
// - NextAuth.js (recommended for Next.js)
// - Iron Session
// - Lucia

// Requirements:
// 1. Secure cookies (httpOnly, secure, sameSite)
// 2. CSRF protection tokens
// 3. Session timeout
// 4. Secure session storage
```

#### Authorization Levels

**Proposed role-based access control (RBAC):**

```typescript
enum UserRole {
  ADMIN = "admin",          // Full access
  MODERATOR = "moderator",  // Can moderate complaints
  BUSINESS_OWNER = "owner", // Can manage own business
  ANALYST = "analyst",      // Read-only access
  USER = "user",            // Basic access
}

// Authorization middleware
function requireRole(allowedRoles: UserRole[]) {
  return (req: NextRequest, context) => {
    const userRole = req.headers.get("x-user-role");
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  };
}
```

---

## Input Validation

### Current Implementation

The application uses **Zod** for schema validation on all API endpoints.

#### Example: Business Search Validation

```typescript
// lib/validation.ts
import { z } from "zod";

export const businessSearchSchema = z.object({
  search: z.string().max(255).optional(),
  industry: z.enum([
    "technology",
    "banking_finance",
    "agriculture",
    // ...
  ]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// Usage in API route
const validated = businessSearchSchema.safeParse(queryParams);
if (!validated.success) {
  return NextResponse.json(
    { error: "Invalid parameters" },
    { status: 400 }
  );
}
```

### Validation Best Practices

```typescript
// ❌ NEVER trust user input
const name = req.body.name; // Unsafe!

// ✅ ALWAYS validate
const schema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
});

const validated = schema.safeParse(req.body);
```

### Common Validation Patterns

```typescript
// Sanitize HTML input
import DOMPurify from "isomorphic-dompurify";

const cleanInput = DOMPurify.sanitize(userInput);

// Validate URLs
const urlSchema = z.string().url().max(2048);

// Validate phone numbers
const phoneSchema = z.string().regex(/^\+232\d{9}$/);

// Validate registration numbers
const regNumberSchema = z.string().regex(/^[A-Z]{2}\d{8}$/);
```

---

## API Security

### Query Parameter Validation

```typescript
// app/api/explore/route.ts
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20), // Max 100
  search: z.string().max(255).optional(),
  // ... other fields
});

// Prevents parameter pollution and abuse
```

### SQL Injection Prevention

```typescript
// ❌ VULNERABLE - Never use string concatenation
const query = `SELECT * FROM business WHERE name = '${search}'`;

// ✅ SAFE - Use Drizzle ORM with parameterized queries
const businesses = await db
  .select()
  .from(business)
  .where(ilike(business.name, `%${search}%`))
  .execute();
```

### Rate Limiting (Future Implementation)

```typescript
// Recommended: Use middleware like express-rate-limit or custom implementation

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Apply to routes
export const GET = limiter(handler);
```

### CORS Configuration

```typescript
// Future implementation for cross-origin requests

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// Only allow specific origins in production
const allowedOrigins = [
  "https://yourdomain.com",
  "https://admin.yourdomain.com",
];

function setCorsHeaders(origin: string) {
  if (allowedOrigins.includes(origin)) {
    return { "Access-Control-Allow-Origin": origin };
  }
  return {};
}
```

### Error Handling

```typescript
// lib/errorHandler.ts
export function errorResponse(
  statusCode: number,
  error: Error | string | any,
  publicMessage: string,
) {
  if (process.env.NODE_ENV === "development") {
    // Show detailed errors in development
    console.error("API Error:", error);
  }

  // ❌ NEVER expose internal errors to users
  // ✅ Always return generic message in production
  return NextResponse.json(
    {
      ok: false,
      message: publicMessage, // User-friendly message
      error: publicMessage,
      data: null,
    },
    { status: statusCode }
  );
}
```

### Security Headers

Add these headers to all responses:

```bash
# next.config.ts headers configuration
headers: [
  {
    source: "/:path*",
    headers: [
      # Prevent MIME sniffing
      { key: "X-Content-Type-Options", value: "nosniff" },
      
      # Prevent clickjacking
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      
      # XSS protection
      { key: "X-XSS-Protection", value: "1; mode=block" },
      
      # HSTS - Force HTTPS
      { 
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload"
      },
      
      # CSP - Content Security Policy
      {
        key: "Content-Security-Policy",
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
      },
    ],
  },
]
```

---

## Database Security

### PostgreSQL Hardening

```sql
-- Create application user (not superuser)
CREATE ROLE app_user WITH LOGIN PASSWORD 'strong_password';

-- Grant specific permissions
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Revoke public schema access
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- Disable superuser login
ALTER USER postgres WITH NOLOGIN;
```

### Connection Security

```env
# .env production
# Always use SSL/TLS for database connections
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require&ssl=true"

# Connection pooling with PgBouncer
DATABASE_URL="postgresql://user:password@pgbouncer:6432/db?sslmode=require"
```

### Query Logging for Auditing

```typescript
// Enable query logging for security audits
// In Drizzle ORM config:

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Enable query logging in development
  verbose: process.env.NODE_ENV === "development",
});
```

### Data Access Control

```sql
-- Row-level security (future implementation)
ALTER TABLE business ENABLE ROW LEVEL SECURITY;

-- Only allow access to non-sensitive fields
CREATE POLICY "public_access" ON business
  USING (verification_level = 'verified');

-- Admin can see all
CREATE POLICY "admin_access" ON business
  USING (current_user_id = admin_id);
```

---

## Deployment Security

### Environment-Specific Configuration

```bash
# Development
NODE_ENV="development"
DATABASE_URL="postgresql://user:password@localhost:5432/db"

# Production
NODE_ENV="production"
DATABASE_URL="postgresql://user:password@secure-host:5432/db?sslmode=require"
```

### Secrets Management

**DO NOT:**
- ❌ Commit `.env` files
- ❌ Log sensitive data
- ❌ Expose stack traces to users
- ❌ Use plaintext passwords
- ❌ Share credentials via email/chat

**DO:**
- ✅ Use platform secret management (Vercel, Railway, etc.)
- ✅ Rotate secrets regularly
- ✅ Use strong passwords (20+ characters)
- ✅ Enable 2FA on deployment platforms
- ✅ Audit access logs

### Deployment Platform Security

#### Vercel

```bash
# Settings → Environment Variables
DATABASE_URL=*** (encrypted)

# Settings → Deployment Protection
# Enable production deployment protection
```

#### Railway

```bash
# Variables are encrypted at rest
railway variables set DATABASE_URL "value"

# Enable environment protection
```

#### Self-Hosted (Docker)

```dockerfile
# Use multi-stage builds to reduce image size
FROM node:20-alpine AS builder
# Build stage

FROM node:20-alpine
# Production stage - doesn't include build tools
```

### SSL/TLS Certificate

```bash
# For production deployment, use:
# - Let's Encrypt (free, automatic renewal)
# - Vercel (automatic HTTPS)
# - AWS ACM (free for AWS users)

# Minimum TLS version: 1.2
# Cipher suites: Modern strong ciphers only
```

---

## Compliance & Privacy

### Data Privacy Regulations

#### GDPR (If serving EU users)

- [ ] Privacy policy on website
- [ ] Consent management for data collection
- [ ] Right to deletion (forgotten)
- [ ] Data portability
- [ ] Breach notification within 72 hours

#### CCPA (If serving California users)

- [ ] Privacy policy with specific rights
- [ ] Opt-out mechanism
- [ ] Sale of data disclosure
- [ ] User data access requests

#### Local Sierra Leone Requirements

- [ ] Comply with Statistics Office requirements
- [ ] Respect National Data Protection legislation (when enacted)
- [ ] Maintain data securely within agreed jurisdiction

### Privacy Policy Requirements

Your privacy policy should address:

```markdown
# Privacy Policy

## Data We Collect
- Business registration information (public)
- User feedback/complaints (with consent)
- Website usage analytics (optional)

## How We Use Data
- Directory search and filtering
- Complaint investigation
- Service improvement
- Legal compliance

## Data Retention
- Public business data: Until registration expires
- Complaints: 2 years
- Analytics: 1 year (if enabled)

## User Rights
- Access your data
- Correct inaccurate data
- Request deletion (where applicable)
- File complaints

## Contact
[Contact information]
```

### Terms of Service

Include terms covering:

```markdown
# Terms of Service

## Use Restrictions
- No automated scraping
- No redistribution of data
- No competitive use
- No illegal activities

## Liability Limitation
- Service provided "as-is"
- No warranties
- No liability for data accuracy
- No liability for service interruptions

## Intellectual Property
- Database structure protected
- UI/UX protected
- Content provided by users
```

---

## Incident Response

### Security Incident Plan

#### 1. Detection

```typescript
// Monitor for suspicious activity
import { logger } from "@/lib/logger";

logger.error("Unusual query pattern detected", {
  userId,
  endpoint,
  method,
  timestamp,
});
```

#### 2. Response Procedure

```
Step 1: Isolate
- Take affected service offline
- Preserve logs and evidence
- Notify security team

Step 2: Investigate
- Analyze access logs
- Identify affected data
- Determine root cause

Step 3: Remediate
- Patch vulnerability
- Reset affected credentials
- Deploy fix

Step 4: Communicate
- Notify affected users (if data breach)
- Update status page
- File incident report
```

#### 3. Breach Notification

**If data breach occurs:**

```bash
# Within 72 hours:
1. Notify all affected users
2. Notify relevant authorities
3. Provide details:
   - What data was breached
   - Who was affected
   - When it occurred
   - What we're doing about it
   - What users should do

# Email template:
Subject: Security Notice - Account Data Exposure

Dear Users,

We discovered that [description of breach] on [date]. 
This may affect your [what data] was exposed.

Actions we took: [remediation steps]
What you should do: [recommended actions]

For questions: security@domain.com
```

### Security Contacts

```yaml
# Keep updated contact list:
security_lead:
  name: "Name"
  email: "security@domain.com"
  phone: "+232-xxx-xxxx"

database_admin:
  name: "Name"
  email: "dba@domain.com"
  
cloud_provider:
  # For urgent security issues
  support_link: "https://platform.com/support"
```

---

## Security Checklist

### Development

- [ ] All user input validated with Zod
- [ ] No SQL query string concatenation
- [ ] TypeScript strict mode enabled
- [ ] Environment variables validated on startup
- [ ] Error messages don't expose internals
- [ ] Sensitive data never logged
- [ ] CORS properly configured
- [ ] Security headers configured
- [ ] Rate limiting implemented (or planned)
- [ ] Secrets not committed to git

### Testing

- [ ] Input validation tests written
- [ ] SQL injection tests (negative testing)
- [ ] XSS prevention verified
- [ ] Authentication/authorization tested
- [ ] API error handling tested
- [ ] Database access control verified

### Pre-Deployment

- [ ] `.env` in `.gitignore`
- [ ] Build succeeds without warnings
- [ ] All secrets configured on platform
- [ ] HTTPS enabled
- [ ] Database backups configured
- [ ] Monitoring/alerts enabled
- [ ] Security headers deployed
- [ ] SSL/TLS certificate valid
- [ ] Database user has minimal permissions
- [ ] Firewall rules configured

### Post-Deployment

- [ ] HTTPS working correctly
- [ ] Security headers present
- [ ] Error handling verified
- [ ] Database connected securely
- [ ] Logging working properly
- [ ] Monitoring dashboards active
- [ ] Backup/restore tested
- [ ] Incident response plan shared

### Ongoing

- [ ] Dependencies updated monthly
- [ ] Security advisories monitored
- [ ] Access logs reviewed weekly
- [ ] Backups tested monthly
- [ ] Disaster recovery plan updated
- [ ] Team security training completed

---

## Secure Coding Examples

### ✅ Good Practices

```typescript
// Validate input
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
});

const result = schema.safeParse(input);
if (!result.success) {
  return errorResponse(400, result.error);
}

// Use parameterized queries
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, validatedEmail))
  .execute();

// Hash passwords
const hashed = await bcrypt.hash(password, 12);

// Set secure headers
res.setHeader("X-Content-Type-Options", "nosniff");
```

### ❌ Bad Practices (Never Do This)

```typescript
// Concatenate user input into SQL
const query = `SELECT * FROM users WHERE email = '${email}'`;

// Trust user input without validation
const limit = req.query.limit; // Could be 999999999

// Expose sensitive errors
catch (error) {
  res.json({ error: error.message }); // Exposes DB structure
}

// Store secrets in code
const dbPassword = "hardcoded_password";

// Log sensitive data
console.log("User password:", password);

// Trust client-side validation only
// Always validate server-side
```

---

## Security Resources

### Tools & Services

- **Dependabot** - Automated dependency updates
- **Snyk** - Vulnerability scanning
- **OWASP ZAP** - Penetration testing
- **Burp Suite** - Security testing
- **npm audit** - Check for known vulnerabilities

### Learning Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/sql-syntax.html)
- [Drizzle ORM Security](https://orm.drizzle.team/)

### Regulatory Requirements

- [Sierra Leone Business Registration Act](https://www.sl-soe.org/)
- [Data Protection Guidelines](https://www.infosasl.org.uk/)
- [GDPR for international users](https://gdpr-info.eu/)

---

## Reporting Security Vulnerabilities

**If you discover a security vulnerability:**

1. **DO NOT** post it publicly
2. **DO** email: security@walon-foundation.org
3. **Include**:
   - Vulnerability description
   - Steps to reproduce
   - Potential impact
   - Suggested fix (optional)

**Timeline:**
- We'll acknowledge within 24 hours
- Investigate within 1 week
- Provide fix timeline
- Patch and deploy
- Public disclosure after fix

---

## Questions?

For security-related questions, contact:
- **Email**: security@walon-foundation.org
- **GitHub**: [Security Issues](https://github.com/Walon-Foundation/business-directory/security)

---

**Last Updated**: December 2024
**Version**: 1.0
**Next Review**: June 2025

<!-- Built with 🔐 security in mind for Sierra Leone -->
