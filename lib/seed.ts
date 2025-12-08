// scripts/seed.ts
import { db } from "@/db/db";
import { business, NewBusiness } from "@/db/schema";
import { sql } from "drizzle-orm";

async function seedDatabase() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data (optional - be careful in production!)
    console.log("🧹 Clearing existing businesses...");
    await db.delete(business);

    // Sample business data for Sierra Leone - 25 companies
    const businesses: NewBusiness[] = [
      // ========== TELECOMMUNICATIONS (3 companies) ==========
      {
        registrationNumber: "C123456",
        taxId: "TAX-2023-001234",
        name: "Africell Sierra Leone Limited",
        tradingName: "Africell SL",
        description:
          "Leading telecommunications provider in Sierra Leone with nationwide coverage. Committed to connecting communities and driving digital transformation.",
        status: "active",
        verificationLevel: "verified",
        industry: "telecommunications",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "25 Siaka Stevens Street, Freetown, Sierra Leone",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4844",
        longitude: "-13.2344",

        contactEmail: "info@africell.sl",
        contactPhone: "+232 76 123 456",
        website: "https://africell.sl",
        ceo: "Mr. Shadi Gerjawi",

        foundedYear: 2010,
        yearEnd: "December 31",
        employees: "500-1000",
        revenue: "$100M+",
        capitalInvestment: "50000000",
        annualRevenueRange: "$100M+",
        financialSummary:
          "Strong financial performance with consistent year-over-year growth. Market leader in telecommunications with expanding customer base.",

        rating: "4.8",
        complianceScore: 92,
        trustScore: 95,

        cacRegistrationDate: "2010-03-15",
        cacExpiryDate: "2025-03-15",
        lastVerifiedAt: new Date("2024-01-15"),

        operationalDetails:
          "Operates nationwide mobile network with 4G/LTE coverage. Focus on digital inclusion and mobile financial services.",
        marketPosition: "Market Leader",
        customerBase: "Nationwide - 2.5M+ subscribers",

        tags: ["Telecom", "ISP", "Mobile", "National", "4G", "Digital"],
        services: [
          "Mobile Voice Services",
          "4G/5G Data Services",
          "Mobile Money (AfriMoney)",
          "Corporate Solutions",
          "Internet Services",
          "Digital Content",
        ],
        certifications: [
          "ISO 9001:2015 Certified",
          "GSMA Member",
          "Telecommunications Regulatory Commission Licensed",
        ],
        subsidiaries: [
          "Africell Mobile Money Ltd",
          "Africell Digital Services Ltd",
          "Africell Towers Ltd",
        ],

        recentNews: [
          {
            title: "Africell expands 4G coverage to rural areas",
            date: "2024-01-10",
            source: "Sierra Leone Business News",
          },
          {
            title: "Company reports 20% revenue growth in 2023",
            date: "2023-12-15",
            source: "Financial Times",
          },
          {
            title: "Launches new digital payment platform",
            date: "2023-11-20",
            source: "Tech Africa",
          },
        ],

        directors: [
          {
            name: "Mr. Shadi Gerjawi",
            position: "Chief Executive Officer",
            nationality: "Lebanese",
            isPrimary: true,
            sharePercentage: 40,
          },
          {
            name: "Ms. Fatima Kamara",
            position: "Chief Operations Officer",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 10,
          },
        ],

        complianceRecords: [
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2024-01-10",
            score: 95,
          },
          {
            type: "Business License",
            status: "Active",
            dueDate: "2024-12-31",
            score: 100,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-11-30",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$120M" },
          { year: 2022, growth: 18, amount: "$100M" },
          { year: 2021, growth: 15, amount: "$85M" },
          { year: 2020, growth: 12, amount: "$74M" },
          { year: 2019, growth: 10, amount: "$66M" },
        ],

        marketCoverage: [
          { region: "Western Area", percentage: 98, notes: "Full coverage" },
          {
            region: "Northern Province",
            percentage: 85,
            notes: "Good coverage",
          },
          { region: "Southern Province", percentage: 80, notes: "Expanding" },
          {
            region: "Eastern Province",
            percentage: 75,
            notes: "Limited coverage",
          },
        ],

        majorClients: [
          "Government of Sierra Leone",
          "UN Agencies",
          "Large Corporations",
        ],
        awards: [
          {
            name: "Best Telecom Company 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Digital Innovation Award",
            year: 2022,
            issuer: "African Telecom Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/africellsl",
          twitter: "https://twitter.com/africellsl",
          linkedin: "https://linkedin.com/company/africell-sierra-leone",
        },

        esgScores: {
          environmental: 85,
          social: 90,
          governance: 88,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 25,
          complianceRisk: 15,
          marketRisk: 30,
          overallRisk: 22,
        },

        bankDetails: {
          bankName: "Sierra Leone Commercial Bank",
          accountNumber: "00123456789",
          accountName: "Africell Sierra Leone Limited",
          branch: "Freetown Main Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.africell.sl/2024-annual-return.pdf",
          },
          {
            type: "Financial Statement",
            filingDate: "2024-04-15",
            status: "Filed",
            documentUrl:
              "https://docs.africell.sl/2023-financial-statement.pdf",
          },
        ],
      },

      {
        registrationNumber: "C789012",
        taxId: "TAX-2023-002345",
        name: "Orange Sierra Leone",
        tradingName: "Orange SL",
        description:
          "International telecom operator providing mobile and internet services across Sierra Leone.",
        status: "active",
        verificationLevel: "verified",
        industry: "telecommunications",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "12 Wilkinson Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4830",
        longitude: "-13.2300",

        contactEmail: "contact@orange.sl",
        contactPhone: "+232 76 789 012",
        website: "https://orange.sl",
        ceo: "Mr. Sekou Amadou",

        foundedYear: 2016,
        yearEnd: "December 31",
        employees: "400-800",
        revenue: "$80M+",
        capitalInvestment: "40000000",
        annualRevenueRange: "$50M-100M",
        financialSummary:
          "Strong competitor in telecom market with focus on digital services and innovation.",

        rating: "4.6",
        complianceScore: 90,
        trustScore: 92,

        cacRegistrationDate: "2016-05-20",
        cacExpiryDate: "2026-05-20",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Nationwide 4G network with focus on urban areas. Expanding mobile money services.",
        marketPosition: "Major Telecom Provider",
        customerBase: "1.8M+ subscribers nationwide",

        tags: ["Telecom", "Mobile", "Internet", "4G", "Orange Money"],
        services: [
          "Mobile Services",
          "Internet",
          "Orange Money",
          "Business Solutions",
        ],
        certifications: ["ISO Certified", "Telecom Regulatory Licensed"],
        subsidiaries: ["Orange Money Sierra Leone"],

        recentNews: [
          {
            title: "Orange launches 5G trial in Freetown",
            date: "2024-01-25",
            source: "Tech Africa",
          },
          {
            title: "Partners with government for digital literacy",
            date: "2023-12-10",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Sekou Amadou",
            position: "CEO",
            nationality: "Ivorian",
            isPrimary: true,
            sharePercentage: 35,
          },
          {
            name: "Ms. Mariama Kamara",
            position: "CFO",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 5,
          },
        ],

        complianceRecords: [
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2024-01-15",
            score: 92,
          },
          {
            type: "Telecom License",
            status: "Active",
            dueDate: "2026-12-31",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$85M" },
          { year: 2022, growth: 16, amount: "$72M" },
          { year: 2021, growth: 14, amount: "$62M" },
        ],

        marketCoverage: [
          { region: "Western Area", percentage: 95, notes: "Strong coverage" },
          {
            region: "Northern Province",
            percentage: 80,
            notes: "Good coverage",
          },
          { region: "Southern Province", percentage: 75, notes: "Expanding" },
        ],

        majorClients: [
          "Corporate Clients",
          "Government",
          "International Organizations",
        ],
        awards: [
          {
            name: "Best Customer Service 2023",
            year: 2023,
            issuer: "Sierra Leone Telecom Awards",
          },
          {
            name: "Innovation in Mobile Money",
            year: 2022,
            issuer: "West Africa Digital Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/orangesl",
          twitter: "https://twitter.com/orangesl",
          instagram: "https://instagram.com/orangesl",
        },

        esgScores: {
          environmental: 82,
          social: 88,
          governance: 85,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "00998877666",
          accountName: "Orange Sierra Leone",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "EY Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "C456789",
        taxId: "TAX-2023-003456",
        name: "QCell Sierra Leone",
        tradingName: "QCell",
        description:
          "Fast-growing telecom operator focusing on data services and rural connectivity.",
        status: "active",
        verificationLevel: "verified",
        industry: "telecommunications",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "8 Goderich Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4850",
        longitude: "-13.2350",

        contactEmail: "info@qcell.sl",
        contactPhone: "+232 76 456 789",
        website: "https://qcell.sl",
        ceo: "Mr. Mohamed Bah",

        foundedYear: 2019,
        yearEnd: "December 31",
        employees: "200-400",
        revenue: "$30M-50M",
        capitalInvestment: "25000000",
        annualRevenueRange: "$30M-50M",
        financialSummary:
          "Aggressive growth strategy with focus on data services and youth market.",

        rating: "4.4",
        complianceScore: 88,
        trustScore: 87,

        cacRegistrationDate: "2019-02-15",
        cacExpiryDate: "2029-02-15",
        lastVerifiedAt: new Date("2023-12-30"),

        operationalDetails:
          "Focus on 4G data services and affordable internet packages. Expanding to rural areas.",
        marketPosition: "Fast-growing Challenger",
        customerBase: "800K+ subscribers, strong youth demographic",

        tags: ["Telecom", "Data Services", "4G", "Internet", "Youth"],
        services: [
          "Mobile Data",
          "Voice Services",
          "Internet Bundles",
          "Youth Packages",
        ],
        certifications: ["Telecom Regulatory Licensed"],
        subsidiaries: [],

        recentNews: [
          {
            title: "QCell expands network coverage to 15 new towns",
            date: "2024-01-15",
            source: "Business Day",
          },
          {
            title: "Introduces unlimited data plans",
            date: "2023-12-01",
            source: "Tech Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Mohamed Bah",
            position: "CEO",
            nationality: "Guinean",
            isPrimary: true,
            sharePercentage: 45,
          },
          {
            name: "Mr. Samuel Conteh",
            position: "COO",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 15,
          },
        ],

        complianceRecords: [
          {
            type: "License Compliance",
            status: "Active",
            completedDate: "2024-01-05",
            score: 90,
          },
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2023-12-20",
            score: 86,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 35, amount: "$45M" },
          { year: 2022, growth: 40, amount: "$33M" },
          { year: 2021, growth: 50, amount: "$24M" },
        ],

        marketCoverage: [
          {
            region: "Western Area",
            percentage: 90,
            notes: "Strong in urban areas",
          },
          {
            region: "Provincial Capitals",
            percentage: 85,
            notes: "All major towns",
          },
          { region: "Rural Areas", percentage: 60, notes: "Expanding rapidly" },
        ],

        majorClients: [
          "Youth Market",
          "Small Businesses",
          "Educational Institutions",
        ],
        awards: [
          {
            name: "Fastest Growing Telecom 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Best Data Services Provider",
            year: 2022,
            issuer: "African Telecom Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/qcellsl",
          twitter: "https://twitter.com/qcellsl",
          instagram: "https://instagram.com/qcellsl",
        },

        esgScores: {
          environmental: 78,
          social: 85,
          governance: 82,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 30,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "UBA Sierra Leone",
          accountNumber: "00887766555",
          accountName: "QCell Sierra Leone",
          branch: "Freetown Main",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== BANKING & FINANCE (4 companies) ==========
      {
        registrationNumber: "B789012",
        taxId: "TAX-2023-001235",
        name: "Sierra Leone Commercial Bank",
        tradingName: "SLCB",
        description:
          "National commercial bank providing comprehensive financial services with branches across Sierra Leone.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "public_limited",
        ownership: "government",

        location: "Freetown",
        address: "1 Lightfoot Boston Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4860",
        longitude: "-13.2360",

        contactEmail: "info@slcb.com",
        contactPhone: "+232 76 789 012",
        website: "https://slcb.com",
        ceo: "Ms. Jane Smith",

        foundedYear: 1973,
        yearEnd: "December 31",
        employees: "1000+",
        revenue: "$500M+",
        capitalInvestment: "200000000",
        annualRevenueRange: "$500M+",
        financialSummary:
          "Stable financial institution with strong government backing. Key player in national economic development.",

        rating: "4.6",
        complianceScore: 96,
        trustScore: 98,

        cacRegistrationDate: "1973-06-01",
        cacExpiryDate: "2030-06-01",
        lastVerifiedAt: new Date("2024-01-10"),

        operationalDetails:
          "Operates 50+ branches nationwide with full banking services. Digital banking platform available.",
        marketPosition: "Market Leader in Retail Banking",
        customerBase: "Over 1 million customers nationwide",

        tags: ["Banking", "Finance", "Loans", "National", "Government"],
        services: [
          "Personal Banking",
          "Corporate Banking",
          "Loans",
          "Investment Services",
          "International Banking",
        ],
        certifications: [
          "Central Bank Licensed",
          "Sierra Leone Chamber of Commerce",
          "ISO 27001 Certified",
        ],
        subsidiaries: ["SLCB Microfinance Ltd", "SLCB Insurance Ltd"],

        recentNews: [
          {
            title: "SLCB reports record profits for 2023",
            date: "2024-01-20",
            source: "Financial Times",
          },
          {
            title: "Bank expands digital banking services",
            date: "2023-12-05",
            source: "Business Day",
          },
        ],

        directors: [
          {
            name: "Ms. Jane Smith",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 5,
          },
          {
            name: "Mr. Mohamed Bangura",
            position: "Board Chairman",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 3,
          },
        ],

        complianceRecords: [
          {
            type: "Central Bank Compliance",
            status: "Active",
            completedDate: "2024-01-15",
            score: 98,
          },
          {
            type: "Anti-Money Laundering",
            status: "Active",
            completedDate: "2023-12-31",
            score: 96,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 12, amount: "$560M" },
          { year: 2022, growth: 10, amount: "$500M" },
          { year: 2021, growth: 8, amount: "$455M" },
          { year: 2020, growth: 5, amount: "$420M" },
          { year: 2019, growth: 7, amount: "$400M" },
        ],

        marketCoverage: [
          {
            region: "Western Area",
            percentage: 100,
            notes: "Multiple branches",
          },
          {
            region: "Northern Province",
            percentage: 90,
            notes: "Good coverage",
          },
          { region: "Southern Province", percentage: 85, notes: "Expanding" },
          {
            region: "Eastern Province",
            percentage: 80,
            notes: "Growing presence",
          },
        ],

        majorClients: [
          "Government of Sierra Leone",
          "Major Corporations",
          "International NGOs",
        ],
        awards: [
          {
            name: "Best Commercial Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Excellence in Customer Service",
            year: 2022,
            issuer: "West Africa Banking Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/slcbsl",
          twitter: "https://twitter.com/slcbsl",
          linkedin: "https://linkedin.com/company/sierra-leone-commercial-bank",
        },

        esgScores: {
          environmental: 80,
          social: 92,
          governance: 95,
          overall: 89,
        },
        riskAssessment: {
          financialRisk: 15,
          operationalRisk: 20,
          complianceRisk: 10,
          marketRisk: 25,
          overallRisk: 18,
        },

        bankDetails: {
          bankName: "Sierra Leone Commercial Bank",
          accountNumber: "00112233445",
          accountName: "Sierra Leone Commercial Bank Main Account",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Deloitte Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.slcb.com/2023-annual-report.pdf",
          },
          {
            type: "Financial Statement",
            filingDate: "2024-04-10",
            status: "Filed",
            documentUrl: "https://docs.slcb.com/2023-financial-statement.pdf",
          },
        ],
      },

      {
        registrationNumber: "B234567",
        taxId: "TAX-2023-004567",
        name: "Rokel Commercial Bank",
        tradingName: "RCB",
        description:
          "Leading commercial bank with strong focus on corporate banking and international trade.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "public_limited",
        ownership: "mixed",

        location: "Freetown",
        address: "26-28 Siaka Stevens Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4855",
        longitude: "-13.2355",

        contactEmail: "info@rokelbank.com",
        contactPhone: "+232 22 222 456",
        website: "https://rokelbank.com",
        ceo: "Mr. Abdulai Bangura",

        foundedYear: 1917,
        yearEnd: "December 31",
        employees: "800-1200",
        revenue: "$300M+",
        capitalInvestment: "150000000",
        annualRevenueRange: "$200M-500M",
        financialSummary:
          "Historic bank with modern services, strong in corporate banking and trade finance.",

        rating: "4.5",
        complianceScore: 94,
        trustScore: 96,

        cacRegistrationDate: "1917-03-15",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Operates nationwide with focus on corporate clients and international trade.",
        marketPosition: "Leading Corporate Bank",
        customerBase:
          "Corporations, International Traders, Government Agencies",

        tags: ["Banking", "Corporate", "Trade Finance", "Historic"],
        services: [
          "Corporate Banking",
          "Trade Finance",
          "Treasury Services",
          "Retail Banking",
        ],
        certifications: ["Central Bank Licensed", "ISO 27001 Certified"],
        subsidiaries: ["RCB Insurance Brokers"],

        recentNews: [
          {
            title: "RCB launches new digital trade platform",
            date: "2024-01-18",
            source: "Financial Times",
          },
          {
            title: "Partners with international development bank",
            date: "2023-12-12",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Abdulai Bangura",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 8,
          },
          {
            name: "Ms. Sarah Williams",
            position: "Chairperson",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 5,
          },
        ],

        complianceRecords: [
          {
            type: "Central Bank Audit",
            status: "Excellent",
            completedDate: "2024-01-20",
            score: 97,
          },
          {
            type: "AML Compliance",
            status: "Active",
            completedDate: "2024-01-05",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$345M" },
          { year: 2022, growth: 12, amount: "$300M" },
          { year: 2021, growth: 10, amount: "$268M" },
        ],

        marketCoverage: [
          { region: "National", percentage: 85, notes: "All major cities" },
          {
            region: "International",
            percentage: 70,
            notes: "Trade finance network",
          },
        ],

        majorClients: [
          "Major Exporters/Importers",
          "Mining Companies",
          "Government Ministries",
        ],
        awards: [
          {
            name: "Best Corporate Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Excellence in Trade Finance",
            year: 2022,
            issuer: "African Banking Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/rokelbank",
          twitter: "https://twitter.com/rokelbank",
          linkedin: "https://linkedin.com/company/rokel-commercial-bank",
        },

        esgScores: {
          environmental: 78,
          social: 90,
          governance: 92,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 18,
          operationalRisk: 22,
          complianceRisk: 12,
          marketRisk: 28,
          overallRisk: 20,
        },

        bankDetails: {
          bankName: "Rokel Commercial Bank",
          accountNumber: "00223344556",
          accountName: "Rokel Commercial Bank Main",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-15",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "B345678",
        taxId: "TAX-2023-005678",
        name: "Ecobank Sierra Leone",
        tradingName: "Ecobank SL",
        description:
          "Pan-African banking group providing innovative financial solutions across Sierra Leone.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "Ecobank Building, 29 Rawdon Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4840",
        longitude: "-13.2340",

        contactEmail: "info@ecobank.sl",
        contactPhone: "+232 22 234 567",
        website: "https://ecobank.sl",
        ceo: "Mr. George Mensah",

        foundedYear: 2006,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$150M+",
        capitalInvestment: "80000000",
        annualRevenueRange: "$100M-200M",
        financialSummary:
          "Innovative digital banking solutions with strong regional network across Africa.",

        rating: "4.4",
        complianceScore: 92,
        trustScore: 93,

        cacRegistrationDate: "2006-08-10",
        cacExpiryDate: "2026-08-10",
        lastVerifiedAt: new Date("2024-01-22"),

        operationalDetails:
          "Digital-first bank with mobile banking focus. Part of Ecobank Transnational network.",
        marketPosition: "Digital Banking Leader",
        customerBase: "Tech-savvy customers, SMEs, Corporate Clients",

        tags: ["Banking", "Digital", "Pan-African", "Innovation"],
        services: [
          "Digital Banking",
          "Mobile Money",
          "SME Banking",
          "Corporate Banking",
          "International Transfers",
        ],
        certifications: ["Ecobank Group Standards", "ISO 27001 Certified"],
        subsidiaries: [],

        recentNews: [
          {
            title: "Ecobank launches new mobile banking app",
            date: "2024-01-25",
            source: "Tech Africa",
          },
          {
            title: "Expands SME lending program",
            date: "2023-12-18",
            source: "Business Day",
          },
        ],

        directors: [
          {
            name: "Mr. George Mensah",
            position: "Managing Director",
            nationality: "Ghanaian",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Aminata Cole",
            position: "Deputy MD",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Group Compliance",
            status: "Excellent",
            completedDate: "2024-01-15",
            score: 94,
          },
          {
            type: "Digital Security",
            status: "Active",
            completedDate: "2023-12-31",
            score: 93,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$180M" },
          { year: 2022, growth: 18, amount: "$150M" },
          { year: 2021, growth: 15, amount: "$127M" },
        ],

        marketCoverage: [
          {
            region: "Urban Centers",
            percentage: 95,
            notes: "Strong digital presence",
          },
          {
            region: "Regional Network",
            percentage: 100,
            notes: "Across Africa",
          },
        ],

        majorClients: ["SMEs", "Corporate Clients", "Diaspora Customers"],
        awards: [
          {
            name: "Best Digital Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          { name: "Innovation Award", year: 2022, issuer: "Ecobank Group" },
        ],

        socialMedia: {
          facebook: "https://facebook.com/ecobanksl",
          twitter: "https://twitter.com/ecobanksl",
          linkedin: "https://linkedin.com/company/ecobank-sierra-leone",
        },

        esgScores: {
          environmental: 85,
          social: 88,
          governance: 90,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 25,
          complianceRisk: 15,
          marketRisk: 30,
          overallRisk: 23,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "00334455667",
          accountName: "Ecobank Sierra Leone",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-20",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "B456789",
        taxId: "TAX-2023-006789",
        name: "UBA Sierra Leone",
        tradingName: "UBA SL",
        description:
          "Subsidiary of United Bank for Africa, providing comprehensive banking services.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "UBA House, 28-30 Siaka Stevens Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4845",
        longitude: "-13.2345",

        contactEmail: "info@ubasl.com",
        contactPhone: "+232 22 345 678",
        website: "https://ubasl.com",
        ceo: "Mr. Chukwuma Nweke",

        foundedYear: 2008,
        yearEnd: "December 31",
        employees: "250-400",
        revenue: "$120M+",
        capitalInvestment: "60000000",
        annualRevenueRange: "$100M-150M",
        financialSummary:
          "Strong regional bank with focus on retail and SME banking segments.",

        rating: "4.3",
        complianceScore: 91,
        trustScore: 92,

        cacRegistrationDate: "2008-04-15",
        cacExpiryDate: "2028-04-15",
        lastVerifiedAt: new Date("2024-01-28"),

        operationalDetails:
          "Multiple branches with focus on retail banking and SME support.",
        marketPosition: "Strong Retail Bank",
        customerBase: "Retail Customers, SMEs, Corporate Clients",

        tags: ["Banking", "Retail", "SME", "UBA Group"],
        services: [
          "Retail Banking",
          "SME Loans",
          "Corporate Banking",
          "International Services",
        ],
        certifications: ["UBA Group Standards", "Central Bank Licensed"],
        subsidiaries: [],

        recentNews: [
          {
            title: "UBA increases SME lending by 30%",
            date: "2024-01-30",
            source: "Sierra Leone Business News",
          },
          {
            title: "Launches new youth banking package",
            date: "2023-12-20",
            source: "Youth Business Journal",
          },
        ],

        directors: [
          {
            name: "Mr. Chukwuma Nweke",
            position: "CEO",
            nationality: "Nigerian",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Sesay",
            position: "Head of Retail",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Group Compliance",
            status: "Active",
            completedDate: "2024-01-25",
            score: 92,
          },
          {
            type: "SME Lending Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$142M" },
          { year: 2022, growth: 16, amount: "$120M" },
          { year: 2021, growth: 14, amount: "$103M" },
        ],

        marketCoverage: [
          {
            region: "Western Area",
            percentage: 90,
            notes: "Multiple branches",
          },
          {
            region: "Provincial Capitals",
            percentage: 85,
            notes: "Strong presence",
          },
        ],

        majorClients: ["SMEs", "Retail Customers", "Corporate Clients"],
        awards: [
          {
            name: "Best SME Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Customer Service Excellence",
            year: 2022,
            issuer: "UBA Group Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/ubasl",
          twitter: "https://twitter.com/ubasl",
          linkedin: "https://linkedin.com/company/uba-sierra-leone",
        },

        esgScores: {
          environmental: 82,
          social: 90,
          governance: 88,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 22,
          operationalRisk: 25,
          complianceRisk: 18,
          marketRisk: 32,
          overallRisk: 24,
        },

        bankDetails: {
          bankName: "UBA Sierra Leone",
          accountNumber: "00445566778",
          accountName: "UBA Sierra Leone",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Deloitte Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-25",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== AGRICULTURE (3 companies) ==========
      {
        registrationNumber: "A345678",
        taxId: "TAX-2023-001236",
        name: "Makeni Agro Processing Ltd",
        tradingName: "Makeni Agro",
        description:
          "Agricultural processing company specializing in rice and palm oil production. Committed to sustainable farming practices.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "private_limited",
        ownership: "local",

        location: "Makeni",
        address: "Mile 91 Highway, Makeni",
        city: "Makeni",
        district: "Bombali",
        province: "Northern Province",
        postalCode: "00211",
        country: "Sierra Leone",
        latitude: "8.8860",
        longitude: "-12.0440",

        contactEmail: "info@makeniagro.sl",
        contactPhone: "+232 77 345 678",
        website: "https://makeniagro.sl",
        ceo: "Mr. Alhaji Kamara",

        foundedYear: 2018,
        yearEnd: "December 31",
        employees: "50-100",
        revenue: "$5M-10M",
        capitalInvestment: "2000000",
        annualRevenueRange: "$5M-10M",
        financialSummary:
          "Growing agro-processing company with focus on value addition. Strong market position in Northern Province.",

        rating: "4.2",
        complianceScore: 85,
        trustScore: 80,

        cacRegistrationDate: "2018-03-20",
        cacExpiryDate: "2026-03-20",
        lastVerifiedAt: new Date("2023-12-15"),

        operationalDetails:
          "Operates rice milling plant and palm oil processing facility. Sources directly from local farmers.",
        marketPosition: "Leading agro-processor in Northern Province",
        customerBase: "Local markets, supermarkets, export markets",

        tags: ["Agriculture", "Processing", "Export", "SME", "Sustainable"],
        services: [
          "Rice Processing",
          "Palm Oil Production",
          "Agricultural Consulting",
          "Export Services",
        ],
        certifications: [
          "Sierra Leone Standards Bureau Certified",
          "Organic Farming Certified",
        ],
        subsidiaries: ["Makeni Farms Ltd"],

        recentNews: [
          {
            title: "Makeni Agro expands processing capacity",
            date: "2024-01-05",
            source: "Sierra Leone Business News",
          },
          {
            title: "Company receives sustainability award",
            date: "2023-11-15",
            source: "Agricultural Digest",
          },
        ],

        directors: [
          {
            name: "Mr. Alhaji Kamara",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 60,
          },
          {
            name: "Ms. Fatmata Conteh",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2024-01-05",
            score: 85,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-11-30",
            score: 80,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$9M" },
          { year: 2022, growth: 20, amount: "$7.2M" },
          { year: 2021, growth: 15, amount: "$6M" },
          { year: 2020, growth: 10, amount: "$5.2M" },
          { year: 2019, growth: 5, amount: "$4.8M" },
        ],

        marketCoverage: [
          {
            region: "Northern Province",
            percentage: 70,
            notes: "Strong presence",
          },
          { region: "Western Area", percentage: 40, notes: "Growing market" },
          {
            region: "Southern Province",
            percentage: 30,
            notes: "Limited presence",
          },
        ],

        majorClients: [
          "Local Supermarkets",
          "Export Companies",
          "Government Institutions",
        ],
        awards: [
          {
            name: "Best Agro-Processor 2023",
            year: 2023,
            issuer: "Sierra Leone Agricultural Awards",
          },
          {
            name: "Sustainable Business Award",
            year: 2022,
            issuer: "West Africa Business Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/makeniagro",
          twitter: "https://twitter.com/makeniagro",
        },

        esgScores: {
          environmental: 90,
          social: 85,
          governance: 80,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 25,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Rokel Commercial Bank",
          accountNumber: "00223344556",
          accountName: "Makeni Agro Processing Ltd",
          branch: "Makeni Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.makeniagro.sl/annual-return.pdf",
          },
        ],
      },

      {
        registrationNumber: "A456789",
        taxId: "TAX-2023-007890",
        name: "Sierra Leone Rice Company",
        tradingName: "SLC Rice",
        description:
          "Large-scale rice production and processing company supporting national food security.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "public_limited",
        ownership: "government",

        location: "Rokupr",
        address: "Rokupr Agricultural Station, Kambia District",
        city: "Rokupr",
        district: "Kambia",
        province: "Northern Province",
        postalCode: "00212",
        country: "Sierra Leone",
        latitude: "9.0000",
        longitude: "-12.5000",

        contactEmail: "info@slcrice.gov.sl",
        contactPhone: "+232 77 456 789",
        website: "https://slcrice.gov.sl",
        ceo: "Dr. Mohamed Sesay",

        foundedYear: 1975,
        yearEnd: "December 31",
        employees: "200-300",
        revenue: "$20M-30M",
        capitalInvestment: "15000000",
        annualRevenueRange: "$20M-30M",
        financialSummary:
          "Government-owned rice company focused on improving national rice production.",

        rating: "4.1",
        complianceScore: 92,
        trustScore: 90,

        cacRegistrationDate: "1975-08-20",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-15"),

        operationalDetails:
          "Operates 5,000 hectares of rice farms and modern processing facilities.",
        marketPosition: "National Rice Producer",
        customerBase: "Government Institutions, Wholesalers, Schools, NGOs",

        tags: ["Agriculture", "Rice", "Government", "Food Security"],
        services: [
          "Rice Production",
          "Seed Multiplication",
          "Processing",
          "Agricultural Research",
        ],
        certifications: [
          "Ministry of Agriculture Certified",
          "Quality Standards Certified",
        ],
        subsidiaries: ["SLC Seed Company"],

        recentNews: [
          {
            title: "SLC Rice increases production by 40%",
            date: "2024-01-20",
            source: "Agricultural News",
          },
          {
            title: "Launches new high-yield rice variety",
            date: "2023-12-10",
            source: "Science Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Dr. Mohamed Sesay",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Hawa Koroma",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Government Compliance",
            status: "Active",
            completedDate: "2024-01-10",
            score: 95,
          },
          {
            type: "Quality Standards",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$28M" },
          { year: 2022, growth: 12, amount: "$24M" },
          { year: 2021, growth: 10, amount: "$21M" },
        ],

        marketCoverage: [
          {
            region: "Northern Province",
            percentage: 100,
            notes: "Primary production area",
          },
          {
            region: "National",
            percentage: 60,
            notes: "Distributed nationwide",
          },
        ],

        majorClients: ["Government Schools", "WFP", "NGOs", "Local Markets"],
        awards: [
          {
            name: "National Food Security Award 2023",
            year: 2023,
            issuer: "Ministry of Agriculture",
          },
          {
            name: "Agricultural Innovation Award",
            year: 2022,
            issuer: "West Africa Agriculture Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/slcrice",
          twitter: "https://twitter.com/slcrice",
        },

        esgScores: {
          environmental: 88,
          social: 92,
          governance: 85,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 15,
          marketRisk: 20,
          overallRisk: 23,
        },

        bankDetails: {
          bankName: "Sierra Leone Commercial Bank",
          accountNumber: "00556677889",
          accountName: "Sierra Leone Rice Company",
          branch: "Government Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-15",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "A567890",
        taxId: "TAX-2023-008901",
        name: "Kenema Cocoa Cooperative",
        tradingName: "KCC",
        description:
          "Farmer-owned cooperative specializing in organic cocoa production for export markets.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "cooperative",
        ownership: "local",

        location: "Kenema",
        address: "Nongowa Chiefdom, Kenema District",
        city: "Kenema",
        district: "Kenema",
        province: "Eastern Province",
        postalCode: "00223",
        country: "Sierra Leone",
        latitude: "7.8833",
        longitude: "-11.1833",

        contactEmail: "info@kenemacocoa.sl",
        contactPhone: "+232 78 567 890",
        website: "https://kenemacocoa.sl",
        ceo: "Mr. Sahr Kamara",

        foundedYear: 2015,
        yearEnd: "December 31",
        employees: "150-250",
        revenue: "$8M-12M",
        capitalInvestment: "3000000",
        annualRevenueRange: "$5M-15M",
        financialSummary:
          "Profitable cocoa cooperative with premium organic certification for European markets.",

        rating: "4.3",
        complianceScore: 88,
        trustScore: 85,

        cacRegistrationDate: "2015-06-10",
        cacExpiryDate: "2025-06-10",
        lastVerifiedAt: new Date("2024-01-10"),

        operationalDetails:
          "500+ smallholder farmers producing organic certified cocoa. Central processing facility.",
        marketPosition: "Premium Organic Cocoa Producer",
        customerBase: "European Chocolate Manufacturers, Specialty Buyers",

        tags: ["Agriculture", "Cocoa", "Organic", "Export", "Cooperative"],
        services: [
          "Cocoa Production",
          "Processing",
          "Export",
          "Farmer Training",
        ],
        certifications: [
          "Organic EU Certified",
          "Fair Trade Certified",
          "UTZ Certified",
        ],
        subsidiaries: [],

        recentNews: [
          {
            title: "KCC secures major European contract",
            date: "2024-01-25",
            source: "Export News",
          },
          {
            title: "Cooperative expands farmer membership",
            date: "2023-12-15",
            source: "Agricultural Digest",
          },
        ],

        directors: [
          {
            name: "Mr. Sahr Kamara",
            position: "Chairman",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 2,
          },
          {
            name: "Ms. Kadiatu Bangura",
            position: "Secretary",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 1,
          },
        ],

        complianceRecords: [
          {
            type: "Organic Certification",
            status: "Active",
            completedDate: "2024-01-15",
            score: 95,
          },
          {
            type: "Export License",
            status: "Active",
            completedDate: "2024-01-05",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 30, amount: "$11M" },
          { year: 2022, growth: 25, amount: "$8.5M" },
          { year: 2021, growth: 20, amount: "$6.8M" },
        ],

        marketCoverage: [
          {
            region: "Eastern Province",
            percentage: 80,
            notes: "Primary production area",
          },
          { region: "Europe", percentage: 90, notes: "Main export market" },
        ],

        majorClients: [
          "Swiss Chocolate Company",
          "German Importers",
          "UK Specialty Buyers",
        ],
        awards: [
          {
            name: "Best Agricultural Cooperative 2023",
            year: 2023,
            issuer: "Sierra Leone Agricultural Awards",
          },
          {
            name: "Organic Excellence Award",
            year: 2022,
            issuer: "European Organic Association",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/kenemacocoa",
          twitter: "https://twitter.com/kenemacocoa",
        },

        esgScores: {
          environmental: 95,
          social: 92,
          governance: 85,
          overall: 91,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 20,
          marketRisk: 40,
          overallRisk: 31,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "00667788990",
          accountName: "Kenema Cocoa Cooperative",
          branch: "Kenema Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Cooperative Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Cooperative Report",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== MINING (3 companies) ==========
      {
        registrationNumber: "M901234",
        taxId: "TAX-2023-001237",
        name: "Kono Diamond Mining Corporation",
        tradingName: "Kono Diamonds",
        description:
          "Diamond mining and export company operating in the Kono diamond fields with focus on ethical mining practices.",
        status: "active",
        verificationLevel: "verified",
        industry: "mining",
        businessType: "private_limited",
        ownership: "joint_venture",

        location: "Kono District",
        address: "Koidu Town, Kono District",
        city: "Koidu",
        district: "Kono",
        province: "Eastern Province",
        postalCode: "00222",
        country: "Sierra Leone",
        latitude: "8.6449",
        longitude: "-11.0102",

        contactEmail: "contact@konodiamonds.sl",
        contactPhone: "+232 78 901 234",
        website: "https://konodiamonds.sl",
        ceo: "Dr. Samuel Johnson",

        foundedYear: 2005,
        yearEnd: "December 31",
        employees: "200-500",
        revenue: "$50M-100M",
        capitalInvestment: "50000000",
        annualRevenueRange: "$50M-100M",
        financialSummary:
          "Profitable diamond mining operation with strong international partnerships. Focus on ethical sourcing.",

        rating: "4.4",
        complianceScore: 88,
        trustScore: 85,

        cacRegistrationDate: "2005-07-15",
        cacExpiryDate: "2025-07-15",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Operates 3 diamond mines in Kono district. Uses modern mining equipment and techniques.",
        marketPosition: "Leading diamond mining company in Sierra Leone",
        customerBase: "International diamond traders, jewelry manufacturers",

        tags: ["Mining", "Diamonds", "Export", "Extractive", "Ethical"],
        services: ["Diamond Mining", "Mineral Exploration", "Export Services"],
        certifications: [
          "Kimberley Process Certified",
          "ISO 14001 Environmental Certified",
          "Responsible Mining Certified",
        ],
        subsidiaries: ["Kono Mining Services Ltd"],

        recentNews: [
          {
            title: "Company discovers large diamond deposit",
            date: "2024-01-15",
            source: "Mining Weekly",
          },
          {
            title: "Kono Diamonds expands operations",
            date: "2023-12-10",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Dr. Samuel Johnson",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 30,
          },
          {
            name: "Mr. Zhang Wei",
            position: "Technical Director",
            nationality: "Chinese",
            isPrimary: false,
            sharePercentage: 25,
          },
        ],

        complianceRecords: [
          {
            type: "Mining License",
            status: "Active",
            completedDate: "2024-01-10",
            score: 95,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
          {
            type: "Export Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$85M" },
          { year: 2022, growth: 15, amount: "$72M" },
          { year: 2021, growth: 12, amount: "$63M" },
          { year: 2020, growth: 8, amount: "$56M" },
          { year: 2019, growth: 10, amount: "$52M" },
        ],

        marketCoverage: [
          {
            region: "Eastern Province",
            percentage: 100,
            notes: "Primary mining area",
          },
          {
            region: "International Markets",
            percentage: 100,
            notes: "Global export",
          },
        ],

        majorClients: [
          "International Diamond Traders",
          "Jewelry Manufacturers",
          "Government of Sierra Leone",
        ],
        awards: [
          {
            name: "Best Mining Company 2023",
            year: 2023,
            issuer: "Sierra Leone Mining Awards",
          },
          {
            name: "Environmental Stewardship Award",
            year: 2022,
            issuer: "African Mining Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/konodiamonds",
          linkedin: "https://linkedin.com/company/kono-diamond-mining",
        },

        esgScores: {
          environmental: 82,
          social: 88,
          governance: 85,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 35,
          complianceRisk: 30,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "00334455667",
          accountName: "Kono Diamond Mining Corporation",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Mining License Renewal",
            filingDate: "2024-01-31",
            status: "Filed",
            documentUrl: "https://docs.konodiamonds.sl/mining-license.pdf",
          },
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "M012345",
        taxId: "TAX-2023-009012",
        name: "Sierra Rutile Limited",
        tradingName: "Sierra Rutile",
        description:
          "World-class rutile mining operation producing titanium dioxide minerals for global markets.",
        status: "active",
        verificationLevel: "verified",
        industry: "mining",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Bonthe District",
        address: "Gbangbama, Bonthe District",
        city: "Gbangbama",
        district: "Bonthe",
        province: "Southern Province",
        postalCode: "00234",
        country: "Sierra Leone",
        latitude: "7.5260",
        longitude: "-12.5060",

        contactEmail: "info@sierrarutile.com",
        contactPhone: "+232 78 012 345",
        website: "https://sierrarutile.com",
        ceo: "Mr. John Sisay",

        foundedYear: 1967,
        yearEnd: "December 31",
        employees: "800-1200",
        revenue: "$200M+",
        capitalInvestment: "300000000",
        annualRevenueRange: "$200M+",
        financialSummary:
          "One of the world largest rutile producers with advanced mining technology.",

        rating: "4.5",
        complianceScore: 90,
        trustScore: 92,

        cacRegistrationDate: "1967-03-20",
        cacExpiryDate: "2027-03-20",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Large-scale dredging operation with mineral separation plant and port facilities.",
        marketPosition: "Global Rutile Producer",
        customerBase: "International Chemical Companies, Paint Manufacturers",

        tags: ["Mining", "Rutile", "Titanium", "Export", "Large-scale"],
        services: [
          "Rutile Mining",
          "Ilmenite Production",
          "Mineral Processing",
        ],
        certifications: [
          "ISO 9001:2015",
          "ISO 14001:2015",
          "Responsible Mining Initiative",
        ],
        subsidiaries: ["Sierra Rutile Logistics Ltd"],

        recentNews: [
          {
            title: "Sierra Rutile announces expansion project",
            date: "2024-01-30",
            source: "Mining Journal",
          },
          {
            title: "Company reports record production",
            date: "2023-12-20",
            source: "Financial Times",
          },
        ],

        directors: [
          {
            name: "Mr. John Sisay",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 10,
          },
          {
            name: "Ms. Sarah Johnson",
            position: "CFO",
            nationality: "British",
            isPrimary: false,
            sharePercentage: 5,
          },
        ],

        complianceRecords: [
          {
            type: "Mining License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 95,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 88,
          },
          {
            type: "Export Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$240M" },
          { year: 2022, growth: 18, amount: "$200M" },
          { year: 2021, growth: 15, amount: "$169M" },
        ],

        marketCoverage: [
          {
            region: "Southern Province",
            percentage: 100,
            notes: "Mining operations",
          },
          {
            region: "Global Markets",
            percentage: 100,
            notes: "International export",
          },
        ],

        majorClients: [
          "International Chemical Companies",
          "Paint Manufacturers",
          "Aerospace Industry",
        ],
        awards: [
          {
            name: "Best Mining Company Africa 2023",
            year: 2023,
            issuer: "African Mining Awards",
          },
          {
            name: "Environmental Management Award",
            year: 2022,
            issuer: "Global Mining Forum",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/sierra-rutile-limited",
          twitter: "https://twitter.com/sierrarutile",
        },

        esgScores: {
          environmental: 85,
          social: 90,
          governance: 88,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 25,
          marketRisk: 45,
          overallRisk: 34,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "00778899001",
          accountName: "Sierra Rutile Limited",
          branch: "International Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
          {
            type: "Environmental Impact Report",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl:
              "https://docs.sierrarutile.com/environmental-report.pdf",
          },
        ],
      },

      {
        registrationNumber: "M123456",
        taxId: "TAX-2023-010123",
        name: "Marampa Iron Ore Mines",
        tradingName: "Marampa Mines",
        description:
          "Iron ore mining and processing company revitalizing historic mining operations.",
        status: "active",
        verificationLevel: "verified",
        industry: "mining",
        businessType: "private_limited",
        ownership: "joint_venture",

        location: "Lunsar",
        address: "Marampa, Port Loko District",
        city: "Lunsar",
        district: "Port Loko",
        province: "Northern Province",
        postalCode: "00213",
        country: "Sierra Leone",
        latitude: "8.6840",
        longitude: "-12.5340",

        contactEmail: "info@marampamines.com",
        contactPhone: "+232 78 123 456",
        website: "https://marampamines.com",
        ceo: "Mr. David Keili",

        foundedYear: 2018,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$80M-120M",
        capitalInvestment: "80000000",
        annualRevenueRange: "$80M-120M",
        financialSummary:
          "Revitalized iron ore mining operation with modern infrastructure and processing.",

        rating: "4.2",
        complianceScore: 87,
        trustScore: 85,

        cacRegistrationDate: "2018-05-15",
        cacExpiryDate: "2028-05-15",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Modern iron ore processing plant with rail connection to port.",
        marketPosition: "Leading Iron Ore Producer",
        customerBase: "International Steel Companies, Export Markets",

        tags: ["Mining", "Iron Ore", "Export", "Revitalized"],
        services: ["Iron Ore Mining", "Processing", "Export Logistics"],
        certifications: [
          "Mining License",
          "Export Certification",
          "Environmental Compliance",
        ],
        subsidiaries: ["Marampa Logistics Ltd"],

        recentNews: [
          {
            title: "Marampa Mines resumes full production",
            date: "2024-01-20",
            source: "Mining Weekly",
          },
          {
            title: "Secures new export contracts",
            date: "2023-12-15",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. David Keili",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 20,
          },
          {
            name: "Mr. Robert Smith",
            position: "Technical Director",
            nationality: "Australian",
            isPrimary: false,
            sharePercentage: 15,
          },
        ],

        complianceRecords: [
          {
            type: "Mining License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 90,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 40, amount: "$110M" },
          { year: 2022, growth: 35, amount: "$78M" },
          { year: 2021, growth: 30, amount: "$58M" },
        ],

        marketCoverage: [
          {
            region: "Northern Province",
            percentage: 100,
            notes: "Mining operations",
          },
          {
            region: "International Markets",
            percentage: 100,
            notes: "Export focused",
          },
        ],

        majorClients: [
          "Chinese Steel Mills",
          "European Manufacturers",
          "International Traders",
        ],
        awards: [
          {
            name: "Mining Comeback Award 2023",
            year: 2023,
            issuer: "African Mining Journal",
          },
          {
            name: "Community Development Award",
            year: 2022,
            issuer: "Sierra Leone Mining Awards",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/marampa-mines",
        },

        esgScores: {
          environmental: 80,
          social: 85,
          governance: 82,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 40,
          complianceRisk: 30,
          marketRisk: 45,
          overallRisk: 38,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "00889900112",
          accountName: "Marampa Iron Ore Mines",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "EY Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Mining Report",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== LOGISTICS & SHIPPING (3 companies) ==========
      {
        registrationNumber: "G567890",
        taxId: "TAX-2023-001238",
        name: "Freetown Port Authority",
        tradingName: "Freetown Port",
        description:
          "Government agency managing port operations and maritime activities in Sierra Leone.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Queen Elizabeth II Quay, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4940",
        longitude: "-13.2340",

        contactEmail: "info@freetownport.gov.sl",
        contactPhone: "+232 22 234 567",
        website: "https://freetownport.gov.sl",
        ceo: "Mr. Alieu Pat-Sowe",

        foundedYear: 1961,
        yearEnd: "December 31",
        employees: "500-1000",
        revenue: "$200M+",
        capitalInvestment: "150000000",
        annualRevenueRange: "$200M+",
        financialSummary:
          "Major national port generating significant revenue from shipping and logistics services.",

        rating: "4.0",
        complianceScore: 94,
        trustScore: 90,

        cacRegistrationDate: "1961-10-01",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Operates main seaport handling 80% of Sierra Leone imports/exports. 24/7 operations.",
        marketPosition: "National Port Authority",
        customerBase:
          "Shipping lines, importers, exporters, logistics companies",

        tags: ["Logistics", "Shipping", "Government", "Port", "Maritime"],
        services: [
          "Port Operations",
          "Cargo Handling",
          "Shipping Services",
          "Customs Clearance",
          "Warehousing",
        ],
        certifications: [
          "ISO 9001:2015",
          "International Ship and Port Facility Security (ISPS) Code Compliant",
        ],
        subsidiaries: ["Freetown Container Terminal Ltd"],

        recentNews: [
          {
            title: "Port Authority records highest container volume",
            date: "2024-01-20",
            source: "Maritime News",
          },
          {
            title: "New terminal expansion project announced",
            date: "2023-12-01",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Alieu Pat-Sowe",
            position: "Director General",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Aminata Koroma",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Port License",
            status: "Active",
            completedDate: "2024-01-01",
            score: 100,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 92,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-11-30",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$230M" },
          { year: 2022, growth: 12, amount: "$200M" },
          { year: 2021, growth: 8, amount: "$178M" },
          { year: 2020, growth: 5, amount: "$165M" },
          { year: 2019, growth: 10, amount: "$157M" },
        ],

        marketCoverage: [
          { region: "National", percentage: 100, notes: "Primary seaport" },
          {
            region: "West Africa",
            percentage: 60,
            notes: "Regional shipping hub",
          },
        ],

        majorClients: [
          "Maersk Line",
          "CMA CGM",
          "Mediterranean Shipping Company",
          "Major Importers/Exporters",
        ],
        awards: [
          {
            name: "Best Port Authority West Africa 2023",
            year: 2023,
            issuer: "African Maritime Awards",
          },
          {
            name: "Excellence in Operations",
            year: 2022,
            issuer: "Sierra Leone Business Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/freetownport",
          twitter: "https://twitter.com/freetownport",
          linkedin: "https://linkedin.com/company/freetown-port-authority",
        },

        esgScores: {
          environmental: 80,
          social: 85,
          governance: 90,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 30,
          complianceRisk: 25,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "00445566778",
          accountName: "Freetown Port Authority",
          branch: "Central Bank",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Auditor General Office",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.freetownport.gov.sl/annual-report.pdf",
          },
          {
            type: "Financial Statement",
            filingDate: "2024-04-15",
            status: "Filed",
            documentUrl:
              "https://docs.freetownport.gov.sl/financial-statement.pdf",
          },
        ],
      },

      {
        registrationNumber: "L234567",
        taxId: "TAX-2023-011234",
        name: "Sierra Leone Airways",
        tradingName: "SLA",
        description:
          "National flag carrier providing domestic and regional air transport services.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Lungi International Airport, Freetown",
        city: "Freetown",
        district: "Western Area Rural",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.6171",
        longitude: "-13.1955",

        contactEmail: "info@sierraleoneairways.gov.sl",
        contactPhone: "+232 22 345 678",
        website: "https://sierraleoneairways.gov.sl",
        ceo: "Captain Mohamed Bangura",

        foundedYear: 1961,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$50M-80M",
        capitalInvestment: "100000000",
        annualRevenueRange: "$50M-80M",
        financialSummary:
          "National airline undergoing modernization with focus on regional connectivity.",

        rating: "3.8",
        complianceScore: 88,
        trustScore: 85,

        cacRegistrationDate: "1961-07-01",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Operates domestic and regional flights with modern fleet. Hub at Lungi International Airport.",
        marketPosition: "National Flag Carrier",
        customerBase: "Domestic Travelers, Regional Passengers, Cargo Shippers",

        tags: ["Aviation", "Airline", "Transport", "Government"],
        services: [
          "Passenger Flights",
          "Cargo Services",
          "Charter Flights",
          "Ground Handling",
        ],
        certifications: [
          "IATA Member",
          "ICAO Compliant",
          "National Aviation License",
        ],
        subsidiaries: ["SLA Maintenance Ltd"],

        recentNews: [
          {
            title: "SLA launches new regional routes",
            date: "2024-01-25",
            source: "Aviation News",
          },
          {
            title: "Airline receives new aircraft",
            date: "2023-12-10",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Captain Mohamed Bangura",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Sarah Johnson",
            position: "Commercial Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Aviation License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 92,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
          {
            type: "Security Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$65M" },
          { year: 2022, growth: 20, amount: "$52M" },
          { year: 2021, growth: 15, amount: "$43M" },
        ],

        marketCoverage: [
          { region: "Domestic", percentage: 100, notes: "All major airports" },
          { region: "West Africa", percentage: 70, notes: "Regional routes" },
          {
            region: "International",
            percentage: 40,
            notes: "Limited long-haul",
          },
        ],

        majorClients: [
          "Government",
          "NGOs",
          "Business Travelers",
          "Cargo Companies",
        ],
        awards: [
          {
            name: "Best National Carrier 2023",
            year: 2023,
            issuer: "West Africa Aviation Awards",
          },
          {
            name: "Safety Excellence Award",
            year: 2022,
            issuer: "African Aviation Association",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/sierraleoneairways",
          twitter: "https://twitter.com/slairways",
          instagram: "https://instagram.com/sierraleoneairways",
        },

        esgScores: {
          environmental: 75,
          social: 85,
          governance: 80,
          overall: 80,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 40,
          complianceRisk: 30,
          marketRisk: 45,
          overallRisk: 38,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "00990011223",
          accountName: "Sierra Leone Airways",
          branch: "Government Account",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Qualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "L345678",
        taxId: "TAX-2023-012345",
        name: "Panalpina Sierra Leone",
        tradingName: "Panalpina SL",
        description:
          "International logistics and freight forwarding company with comprehensive supply chain solutions.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "25 Wilkinson Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4835",
        longitude: "-13.2310",

        contactEmail: "info.sl@panalpina.com",
        contactPhone: "+232 22 456 789",
        website: "https://panalpina.com/sl",
        ceo: "Mr. James Wilson",

        foundedYear: 1995,
        yearEnd: "December 31",
        employees: "100-200",
        revenue: "$30M-50M",
        capitalInvestment: "10000000",
        annualRevenueRange: "$30M-50M",
        financialSummary:
          "Global logistics provider with strong presence in Sierra Leone for mining and aid logistics.",

        rating: "4.4",
        complianceScore: 92,
        trustScore: 94,

        cacRegistrationDate: "1995-03-15",
        cacExpiryDate: "2025-03-15",
        lastVerifiedAt: new Date("2024-01-28"),

        operationalDetails:
          "Specializes in project logistics for mining sector and humanitarian aid transportation.",
        marketPosition: "Leading Logistics Provider",
        customerBase:
          "Mining Companies, NGOs, Importers/Exporters, Manufacturers",

        tags: ["Logistics", "Freight", "Supply Chain", "International"],
        services: [
          "Freight Forwarding",
          "Customs Clearance",
          "Project Logistics",
          "Warehousing",
          "Distribution",
        ],
        certifications: ["ISO 9001:2015", "IATA Certified", "FIATA Member"],
        subsidiaries: [],

        recentNews: [
          {
            title: "Panalpina handles major mining equipment shipment",
            date: "2024-01-30",
            source: "Logistics News",
          },
          {
            title: "Expands warehouse facilities in Freetown",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. James Wilson",
            position: "Country Manager",
            nationality: "British",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Kamara",
            position: "Operations Manager",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Customs Compliance",
            status: "Excellent",
            completedDate: "2024-01-20",
            score: 96,
          },
          {
            type: "Security Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 94,
          },
          {
            type: "Trade Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$45M" },
          { year: 2022, growth: 15, amount: "$38M" },
          { year: 2021, growth: 12, amount: "$33M" },
        ],

        marketCoverage: [
          {
            region: "Sierra Leone",
            percentage: 90,
            notes: "Nationwide services",
          },
          { region: "West Africa", percentage: 80, notes: "Regional network" },
          { region: "Global", percentage: 100, notes: "International network" },
        ],

        majorClients: [
          "Mining Companies",
          "UN Agencies",
          "International NGOs",
          "Manufacturers",
        ],
        awards: [
          {
            name: "Best Logistics Company 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Excellence in Supply Chain",
            year: 2022,
            issuer: "African Logistics Awards",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/panalpina-sierra-leone",
          twitter: "https://twitter.com/panalpinasi",
        },

        esgScores: {
          environmental: 82,
          social: 88,
          governance: 90,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "01001122334",
          accountName: "Panalpina Sierra Leone Ltd",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== TECHNOLOGY (2 companies) ==========
      {
        registrationNumber: "T234567",
        taxId: "TAX-2023-001239",
        name: "Salone Tech Solutions",
        tradingName: "Salone Tech",
        description:
          "Innovative tech startup providing software development and IT consulting services across West Africa.",
        status: "active",
        verificationLevel: "pending",
        industry: "technology",
        businessType: "private_limited",
        ownership: "local",

        location: "Freetown",
        address: "29 Wilberforce Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4830",
        longitude: "-13.2330",

        contactEmail: "hello@salonetech.sl",
        contactPhone: "+232 76 234 567",
        website: "https://salonetech.sl",
        ceo: "Ms. Aminata Bangura",

        foundedYear: 2020,
        yearEnd: "December 31",
        employees: "10-50",
        revenue: "$1M-5M",
        capitalInvestment: "500000",
        annualRevenueRange: "$1M-5M",
        financialSummary:
          "Fast-growing tech startup with innovative digital solutions for African markets.",

        rating: "4.7",
        complianceScore: 82,
        trustScore: 85,

        cacRegistrationDate: "2020-05-15",
        cacExpiryDate: "2028-05-15",
        lastVerifiedAt: new Date("2023-11-30"),

        operationalDetails:
          "Specializes in custom software development, mobile apps, and digital transformation services.",
        marketPosition: "Leading tech startup in Sierra Leone",
        customerBase: "Startups, SMEs, Corporations, Government",

        tags: ["Technology", "Startup", "Software", "IT", "Digital"],
        services: [
          "Software Development",
          "IT Consulting",
          "Web Development",
          "Mobile Apps",
          "Digital Transformation",
        ],
        certifications: ["Microsoft Partner", "Google Cloud Partner"],
        subsidiaries: ["Salone Digital Academy"],

        recentNews: [
          {
            title: "Salone Tech launches new e-commerce platform",
            date: "2024-01-10",
            source: "Tech Africa",
          },
          {
            title: "Company wins innovation grant",
            date: "2023-12-05",
            source: "Startup Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Ms. Aminata Bangura",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 70,
          },
          {
            name: "Mr. Mohamed Turay",
            position: "CTO",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Business Registration",
            status: "Active",
            completedDate: "2024-01-05",
            score: 100,
          },
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 150, amount: "$2.5M" },
          { year: 2022, growth: 100, amount: "$1M" },
          { year: 2021, growth: 50, amount: "$500K" },
        ],

        marketCoverage: [
          { region: "Sierra Leone", percentage: 80, notes: "Primary market" },
          {
            region: "West Africa",
            percentage: 40,
            notes: "Expanding regionally",
          },
        ],

        majorClients: [
          "Local Banks",
          "Telecom Companies",
          "Government Ministries",
        ],
        awards: [
          {
            name: "Best Tech Startup 2023",
            year: 2023,
            issuer: "Sierra Leone Tech Awards",
          },
          {
            name: "Innovation Award",
            year: 2022,
            issuer: "West Africa Digital Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/salonetech",
          twitter: "https://twitter.com/salonetech",
          linkedin: "https://linkedin.com/company/salone-tech-solutions",
          instagram: "https://instagram.com/salonetech",
        },

        esgScores: {
          environmental: 75,
          social: 85,
          governance: 80,
          overall: 80,
        },
        riskAssessment: {
          financialRisk: 40,
          operationalRisk: 30,
          complianceRisk: 25,
          marketRisk: 35,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "UBA Sierra Leone",
          accountNumber: "00556677889",
          accountName: "Salone Tech Solutions Ltd",
          branch: "Freetown Main Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Small Business Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "T345678",
        taxId: "TAX-2023-013456",
        name: "Digital Sierra Leone",
        tradingName: "Digital SL",
        description:
          "Government digital transformation agency implementing national ICT infrastructure projects.",
        status: "active",
        verificationLevel: "verified",
        industry: "technology",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Youyi Building, Brookfields, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4800",
        longitude: "-13.2400",

        contactEmail: "info@digitalsl.gov.sl",
        contactPhone: "+232 22 567 890",
        website: "https://digitalsl.gov.sl",
        ceo: "Dr. David Moinina Sengeh",

        foundedYear: 2018,
        yearEnd: "December 31",
        employees: "100-200",
        revenue: "$20M-40M",
        capitalInvestment: "50000000",
        annualRevenueRange: "$20M-40M",
        financialSummary:
          "Government agency driving digital transformation with international partnership funding.",

        rating: "4.3",
        complianceScore: 95,
        trustScore: 96,

        cacRegistrationDate: "2018-07-01",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Implements national ICT infrastructure, e-government services, and digital literacy programs.",
        marketPosition: "National Digital Transformation Agency",
        customerBase: "Government Ministries, Citizens, Businesses",

        tags: ["Technology", "Government", "Digital", "ICT", "Infrastructure"],
        services: [
          "E-Government Services",
          "ICT Infrastructure",
          "Digital Literacy Training",
          "Tech Policy",
        ],
        certifications: [
          "Government Standards Compliant",
          "International Partnership Certified",
        ],
        subsidiaries: ["Digital SL Academy"],

        recentNews: [
          {
            title: "Digital SL launches national broadband project",
            date: "2024-01-30",
            source: "Tech Africa",
          },
          {
            title: "Agency receives World Bank funding for digital inclusion",
            date: "2023-12-20",
            source: "Government News",
          },
        ],

        directors: [
          {
            name: "Dr. David Moinina Sengeh",
            position: "Chief Innovation Officer",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Edna Kargbo",
            position: "Director of Operations",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Government Compliance",
            status: "Active",
            completedDate: "2024-01-20",
            score: 98,
          },
          {
            type: "Project Accountability",
            status: "Active",
            completedDate: "2023-12-31",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 35, amount: "$38M" },
          { year: 2022, growth: 30, amount: "$28M" },
          { year: 2021, growth: 25, amount: "$22M" },
        ],

        marketCoverage: [
          { region: "National", percentage: 100, notes: "Government mandate" },
          { region: "All Districts", percentage: 85, notes: "Ongoing rollout" },
        ],

        majorClients: [
          "Government Ministries",
          "International Partners",
          "Educational Institutions",
        ],
        awards: [
          {
            name: "Best Digital Government 2023",
            year: 2023,
            issuer: "African Digital Awards",
          },
          {
            name: "Innovation in Public Service",
            year: 2022,
            issuer: "UN Public Service Awards",
          },
        ],

        socialMedia: {
          twitter: "https://twitter.com/digitalsl",
          linkedin: "https://linkedin.com/company/digital-sierra-leone",
        },

        esgScores: {
          environmental: 80,
          social: 95,
          governance: 92,
          overall: 89,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 25,
          complianceRisk: 15,
          marketRisk: 20,
          overallRisk: 20,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "01112233445",
          accountName: "Digital Sierra Leone",
          branch: "Government Account",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Auditor General Office",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== HEALTHCARE (2 companies) ==========
      {
        registrationNumber: "H890123",
        taxId: "TAX-2023-001240",
        name: "Bo Healthcare Center",
        tradingName: "Bo Medical Center",
        description:
          "Modern healthcare facility providing comprehensive medical services in the Southern Province.",
        status: "active",
        verificationLevel: "verified",
        industry: "healthcare",
        businessType: "private_limited",
        ownership: "mixed",

        location: "Bo",
        address: "Hospital Road, Bo",
        city: "Bo",
        district: "Bo",
        province: "Southern Province",
        postalCode: "00233",
        country: "Sierra Leone",
        latitude: "7.9647",
        longitude: "-11.7383",

        contactEmail: "contact@bohealthcare.sl",
        contactPhone: "+232 77 890 123",
        website: "https://bohealthcare.sl",
        ceo: "Dr. Isata Koroma",

        foundedYear: 2015,
        yearEnd: "December 31",
        employees: "100-200",
        revenue: "$10M-20M",
        capitalInvestment: "8000000",
        annualRevenueRange: "$10M-20M",
        financialSummary:
          "Leading private healthcare provider in Southern Sierra Leone with strong financial performance.",

        rating: "4.5",
        complianceScore: 90,
        trustScore: 92,

        cacRegistrationDate: "2015-03-10",
        cacExpiryDate: "2025-03-10",
        lastVerifiedAt: new Date("2024-01-18"),

        operationalDetails:
          "Operates 100-bed hospital with specialized departments. 24/7 emergency services.",
        marketPosition: "Leading private hospital in Southern Province",
        customerBase: "Patients from Southern Province and neighboring regions",

        tags: ["Healthcare", "Hospital", "Medical", "Southern", "Wellness"],
        services: [
          "General Medicine",
          "Surgery",
          "Pediatrics",
          "Maternity",
          "Laboratory Services",
          "Pharmacy",
        ],
        certifications: [
          "Ministry of Health Licensed",
          "ISO 9001:2015 Certified",
        ],
        subsidiaries: ["Bo Diagnostic Center"],

        recentNews: [
          {
            title: "Hospital opens new pediatric wing",
            date: "2024-01-15",
            source: "Health Sierra Leone",
          },
          {
            title: "Partnership with international health organization",
            date: "2023-12-20",
            source: "Medical News",
          },
        ],

        directors: [
          {
            name: "Dr. Isata Koroma",
            position: "Medical Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 40,
          },
          {
            name: "Mr. David Johnson",
            position: "Administrative Director",
            nationality: "British",
            isPrimary: false,
            sharePercentage: 30,
          },
        ],

        complianceRecords: [
          {
            type: "Medical License",
            status: "Active",
            completedDate: "2024-01-01",
            score: 95,
          },
          {
            type: "Health & Safety",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
          {
            type: "Pharmacy License",
            status: "Active",
            completedDate: "2023-11-30",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$18M" },
          { year: 2022, growth: 18, amount: "$15M" },
          { year: 2021, growth: 15, amount: "$12.7M" },
          { year: 2020, growth: 10, amount: "$11M" },
          { year: 2019, growth: 12, amount: "$10M" },
        ],

        marketCoverage: [
          {
            region: "Southern Province",
            percentage: 70,
            notes: "Primary service area",
          },
          {
            region: "Eastern Province",
            percentage: 30,
            notes: "Secondary service area",
          },
          {
            region: "Northern Province",
            percentage: 10,
            notes: "Specialized referrals",
          },
        ],

        majorClients: [
          "Insurance Companies",
          "Corporate Clients",
          "International Organizations",
        ],
        awards: [
          {
            name: "Best Private Hospital 2023",
            year: 2023,
            issuer: "Sierra Leone Healthcare Awards",
          },
          {
            name: "Excellence in Patient Care",
            year: 2022,
            issuer: "West Africa Medical Association",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/bohealthcare",
          twitter: "https://twitter.com/bohealthcare",
        },

        esgScores: {
          environmental: 80,
          social: 95,
          governance: 85,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 20,
          marketRisk: 25,
          overallRisk: 25,
        },

        bankDetails: {
          bankName: "First International Bank",
          accountNumber: "00667788990",
          accountName: "Bo Healthcare Center Ltd",
          branch: "Bo Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Healthcare Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.bohealthcare.sl/annual-return.pdf",
          },
          {
            type: "Medical License Renewal",
            filingDate: "2024-01-31",
            status: "Filed",
            documentUrl: "https://docs.bohealthcare.sl/medical-license.pdf",
          },
        ],
      },

      {
        registrationNumber: "H901234",
        taxId: "TAX-2023-014567",
        name: "Connaught Hospital",
        tradingName: "Connaught",
        description:
          "National referral hospital and teaching facility providing tertiary healthcare services.",
        status: "active",
        verificationLevel: "verified",
        industry: "healthcare",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Lightfoot Boston Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4865",
        longitude: "-13.2365",

        contactEmail: "info@connaught.gov.sl",
        contactPhone: "+232 22 678 901",
        website: "https://connaught.gov.sl",
        ceo: "Dr. Thomas Samba",

        foundedYear: 1912,
        yearEnd: "December 31",
        employees: "500-800",
        revenue: "$40M-60M",
        capitalInvestment: "50000000",
        annualRevenueRange: "$40M-60M",
        financialSummary:
          "National referral hospital with government funding and international partnerships.",

        rating: "4.2",
        complianceScore: 92,
        trustScore: 94,

        cacRegistrationDate: "1912-03-15",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "300-bed teaching hospital with specialized departments and research facilities.",
        marketPosition: "National Referral Hospital",
        customerBase:
          "Patients from across Sierra Leone, Medical Students, Researchers",

        tags: ["Healthcare", "Hospital", "Teaching", "Government", "Referral"],
        services: [
          "Specialized Medicine",
          "Surgery",
          "Teaching Hospital",
          "Research",
          "Emergency Services",
        ],
        certifications: [
          "Ministry of Health Accredited",
          "Teaching Hospital Certified",
        ],
        subsidiaries: ["Connaught Medical School"],

        recentNews: [
          {
            title: "Connaught Hospital completes modernization project",
            date: "2024-01-30",
            source: "Health Sierra Leone",
          },
          {
            title: "Launches new cardiac care unit",
            date: "2023-12-15",
            source: "Medical News",
          },
        ],

        directors: [
          {
            name: "Dr. Thomas Samba",
            position: "Medical Superintendent",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Marian Bangura",
            position: "Administrative Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Hospital License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 98,
          },
          {
            type: "Teaching Accreditation",
            status: "Active",
            completedDate: "2023-12-31",
            score: 95,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-20",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 12, amount: "$56M" },
          { year: 2022, growth: 10, amount: "$50M" },
          { year: 2021, growth: 8, amount: "$45M" },
        ],

        marketCoverage: [
          { region: "National", percentage: 100, notes: "Referral hospital" },
          {
            region: "Specialized Services",
            percentage: 100,
            notes: "National coverage",
          },
        ],

        majorClients: [
          "Government",
          "Medical Students",
          "Research Institutions",
          "International Partners",
        ],
        awards: [
          {
            name: "Best Public Hospital 2023",
            year: 2023,
            issuer: "Sierra Leone Healthcare Awards",
          },
          {
            name: "Teaching Excellence Award",
            year: 2022,
            issuer: "West Africa Medical Association",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/connaughthospital",
          twitter: "https://twitter.com/connaught_hosp",
        },

        esgScores: {
          environmental: 78,
          social: 96,
          governance: 90,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 25,
          complianceRisk: 15,
          marketRisk: 20,
          overallRisk: 20,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "01223344556",
          accountName: "Connaught Hospital",
          branch: "Government Account",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== EDUCATION (2 companies) ==========
      {
        registrationNumber: "E123789",
        taxId: "TAX-2023-001241",
        name: "Fourah Bay College",
        tradingName: "FBC",
        description:
          "Oldest university in West Africa, providing tertiary education and research.",
        status: "active",
        verificationLevel: "verified",
        industry: "education",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Mount Aureol, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4799",
        longitude: "-13.2172",

        contactEmail: "registrar@fbc.edu.sl",
        contactPhone: "+232 22 222 333",
        website: "https://fbc.edu.sl",
        ceo: "Prof. Alghali Bashiru",

        foundedYear: 1827,
        yearEnd: "December 31",
        employees: "500+",
        revenue: "$50M+",
        capitalInvestment: "100000000",
        annualRevenueRange: "$50M+",
        financialSummary:
          "Premier tertiary institution with government funding and international partnerships.",

        rating: "4.3",
        complianceScore: 93,
        trustScore: 95,

        cacRegistrationDate: "1827-02-18",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Operates multiple faculties and research centers. Over 10,000 students enrolled.",
        marketPosition: "Leading university in Sierra Leone",
        customerBase:
          "Students, Researchers, Government, International Partners",

        tags: ["Education", "University", "Higher Education", "Research"],
        services: [
          "Undergraduate Programs",
          "Postgraduate Programs",
          "Research Services",
          "Consulting",
        ],
        certifications: [
          "Ministry of Education Accredited",
          "International University Associations",
        ],
        subsidiaries: ["FBC Press", "FBC Consultancy Ltd"],

        recentNews: [
          {
            title: "FBC launches new engineering programs",
            date: "2024-01-25",
            source: "Education Times",
          },
          {
            title: "University receives research grant",
            date: "2023-12-15",
            source: "Academic News",
          },
        ],

        directors: [
          {
            name: "Prof. Alghali Bashiru",
            position: "Vice Chancellor",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Dr. Fatima Bangura",
            position: "Registrar",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Education License",
            status: "Active",
            completedDate: "2024-01-01",
            score: 100,
          },
          {
            type: "Accreditation",
            status: "Active",
            completedDate: "2023-12-31",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 8, amount: "$54M" },
          { year: 2022, growth: 7, amount: "$50M" },
          { year: 2021, growth: 6, amount: "$46.5M" },
        ],

        marketCoverage: [
          {
            region: "Sierra Leone",
            percentage: 100,
            notes: "National coverage",
          },
          { region: "West Africa", percentage: 60, notes: "Regional students" },
          {
            region: "International",
            percentage: 20,
            notes: "International students",
          },
        ],

        majorClients: [
          "Government of Sierra Leone",
          "International Students",
          "Research Partners",
        ],
        awards: [
          {
            name: "Best University Sierra Leone 2023",
            year: 2023,
            issuer: "Education Excellence Awards",
          },
          {
            name: "Research Excellence Award",
            year: 2022,
            issuer: "African Universities Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/fourahbaycollege",
          twitter: "https://twitter.com/fbcollege",
          linkedin: "https://linkedin.com/school/fourah-bay-college",
        },

        esgScores: {
          environmental: 75,
          social: 95,
          governance: 90,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 20,
          operationalRisk: 25,
          complianceRisk: 15,
          marketRisk: 20,
          overallRisk: 20,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "00778899001",
          accountName: "Fourah Bay College",
          branch: "Central Bank",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-03-31",
            status: "Filed",
            documentUrl: "https://docs.fbc.edu.sl/annual-report.pdf",
          },
          {
            type: "Accreditation Renewal",
            filingDate: "2024-02-28",
            status: "Filed",
            documentUrl: "https://docs.fbc.edu.sl/accreditation.pdf",
          },
        ],
      },

      {
        registrationNumber: "E234890",
        taxId: "TAX-2023-015678",
        name: "Limkokwing University of Creative Technology",
        tradingName: "Limkokwing SL",
        description:
          "International university specializing in creative arts, design, and technology education.",
        status: "active",
        verificationLevel: "verified",
        industry: "education",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "Hill Station, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4700",
        longitude: "-13.2500",

        contactEmail: "info@limkokwing.edu.sl",
        contactPhone: "+232 76 345 678",
        website: "https://limkokwing.edu.sl",
        ceo: "Prof. Francis Stevens George",

        foundedYear: 2009,
        yearEnd: "December 31",
        employees: "100-200",
        revenue: "$20M-30M",
        capitalInvestment: "30000000",
        annualRevenueRange: "$20M-30M",
        financialSummary:
          "International university with focus on creative industries and technology education.",

        rating: "4.4",
        complianceScore: 90,
        trustScore: 92,

        cacRegistrationDate: "2009-03-15",
        cacExpiryDate: "2029-03-15",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Modern campus with focus on creative arts, design, and technology programs.",
        marketPosition: "Leading Creative University",
        customerBase: "Students, Creative Professionals, Industry Partners",

        tags: ["Education", "University", "Creative", "Design", "Technology"],
        services: [
          "Degree Programs",
          "Diploma Courses",
          "Professional Training",
          "Creative Services",
        ],
        certifications: [
          "Ministry of Education Accredited",
          "International University Network",
        ],
        subsidiaries: ["Limkokwing Creative Agency"],

        recentNews: [
          {
            title: "Limkokwing launches new digital media programs",
            date: "2024-01-30",
            source: "Education Times",
          },
          {
            title: "Partners with international design firms",
            date: "2023-12-20",
            source: "Creative News",
          },
        ],

        directors: [
          {
            name: "Prof. Francis Stevens George",
            position: "Vice Chancellor",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 10,
          },
          {
            name: "Mr. Tan Sri Lim Kok Wing",
            position: "Founder",
            nationality: "Malaysian",
            isPrimary: false,
            sharePercentage: 60,
          },
        ],

        complianceRecords: [
          {
            type: "Education License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 95,
          },
          {
            type: "Accreditation",
            status: "Active",
            completedDate: "2023-12-31",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$28M" },
          { year: 2022, growth: 12, amount: "$24M" },
          { year: 2021, growth: 10, amount: "$21M" },
        ],

        marketCoverage: [
          { region: "Sierra Leone", percentage: 90, notes: "Primary market" },
          { region: "West Africa", percentage: 70, notes: "Regional students" },
          { region: "International", percentage: 40, notes: "Global network" },
        ],

        majorClients: [
          "Students",
          "Creative Industry",
          "Government",
          "International Partners",
        ],
        awards: [
          {
            name: "Best Creative University 2023",
            year: 2023,
            issuer: "African Education Awards",
          },
          {
            name: "Innovation in Education",
            year: 2022,
            issuer: "Global Education Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/limkokwingsl",
          twitter: "https://twitter.com/limkokwingsl",
          instagram: "https://instagram.com/limkokwingsl",
        },

        esgScores: {
          environmental: 80,
          social: 90,
          governance: 85,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "UBA Sierra Leone",
          accountNumber: "01334455667",
          accountName: "Limkokwing University SL",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "International Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== CONSTRUCTION (2 companies) ==========
      {
        registrationNumber: "C456789",
        taxId: "TAX-2023-016789",
        name: "Sierra Leone Construction Company",
        tradingName: "SLCC",
        description:
          "Leading construction company specializing in infrastructure development and building projects.",
        status: "active",
        verificationLevel: "verified",
        industry: "construction",
        businessType: "private_limited",
        ownership: "local",

        location: "Freetown",
        address: "16 Campbell Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4820",
        longitude: "-13.2320",

        contactEmail: "info@slcc.sl",
        contactPhone: "+232 76 456 789",
        website: "https://slcc.sl",
        ceo: "Mr. Samuel B. Kamara",

        foundedYear: 1998,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$50M-80M",
        capitalInvestment: "40000000",
        annualRevenueRange: "$50M-80M",
        financialSummary:
          "Established construction company with strong track record in major infrastructure projects.",

        rating: "4.3",
        complianceScore: 88,
        trustScore: 90,

        cacRegistrationDate: "1998-05-20",
        cacExpiryDate: "2028-05-20",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Specializes in road construction, building projects, and infrastructure development.",
        marketPosition: "Leading Local Construction Company",
        customerBase: "Government, Private Sector, International Donors",

        tags: ["Construction", "Infrastructure", "Building", "Engineering"],
        services: [
          "Civil Engineering",
          "Building Construction",
          "Road Construction",
          "Project Management",
        ],
        certifications: [
          "Ministry of Works Licensed",
          "ISO 9001:2015 Certified",
        ],
        subsidiaries: ["SLCC Materials Ltd", "SLCC Engineering"],

        recentNews: [
          {
            title: "SLCC wins major road construction contract",
            date: "2024-01-30",
            source: "Construction News",
          },
          {
            title: "Company completes hospital construction project",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Samuel B. Kamara",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 45,
          },
          {
            name: "Ms. Fatmata Sesay",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Construction License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 92,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 88,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 85,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$75M" },
          { year: 2022, growth: 18, amount: "$62M" },
          { year: 2021, growth: 15, amount: "$53M" },
        ],

        marketCoverage: [
          {
            region: "National",
            percentage: 85,
            notes: "Major projects nationwide",
          },
          {
            region: "Urban Centers",
            percentage: 95,
            notes: "Strong in cities",
          },
        ],

        majorClients: [
          "Government Ministries",
          "International NGOs",
          "Private Developers",
        ],
        awards: [
          {
            name: "Best Construction Company 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Excellence in Infrastructure",
            year: 2022,
            issuer: "West Africa Construction Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/slccconstruction",
          linkedin:
            "https://linkedin.com/company/sierra-leone-construction-company",
        },

        esgScores: {
          environmental: 78,
          social: 85,
          governance: 82,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Rokel Commercial Bank",
          accountNumber: "01445566778",
          accountName: "Sierra Leone Construction Company",
          branch: "Freetown Main",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "C567890",
        taxId: "TAX-2023-017890",
        name: "China Railway Sierra Leone",
        tradingName: "CRSL",
        description:
          "International construction company specializing in large-scale infrastructure projects.",
        status: "active",
        verificationLevel: "verified",
        industry: "construction",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "12 Pademba Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4810",
        longitude: "-13.2330",

        contactEmail: "info@crsl.com",
        contactPhone: "+232 76 567 890",
        website: "https://crsl.com",
        ceo: "Mr. Li Wei",

        foundedYear: 2010,
        yearEnd: "December 31",
        employees: "500-800",
        revenue: "$100M+",
        capitalInvestment: "80000000",
        annualRevenueRange: "$100M+",
        financialSummary:
          "Major international contractor with expertise in large infrastructure projects.",

        rating: "4.2",
        complianceScore: 85,
        trustScore: 88,

        cacRegistrationDate: "2010-08-15",
        cacExpiryDate: "2030-08-15",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Specializes in highways, bridges, railways, and major building projects.",
        marketPosition: "Major International Contractor",
        customerBase: "Government, International Donors, Large Corporations",

        tags: [
          "Construction",
          "Infrastructure",
          "International",
          "Engineering",
        ],
        services: [
          "Highway Construction",
          "Bridge Building",
          "Railway Construction",
          "Major Buildings",
        ],
        certifications: [
          "International Construction Standards",
          "China Railway Group Certified",
        ],
        subsidiaries: ["CRSL Materials Ltd"],

        recentNews: [
          {
            title: "CRSL completes major highway project",
            date: "2024-01-25",
            source: "Infrastructure News",
          },
          {
            title: "Wins contract for new airport terminal",
            date: "2023-12-15",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Li Wei",
            position: "Country Manager",
            nationality: "Chinese",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Mr. Mohamed Conteh",
            position: "Deputy Manager",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Construction License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 90,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-20",
            score: 82,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$125M" },
          { year: 2022, growth: 22, amount: "$100M" },
          { year: 2021, growth: 20, amount: "$82M" },
        ],

        marketCoverage: [
          {
            region: "National",
            percentage: 90,
            notes: "Major projects nationwide",
          },
          {
            region: "Infrastructure Focus",
            percentage: 100,
            notes: "Specialized in large projects",
          },
        ],

        majorClients: [
          "Government of Sierra Leone",
          "Chinese Government",
          "International Development Banks",
        ],
        awards: [
          {
            name: "Best Infrastructure Project 2023",
            year: 2023,
            issuer: "African Infrastructure Awards",
          },
          {
            name: "Engineering Excellence Award",
            year: 2022,
            issuer: "International Engineering Forum",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/china-railway-sierra-leone",
        },

        esgScores: {
          environmental: 75,
          social: 80,
          governance: 78,
          overall: 78,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 40,
          complianceRisk: 30,
          marketRisk: 35,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "01556677889",
          accountName: "China Railway Sierra Leone",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "International Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== MANUFACTURING (2 companies) ==========
      {
        registrationNumber: "M678901",
        taxId: "TAX-2023-018901",
        name: "Sierra Leone Brewery Limited",
        tradingName: "SL Brewery",
        description:
          "Leading beverage manufacturer producing beers, soft drinks, and bottled water.",
        status: "active",
        verificationLevel: "verified",
        industry: "manufacturing",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Wellington",
        address: "Wellington Industrial Estate, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4500",
        longitude: "-13.2000",

        contactEmail: "info@slbrewery.com",
        contactPhone: "+232 76 678 901",
        website: "https://slbrewery.com",
        ceo: "Mr. John van Rijn",

        foundedYear: 1962,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$60M-90M",
        capitalInvestment: "50000000",
        annualRevenueRange: "$60M-90M",
        financialSummary:
          "Established beverage manufacturer with strong brand presence and distribution network.",

        rating: "4.5",
        complianceScore: 90,
        trustScore: 92,

        cacRegistrationDate: "1962-04-15",
        cacExpiryDate: "2026-04-15",
        lastVerifiedAt: new Date("2024-01-28"),

        operationalDetails:
          "Modern brewing facility with bottling lines and quality control laboratories.",
        marketPosition: "Leading Beverage Manufacturer",
        customerBase: "Nationwide distribution to retailers, bars, restaurants",

        tags: ["Manufacturing", "Beverage", "Brewery", "Food & Drink"],
        services: [
          "Beer Production",
          "Soft Drinks",
          "Bottled Water",
          "Distribution",
        ],
        certifications: [
          "ISO 9001:2015",
          "Food Safety Certified",
          "Quality Standards Certified",
        ],
        subsidiaries: ["SL Beverages Distribution"],

        recentNews: [
          {
            title: "SL Brewery launches new product line",
            date: "2024-01-30",
            source: "Business Sierra Leone",
          },
          {
            title: "Company invests in solar power for factory",
            date: "2023-12-20",
            source: "Manufacturing News",
          },
        ],

        directors: [
          {
            name: "Mr. John van Rijn",
            position: "Managing Director",
            nationality: "Dutch",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Aminata Kamara",
            position: "Marketing Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Manufacturing License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 95,
          },
          {
            type: "Food Safety",
            status: "Active",
            completedDate: "2023-12-31",
            score: 92,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-15",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$85M" },
          { year: 2022, growth: 12, amount: "$74M" },
          { year: 2021, growth: 10, amount: "$66M" },
        ],

        marketCoverage: [
          {
            region: "National",
            percentage: 95,
            notes: "Nationwide distribution",
          },
          { region: "West Africa", percentage: 30, notes: "Limited exports" },
        ],

        majorClients: [
          "Retail Chains",
          "Hotels",
          "Restaurants",
          "Government Institutions",
        ],
        awards: [
          {
            name: "Best Manufacturing Company 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Quality Excellence Award",
            year: 2022,
            issuer: "West Africa Manufacturing Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/slbrewery",
          twitter: "https://twitter.com/slbrewery",
          instagram: "https://instagram.com/slbrewery",
        },

        esgScores: {
          environmental: 80,
          social: 85,
          governance: 88,
          overall: 84,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 30,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "01667788990",
          accountName: "Sierra Leone Brewery Limited",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "M789012",
        taxId: "TAX-2023-019012",
        name: "Sierra Plastic Industries",
        tradingName: "Sierra Plastic",
        description:
          "Manufacturer of plastic products including packaging materials, containers, and household items.",
        status: "active",
        verificationLevel: "verified",
        industry: "manufacturing",
        businessType: "private_limited",
        ownership: "local",

        location: "Hastings",
        address: "Hastings Industrial Area, Freetown",
        city: "Freetown",
        district: "Western Area Rural",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.3800",
        longitude: "-13.1300",

        contactEmail: "info@sierraplastic.sl",
        contactPhone: "+232 76 789 012",
        website: "https://sierraplastic.sl",
        ceo: "Mr. Mohamed Koroma",

        foundedYear: 2005,
        yearEnd: "December 31",
        employees: "100-200",
        revenue: "$10M-20M",
        capitalInvestment: "8000000",
        annualRevenueRange: "$10M-20M",
        financialSummary:
          "Growing plastic manufacturing company with focus on quality and environmental responsibility.",

        rating: "4.1",
        complianceScore: 85,
        trustScore: 86,

        cacRegistrationDate: "2005-06-10",
        cacExpiryDate: "2025-06-10",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Modern injection molding and extrusion equipment producing various plastic products.",
        marketPosition: "Leading Plastic Manufacturer",
        customerBase:
          "Food & Beverage Companies, Retailers, Household Consumers",

        tags: ["Manufacturing", "Plastic", "Packaging", "Local Industry"],
        services: [
          "Plastic Packaging",
          "Containers",
          "Household Items",
          "Custom Molding",
        ],
        certifications: [
          "Quality Standards Certified",
          "Environmental Compliance",
        ],
        subsidiaries: ["Sierra Recycling Ltd"],

        recentNews: [
          {
            title: "Sierra Plastic launches recycling initiative",
            date: "2024-01-25",
            source: "Manufacturing News",
          },
          {
            title: "Company expands production capacity",
            date: "2023-12-15",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Mohamed Koroma",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 60,
          },
          {
            name: "Ms. Kadiatu Sesay",
            position: "Production Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Manufacturing License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 90,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 82,
          },
          {
            type: "Quality Standards",
            status: "Active",
            completedDate: "2023-12-20",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$18M" },
          { year: 2022, growth: 15, amount: "$15M" },
          { year: 2021, growth: 12, amount: "$13M" },
        ],

        marketCoverage: [
          {
            region: "Sierra Leone",
            percentage: 90,
            notes: "Nationwide distribution",
          },
          { region: "West Africa", percentage: 20, notes: "Limited exports" },
        ],

        majorClients: [
          "Food Manufacturers",
          "Beverage Companies",
          "Supermarkets",
          "Retailers",
        ],
        awards: [
          {
            name: "Manufacturing Innovation Award 2023",
            year: 2023,
            issuer: "Sierra Leone Manufacturing Awards",
          },
          {
            name: "Environmental Responsibility Award",
            year: 2022,
            issuer: "West Africa Business Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/sierraplastic",
          linkedin: "https://linkedin.com/company/sierra-plastic-industries",
        },

        esgScores: {
          environmental: 75,
          social: 82,
          governance: 80,
          overall: 79,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "UBA Sierra Leone",
          accountNumber: "01778899001",
          accountName: "Sierra Plastic Industries Ltd",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },
      // ... (previous code remains the same)

      // After the existing businesses array, add these additional businesses:

      // ========== ADDITIONAL TELECOMMUNICATIONS (2 more companies) ==========
      {
        registrationNumber: "C567890",
        taxId: "TAX-2023-020123",
        name: "Smart Mobile Sierra Leone",
        tradingName: "Smart Mobile",
        description:
          "Fast-growing telecom provider focusing on affordable mobile services and digital inclusion.",
        status: "active",
        verificationLevel: "verified",
        industry: "telecommunications",
        businessType: "private_limited",
        ownership: "joint_venture",

        location: "Freetown",
        address: "10 Bathurst Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4825",
        longitude: "-13.2325",

        contactEmail: "info@smartmobile.sl",
        contactPhone: "+232 76 567 890",
        website: "https://smartmobile.sl",
        ceo: "Mr. Ahmed Jalloh",

        foundedYear: 2020,
        yearEnd: "December 31",
        employees: "150-300",
        revenue: "$20M-40M",
        capitalInvestment: "15000000",
        annualRevenueRange: "$20M-40M",
        financialSummary:
          "Rapidly expanding telecom with focus on youth market and digital services.",

        rating: "4.3",
        complianceScore: 86,
        trustScore: 84,

        cacRegistrationDate: "2020-07-10",
        cacExpiryDate: "2030-07-10",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Focus on urban areas with strong data network and youth-oriented packages.",
        marketPosition: "Innovative Challenger",
        customerBase: "Youth market, students, digital natives",

        tags: ["Telecom", "Youth", "Digital", "Affordable", "Mobile"],
        services: [
          "Mobile Services",
          "Data Packages",
          "Digital Content",
          "Youth Plans",
        ],
        certifications: ["Telecom Regulatory Licensed"],
        subsidiaries: ["Smart Digital Services"],

        recentNews: [
          {
            title: "Smart Mobile reaches 500K subscribers",
            date: "2024-01-28",
            source: "Business Sierra Leone",
          },
          {
            title: "Launches unlimited social media packages",
            date: "2023-12-15",
            source: "Tech Africa",
          },
        ],

        directors: [
          {
            name: "Mr. Ahmed Jalloh",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 40,
          },
          {
            name: "Ms. Sarah Conteh",
            position: "CTO",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 15,
          },
        ],

        complianceRecords: [
          {
            type: "Telecom License",
            status: "Active",
            completedDate: "2024-01-15",
            score: 90,
          },
          {
            type: "Tax Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 60, amount: "$35M" },
          { year: 2022, growth: 50, amount: "$22M" },
          { year: 2021, growth: 40, amount: "$15M" },
        ],

        marketCoverage: [
          {
            region: "Western Area",
            percentage: 85,
            notes: "Strong urban presence",
          },
          {
            region: "Major Towns",
            percentage: 70,
            notes: "Expanding coverage",
          },
        ],

        majorClients: ["Youth Market", "Students", "Small Businesses"],
        awards: [
          {
            name: "Fastest Growing Telecom 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Digital Innovation Award",
            year: 2022,
            issuer: "Youth Tech Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/smartmobilesl",
          twitter: "https://twitter.com/smartmobilesl",
          instagram: "https://instagram.com/smartmobilesl",
        },

        esgScores: {
          environmental: 80,
          social: 85,
          governance: 82,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 30,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "01889900112",
          accountName: "Smart Mobile Sierra Leone",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "C678901",
        taxId: "TAX-2023-021234",
        name: "National Telecommunications Company",
        tradingName: "NatTel",
        description:
          "Government-owned telecommunications provider focusing on national connectivity.",
        status: "active",
        verificationLevel: "verified",
        industry: "telecommunications",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "Ministry of Information Building, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4848",
        longitude: "-13.2352",

        contactEmail: "info@nattel.gov.sl",
        contactPhone: "+232 22 789 012",
        website: "https://nattel.gov.sl",
        ceo: "Mr. Alimamy Bangura",

        foundedYear: 2015,
        yearEnd: "December 31",
        employees: "200-400",
        revenue: "$30M-50M",
        capitalInvestment: "30000000",
        annualRevenueRange: "$30M-50M",
        financialSummary:
          "Government telecom focusing on national infrastructure and rural connectivity.",

        rating: "4.0",
        complianceScore: 92,
        trustScore: 90,

        cacRegistrationDate: "2015-09-15",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Focus on national backbone infrastructure and rural connectivity projects.",
        marketPosition: "National Infrastructure Provider",
        customerBase: "Government, Rural Communities, Public Institutions",

        tags: ["Telecom", "Government", "Infrastructure", "National", "Rural"],
        services: [
          "National Backbone",
          "Rural Connectivity",
          "Government Networks",
          "Public Access",
        ],
        certifications: ["Government Standards", "Telecom Regulatory Licensed"],
        subsidiaries: ["NatTel Infrastructure Ltd"],

        recentNews: [
          {
            title: "NatTel expands rural broadband network",
            date: "2024-01-30",
            source: "Government News",
          },
          {
            title: "New fiber optic project launched",
            date: "2023-12-20",
            source: "Infrastructure Digest",
          },
        ],

        directors: [
          {
            name: "Mr. Alimamy Bangura",
            position: "Director General",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Koroma",
            position: "Technical Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Government Compliance",
            status: "Active",
            completedDate: "2024-01-20",
            score: 96,
          },
          {
            type: "Infrastructure License",
            status: "Active",
            completedDate: "2023-12-31",
            score: 94,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$45M" },
          { year: 2022, growth: 20, amount: "$36M" },
          { year: 2021, growth: 15, amount: "$30M" },
        ],

        marketCoverage: [
          { region: "Rural Areas", percentage: 60, notes: "Focus area" },
          {
            region: "National Backbone",
            percentage: 100,
            notes: "Infrastructure focus",
          },
        ],

        majorClients: [
          "Government Ministries",
          "Public Institutions",
          "Rural Communities",
        ],
        awards: [
          {
            name: "Public Service Excellence 2023",
            year: 2023,
            issuer: "Government Awards",
          },
          {
            name: "Rural Connectivity Award",
            year: 2022,
            issuer: "African Telecom Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/nattelsl",
          twitter: "https://twitter.com/nattelsl",
        },

        esgScores: {
          environmental: 85,
          social: 92,
          governance: 90,
          overall: 89,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 20,
          marketRisk: 25,
          overallRisk: 28,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "01990011223",
          accountName: "National Telecommunications Company",
          branch: "Government Account",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== ADDITIONAL BANKING & FINANCE (4 more companies) ==========
      {
        registrationNumber: "B567890",
        taxId: "TAX-2023-022345",
        name: "First International Bank Sierra Leone",
        tradingName: "First International Bank",
        description:
          "International banking group providing comprehensive financial services with global network.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "22 Siaka Stevens Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4842",
        longitude: "-13.2342",

        contactEmail: "info@firstinternational.sl",
        contactPhone: "+232 22 890 123",
        website: "https://firstinternational.sl",
        ceo: "Mr. James Robertson",

        foundedYear: 2005,
        yearEnd: "December 31",
        employees: "200-350",
        revenue: "$80M-120M",
        capitalInvestment: "50000000",
        annualRevenueRange: "$80M-120M",
        financialSummary:
          "International bank with strong corporate banking and trade finance expertise.",

        rating: "4.4",
        complianceScore: 93,
        trustScore: 94,

        cacRegistrationDate: "2005-04-20",
        cacExpiryDate: "2025-04-20",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Specializes in international banking, trade finance, and corporate services.",
        marketPosition: "International Banking Specialist",
        customerBase:
          "Corporations, International Traders, High Net Worth Individuals",

        tags: ["Banking", "International", "Corporate", "Trade Finance"],
        services: [
          "Corporate Banking",
          "Trade Finance",
          "International Banking",
          "Wealth Management",
        ],
        certifications: [
          "International Banking Standards",
          "ISO 27001 Certified",
        ],
        subsidiaries: [],

        recentNews: [
          {
            title: "First International Bank expands trade finance desk",
            date: "2024-01-25",
            source: "Financial Times",
          },
          {
            title: "Launches digital trade platform",
            date: "2023-12-18",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. James Robertson",
            position: "CEO",
            nationality: "British",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Mariama Sesay",
            position: "Head of Corporate Banking",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "International Compliance",
            status: "Excellent",
            completedDate: "2024-01-20",
            score: 96,
          },
          {
            type: "AML Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 22, amount: "$110M" },
          { year: 2022, growth: 20, amount: "$90M" },
          { year: 2021, growth: 18, amount: "$75M" },
        ],

        marketCoverage: [
          { region: "Freetown", percentage: 95, notes: "Primary market" },
          {
            region: "International Network",
            percentage: 100,
            notes: "Global connectivity",
          },
        ],

        majorClients: [
          "International Corporations",
          "Export/Import Companies",
          "Mining Sector",
        ],
        awards: [
          {
            name: "Best International Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Excellence in Trade Finance",
            year: 2022,
            issuer: "African Banking Awards",
          },
        ],

        socialMedia: {
          linkedin:
            "https://linkedin.com/company/first-international-bank-sierra-leone",
          twitter: "https://twitter.com/firstintbank",
        },

        esgScores: {
          environmental: 82,
          social: 88,
          governance: 90,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 28,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 27,
        },

        bankDetails: {
          bankName: "First International Bank",
          accountNumber: "02001122334",
          accountName: "First International Bank Sierra Leone",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "B678901",
        taxId: "TAX-2023-023456",
        name: "Guaranty Trust Bank Sierra Leone",
        tradingName: "GTBank SL",
        description:
          "Subsidiary of Nigerian banking group providing innovative banking solutions.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "GTBank Building, 18 Wilkinson Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4832",
        longitude: "-13.2312",

        contactEmail: "info@gtbank.sl",
        contactPhone: "+232 22 901 234",
        website: "https://gtbank.sl",
        ceo: "Mr. Femi Oladipo",

        foundedYear: 2012,
        yearEnd: "December 31",
        employees: "180-280",
        revenue: "$60M-90M",
        capitalInvestment: "40000000",
        annualRevenueRange: "$60M-90M",
        financialSummary:
          "Innovative banking solutions with strong retail focus and digital services.",

        rating: "4.5",
        complianceScore: 92,
        trustScore: 93,

        cacRegistrationDate: "2012-06-15",
        cacExpiryDate: "2032-06-15",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Focus on retail banking with innovative digital products and SME services.",
        marketPosition: "Innovative Retail Bank",
        customerBase: "Retail Customers, SMEs, Youth Market",

        tags: ["Banking", "Retail", "Digital", "Innovation", "GTBank"],
        services: [
          "Retail Banking",
          "SME Banking",
          "Digital Banking",
          "Corporate Services",
        ],
        certifications: ["GTBank Group Standards", "Central Bank Licensed"],
        subsidiaries: [],

        recentNews: [
          {
            title: "GTBank launches youth banking initiative",
            date: "2024-01-28",
            source: "Business Sierra Leone",
          },
          {
            title: "Digital banking app reaches 100K users",
            date: "2023-12-20",
            source: "Tech Africa",
          },
        ],

        directors: [
          {
            name: "Mr. Femi Oladipo",
            position: "Managing Director",
            nationality: "Nigerian",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Aminata Bangura",
            position: "Head of Retail",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Group Compliance",
            status: "Active",
            completedDate: "2024-01-20",
            score: 94,
          },
          {
            type: "Digital Security",
            status: "Active",
            completedDate: "2023-12-31",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$85M" },
          { year: 2022, growth: 22, amount: "$68M" },
          { year: 2021, growth: 20, amount: "$56M" },
        ],

        marketCoverage: [
          { region: "Western Area", percentage: 90, notes: "Strong presence" },
          {
            region: "Major Cities",
            percentage: 75,
            notes: "Expanding network",
          },
        ],

        majorClients: ["Retail Customers", "SMEs", "Corporate Clients"],
        awards: [
          {
            name: "Most Innovative Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Digital Banking Excellence",
            year: 2022,
            issuer: "African Digital Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/gtbanksl",
          twitter: "https://twitter.com/gtbanksl",
          instagram: "https://instagram.com/gtbanksl",
        },

        esgScores: {
          environmental: 83,
          social: 89,
          governance: 88,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 24,
          operationalRisk: 26,
          complianceRisk: 18,
          marketRisk: 32,
          overallRisk: 25,
        },

        bankDetails: {
          bankName: "Guaranty Trust Bank",
          accountNumber: "02112233445",
          accountName: "GTBank Sierra Leone",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "B789012",
        taxId: "TAX-2023-024567",
        name: "ProCredit Bank Sierra Leone",
        tradingName: "ProCredit Bank",
        description:
          "Development-oriented bank focusing on micro, small and medium enterprise financing.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "12 Campbell Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4828",
        longitude: "-13.2328",

        contactEmail: "info@procredit.sl",
        contactPhone: "+232 22 012 345",
        website: "https://procredit.sl",
        ceo: "Mr. Samuel Kargbo",

        foundedYear: 2010,
        yearEnd: "December 31",
        employees: "150-250",
        revenue: "$40M-60M",
        capitalInvestment: "25000000",
        annualRevenueRange: "$40M-60M",
        financialSummary:
          "Development bank with focus on financial inclusion and SME growth.",

        rating: "4.6",
        complianceScore: 91,
        trustScore: 92,

        cacRegistrationDate: "2010-03-20",
        cacExpiryDate: "2030-03-20",
        lastVerifiedAt: new Date("2024-01-28"),

        operationalDetails:
          "Specializes in SME lending, microfinance, and financial inclusion programs.",
        marketPosition: "Leading SME Bank",
        customerBase: "Micro Enterprises, SMEs, Entrepreneurs",

        tags: [
          "Banking",
          "SME",
          "Microfinance",
          "Development",
          "Financial Inclusion",
        ],
        services: [
          "SME Loans",
          "Microfinance",
          "Business Banking",
          "Financial Advisory",
        ],
        certifications: [
          "Development Banking Standards",
          "Microfinance Certified",
        ],
        subsidiaries: [],

        recentNews: [
          {
            title: "ProCredit expands SME loan portfolio by 40%",
            date: "2024-01-30",
            source: "Business Sierra Leone",
          },
          {
            title: "Launches women entrepreneurship program",
            date: "2023-12-15",
            source: "Women in Business",
          },
        ],

        directors: [
          {
            name: "Mr. Samuel Kargbo",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 10,
          },
          {
            name: "Ms. Fatmata Conteh",
            position: "Head of SME Banking",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 5,
          },
        ],

        complianceRecords: [
          {
            type: "SME Banking Compliance",
            status: "Active",
            completedDate: "2024-01-25",
            score: 93,
          },
          {
            type: "Microfinance Standards",
            status: "Active",
            completedDate: "2023-12-31",
            score: 92,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 28, amount: "$58M" },
          { year: 2022, growth: 25, amount: "$45M" },
          { year: 2021, growth: 22, amount: "$36M" },
        ],

        marketCoverage: [
          { region: "Urban Areas", percentage: 85, notes: "SME focus" },
          {
            region: "Rural Areas",
            percentage: 60,
            notes: "Microfinance focus",
          },
        ],

        majorClients: [
          "Small Businesses",
          "Micro Enterprises",
          "Women Entrepreneurs",
        ],
        awards: [
          {
            name: "Best SME Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Financial Inclusion Award",
            year: 2022,
            issuer: "African Development Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/procreditsl",
          linkedin: "https://linkedin.com/company/procredit-bank-sierra-leone",
        },

        esgScores: {
          environmental: 85,
          social: 95,
          governance: 88,
          overall: 89,
        },
        riskAssessment: {
          financialRisk: 28,
          operationalRisk: 30,
          complianceRisk: 22,
          marketRisk: 35,
          overallRisk: 29,
        },

        bankDetails: {
          bankName: "ProCredit Bank",
          accountNumber: "02223344556",
          accountName: "ProCredit Bank Sierra Leone",
          branch: "Head Office",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "EY Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "B890123",
        taxId: "TAX-2023-025678",
        name: "Union Trust Bank Sierra Leone",
        tradingName: "UTB",
        description:
          "Full-service commercial bank with focus on retail and corporate banking.",
        status: "active",
        verificationLevel: "verified",
        industry: "banking_finance",
        businessType: "private_limited",
        ownership: "local",

        location: "Freetown",
        address: "14 Rawdon Street, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4841",
        longitude: "-13.2341",

        contactEmail: "info@utb.sl",
        contactPhone: "+232 22 123 456",
        website: "https://utb.sl",
        ceo: "Mr. Mohamed Kamara",

        foundedYear: 2002,
        yearEnd: "December 31",
        employees: "120-200",
        revenue: "$30M-50M",
        capitalInvestment: "20000000",
        annualRevenueRange: "$30M-50M",
        financialSummary:
          "Local bank with strong community focus and personalized banking services.",

        rating: "4.2",
        complianceScore: 89,
        trustScore: 90,

        cacRegistrationDate: "2002-08-10",
        cacExpiryDate: "2027-08-10",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Focus on personalized banking services for retail and small corporate clients.",
        marketPosition: "Community-Focused Bank",
        customerBase:
          "Local Businesses, Retail Customers, Community Organizations",

        tags: ["Banking", "Local", "Community", "Trust", "Personalized"],
        services: [
          "Retail Banking",
          "Small Business Banking",
          "Personal Loans",
          "Savings Accounts",
        ],
        certifications: [
          "Central Bank Licensed",
          "Community Banking Certified",
        ],
        subsidiaries: ["UTB Microfinance"],

        recentNews: [
          {
            title: "UTB launches community banking initiative",
            date: "2024-01-25",
            source: "Community News",
          },
          {
            title: "Expands branch network to rural areas",
            date: "2023-12-18",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Mohamed Kamara",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 30,
          },
          {
            name: "Ms. Sarah Johnson",
            position: "Board Chair",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Community Banking Compliance",
            status: "Active",
            completedDate: "2024-01-20",
            score: 90,
          },
          {
            type: "Customer Protection",
            status: "Active",
            completedDate: "2023-12-31",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$42M" },
          { year: 2022, growth: 12, amount: "$36M" },
          { year: 2021, growth: 10, amount: "$32M" },
        ],

        marketCoverage: [
          { region: "Western Area", percentage: 80, notes: "Primary market" },
          { region: "Northern Province", percentage: 60, notes: "Expanding" },
        ],

        majorClients: [
          "Local Businesses",
          "Community Groups",
          "Retail Customers",
        ],
        awards: [
          {
            name: "Best Community Bank 2023",
            year: 2023,
            issuer: "Sierra Leone Banking Awards",
          },
          {
            name: "Customer Service Excellence",
            year: 2022,
            issuer: "West Africa Banking Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/utbsl",
          twitter: "https://twitter.com/utbsl",
        },

        esgScores: {
          environmental: 82,
          social: 90,
          governance: 85,
          overall: 86,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 32,
          complianceRisk: 25,
          marketRisk: 38,
          overallRisk: 31,
        },

        bankDetails: {
          bankName: "Union Trust Bank",
          accountNumber: "02334455667",
          accountName: "Union Trust Bank Sierra Leone",
          branch: "Main Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== ADDITIONAL AGRICULTURE (3 more companies) ==========
      {
        registrationNumber: "A678901",
        taxId: "TAX-2023-026789",
        name: "Sierra Fisheries Corporation",
        tradingName: "Sierra Fisheries",
        description:
          "Leading fishing and seafood processing company with modern facilities and export focus.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "private_limited",
        ownership: "mixed",

        location: "Freetown",
        address: "King Tom Fisheries Complex, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4900",
        longitude: "-13.2400",

        contactEmail: "info@sierrafisheries.sl",
        contactPhone: "+232 77 678 901",
        website: "https://sierrafisheries.sl",
        ceo: "Mr. Thomas Williams",

        foundedYear: 1998,
        yearEnd: "December 31",
        employees: "200-350",
        revenue: "$25M-40M",
        capitalInvestment: "15000000",
        annualRevenueRange: "$25M-40M",
        financialSummary:
          "Modern fisheries company with processing plant and cold storage facilities.",

        rating: "4.3",
        complianceScore: 88,
        trustScore: 86,

        cacRegistrationDate: "1998-05-15",
        cacExpiryDate: "2028-05-15",
        lastVerifiedAt: new Date("2024-01-28"),

        operationalDetails:
          "Operates fishing fleet and modern processing plant for export markets.",
        marketPosition: "Leading Fisheries Company",
        customerBase:
          "International Buyers, Local Markets, Hotels, Restaurants",

        tags: ["Agriculture", "Fishing", "Seafood", "Export", "Processing"],
        services: [
          "Fishing Operations",
          "Seafood Processing",
          "Export Services",
          "Cold Storage",
        ],
        certifications: [
          "EU Export Certified",
          "Food Safety Standards",
          "Marine Stewardship",
        ],
        subsidiaries: ["Sierra Fishing Fleet Ltd"],

        recentNews: [
          {
            title: "Sierra Fisheries secures EU export certification",
            date: "2024-01-30",
            source: "Export News",
          },
          {
            title: "Company expands processing capacity",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Thomas Williams",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 35,
          },
          {
            name: "Ms. Fatmata Kamara",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 15,
          },
        ],

        complianceRecords: [
          {
            type: "Export Compliance",
            status: "Active",
            completedDate: "2024-01-25",
            score: 92,
          },
          {
            type: "Food Safety",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$38M" },
          { year: 2022, growth: 18, amount: "$32M" },
          { year: 2021, growth: 15, amount: "$27M" },
        ],

        marketCoverage: [
          {
            region: "Coastal Areas",
            percentage: 100,
            notes: "Fishing operations",
          },
          {
            region: "Export Markets",
            percentage: 70,
            notes: "EU and regional",
          },
        ],

        majorClients: [
          "European Importers",
          "West African Markets",
          "Local Hotels",
        ],
        awards: [
          {
            name: "Best Fisheries Company 2023",
            year: 2023,
            issuer: "Sierra Leone Agricultural Awards",
          },
          {
            name: "Export Excellence Award",
            year: 2022,
            issuer: "West Africa Trade Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/sierrafisheries",
          linkedin: "https://linkedin.com/company/sierra-fisheries-corporation",
        },

        esgScores: {
          environmental: 88,
          social: 85,
          governance: 82,
          overall: 85,
        },
        riskAssessment: {
          financialRisk: 32,
          operationalRisk: 35,
          complianceRisk: 28,
          marketRisk: 40,
          overallRisk: 34,
        },

        bankDetails: {
          bankName: "Rokel Commercial Bank",
          accountNumber: "02445566778",
          accountName: "Sierra Fisheries Corporation",
          branch: "Freetown Main",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "A789012",
        taxId: "TAX-2023-027890",
        name: "Bo Poultry Farms",
        tradingName: "Bo Poultry",
        description:
          "Modern poultry farm producing eggs and chicken for Southern Province markets.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "private_limited",
        ownership: "local",

        location: "Bo",
        address: "Bo-Kenema Highway, Bo",
        city: "Bo",
        district: "Bo",
        province: "Southern Province",
        postalCode: "00233",
        country: "Sierra Leone",
        latitude: "7.9700",
        longitude: "-11.7400",

        contactEmail: "info@bopoultry.sl",
        contactPhone: "+232 77 789 012",
        website: "https://bopoultry.sl",
        ceo: "Mr. Samuel Conteh",

        foundedYear: 2015,
        yearEnd: "December 31",
        employees: "50-100",
        revenue: "$5M-8M",
        capitalInvestment: "3000000",
        annualRevenueRange: "$5M-8M",
        financialSummary:
          "Modern poultry operation with focus on quality and food safety standards.",

        rating: "4.2",
        complianceScore: 87,
        trustScore: 85,

        cacRegistrationDate: "2015-08-20",
        cacExpiryDate: "2030-08-20",
        lastVerifiedAt: new Date("2024-01-20"),

        operationalDetails:
          "Modern poultry houses with automated feeding and climate control systems.",
        marketPosition: "Leading Poultry Producer in Southern Province",
        customerBase: "Supermarkets, Hotels, Restaurants, Retailers",

        tags: ["Agriculture", "Poultry", "Eggs", "Chicken", "Livestock"],
        services: [
          "Egg Production",
          "Broiler Chicken",
          "Poultry Feed",
          "Veterinary Services",
        ],
        certifications: ["Food Safety Certified", "Veterinary Standards"],
        subsidiaries: [],

        recentNews: [
          {
            title: "Bo Poultry expands production capacity",
            date: "2024-01-25",
            source: "Agricultural News",
          },
          {
            title: "Launches new organic egg line",
            date: "2023-12-15",
            source: "Food Industry Journal",
          },
        ],

        directors: [
          {
            name: "Mr. Samuel Conteh",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 70,
          },
          {
            name: "Ms. Aminata Bangura",
            position: "Operations Manager",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Food Safety Compliance",
            status: "Active",
            completedDate: "2024-01-20",
            score: 90,
          },
          {
            type: "Veterinary Standards",
            status: "Active",
            completedDate: "2023-12-31",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$7.5M" },
          { year: 2022, growth: 22, amount: "$6M" },
          { year: 2021, growth: 20, amount: "$4.9M" },
        ],

        marketCoverage: [
          {
            region: "Southern Province",
            percentage: 80,
            notes: "Primary market",
          },
          { region: "Western Area", percentage: 40, notes: "Expanding market" },
        ],

        majorClients: ["Supermarkets", "Hotels", "Restaurants", "Schools"],
        awards: [
          {
            name: "Best Poultry Farm 2023",
            year: 2023,
            issuer: "Sierra Leone Agricultural Awards",
          },
          {
            name: "Food Safety Excellence",
            year: 2022,
            issuer: "West Africa Food Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/bopoultry",
        },

        esgScores: {
          environmental: 82,
          social: 85,
          governance: 80,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 30,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Sierra Leone Commercial Bank",
          accountNumber: "02556677889",
          accountName: "Bo Poultry Farms Ltd",
          branch: "Bo Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "A890123",
        taxId: "TAX-2023-028901",
        name: "Moyamba Oil Palm Plantation",
        tradingName: "Moyamba Palm Oil",
        description:
          "Large-scale oil palm plantation and processing operation in Southern Sierra Leone.",
        status: "active",
        verificationLevel: "verified",
        industry: "agriculture",
        businessType: "private_limited",
        ownership: "joint_venture",

        location: "Moyamba",
        address: "Moyamba Junction, Southern Province",
        city: "Moyamba",
        district: "Moyamba",
        province: "Southern Province",
        postalCode: "00235",
        country: "Sierra Leone",
        latitude: "8.1600",
        longitude: "-12.4300",

        contactEmail: "info@moyambapalmoil.sl",
        contactPhone: "+232 77 890 123",
        website: "https://moyambapalmoil.sl",
        ceo: "Mr. David Koroma",

        foundedYear: 2010,
        yearEnd: "December 31",
        employees: "150-250",
        revenue: "$15M-25M",
        capitalInvestment: "12000000",
        annualRevenueRange: "$15M-25M",
        financialSummary:
          "Large-scale palm oil operation with sustainable farming practices.",

        rating: "4.1",
        complianceScore: 85,
        trustScore: 83,

        cacRegistrationDate: "2010-04-15",
        cacExpiryDate: "2030-04-15",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "5000-hectare plantation with modern processing mill and sustainable practices.",
        marketPosition: "Major Palm Oil Producer",
        customerBase: "Local Markets, Export Markets, Food Manufacturers",

        tags: [
          "Agriculture",
          "Palm Oil",
          "Plantation",
          "Export",
          "Sustainable",
        ],
        services: [
          "Palm Oil Production",
          "Palm Kernel Processing",
          "Export Services",
          "Agricultural Consulting",
        ],
        certifications: ["RSPO Certified", "Sustainable Agriculture"],
        subsidiaries: ["Moyamba Biofuel Ltd"],

        recentNews: [
          {
            title: "Moyamba Plantation achieves RSPO certification",
            date: "2024-01-30",
            source: "Agricultural News",
          },
          {
            title: "Expands processing capacity",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. David Koroma",
            position: "Managing Director",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 40,
          },
          {
            name: "Mr. Lee Chong",
            position: "Technical Director",
            nationality: "Malaysian",
            isPrimary: false,
            sharePercentage: 30,
          },
        ],

        complianceRecords: [
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2024-01-25",
            score: 88,
          },
          {
            type: "Export Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 85,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 18, amount: "$22M" },
          { year: 2022, growth: 15, amount: "$18M" },
          { year: 2021, growth: 12, amount: "$16M" },
        ],

        marketCoverage: [
          {
            region: "Southern Province",
            percentage: 100,
            notes: "Plantation location",
          },
          {
            region: "National Market",
            percentage: 60,
            notes: "Domestic sales",
          },
        ],

        majorClients: [
          "Local Manufacturers",
          "Export Markets",
          "Government Institutions",
        ],
        awards: [
          {
            name: "Sustainable Agriculture Award 2023",
            year: 2023,
            issuer: "Sierra Leone Agricultural Awards",
          },
          {
            name: "Export Excellence",
            year: 2022,
            issuer: "West Africa Trade Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/moyambapalmoil",
          linkedin: "https://linkedin.com/company/moyamba-palm-oil",
        },

        esgScores: {
          environmental: 85,
          social: 82,
          governance: 80,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 28,
          marketRisk: 42,
          overallRisk: 34,
        },

        bankDetails: {
          bankName: "Ecobank Sierra Leone",
          accountNumber: "02667788990",
          accountName: "Moyamba Oil Palm Plantation",
          branch: "Moyamba Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Local Auditors Ltd",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Return",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== ADDITIONAL MINING (2 more companies) ==========
      {
        registrationNumber: "M234567",
        taxId: "TAX-2023-029012",
        name: "Sierra Minerals Bauxite",
        tradingName: "Sierra Bauxite",
        description:
          "Bauxite mining and export company operating in the Northern Province.",
        status: "active",
        verificationLevel: "verified",
        industry: "mining",
        businessType: "private_limited",
        ownership: "joint_venture",

        location: "Makeni",
        address: "Mile 38, Makeni Highway",
        city: "Makeni",
        district: "Bombali",
        province: "Northern Province",
        postalCode: "00211",
        country: "Sierra Leone",
        latitude: "8.8800",
        longitude: "-12.0500",

        contactEmail: "info@sierrabauxite.com",
        contactPhone: "+232 78 234 567",
        website: "https://sierrabauxite.com",
        ceo: "Mr. Mohamed Bah",

        foundedYear: 2008,
        yearEnd: "December 31",
        employees: "250-400",
        revenue: "$60M-90M",
        capitalInvestment: "40000000",
        annualRevenueRange: "$60M-90M",
        financialSummary:
          "Bauxite mining operation with modern equipment and export facilities.",

        rating: "4.3",
        complianceScore: 87,
        trustScore: 85,

        cacRegistrationDate: "2008-06-20",
        cacExpiryDate: "2028-06-20",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Open-pit bauxite mining with processing and loading facilities.",
        marketPosition: "Leading Bauxite Producer",
        customerBase: "International Aluminum Companies, Export Markets",

        tags: ["Mining", "Bauxite", "Export", "Aluminum", "Extractive"],
        services: ["Bauxite Mining", "Mineral Processing", "Export Logistics"],
        certifications: [
          "Mining License",
          "Export Certification",
          "Environmental Compliance",
        ],
        subsidiaries: ["Sierra Minerals Logistics"],

        recentNews: [
          {
            title: "Sierra Bauxite expands mining operations",
            date: "2024-01-28",
            source: "Mining Journal",
          },
          {
            title: "Secures new export contracts",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Mohamed Bah",
            position: "CEO",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 25,
          },
          {
            name: "Mr. Zhang Wei",
            position: "Technical Director",
            nationality: "Chinese",
            isPrimary: false,
            sharePercentage: 20,
          },
        ],

        complianceRecords: [
          {
            type: "Mining License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 92,
          },
          {
            type: "Export Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 88,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 22, amount: "$85M" },
          { year: 2022, growth: 20, amount: "$70M" },
          { year: 2021, growth: 18, amount: "$58M" },
        ],

        marketCoverage: [
          {
            region: "Northern Province",
            percentage: 100,
            notes: "Mining operations",
          },
          {
            region: "Export Markets",
            percentage: 100,
            notes: "International buyers",
          },
        ],

        majorClients: [
          "International Aluminum Smelters",
          "Trading Companies",
          "Manufacturers",
        ],
        awards: [
          {
            name: "Best Mining Operation 2023",
            year: 2023,
            issuer: "Sierra Leone Mining Awards",
          },
          {
            name: "Export Excellence Award",
            year: 2022,
            issuer: "West Africa Trade Forum",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/sierra-bauxite",
        },

        esgScores: {
          environmental: 80,
          social: 82,
          governance: 85,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 32,
          operationalRisk: 38,
          complianceRisk: 30,
          marketRisk: 45,
          overallRisk: 36,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "02778899001",
          accountName: "Sierra Minerals Bauxite",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Mining Report",
            filingDate: "2024-03-31",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "M345678",
        taxId: "TAX-2023-030123",
        name: "Tonkolili Iron Ore Mines",
        tradingName: "Tonkolili Mines",
        description:
          "Large-scale iron ore mining operation in Tonkolili District.",
        status: "active",
        verificationLevel: "verified",
        industry: "mining",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Tonkolili District",
        address: "Ferengbeya, Tonkolili District",
        city: "Magburaka",
        district: "Tonkolili",
        province: "Northern Province",
        postalCode: "00214",
        country: "Sierra Leone",
        latitude: "8.7200",
        longitude: "-11.9500",

        contactEmail: "info@tonkolilimines.com",
        contactPhone: "+232 78 345 678",
        website: "https://tonkolilimines.com",
        ceo: "Mr. John Smith",

        foundedYear: 2011,
        yearEnd: "December 31",
        employees: "400-600",
        revenue: "$120M-180M",
        capitalInvestment: "100000000",
        annualRevenueRange: "$100M-200M",
        financialSummary:
          "Major iron ore mining operation with rail infrastructure to port.",

        rating: "4.4",
        complianceScore: 89,
        trustScore: 87,

        cacRegistrationDate: "2011-03-15",
        cacExpiryDate: "2031-03-15",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Large-scale iron ore mining with dedicated railway to export port.",
        marketPosition: "Major Iron Ore Producer",
        customerBase: "International Steel Companies, Export Markets",

        tags: ["Mining", "Iron Ore", "Export", "Large-scale", "Infrastructure"],
        services: [
          "Iron Ore Mining",
          "Processing",
          "Rail Transport",
          "Export Services",
        ],
        certifications: [
          "Mining License",
          "Environmental Compliance",
          "Export Standards",
        ],
        subsidiaries: ["Tonkolili Railways Ltd"],

        recentNews: [
          {
            title: "Tonkolili Mines resumes full production",
            date: "2024-01-30",
            source: "Mining Weekly",
          },
          {
            title: "Invests in new processing equipment",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. John Smith",
            position: "CEO",
            nationality: "British",
            isPrimary: true,
            sharePercentage: 15,
          },
          {
            name: "Mr. Mohamed Bangura",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 10,
          },
        ],

        complianceRecords: [
          {
            type: "Mining License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 93,
          },
          {
            type: "Environmental Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 86,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 35, amount: "$165M" },
          { year: 2022, growth: 30, amount: "$122M" },
          { year: 2021, growth: 25, amount: "$94M" },
        ],

        marketCoverage: [
          {
            region: "Tonkolili District",
            percentage: 100,
            notes: "Mining area",
          },
          {
            region: "Export Markets",
            percentage: 100,
            notes: "International sales",
          },
        ],

        majorClients: [
          "Chinese Steel Mills",
          "European Manufacturers",
          "International Traders",
        ],
        awards: [
          {
            name: "Mining Infrastructure Award 2023",
            year: 2023,
            issuer: "African Mining Awards",
          },
          {
            name: "Export Volume Leader",
            year: 2022,
            issuer: "Sierra Leone Trade Awards",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/tonkolili-mines",
        },

        esgScores: {
          environmental: 78,
          social: 85,
          governance: 83,
          overall: 82,
        },
        riskAssessment: {
          financialRisk: 35,
          operationalRisk: 42,
          complianceRisk: 32,
          marketRisk: 48,
          overallRisk: 39,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "02889900112",
          accountName: "Tonkolili Iron Ore Mines",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      // ========== ADDITIONAL LOGISTICS & SHIPPING (3 more companies) ==========
      {
        registrationNumber: "L456789",
        taxId: "TAX-2023-031234",
        name: "Maersk Sierra Leone",
        tradingName: "Maersk SL",
        description:
          "Global shipping and logistics company providing container shipping and integrated logistics.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "Queen Elizabeth II Quay, Berth 3, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4945",
        longitude: "-13.2345",

        contactEmail: "info.sl@maersk.com",
        contactPhone: "+232 22 456 789",
        website: "https://maersk.com/sl",
        ceo: "Mr. Peter Hansen",

        foundedYear: 1995,
        yearEnd: "December 31",
        employees: "80-150",
        revenue: "$40M-60M",
        capitalInvestment: "20000000",
        annualRevenueRange: "$40M-60M",
        financialSummary:
          "Global shipping leader with comprehensive logistics services in Sierra Leone.",

        rating: "4.5",
        complianceScore: 94,
        trustScore: 96,

        cacRegistrationDate: "1995-02-20",
        cacExpiryDate: "2025-02-20",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Container shipping, port operations, and integrated logistics solutions.",
        marketPosition: "Global Shipping Leader",
        customerBase:
          "Importers, Exporters, Corporations, International Traders",

        tags: ["Logistics", "Shipping", "Container", "Global", "Maritime"],
        services: [
          "Container Shipping",
          "Port Operations",
          "Logistics Solutions",
          "Customs Clearance",
        ],
        certifications: [
          "ISO 9001:2015",
          "IATA Certified",
          "Global Shipping Standards",
        ],
        subsidiaries: [],

        recentNews: [
          {
            title: "Maersk launches new West Africa service",
            date: "2024-01-25",
            source: "Maritime News",
          },
          {
            title: "Expands container terminal operations",
            date: "2023-12-15",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Peter Hansen",
            position: "Country Manager",
            nationality: "Danish",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Aminata Kamara",
            position: "Operations Manager",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Shipping Compliance",
            status: "Excellent",
            completedDate: "2024-01-20",
            score: 97,
          },
          {
            type: "Customs Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 95,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 20, amount: "$58M" },
          { year: 2022, growth: 18, amount: "$48M" },
          { year: 2021, growth: 15, amount: "$41M" },
        ],

        marketCoverage: [
          {
            region: "Sierra Leone",
            percentage: 90,
            notes: "Nationwide services",
          },
          {
            region: "Global Network",
            percentage: 100,
            notes: "Worldwide coverage",
          },
        ],

        majorClients: [
          "Major Importers/Exporters",
          "Corporations",
          "International Organizations",
        ],
        awards: [
          {
            name: "Best Shipping Company 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Global Shipping Excellence",
            year: 2022,
            issuer: "Maersk Group Awards",
          },
        ],

        socialMedia: {
          linkedin: "https://linkedin.com/company/maersk-sierra-leone",
          twitter: "https://twitter.com/maersksl",
        },

        esgScores: {
          environmental: 85,
          social: 88,
          governance: 92,
          overall: 88,
        },
        riskAssessment: {
          financialRisk: 25,
          operationalRisk: 28,
          complianceRisk: 20,
          marketRisk: 35,
          overallRisk: 27,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "02990011223",
          accountName: "Maersk Sierra Leone",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "KPMG Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "L567890",
        taxId: "TAX-2023-032345",
        name: "DHL Sierra Leone",
        tradingName: "DHL SL",
        description:
          "Global logistics company providing express delivery and supply chain solutions.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "private_limited",
        ownership: "foreign",

        location: "Freetown",
        address: "29 Wilkinson Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4833",
        longitude: "-13.2315",

        contactEmail: "info@dhl.sl",
        contactPhone: "+232 22 567 890",
        website: "https://dhl.sl",
        ceo: "Mr. Mark Johnson",

        foundedYear: 2000,
        yearEnd: "December 31",
        employees: "60-120",
        revenue: "$20M-35M",
        capitalInvestment: "10000000",
        annualRevenueRange: "$20M-35M",
        financialSummary:
          "Global express delivery leader with comprehensive logistics services.",

        rating: "4.6",
        complianceScore: 93,
        trustScore: 95,

        cacRegistrationDate: "2000-09-15",
        cacExpiryDate: "2025-09-15",
        lastVerifiedAt: new Date("2024-01-25"),

        operationalDetails:
          "Express delivery, freight forwarding, and supply chain management services.",
        marketPosition: "Global Express Delivery Leader",
        customerBase: "Businesses, Individuals, E-commerce, Corporations",

        tags: ["Logistics", "Express", "Delivery", "Global", "E-commerce"],
        services: [
          "Express Delivery",
          "Freight Forwarding",
          "Supply Chain",
          "E-commerce Logistics",
        ],
        certifications: [
          "ISO 9001:2015",
          "IATA Certified",
          "Global Logistics Standards",
        ],
        subsidiaries: [],

        recentNews: [
          {
            title: "DHL expands e-commerce delivery network",
            date: "2024-01-28",
            source: "Logistics News",
          },
          {
            title: "Launches same-day delivery service",
            date: "2023-12-20",
            source: "Business Sierra Leone",
          },
        ],

        directors: [
          {
            name: "Mr. Mark Johnson",
            position: "Country Manager",
            nationality: "American",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Sesay",
            position: "Operations Manager",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Express Compliance",
            status: "Excellent",
            completedDate: "2024-01-20",
            score: 96,
          },
          {
            type: "Security Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 94,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 25, amount: "$32M" },
          { year: 2022, growth: 22, amount: "$26M" },
          { year: 2021, growth: 20, amount: "$21M" },
        ],

        marketCoverage: [
          { region: "Freetown", percentage: 95, notes: "Full coverage" },
          { region: "Major Towns", percentage: 80, notes: "Good coverage" },
          { region: "Global Network", percentage: 100, notes: "Worldwide" },
        ],

        majorClients: [
          "Corporations",
          "E-commerce Businesses",
          "International Organizations",
        ],
        awards: [
          {
            name: "Best Logistics Service 2023",
            year: 2023,
            issuer: "Sierra Leone Business Awards",
          },
          {
            name: "Customer Service Excellence",
            year: 2022,
            issuer: "DHL Global Awards",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/dhlsierra",
          twitter: "https://twitter.com/dhlsl",
          instagram: "https://instagram.com/dhlsl",
        },

        esgScores: {
          environmental: 83,
          social: 90,
          governance: 88,
          overall: 87,
        },
        riskAssessment: {
          financialRisk: 22,
          operationalRisk: 25,
          complianceRisk: 18,
          marketRisk: 30,
          overallRisk: 24,
        },

        bankDetails: {
          bankName: "Standard Chartered Bank",
          accountNumber: "03001122334",
          accountName: "DHL Sierra Leone",
          branch: "Freetown Branch",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "PwC Sierra Leone",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },

      {
        registrationNumber: "L678901",
        taxId: "TAX-2023-033456",
        name: "Sierra Leone Road Transport Corporation",
        tradingName: "SLRTC",
        description:
          "Government-owned road transport company providing passenger and freight services.",
        status: "active",
        verificationLevel: "verified",
        industry: "logistics_shipping",
        businessType: "government_agency",
        ownership: "government",

        location: "Freetown",
        address: "15 Kissy Road, Freetown",
        city: "Freetown",
        district: "Western Area Urban",
        province: "Western Area",
        postalCode: "00232",
        country: "Sierra Leone",
        latitude: "8.4800",
        longitude: "-13.2200",

        contactEmail: "info@slrtc.gov.sl",
        contactPhone: "+232 22 678 901",
        website: "https://slrtc.gov.sl",
        ceo: "Mr. Alhaji Mansaray",

        foundedYear: 1975,
        yearEnd: "December 31",
        employees: "300-500",
        revenue: "$30M-50M",
        capitalInvestment: "25000000",
        annualRevenueRange: "$30M-50M",
        financialSummary:
          "National road transport company serving major routes across Sierra Leone.",

        rating: "4.0",
        complianceScore: 90,
        trustScore: 88,

        cacRegistrationDate: "1975-03-15",
        cacExpiryDate: "N/A",
        lastVerifiedAt: new Date("2024-01-30"),

        operationalDetails:
          "Operates bus services on major routes and freight transport nationwide.",
        marketPosition: "National Road Transport Provider",
        customerBase: "General Public, Businesses, Government, Students",

        tags: ["Logistics", "Transport", "Road", "Government", "Passenger"],
        services: [
          "Passenger Transport",
          "Freight Services",
          "Package Delivery",
          "Charter Services",
        ],
        certifications: [
          "Transport Ministry Licensed",
          "Safety Standards Certified",
        ],
        subsidiaries: ["SLRTC Maintenance Ltd"],

        recentNews: [
          {
            title: "SLRTC launches new luxury bus service",
            date: "2024-01-25",
            source: "Transport News",
          },
          {
            title: "Receives new fleet of buses",
            date: "2023-12-20",
            source: "Government News",
          },
        ],

        directors: [
          {
            name: "Mr. Alhaji Mansaray",
            position: "Director General",
            nationality: "Sierra Leonean",
            isPrimary: true,
            sharePercentage: 0,
          },
          {
            name: "Ms. Fatmata Kamara",
            position: "Operations Director",
            nationality: "Sierra Leonean",
            isPrimary: false,
            sharePercentage: 0,
          },
        ],

        complianceRecords: [
          {
            type: "Transport License",
            status: "Active",
            completedDate: "2024-01-20",
            score: 94,
          },
          {
            type: "Safety Compliance",
            status: "Active",
            completedDate: "2023-12-31",
            score: 90,
          },
        ],

        revenueGrowth: [
          { year: 2023, growth: 15, amount: "$45M" },
          { year: 2022, growth: 12, amount: "$39M" },
          { year: 2021, growth: 10, amount: "$35M" },
        ],

        marketCoverage: [
          {
            region: "Major Routes",
            percentage: 85,
            notes: "All major highways",
          },
          { region: "Urban Areas", percentage: 90, notes: "City services" },
        ],

        majorClients: [
          "General Public",
          "Educational Institutions",
          "Government",
        ],
        awards: [
          {
            name: "Best Public Transport 2023",
            year: 2023,
            issuer: "Sierra Leone Transport Awards",
          },
          {
            name: "Safety Excellence Award",
            year: 2022,
            issuer: "West Africa Transport Forum",
          },
        ],

        socialMedia: {
          facebook: "https://facebook.com/slrtc",
          twitter: "https://twitter.com/slrtc",
        },

        esgScores: {
          environmental: 78,
          social: 90,
          governance: 85,
          overall: 84,
        },
        riskAssessment: {
          financialRisk: 30,
          operationalRisk: 35,
          complianceRisk: 25,
          marketRisk: 40,
          overallRisk: 33,
        },

        bankDetails: {
          bankName: "Bank of Sierra Leone",
          accountNumber: "03112233445",
          accountName: "Sierra Leone Road Transport Corporation",
          branch: "Government Account",
        },

        auditInfo: {
          lastAuditDate: "2023-12-31",
          auditor: "Government Auditors",
          auditOpinion: "Unqualified",
          nextAuditDate: "2024-12-31",
        },

        regulatoryFilings: [
          {
            type: "Annual Report",
            filingDate: "2024-04-30",
            status: "Pending",
            documentUrl: "",
          },
        ],
      },
    ];

    console.log(`📝 Inserting ${businesses.length} businesses...`);

    // Insert all businesses
    for (const biz of businesses) {
      await db.insert(business).values(biz);
    }

    // Verify the insertion
    const count = await db
      .select({ count: sql<number>`count(*)` })
      .from(business);
    console.log(`✅ Successfully seeded ${count[0].count} businesses!`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("🎉 Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seed failed:", error);
    process.exit(1);
  });
