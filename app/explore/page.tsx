"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Building2,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Star,
  ChevronRight,
  Eye,
  Shield,
  ExternalLink,
  Grid,
  List,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Type definitions
export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  status: "Active" | "Pending" | "Suspended" | "Inactive";
  industry: string;
  location: string;
  foundedYear: number;
  employees: string;
  revenue: string;
  description: string;
  verificationLevel: "Verified" | "Pending" | "Unverified";
  rating: number;
  tags: string[];
  contactEmail?: string;
  website?: string;
}

// Demo data
const demoCompanies: Company[] = [
  {
    id: "SL-2023-001",
    name: "Africell Sierra Leone Limited",
    registrationNumber: "C123456",
    status: "Active",
    industry: "Telecommunications",
    location: "Freetown",
    foundedYear: 2010,
    employees: "500-1000",
    revenue: "$100M+",
    description:
      "Leading telecommunications provider in Sierra Leone with nationwide coverage.",
    verificationLevel: "Verified",
    rating: 4.8,
    tags: ["Telecom", "ISP", "Mobile", "National"],
    website: "https://africell.sl",
  },
  {
    id: "SL-2023-002",
    name: "Sierra Leone Commercial Bank",
    registrationNumber: "B789012",
    status: "Active",
    industry: "Banking & Finance",
    location: "Freetown",
    foundedYear: 1973,
    employees: "1000+",
    revenue: "$500M+",
    description:
      "National commercial bank providing comprehensive financial services.",
    verificationLevel: "Verified",
    rating: 4.6,
    tags: ["Banking", "Finance", "Loans", "National"],
    website: "https://slcb.com",
  },
  {
    id: "SL-2023-003",
    name: "Makeni Agro Processing Ltd",
    registrationNumber: "A345678",
    status: "Active",
    industry: "Agriculture",
    location: "Makeni",
    foundedYear: 2018,
    employees: "50-100",
    revenue: "$5M-10M",
    description:
      "Agricultural processing company specializing in rice and palm oil production.",
    verificationLevel: "Verified",
    rating: 4.2,
    tags: ["Agriculture", "Processing", "Export", "SME"],
    contactEmail: "info@makeniagro.sl",
  },
  {
    id: "SL-2023-004",
    name: "Kono Diamond Mining Corporation",
    registrationNumber: "M901234",
    status: "Active",
    industry: "Mining",
    location: "Kono District",
    foundedYear: 2005,
    employees: "200-500",
    revenue: "$50M-100M",
    description:
      "Diamond mining and export company operating in the Kono diamond fields.",
    verificationLevel: "Verified",
    rating: 4.4,
    tags: ["Mining", "Diamonds", "Export", "Extractive"],
    website: "https://konodiamonds.sl",
  },
  {
    id: "SL-2023-005",
    name: "Freetown Port Authority",
    registrationNumber: "G567890",
    status: "Active",
    industry: "Logistics & Shipping",
    location: "Freetown",
    foundedYear: 1961,
    employees: "500-1000",
    revenue: "$200M+",
    description:
      "Government agency managing port operations and maritime activities.",
    verificationLevel: "Verified",
    rating: 4.0,
    tags: ["Logistics", "Shipping", "Government", "Port"],
    website: "https://freetownport.gov.sl",
  },
  {
    id: "SL-2023-006",
    name: "Salone Tech Solutions",
    registrationNumber: "T234567",
    status: "Active",
    industry: "Technology",
    location: "Freetown",
    foundedYear: 2020,
    employees: "10-50",
    revenue: "$1M-5M",
    description:
      "Innovative tech startup providing software development and IT consulting services.",
    verificationLevel: "Pending",
    rating: 4.7,
    tags: ["Technology", "Startup", "Software", "IT"],
    website: "https://salonetech.sl",
  },
  {
    id: "SL-2023-007",
    name: "Bo Healthcare Center",
    registrationNumber: "H890123",
    status: "Active",
    industry: "Healthcare",
    location: "Bo",
    foundedYear: 2015,
    employees: "100-200",
    revenue: "$10M-20M",
    description:
      "Modern healthcare facility providing medical services in the Southern Province.",
    verificationLevel: "Verified",
    rating: 4.5,
    tags: ["Healthcare", "Hospital", "Medical", "Southern"],
    contactEmail: "contact@bohealthcare.sl",
  },
  {
    id: "SL-2023-008",
    name: "Sierra Fisheries Ltd",
    registrationNumber: "F456789",
    status: "Active",
    industry: "Fisheries",
    location: "Waterloo",
    foundedYear: 1998,
    employees: "200-300",
    revenue: "$20M-50M",
    description: "Sustainable fishing and seafood processing company.",
    verificationLevel: "Verified",
    rating: 4.1,
    tags: ["Fisheries", "Seafood", "Export", "Sustainable"],
    website: "https://sierrafisheries.sl",
  },
];

