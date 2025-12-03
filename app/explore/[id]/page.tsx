"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  Star,
  Globe,
  Mail,
  Phone,
  FileText,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Building,
  Home,
  Wallet,
  Award,
  Briefcase,
  Users as UsersIcon,
  CreditCard,
  FileCheck,
  Download,
  Eye,
  Zap,
  Heart,
  Share2,
  BuildingIcon,
  Loader2,
  FileWarning,
  BadgeCheck,
  Clock,
  Scale,
  Handshake,
  ShieldCheck,
  Cpu,
  Target as TargetIcon,
  TrendingDown,
  LineChart,
  ChevronDown,
  Layers,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ComplaintModal from "@/components/compaint";
import { Company } from "@/types/company";


interface ApiResponse {
  success: boolean;
  data: Company;
  timestamp: string;
}

// Helper functions to format data
const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatVerificationLevel = (level: string) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const formatIndustry = (industry: string) => {
  return industry
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Color themes for different statuses
const statusColors = {
  active: {
    bg: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-200/50",
    text: "text-emerald-700",
    icon: "text-emerald-500",
    gradient: "from-emerald-500 to-green-500",
  },
  pending: {
    bg: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-200/50",
    text: "text-amber-700",
    icon: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  suspended: {
    bg: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-200/50",
    text: "text-rose-700",
    icon: "text-rose-500",
    gradient: "from-rose-500 to-pink-500",
  },
  inactive: {
    bg: "from-gray-500/20 to-gray-500/10",
    border: "border-gray-200/50",
    text: "text-gray-700",
    icon: "text-gray-500",
    gradient: "from-gray-500 to-gray-600",
  },
};

const verificationColors = {
  verified: {
    bg: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-200/50",
    text: "text-blue-700",
    icon: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  pending: {
    bg: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-200/50",
    text: "text-amber-700",
    icon: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  unverified: {
    bg: "from-gray-500/20 to-gray-500/10",
    border: "border-gray-200/50",
    text: "text-gray-700",
    icon: "text-gray-500",
    gradient: "from-gray-500 to-gray-600",
  },
};

// Enhanced Icon Component with better styling
function IconContainer({ children, className = "", variant = "default" }: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}) {
  const variantClasses = {
    default: "bg-blue-100 text-blue-600",
    primary: "bg-blue-100 text-blue-600",
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-amber-100 text-amber-600",
    danger: "bg-rose-100 text-rose-600",
  };

  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Responsive Tab Navigation Component with prominent complaint button
// Responsive Tab Navigation Component with prominent complaint button
function ResponsiveTabs({ 
  activeTab, 
  setActiveTab,
  showComplaintButton = false,
  companyId,
  companyName 
}: { 
  activeTab: string;
  setActiveTab: (value: string) => void;
  showComplaintButton?: boolean;
  companyId?: string;
  companyName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState(activeTab);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { value: "overview", label: "Overview", icon: Eye },
    { value: "financial", label: "Financial", icon: LineChart },
    { value: "operations", label: "Operations", icon: Cpu },
    { value: "compliance", label: "Compliance", icon: ShieldCheck },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileTab(value);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Desktop Tabs with prominent complaint button */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-1 shadow-lg">
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`flex items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 group ${
                    activeTab === tab.value
                      ? "bg-white shadow-lg border border-gray-200/50"
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 mr-2 ${
                    activeTab === tab.value ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"
                  }`} />
                  <span className={`font-medium ${
                    activeTab === tab.value ? "text-blue-700" : "text-gray-700 group-hover:text-blue-600"
                  }`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* {showComplaintButton && companyId && companyName && (
            <div className="ml-4">
              <ComplaintModal companyId={companyId} companyName={companyName} />
            </div>
          )} */}
        </div>
      </div>

      {/* Mobile Tabs with prominent complaint button */}
      <div className="lg:hidden relative">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 h-12 px-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 hover:border-blue-300 hover:bg-white justify-between"
          >
            <div className="flex items-center">
              {(() => {
                const Icon = tabs.find(t => t.value === mobileTab)?.icon || Eye;
                return <Icon className="w-5 h-5 mr-2 text-blue-600" />;
              })()}
              <span className="font-medium text-gray-900">
                {tabs.find(t => t.value === mobileTab)?.label || "Overview"}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
          {/* {showComplaintButton && companyId && companyName && (
            <ComplaintModal companyId={companyId} companyName={companyName} />
          )} */}
        </div>

        {/* Mobile Dropdown Menu - Fixed positioning */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-xl border-2 border-gray-200/50 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`flex items-center w-full p-4 rounded-xl transition-all duration-200 ${
                    mobileTab === tab.value
                      ? "bg-gradient-to-r from-blue-50 to-cyan-50/50 border border-blue-200 text-blue-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${
                    mobileTab === tab.value ? "text-blue-600" : "text-gray-500"
                  }`} />
                  <span className="font-medium">{tab.label}</span>
                  {mobileTab === tab.value && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading Component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-cyan-500/20 animate-pulse" />
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 absolute inset-0 m-auto" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
              Loading Company Profile
            </h2>
            <p className="text-gray-600 max-w-md">
              Fetching comprehensive business intelligence and analytics...
            </p>
            <div className="w-64 h-2 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-cyan-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-slide"></div>
            </div>
          </div>
          <style jsx>{`
            @keyframes slide {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
            .animate-slide {
              animation: slide 1.5s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ErrorState({ error, router }: { error: string | null; router: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-xl" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center border-4 border-white shadow-lg">
              <AlertCircle className="w-16 h-16 text-rose-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {error?.includes('not found') ? 'Company Not Found' : 'Error Loading Profile'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            {error || 'The requested company profile could not be found in our registry.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.back()}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Previous
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/explore')}
              className="h-12 px-6 border-2"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Browse Companies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch company details
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/explore/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Company not found');
          }
          throw new Error(`Failed to fetch company: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.success) {
          setCompany(data.data);
        } else {
          setError('Failed to load company data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching company:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCompany();
    }
  }, [params.id]);

  if (loading) return <LoadingState />;
  if (error || !company) return <ErrorState error={error} router={router} />;

  // Calculate years operating
  const yearsOperating = new Date().getFullYear() - company.foundedYear;

  // Get display values with fallbacks
  const displayName = company.name || 'Unknown Company';
  const displayIndustry = formatIndustry(company.industry);
  const displayLocation = company.city || company.location || 'Location not specified';
  const displayDescription = company.description || 'No description available.';
  const displayStatus = formatStatus(company.status);
  const displayVerificationLevel = formatVerificationLevel(company.verificationLevel);
  const displayRating = company.rating || 'N/A';
  const displayComplianceScore = company.complianceScore || 0;
  const displayRevenue = company.revenue || company.annualRevenueRange || 'Not available';
  const displayEmployees = company.employees || 'Not specified';
  const displayWebsite = company.website;
  const displayContactEmail = company.contactEmail;
  const displayContactPhone = company.contactPhone;
  const displayCEO = company.ceo;
  const displayAddress = company.address;
  const displayTaxId = company.taxId;
  const displayBusinessType = formatIndustry(company.businessType);
  const displayOwnership = formatIndustry(company.ownership);
  const displayYearEnd = company.yearEnd;
  const displayLastUpdated = company.lastUpdated || company.updatedAt || company.lastVerifiedAt;

  // Get arrays (with fallback)
  const displayServices = company.services || [];
  const displaySubsidiaries = company.subsidiaries || [];
  const displayCertifications = company.certifications || [];
  const displayTags = company.tags || [];
  const displayRecentNews = company.recentNews || [];
  const displayComplianceRecords = company.complianceRecords || [];
  const displayRevenueGrowth = company.revenueGrowth || [];
  const displayAwards = company.awards || [];
  const displayDirectors = company.directors || [];

  // Calculate metrics
  const trustScore = company.trustScore || 85;
  const riskScore = company.riskAssessment?.overallRisk || 25;
  const esgScore = company.esgScores?.overall || 78;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-blue-50/20">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        
        {/* Navigation with prominent complaint button */}
        <div className="relative border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="group px-4 h-10 bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300 hover:bg-white/80 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                  Back
                </span>
              </Button>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`h-10 w-10 rounded-xl backdrop-blur-sm border ${
                          isFavorite
                            ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                            : "bg-white/50 border-gray-200/50 text-gray-600 hover:border-rose-200 hover:bg-rose-50/50"
                        } transition-all duration-200`}
                      >
                        <Heart
                          className={`w-5 h-5 ${isFavorite ? "fill-rose-500" : ""}`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl backdrop-blur-sm bg-white/50 border border-gray-200/50 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-200"
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Prominent complaint button in header */}
                {company && (
                  <ComplaintModal companyId={company.id} companyName={displayName} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Header */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
            {/* Left Column - Company Identity */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                {/* Logo Container */}
                <div className="relative">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 shadow-2xl shadow-blue-500/30 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <Building2 className="w-16 h-16 sm:w-20 sm:h-20 text-white z-10" />
                    
                    {/* Animated rings */}
                    <div className="absolute inset-0 border-2 border-white/20 rounded-3xl animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute inset-4 border-2 border-white/10 rounded-2xl animate-ping" style={{ animationDelay: '1s' }} />
                    
                    {/* Verification Badge */}
                    {company.verificationLevel === "verified" && (
                      <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50 z-20 animate-bounce-subtle">
                        <BadgeCheck className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border ${statusColors[company.status].border} ${statusColors[company.status].bg}`}>
                      <div className={`w-2 h-2 rounded-full ${statusColors[company.status].icon} mr-2 animate-pulse`} />
                      <span className={`text-sm font-semibold ${statusColors[company.status].text}`}>
                        {displayStatus}
                      </span>
                    </div>
                    
                    <div className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border ${verificationColors[company.verificationLevel].border} ${verificationColors[company.verificationLevel].bg}`}>
                      <Shield className={`w-4 h-4 ${verificationColors[company.verificationLevel].icon} mr-2`} />
                      <span className={`text-sm font-semibold ${verificationColors[company.verificationLevel].text}`}>
                        {displayVerificationLevel}
                      </span>
                    </div>
                    
                    {displayRating !== 'N/A' && (
                      <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-200/50">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-2" />
                        <span className="text-sm font-semibold text-amber-700">
                          {displayRating} Rating
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    {displayName}
                    <span className="block text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-medium mt-2">
                      {company.tradingName || company.registrationNumber}
                    </span>
                  </h1>

                  {/* Quick Info with better icons */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl group hover:border-blue-300 transition-all duration-200">
                      <IconContainer variant="primary" className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform">
                        <MapPin className="w-4 h-4" />
                      </IconContainer>
                      <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{displayLocation}</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl group hover:border-purple-300 transition-all duration-200">
                      <IconContainer variant="primary" className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform">
                        <Building className="w-4 h-4" />
                      </IconContainer>
                      <span className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">{displayIndustry}</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl group hover:border-amber-300 transition-all duration-200">
                      <IconContainer variant="warning" className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform">
                        <Calendar className="w-4 h-4" />
                      </IconContainer>
                      <span className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                        Since {company.foundedYear} · {yearsOperating} years
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                      {displayDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Metrics */}
            <div className="lg:w-80 space-y-6">
              {/* Primary Actions with better icons */}
              <div className="grid grid-cols-2 gap-3">
                {displayWebsite && (
                  <Button
                    variant="outline"
                    className="h-14 bg-white/80 backdrop-blur-sm border-gray-300/50 hover:border-blue-300 hover:bg-white rounded-xl group transition-all duration-200"
                    onClick={() => window.open(displayWebsite, "_blank", "noopener,noreferrer")}
                  >
                    <div className="flex items-center justify-center w-full">
                      <IconContainer variant="primary" className="mr-3 group-hover:scale-110 transition-transform">
                        <Globe className="w-5 h-5" />
                      </IconContainer>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-gray-900">Website</div>
                        <div className="text-xs text-gray-500 truncate">Visit</div>
                      </div>
                    </div>
                  </Button>
                )}
                
                <Button
                  className="h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-full">
                    <IconContainer variant="primary" className="bg-white/20 mr-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-white" />
                    </IconContainer>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">Full Report</div>
                      <div className="text-xs text-white/80">Download PDF</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Key Metrics with better icons */}
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="flex items-center text-sm font-semibold text-gray-900">
                    <IconContainer variant="primary" className="w-8 h-8 mr-2">
                      <TargetIcon className="w-4 h-4" />
                    </IconContainer>
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{displayEmployees}</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <Users className="w-3 h-3 mr-1" />
                        Employees
                      </div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{displayRevenue}</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Annual Revenue
                      </div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{displayComplianceScore}%</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Compliance
                      </div>
                    </div>
                    <div className="text-center group">
                      <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{trustScore}%</div>
                      <div className="text-xs text-gray-500 flex items-center justify-center">
                        <Handshake className="w-3 h-3 mr-1" />
                        Trust Score
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Facts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-blue-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
                <CardTitle className="flex items-center text-lg">
                  <IconContainer variant="primary">
                    <FileCheck className="w-6 h-6" />
                  </IconContainer>
                  <span className="ml-3">Registration Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-5">
                {[
                  { label: "Registration Number", value: company.registrationNumber, icon: CreditCard, variant: "primary" as const },
                  { label: "Business Type", value: displayBusinessType, icon: BuildingIcon, variant: "primary" as const },
                  { label: "Ownership", value: displayOwnership, icon: UsersIcon, variant: "primary" as const },
                  { label: "Year End", value: displayYearEnd || 'Not specified', icon: Calendar, variant: "warning" as const },
                  { label: "Tax ID", value: displayTaxId || 'Not specified', icon: Wallet, variant: "success" as const },
                  { label: "Industry", value: displayIndustry, icon: Hash, variant: "primary" as const },
                ].map((item, index) => (
                  <div key={index} className="flex items-center group p-3 rounded-lg hover:bg-blue-50/50 transition-all duration-200">
                    <IconContainer variant={item.variant} className="w-10 h-10 mr-3 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </IconContainer>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-1">{item.label}</p>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            {(displayCEO || displayContactPhone || displayContactEmail || displayAddress) && (
              <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-cyan-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
                <CardHeader className="relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500" />
                  <CardTitle className="flex items-center text-lg">
                    <IconContainer variant="success">
                      <UsersIcon className="w-6 h-6" />
                    </IconContainer>
                    <span className="ml-3">Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-5">
                  {[
                    { label: "CEO", value: displayCEO, icon: Briefcase, variant: "primary" as const, show: !!displayCEO },
                    { label: "Phone", value: displayContactPhone, icon: Phone, variant: "success" as const, show: !!displayContactPhone },
                    { label: "Email", value: displayContactEmail, icon: Mail, variant: "primary" as const, show: !!displayContactEmail },
                    { label: "Address", value: displayAddress, icon: Home, variant: "warning" as const, show: !!displayAddress },
                  ]
                    .filter(item => item.show)
                    .map((item, index) => (
                      <div key={index} className="flex items-center group p-3 rounded-lg hover:bg-cyan-50/50 transition-all duration-200">
                        <IconContainer variant={item.variant} className="w-10 h-10 mr-3 group-hover:scale-110 transition-transform">
                          <item.icon className="w-5 h-5" />
                        </IconContainer>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 mb-1">{item.label}</p>
                          <p className="font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors truncate">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}

            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Compliance Score */}
              <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
                <CardHeader className="relative pb-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                  <CardTitle className="flex items-center text-lg">
                    <IconContainer variant="success">
                      <ShieldCheck className="w-6 h-6" />
                    </IconContainer>
                    <span className="ml-3">Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">{displayComplianceScore}%</div>
                    <p className="text-sm text-gray-600">Regulatory Compliance Score</p>
                  </div>
                  <Progress value={displayComplianceScore} className="h-3 bg-gray-200/50" />
                </CardContent>
              </Card>

              {/* Trust Score */}
              <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-blue-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <IconContainer variant="primary" className="w-8 h-8 mr-2">
                      <Handshake className="w-4 h-4" />
                    </IconContainer>
                    <span className="text-sm font-semibold text-gray-900">Trust Score</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{trustScore}%</div>
                  <Progress value={trustScore} className="h-2 mt-2 bg-gray-200/50" />
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-rose-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <IconContainer variant="danger" className="w-8 h-8 mr-2">
                      <Scale className="w-4 h-4" />
                    </IconContainer>
                    <span className="text-sm font-semibold text-gray-900">Risk Score</span>
                  </div>
                  <div className="text-2xl font-bold text-rose-700">{riskScore}%</div>
                  <Progress value={riskScore} className="h-2 mt-2 bg-gray-200/50" />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            {/* Enhanced Tabs */}
            <ResponsiveTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              showComplaintButton={true}
              companyId={company.id}
              companyName={displayName}
            />

            {/* Tab Contents */}
            <div className="mt-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Services & Offerings */}
                  {displayServices.length > 0 && (
                    <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <IconContainer variant="success">
                            <Zap className="w-6 h-6" />
                          </IconContainer>
                          <div className="ml-3">
                            <span>Services & Offerings</span>
                            <CardDescription>Core business services provided</CardDescription>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {displayServices.map((service, index) => (
                            <div
                              key={index}
                              className="group flex items-center p-4 bg-white/50 backdrop-blur-sm border border-emerald-200/50 rounded-xl hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50/30 transition-all duration-200"
                            >
                              <IconContainer variant="success" className="mr-3 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-5 h-5" />
                              </IconContainer>
                              <span className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Business Categories */}
                  {displayTags.length > 0 && (
                    <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-purple-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <IconContainer variant="primary">
                            <Layers className="w-6 h-6" />
                          </IconContainer>
                          <span className="ml-3">Business Categories</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {displayTags.map((tag, index) => (
                            <Badge
                              key={index}
                              className="px-4 py-2 rounded-full backdrop-blur-sm bg-white/50 border border-purple-200/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-300 transition-all duration-200 group"
                            >
                              <span className="text-purple-700 group-hover:text-purple-800 font-medium">
                                {tag}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Certifications */}
                  {displayCertifications.length > 0 && (
                    <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-amber-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <IconContainer variant="warning">
                            <Award className="w-6 h-6" />
                          </IconContainer>
                          <span className="ml-3">Certifications & Awards</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {displayCertifications.map((cert, index) => (
                            <div
                              key={index}
                              className="group p-4 bg-white/50 backdrop-blur-sm border border-amber-200/50 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200"
                            >
                              <div className="flex items-center">
                                <IconContainer variant="warning" className="mr-3 group-hover:scale-110 transition-transform">
                                  <BadgeCheck className="w-5 h-5" />
                                </IconContainer>
                                <span className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                                  {cert}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Financial Tab */}
              {activeTab === "financial" && (
                <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -translate-y-24 translate-x-24" />
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <IconContainer variant="success">
                        <LineChart className="w-6 h-6" />
                      </IconContainer>
                      <div className="ml-3">
                        <span>Financial Overview</span>
                        <CardDescription>Revenue, growth, and financial health</CardDescription>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Revenue Display */}
                    <div className="p-6 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-2xl border border-emerald-200/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Annual Revenue</p>
                          <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            {displayRevenue}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Growth Trend</p>
                          {displayRevenueGrowth.length > 0 && (
                            <div className="text-2xl font-bold text-emerald-700 flex items-center">
                              {displayRevenueGrowth[displayRevenueGrowth.length - 1].growth > 0 ? (
                                <>
                                  <TrendingUp className="w-6 h-6 mr-1" />
                                  +{displayRevenueGrowth[displayRevenueGrowth.length - 1].growth}%
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="w-6 h-6 mr-1 text-rose-600" />
                                  {displayRevenueGrowth[displayRevenueGrowth.length - 1].growth}%
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Operations Tab */}
              {activeTab === "operations" && (
                <div className="space-y-6">
                  {/* Operational Structure */}
                  <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-blue-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconContainer variant="primary">
                          <Cpu className="w-6 h-6" />
                        </IconContainer>
                        <div className="ml-3">
                          <span>Operational Structure</span>
                          <CardDescription>Business operations and organizational details</CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { label: "Business Type", value: displayBusinessType, icon: Building, variant: "primary" as const },
                          { label: "Ownership Structure", value: displayOwnership, icon: Users, variant: "primary" as const },
                          { label: "Years Operating", value: `${yearsOperating} years`, icon: Calendar, variant: "warning" as const },
                          { label: "Primary Location", value: displayLocation, icon: MapPin, variant: "primary" as const },
                          { label: "Employee Count", value: displayEmployees, icon: UsersIcon, variant: "primary" as const },
                          { label: "Industry", value: displayIndustry, icon: Building, variant: "primary" as const },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="p-5 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 group"
                          >
                            <div className="flex items-center mb-3">
                              <IconContainer variant={item.variant} className="w-10 h-10 mr-3 group-hover:scale-110 transition-transform">
                                <item.icon className="w-5 h-5" />
                              </IconContainer>
                              <p className="text-sm font-medium text-gray-700">{item.label}</p>
                            </div>
                            <p className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Compliance Tab */}
              {activeTab === "compliance" && (
                <div className="space-y-6">
                  {/* Compliance Status */}
                  {displayComplianceRecords.length > 0 ? (
                    <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <IconContainer variant="success">
                            <ShieldCheck className="w-6 h-6" />
                          </IconContainer>
                          <div className="ml-3">
                            <span>Regulatory Compliance</span>
                            <CardDescription>Legal and regulatory standing</CardDescription>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {displayComplianceRecords.map((record, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-5 bg-white/50 backdrop-blur-sm border border-emerald-200/50 rounded-xl hover:border-emerald-300 transition-all duration-200 group"
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-4 ${
                                (record.score || 0) > 90
                                  ? "bg-emerald-500 animate-pulse"
                                  : (record.score || 0) > 70
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                              }`} />
                              <div>
                                <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                  {record.type}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Status: {record.status}
                                  {record.completedDate && (
                                    <span className="ml-3">
                                      Completed: {new Date(record.completedDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {record.score && (
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-emerald-700">
                                    {record.score}%
                                  </div>
                                  <Badge
                                    className={`mt-1 ${
                                      record.status === "Active"
                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                        : record.status === "Pending"
                                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                          : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                                    }`}
                                  >
                                    {record.status}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-gray-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
                      <CardContent className="py-12">
                        <div className="text-center">
                          <IconContainer variant="default" className="w-16 h-16 mx-auto mb-6">
                            <FileWarning className="w-8 h-8" />
                          </IconContainer>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            No Compliance Data Available
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Compliance information for this company is not yet available in our records.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>

            {/* Verification Banner */}
            <div className={`mt-8 backdrop-blur-sm rounded-2xl border-2 p-8 shadow-xl overflow-hidden ${
              verificationColors[company.verificationLevel].border
            } ${verificationColors[company.verificationLevel].bg}`}>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className={`relative w-20 h-20 rounded-full shadow-2xl flex items-center justify-center ${
                  verificationColors[company.verificationLevel].gradient
                }`}>
                  <ShieldCheck className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {company.verificationLevel === "verified"
                      ? "✅ Officially Verified Business"
                      : company.verificationLevel === "pending"
                        ? "⏳ Verification In Progress"
                        : "❌ Unverified Business"}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {company.verificationLevel === "verified"
                      ? "This company has been officially verified by the Sierra Leone Corporate Affairs Commission. All registration details are current, validated, and up-to-date."
                      : company.verificationLevel === "pending"
                        ? "This company's verification is currently being processed. Some details may require additional verification before full validation."
                        : "This company has not yet completed the official verification process. Details should be independently confirmed before business engagement."}
                  </p>
                  {displayLastUpdated && (
                    <div className="mt-4 flex items-center justify-center lg:justify-start text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Last updated: {new Date(displayLastUpdated).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className={`border-2 px-6 py-3 rounded-xl shadow-sm ${
                    company.verificationLevel === "verified"
                      ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                      : company.verificationLevel === "pending"
                        ? "border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}