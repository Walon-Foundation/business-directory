# 🏢 Sierra Leone Business Directory

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)](https://orm.drizzle.team/)

A modern, comprehensive business verification and directory platform for Sierra Leone. Built to transform how businesses are verified, discovered, and trusted in the Sierra Leonean economy.

## 🌟 Overview

The **Sierra Leone Business Directory** is a hackathon-winning web application that provides real-time business verification, comprehensive search capabilities, and transparent business information. It serves as the definitive registry for businesses operating in Sierra Leone, enabling consumers, investors, banks, and government agencies to verify business legitimacy instantly.

### Key Features

- 🔍 **AI-Powered Search** - Lightning-fast fuzzy search across 50,000+ registered businesses
- ✅ **Real-Time Verification** - Instant business status and compliance checking
- 📊 **Comprehensive Profiles** - Detailed business information including financials, directors, and compliance records
- 🎯 **Advanced Filtering** - Filter by industry, location, verification status, compliance scores, and more
- 📱 **Mobile Responsive** - Beautiful, modern UI with glassmorphism design and smooth animations
- 🛡️ **Complaint System** - Public accountability through business complaint tracking
- 🌐 **API-First Design** - RESTful API for third-party integrations
- 📈 **Business Analytics** - ESG scores, risk assessments, and market coverage data

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm
- **PostgreSQL** database (Neon, Supabase, or local)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Walon-Foundation/business-directory.git
   cd business-directory
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate database migrations
   pnpm db:generate
   
   # Push schema to database
   pnpm db:push
   
   # Seed the database with sample data
   pnpm db:seed
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
business-directory/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── explore/              # Business search & details API
│   │   │   ├── route.ts          # GET /api/explore - Search businesses
│   │   │   └── [id]/             # Business details & complaints
│   │   │       ├── route.ts      # GET /api/explore/[id] - Business details
│   │   │       └── complaint/    
│   │   │           └── route.ts  # POST/GET complaints
│   │   └── webhook/              # Webhook handlers
│   ├── explore/                  # Business exploration pages
│   │   ├── page.tsx              # Browse all businesses
│   │   └── [id]/                 
│   │       └── page.tsx          # Individual business profile
│   ├── about/                    # About page
│   ├── api-page/                 # API documentation
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx                # Navigation bar
│   ├── footer.tsx                # Footer component
│   └── complaint.tsx             # Complaint form component
├── db/                           # Database layer
│   ├── schema.ts                 # Drizzle ORM schema
│   ├── db.ts                     # Database connection
│   └── drizzle/                  # Migrations
├── lib/                          # Utility functions
│   ├── utils.ts                  # Helper utilities
│   ├── env.ts                    # Environment validation
│   ├── errorHandler.ts           # Error handling
│   └── seed.ts                   # Database seeding script
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── drizzle.config.ts             # Drizzle ORM config
├── next.config.ts                # Next.js config
├── biome.json                    # Biome linter config
└── README.md                     # This file
```

## 🗄️ Database Schema

### Business Table

The core `business` table contains comprehensive business information:

**Identification**
- `id` - UUID primary key
- `registrationNumber` - Unique business registration number
- `taxId` - Tax identification number

**Basic Information**
- `name` - Official business name
- `tradingName` - Trading/brand name
- `description` - Business description
- `status` - active | pending | suspended | inactive
- `verificationLevel` - verified | pending | unverified
- `industry` - Business industry/sector
- `businessType` - Legal structure (private_limited, public_limited, etc.)
- `ownership` - local | foreign | joint_venture | government | mixed

**Location Data**
- `location`, `address`, `city`, `district`, `province`, `country`
- `latitude`, `longitude` - Geolocation coordinates

**Financial Information**
- `foundedYear` - Year established
- `employees` - Employee count range
- `revenue` - Revenue range
- `capitalInvestment` - Capital investment amount
- `rating` - Business rating (0-5)
- `complianceScore` - Compliance score (0-100)
- `trustScore` - Trust score (0-100)

**JSON Fields** (Rich structured data)
- `directors[]` - Management team and shareholders
- `services[]` - Products and services offered
- `certifications[]` - Industry certifications
- `recentNews[]` - Latest news and updates
- `complianceRecords[]` - Compliance history
- `revenueGrowth[]` - Historical revenue data
- `marketCoverage[]` - Regional market presence
- `esgScores` - Environmental, Social, Governance scores
- `riskAssessment` - Risk analysis metrics
- `auditInfo` - Audit information
- `regulatoryFilings[]` - Regulatory submissions

### Complaints Table

- `id` - UUID primary key
- `businessId` - Reference to business
- `username` - Complainant name (optional/anonymous)
- `type` - Complaint category
- `description` - Complaint details
- `evidenceUrl` - Supporting evidence link
- `userPhone` - Contact phone (optional)
- `source` - web | whatsapp
- `status` - pending | reviewed | resolved
- `createdAt` - Submission timestamp

## 🔌 API Reference

### Search Businesses

```http
GET /api/explore
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search term (name, registration number, description) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (1-100, default: 20) |
| `status` | enum | Filter by status: active, pending, suspended, inactive |
| `industry` | enum | Filter by industry sector |
| `businessType` | enum | Filter by business type |
| `ownership` | enum | Filter by ownership type |
| `location` | string | Filter by location |
| `city` | string | Filter by city |
| `province` | string | Filter by province |
| `minRating` | number | Minimum rating (0-5) |
| `maxRating` | number | Maximum rating (0-5) |
| `minCompliance` | number | Minimum compliance score (0-100) |
| `maxCompliance` | number | Maximum compliance score (0-100) |
| `verificationLevel` | enum | verified, pending, unverified |
| `sortBy` | enum | Sort field: name, rating, complianceScore, createdAt, foundedYear |
| `sortOrder` | enum | asc or desc |
| `tags` | string | Comma-separated tags |

**Example Request:**
```bash
curl "http://localhost:3000/api/explore?search=telecom&industry=telecommunications&minRating=4&sortBy=rating&sortOrder=desc"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "businesses": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "filters": {
      "availableStatuses": {...},
      "topIndustries": [...]
    }
  },
  "timestamp": "2024-12-04T23:30:00.000Z"
}
```

### Get Business Details

```http
GET /api/explore/[id]
```

Returns complete business profile including all JSON fields.

### Submit Complaint

```http
POST /api/explore/[id]/complaint
```

**Request Body:**
```json
{
  "type": "Poor Service",
  "description": "Detailed complaint description...",
  "username": "John Doe",
  "userPhone": "+232 76 123 456",
  "evidenceUrl": "https://example.com/evidence.jpg",
  "source": "web",
  "anonymous": false
}
```

### Get Business Complaints

```http
GET /api/explore/[id]/complaint
```

Returns all complaints for a specific business.

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Database
pnpm db:generate      # Generate migrations
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio (database GUI)
pnpm db:seed          # Seed database with sample data
```

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL** - Database (Neon/Supabase)
- **Zod** - Schema validation

### Developer Tools
- **Biome** - Fast linter and formatter
- **TypeScript** - Static type checking
- **Drizzle Kit** - Database migrations
- **pnpm** - Fast package manager

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`
   - `NODE_ENV=production`
4. Deploy!

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**
- **Self-hosted** (Docker, VPS)

## 📊 Sample Data

The project includes a comprehensive seed script with 50+ sample businesses across various industries:

- **Telecommunications** (Africell, Orange, QCell)
- **Banking & Finance** (SLCB, Ecobank, UBA)
- **Mining** (Sierra Rutile, Koidu Holdings)
- **Agriculture** (Sierra Palm, Agribusiness ventures)
- **Healthcare** (Hospitals, clinics)
- **Construction** (Building companies)
- **Technology** (IT services)
- And many more...

Run `pnpm db:seed` to populate your database.

## 🔐 Security Features

- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Rate limiting ready
- ✅ Environment variable validation
- ✅ Error handling and logging

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Biome for linting and formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

**Walon Foundation**
- GitHub: [@Walon-Foundation](https://github.com/Walon-Foundation)

## 🙏 Acknowledgments

- Built for the Sierra Leone business community
- Inspired by the need for transparent business verification
- Designed to support economic growth and investor confidence
- Created as part of a hackathon initiative

## 📞 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact the Walon Foundation team

<!-- ## 🗺️ Roadmap

- [ ] WhatsApp integration for complaints
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Business owner portal
- [ ] Mobile app (React Native)
- [ ] API rate limiting
- [ ] Multi-language support
- [ ] Export to PDF/Excel
- [ ] Real-time updates with WebSockets
- [ ] Integration with government registries

--- -->

**Built with ❤️ for Sierra Leone** 🇸🇱