const industries = [
  "All Industries",
  "Technology",
  "Banking & Finance",
  "Agriculture",
  "Mining",
  "Healthcare",
  "Telecommunications",
  "Logistics & Shipping",
  "Fisheries",
];
const locations = [
  "All Locations",
  "Freetown",
  "Makeni",
  "Bo",
  "Kono District",
  "Waterloo",
  "Kenema",
  "Koidu",
];

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return demoCompanies.filter((company) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.registrationNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Industry filter
      const matchesIndustry =
        selectedIndustry === "all" ||
        company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

      // Location filter
      const matchesLocation =
        selectedLocation === "all" ||
        company.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Verified filter
      const matchesVerified =
        !showVerifiedOnly || company.verificationLevel === "Verified";

      return (
        matchesSearch && matchesIndustry && matchesLocation && matchesVerified
      );
    });
  }, [searchQuery, selectedIndustry, selectedLocation, showVerifiedOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedLocation("all");
    setShowVerifiedOnly(false);
  };

  const activeFiltersCount = [
    searchQuery !== "" ? 1 : 0,
    selectedIndustry !== "all" ? 1 : 0,
    selectedLocation !== "all" ? 1 : 0,
    showVerifiedOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Handle View button click
  const handleViewCompany = (companyId: string) => {
    router.push(`/explore/${companyId}`);
  };

  // Handle Website button click
  const handleVisitWebsite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-emerald-600/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Explore{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Businesses
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Discover all legally registered businesses in Sierra Leone. Filter
              by industry, location, and status.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      placeholder="Search by company name, registration number, or keyword..."
                      className="pl-9 sm:pl-10 w-full text-sm sm:text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Industry Filter */}
                <div>
                  <Select
                    value={selectedIndustry}
                    onValueChange={setSelectedIndustry}
                  >
                    <SelectTrigger className="w-full text-sm sm:text-base">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry}
                          value={industry.toLowerCase()}
                        >
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger className="w-full text-sm sm:text-base">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem
                          key={location}
                          value={location.toLowerCase()}
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Bar */}
              {activeFiltersCount > 0 && (
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {filteredCompanies.length} results found
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 text-xs"
                    >
                      {activeFiltersCount} filter
                      {activeFiltersCount !== 1 ? "s" : ""} active
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm h-7 sm:h-8"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}

              {/* Quick Filters */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs sm:text-sm h-7 sm:h-8"
                    onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                  >
                    <Shield
                      className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 ${showVerifiedOnly ? "text-green-600" : ""}`}
                    />
                    Verified Only
                    {showVerifiedOnly && (
                      <CheckCircle className="w-3 h-3 ml-1.5 text-green-600" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs sm:text-sm h-7 sm:h-8"
                  >
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                    Large Employers
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs sm:text-sm h-7 sm:h-8"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                    Recent
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Verified Only
                  </span>
                  <Switch
                    checked={showVerifiedOnly}
                    onCheckedChange={setShowVerifiedOnly}
                    className="scale-90 sm:scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {demoCompanies.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Showing Now</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {demoCompanies.filter((c) => c.status === "Active").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Active Status
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              {Array.from(new Set(demoCompanies.map((c) => c.industry))).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Industries</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              {Array.from(new Set(demoCompanies.map((c) => c.location))).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Locations</div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Featured Businesses
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {filteredCompanies.length} of {demoCompanies.length}{" "}
              results
              {activeFiltersCount > 0 && " (filtered)"}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 sm:h-9 sm:w-auto sm:px-3 ${viewMode === "grid" ? "shadow-sm" : ""}`}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 sm:h-9 sm:w-auto sm:px-3 ${viewMode === "list" ? "shadow-sm" : ""}`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">List</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Companies Grid/List */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl border border-gray-200">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No businesses found
            </h3>
            <p className="text-sm text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={clearFilters} size="sm" className="sm:text-base">
              Clear all filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onViewCompany={handleViewCompany}
                onVisitWebsite={handleVisitWebsite}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyRowCard
                key={company.id}
                company={company}
                onViewCompany={handleViewCompany}
                onVisitWebsite={handleVisitWebsite}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 text-sm sm:text-base"
            >
              Load More Businesses
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Data Quality Note */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                Data Quality & Verification
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                All business data is sourced directly from the Sierra Leone
                Corporate Affairs Commission and updated daily. Verification
                status indicates the level of due diligence completed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    ✓ Verified - Full due diligence
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    ⏳ Pending - Under review
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    ○ Unverified - Basic registration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Props for Company Card components
interface CompanyCardProps {
  company: Company;
  onViewCompany: (companyId: string) => void;
  onVisitWebsite: (url: string) => void;
}

// Grid View Company Card Component
function CompanyCard({
  company,
  onViewCompany,
  onVisitWebsite,
}: CompanyCardProps) {
  return (
    <Card className="group hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-blue-200 bg-gradient-to-b from-white to-gray-50/50 h-full flex flex-col">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-4 sm:pt-6">
        <div className="flex flex-col gap-2">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Badge
                className={`text-xs px-2 py-0.5 h-5 ${
                  company.status === "Active"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : company.status === "Pending"
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {company.status}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 h-5 ${
                  company.verificationLevel === "Verified"
                    ? "border-green-300 text-green-700 bg-green-50"
                    : company.verificationLevel === "Pending"
                      ? "border-amber-300 text-amber-700 bg-amber-50"
                      : "border-gray-300 text-gray-600 bg-gray-50"
                }`}
              >
                {company.verificationLevel === "Verified" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 mr-1" />
                )}
                {company.verificationLevel}
              </Badge>
            </div>

            {/* Rating - Fixed positioning */}
            <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md flex-shrink-0">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
              <span className="font-bold text-sm sm:text-base ml-1">
                {company.rating}
              </span>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex items-start gap-2 sm:gap-3 mt-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate leading-tight">
                {company.name}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-0.5 truncate">
                {company.registrationNumber} • {company.industry}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 sm:pb-4 px-3 sm:px-6 flex-1">
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
              <span className="truncate">{company.location}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
              <span className="truncate">{company.employees}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-700">
            <p
              className="line-clamp-3 leading-relaxed"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {company.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {company.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full border border-gray-300"
              >
                {tag}
              </span>
            ))}
            {company.tags.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{company.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-3 sm:px-6 pb-4 sm:pb-6">
        <div className="flex justify-between items-center w-full">
          <div className="text-xs sm:text-sm text-gray-500">
            Est. {company.foundedYear} • {company.revenue}
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 sm:h-8 w-7 sm:w-auto px-2 sm:px-3"
              onClick={() => onViewCompany(company.id)}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline ml-1.5">View</span>
            </Button>
            {company.website && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 sm:h-8 w-7 sm:w-auto px-2 sm:px-3"
                onClick={() => onVisitWebsite(company.website!)}
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-1.5">Site</span>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// List View Company Card Component
function CompanyRowCard({
  company,
  onViewCompany,
  onVisitWebsite,
}: CompanyCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 border-l-2 sm:border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Company Logo and Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {company.name}
                  </h3>
                  <div className="flex items-center bg-amber-50 text-amber-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex-shrink-0">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-xs sm:text-sm ml-0.5 sm:ml-1">
                      {company.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <Badge
                    className={`text-xs px-1.5 py-0.5 h-5 ${
                      company.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : company.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {company.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs h-5">
                    {company.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs h-5">
                    <MapPin className="w-3 h-3 mr-1" />
                    {company.location}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {company.registrationNumber}
                  </span>
                </div>

                <p
                  className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {company.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <span>
                    <Users className="w-3 h-3 inline mr-1" />
                    {company.employees}
                  </span>
                  <span>•</span>
                  <span>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Est. {company.foundedYear}
                  </span>
                  <span>•</span>
                  <span>{company.revenue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <div
              className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium text-center ${
                company.verificationLevel === "Verified"
                  ? "bg-green-100 text-green-700"
                  : company.verificationLevel === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {company.verificationLevel}
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 sm:flex-none h-7 sm:h-8 text-xs sm:text-sm"
                onClick={() => onViewCompany(company.id)}
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">View</span>
              </Button>
              {company.website && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none h-7 sm:h-8 text-xs sm:text-sm"
                  onClick={() => onVisitWebsite(company.website!)}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Site</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
