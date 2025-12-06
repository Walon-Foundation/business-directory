export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  status: "active" | "pending" | "suspended" | "inactive";
  verificationLevel: "verified" | "pending" | "unverified";
  industry: string;
  businessType: string;
  ownership: string;
  location: string;
  city?: string;
  province?: string;
  country: string;
  address?: string;
  postalCode?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  ceo?: string;
  description?: string;
  tradingName?: string;
  foundedYear: number;
  employees?: string;
  revenue?: string;
  rating?: string;
  complianceScore?: number;
  trustScore?: number;
  capitalInvestment?: string;
  annualRevenueRange?: string;
  financialSummary?: string;
  yearEnd?: string;
  taxId?: string;

  // JSON fields
  tags: string[];
  services: string[];
  certifications: string[];
  subsidiaries: string[];
  recentNews: Array<{
    title: string;
    date: string;
    source: string;
    link?: string;
  }>;
  directors: Array<{
    name: string;
    position: string;
    nationality?: string;
    identificationNumber?: string;
    isPrimary?: boolean;
    sharePercentage?: number;
  }>;
  complianceRecords: Array<{
    type: string;
    status: string;
    dueDate?: string;
    completedDate?: string;
    score?: number;
  }>;
  revenueGrowth: Array<{
    year: number;
    growth: number;
    amount: string;
  }>;
  marketCoverage: Array<{
    region: string;
    percentage: number;
    notes?: string;
  }>;
  majorClients: string[];
  awards: Array<{
    name: string;
    year: number;
    issuer: string;
  }>;
  socialMedia: Record<string, string>;
  bankDetails: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    branch?: string;
  };
  esgScores: {
    environmental: number;
    social: number;
    governance: number;
    overall: number;
  };
  riskAssessment: {
    financialRisk: number;
    operationalRisk: number;
    complianceRisk: number;
    marketRisk: number;
    overallRisk: number;
  };
  auditInfo: {
    lastAuditDate?: string;
    auditor?: string;
    auditOpinion?: string;
    nextAuditDate?: string;
  };
  regulatoryFilings: Array<{
    type: string;
    filingDate: string;
    status: string;
    documentUrl?: string;
  }>;

  // Timestamps
  cacRegistrationDate?: string;
  cacExpiryDate?: string;
  lastVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  lastUpdated?: string;
  yearsOperating?: number;
}
