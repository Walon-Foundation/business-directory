"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Loader2,
  Sparkles,
  Target,
  Zap,
  Building,
  Tag,
  Award,
  Globe,
  Phone,
  Mail,
  BarChart,
  Users as UsersIcon,
  FileText,
  Clock,
  Heart,
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
import { Switch } from "@/components/ui/switch";
import { debounce } from "lodash";

// Type definitions based on your API response
export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  status: "active" | "pending" | "suspended" | "inactive";
  industry: string;
  location: string;
  foundedYear: number;
  employees: string;
  revenue: string;
  description: string;
  verificationLevel: "verified" | "pending" | "unverified";
  rating: string;
  tags: string[];
  contactEmail?: string;
  website?: string;
  tradingName?: string;
  city?: string;
  province?: string;
  country: string;
  businessType: string;
  ownership: string;
  complianceScore: number;
  trustScore?: number;
  yearsOperating?: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    businesses: Company[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    filters: {
      availableStatuses: Record<string, number>;
      industries: Array<{ industry: string; count: number }>;
    };
  };
  timestamp: string;
}

// Industry options from your schema
const industries = [
  "All Industries",
  "technology",
  "banking_finance",
  "agriculture",
  "mining",
  "healthcare",
  "telecommunications",
  "logistics_shipping",
  "fisheries",
  "construction",
  "manufacturing",
  "retail",
  "tourism_hospitality",
  "education",
  "energy_utilities",
  "real_estate",
  "transportation",
  "media_entertainment",
  "professional_services",
  "other",
];

// Business type options
const businessTypes = [
  "All Types",
  "private_limited",
  "public_limited",
  "sole_proprietorship",
  "partnership",
  "government_agency",
  "ngo",
  "cooperative",
  "foreign_branch",
  "other",
];

// Ownership options
const ownershipTypes = [
  "All Ownership",
  "local",
  "foreign",
  "joint_venture",
  "government",
  "mixed",
];

// Get industry icon
const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "technology":
      return Zap;
    case "banking_finance":
      return Building;
    case "agriculture":
      return Tag;
    case "mining":
      return Award;
    case "healthcare":
      return Users;
    case "telecommunications":
      return Globe;
    case "logistics_shipping":
      return TrendingUp;
    case "fisheries":
      return Tag;
    case "construction":
      return Building2;
    case "manufacturing":
      return BarChart;
    case "retail":
      return Tag;
    case "tourism_hospitality":
      return Award;
    case "education":
      return FileText;
    case "energy_utilities":
      return Zap;
    case "real_estate":
      return Building2;
    case "transportation":
      return TrendingUp;
    case "media_entertainment":
      return Globe;
    case "professional_services":
      return UsersIcon;
    default:
      return Building2;
  }
};

// Main page component with Suspense wrapper
export default function ExplorePage() {
  return (
    <Suspense fallback={<ExplorePageSkeleton />}>
      <ExplorePageContent />
    </Suspense>
  );
}

// Skeleton component
function ExplorePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      <EnhancedHeaderSkeleton />
      <EnhancedContentSkeleton />
    </div>
  );
}

// Main content component
function ExplorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [industryStats, setIndustryStats] = useState<
    Array<{ industry: string; count: number }>
  >([]);
  const [isFavorite, setIsFavorite] = useState<string[]>([]);

  // Filters from URL or default
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || "",
  );
  const [selectedIndustry, setSelectedIndustry] = useState(
    searchParams?.get("industry") || "all",
  );
  const [selectedBusinessType, setSelectedBusinessType] = useState(
    searchParams?.get("businessType") || "all",
  );
  const [selectedOwnership, setSelectedOwnership] = useState(
    searchParams?.get("ownership") || "all",
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams?.get("location") || "all",
  );
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(
    searchParams?.get("verifiedOnly") === "true",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState(searchParams?.get("sortBy") || "name");
  const [sortOrder, setSortOrder] = useState(
    searchParams?.get("sortOrder") || "asc",
  );
  const [minRating, setMinRating] = useState(
    searchParams?.get("minRating") || "0",
  );
  const [maxRating, setMaxRating] = useState(
    searchParams?.get("maxRating") || "5",
  );

  // Fetch companies from API
  const fetchCompanies = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();

        // Add filters
        if (searchQuery) params.set("search", searchQuery);
        if (selectedIndustry !== "all")
          params.set("industry", selectedIndustry);
        if (selectedBusinessType !== "all")
          params.set("businessType", selectedBusinessType);
        if (selectedOwnership !== "all")
          params.set("ownership", selectedOwnership);
        if (selectedLocation !== "all")
          params.set("location", selectedLocation);
        if (showVerifiedOnly) params.set("verificationLevel", "verified");
        if (sortBy) params.set("sortBy", sortBy);
        if (sortOrder) params.set("sortOrder", sortOrder);
        if (minRating !== "0") params.set("minRating", minRating);
        if (maxRating !== "5") params.set("maxRating", maxRating);

        // Pagination
        params.set("page", page.toString());
        params.set("limit", "12");

        const response = await fetch(`/api/explore?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          setCompanies(data.data.businesses);
          setTotalCount(data.data.pagination.total);
          setTotalPages(data.data.pagination.totalPages);
          setCurrentPage(data.data.pagination.page);
          setHasNextPage(data.data.pagination.hasNextPage);
          setHasPreviousPage(data.data.pagination.hasPreviousPage);
          setIndustryStats(data.data.filters.industries || []);
        } else {
          setError("Failed to load companies");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    },
    [
      searchQuery,
      selectedIndustry,
      selectedBusinessType,
      selectedOwnership,
      selectedLocation,
      showVerifiedOnly,
      sortBy,
      sortOrder,
      minRating,
      maxRating,
    ],
  );

  // Debounced search to avoid too many API calls
  const debouncedFetch = useCallback(
    debounce((page: number) => {
      fetchCompanies(page);
    }, 500),
    [fetchCompanies],
  );

  // Initial fetch and when filters change
  useEffect(() => {
    debouncedFetch(1);
    // Update URL with current filters
    updateURL();
  }, [debouncedFetch]);

  // Update URL with current filters
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedIndustry !== "all") params.set("industry", selectedIndustry);
    if (selectedBusinessType !== "all")
      params.set("businessType", selectedBusinessType);
    if (selectedOwnership !== "all") params.set("ownership", selectedOwnership);
    if (selectedLocation !== "all") params.set("location", selectedLocation);
    if (showVerifiedOnly) params.set("verifiedOnly", "true");
    if (sortBy !== "name") params.set("sortBy", sortBy);
    if (sortOrder !== "asc") params.set("sortOrder", sortOrder);
    if (minRating !== "0") params.set("minRating", minRating);
    if (maxRating !== "5") params.set("maxRating", maxRating);

    router.replace(`/explore?${params.toString()}`, { scroll: false });
  }, [
    searchQuery,
    selectedIndustry,
    selectedBusinessType,
    selectedOwnership,
    selectedLocation,
    showVerifiedOnly,
    sortBy,
    sortOrder,
    minRating,
    maxRating,
    router,
  ]);

  // Handle search input with debouncing
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedBusinessType("all");
    setSelectedOwnership("all");
    setSelectedLocation("all");
    setShowVerifiedOnly(false);
    setSortBy("name");
    setSortOrder("asc");
    setMinRating("0");
    setMaxRating("5");
  };

  // Handle pagination
  const goToPage = (page: number) => {
    fetchCompanies(page);
  };

  // Handle View button click
  const handleViewCompany = (companyId: string) => {
    router.push(`/explore/${companyId}`);
  };

  // Handle Website button click
  const handleVisitWebsite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle favorite toggle
  const toggleFavorite = (companyId: string) => {
    setIsFavorite((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  // Get unique locations from current companies
  const uniqueLocations = useMemo(() => {
    const locations = companies.map((c) => c.location).filter(Boolean);
    return ["All Locations", ...Array.from(new Set(locations))];
  }, [companies]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    return [
      searchQuery !== "" ? 1 : 0,
      selectedIndustry !== "all" ? 1 : 0,
      selectedBusinessType !== "all" ? 1 : 0,
      selectedOwnership !== "all" ? 1 : 0,
      selectedLocation !== "all" ? 1 : 0,
      showVerifiedOnly ? 1 : 0,
      sortBy !== "name" ? 1 : 0,
      sortOrder !== "asc" ? 1 : 0,
      minRating !== "0" ? 1 : 0,
      maxRating !== "5" ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
  }, [
    searchQuery,
    selectedIndustry,
    selectedBusinessType,
    selectedOwnership,
    selectedLocation,
    showVerifiedOnly,
    sortBy,
    sortOrder,
    minRating,
    maxRating,
  ]);

  // Format status for display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format verification level for display
  const formatVerificationLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Format industry for display
  const formatIndustry = (industry: string) => {
    return industry
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "from-green-500 to-emerald-500";
      case "pending":
        return "from-amber-500 to-orange-500";
      case "suspended":
        return "from-red-500 to-rose-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  // Get verification color
  const getVerificationColor = (level: string) => {
    switch (level) {
      case "verified":
        return "from-blue-500 to-cyan-500";
      case "pending":
        return "from-amber-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  // Loading skeleton
  if (loading && companies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
        <EnhancedHeaderSkeleton />
        <EnhancedContentSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/20">
      {/* Enhanced Header */}
      <EnhancedHeader
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedBusinessType={selectedBusinessType}
        setSelectedBusinessType={setSelectedBusinessType}
        selectedOwnership={selectedOwnership}
        setSelectedOwnership={setSelectedOwnership}
        showVerifiedOnly={showVerifiedOnly}
        setShowVerifiedOnly={setShowVerifiedOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        minRating={minRating}
        setMinRating={setMinRating}
        maxRating={maxRating}
        setMaxRating={setMaxRating}
        activeFiltersCount={activeFiltersCount}
        clearFilters={clearFilters}
        totalCount={totalCount}
        companies={companies}
        uniqueLocations={uniqueLocations}
        formatIndustry={formatIndustry}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-gradient-to-br from-white to-red-50/30 rounded-2xl border-2 border-red-200/50 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Error Loading Data
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Button
              onClick={() => fetchCompanies(1)}
              className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Enhanced Stats Cards */}
            <EnhancedStatsCards totalCount={totalCount} companies={companies} />

            {/* Enhanced View Controls */}
            <EnhancedViewControls
              viewMode={viewMode}
              setViewMode={setViewMode}
              companies={companies}
              totalCount={totalCount}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Companies Grid/List */}
            {companies.length === 0 ? (
              <EnhancedEmptyState clearFilters={clearFilters} />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                  <EnhancedCompanyCard
                    key={company.id}
                    company={company}
                    onViewCompany={handleViewCompany}
                    onVisitWebsite={handleVisitWebsite}
                    isFavorite={isFavorite.includes(company.id)}
                    onToggleFavorite={() => toggleFavorite(company.id)}
                    formatStatus={formatStatus}
                    formatVerificationLevel={formatVerificationLevel}
                    formatIndustry={formatIndustry}
                    getIndustryIcon={getIndustryIcon}
                    getStatusColor={getStatusColor}
                    getVerificationColor={getVerificationColor}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {companies.map((company) => (
                  <EnhancedCompanyRow
                    key={company.id}
                    company={company}
                    onViewCompany={handleViewCompany}
                    onVisitWebsite={handleVisitWebsite}
                    isFavorite={isFavorite.includes(company.id)}
                    onToggleFavorite={() => toggleFavorite(company.id)}
                    formatStatus={formatStatus}
                    formatVerificationLevel={formatVerificationLevel}
                    formatIndustry={formatIndustry}
                    getIndustryIcon={getIndustryIcon}
                    getStatusColor={getStatusColor}
                    getVerificationColor={getVerificationColor}
                  />
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {companies.length > 0 && totalPages > 1 && (
              <EnhancedPagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                goToPage={goToPage}
              />
            )}

            {/* Enhanced Data Quality Note */}
            <EnhancedDataQualityNote />
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Header Component
function EnhancedHeader({
  searchQuery,
  handleSearch,
  selectedIndustry,
  setSelectedIndustry,
  selectedLocation,
  setSelectedLocation,
  selectedBusinessType,
  setSelectedBusinessType,
  selectedOwnership,
  setSelectedOwnership,
  showVerifiedOnly,
  setShowVerifiedOnly,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  minRating,
  setMinRating,
  maxRating,
  setMaxRating,
  activeFiltersCount,
  clearFilters,
  totalCount,
  companies,
  uniqueLocations,
  formatIndustry,
}: any) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10 animate-gradient-x" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Text */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-blue-200/50 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-blue-700">
              Discover {totalCount}+ Registered Businesses
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Explore Sierra Leone's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">
              Business Ecosystem
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find verified businesses, compare services, and connect with leading
            companies across all industries
          </p>
        </div>

        {/* Enhanced Search Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Main Search */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                  <Input
                    placeholder="Search companies by name, industry, location, or services..."
                    className="pl-12 pr-12 h-14 text-base text-gray-900 rounded-xl border-2 border-blue-200/50 bg-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
                onClick={() => handleSearch(searchQuery)}
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                className="h-14 px-4 border-blue-200 hover:border-blue-300 hover:bg-blue-50/50"
                onClick={clearFilters}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Enhanced Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Industry Filter */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Industry
              </label>
              <Select
                value={selectedIndustry}
                onValueChange={setSelectedIndustry}
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-2 border-blue-200/50 bg-white/50 group-hover:border-blue-300 transition-colors">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.slice(1).map((industry: string) => (
                    <SelectItem key={industry} value={industry}>
                      {formatIndustry(industry)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Location
              </label>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full h-12 rounded-xl border-2 border-green-200/50 bg-white/50 group-hover:border-green-300 transition-colors">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {uniqueLocations.map((location: string) => (
                    <SelectItem
                      key={location}
                      value={location === "All Locations" ? "all" : location}
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2 text-amber-600" />
                Rating
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-amber-200/50 bg-white/50">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating}+ Stars
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={maxRating} onValueChange={setMaxRating}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-amber-200/50 bg-white/50">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        Up to {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Verification Filter */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-600" />
                Verification
              </label>
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-purple-50/50 rounded-xl p-2 border border-purple-200/50">
                <span className="text-sm text-gray-700">
                  Verified Only
                </span>
                <Switch
                  checked={showVerifiedOnly}
                  onCheckedChange={setShowVerifiedOnly}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-purple-700"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          {activeFiltersCount > 0 && (
            <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl p-4 border border-blue-200/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                      {activeFiltersCount} filter
                      {activeFiltersCount !== 1 ? "s" : ""} active
                    </Badge>
                    <span className="text-sm font-medium text-gray-700">
                      Showing {companies.length} of {totalCount} results
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-gray-600">Total Businesses</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-200/50">
            <div className="text-2xl font-bold text-green-600">
              {
                companies.filter(
                  (c: { status: string }) => c.status === "active",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50">
            <div className="text-2xl font-bold text-purple-600">
              {
                Array.from(
                  new Set(companies.map((c: { industry: any }) => c.industry)),
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
            <div className="text-2xl font-bold text-amber-600">
              {
                companies.filter(
                  (c: { verificationLevel: string }) =>
                    c.verificationLevel === "verified",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Company Card Component
function EnhancedCompanyCard({
  company,
  onViewCompany,
  onVisitWebsite,
  isFavorite,
  onToggleFavorite,
  formatStatus,
  formatVerificationLevel,
  formatIndustry,
  getIndustryIcon,
  getStatusColor,
  getVerificationColor,
}: any) {
  const IndustryIcon = getIndustryIcon(company.industry);
  const statusColor = getStatusColor(company.status);
  const verificationColor = getVerificationColor(company.verificationLevel);

  return (
    <Card className="group relative overflow-hidden border-2 border-gray-200/50 bg-gradient-to-b from-white to-gray-50/30 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

      {/* Favorite Button */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={onToggleFavorite}
      >
        <Heart
          className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
        />
      </Button>

      <CardHeader className="pb-3 pt-6 px-5">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <IndustryIcon className="w-7 h-7 text-white" />
            </div>
            {/* Status Dot */}
            <div
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${statusColor} border-2 border-white`}
            />
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {company.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-1">
                  {company.registrationNumber} •{" "}
                  {formatIndustry(company.industry)}
                </CardDescription>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`text-xs px-2 py-1 bg-gradient-to-r ${statusColor} text-white border-0`}
              >
                {formatStatus(company.status)}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">
                <Shield className="w-3 h-3 mr-1" />
                {formatVerificationLevel(company.verificationLevel)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 px-5">
        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">
          {company.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-600 mr-2" />
            <span className="truncate">{company.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 text-green-600 mr-2" />
            <span>{company.employees}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-amber-600 mr-2" />
            <span>Est. {company.foundedYear}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
            <span>{company.revenue}</span>
          </div>
        </div>

        {/* Rating & Compliance */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1.5" />
              <span className="font-bold">{company.rating}</span>
            </div>
            {company.complianceScore > 0 && (
              <div className="ml-3 flex items-center">
                <div className="w-8 text-xs font-medium text-gray-600">
                  Comp:
                </div>
                <div className="text-sm pl-1 font-bold text-green-700 ml-1">
                  {company.complianceScore}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {company.tags && company.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {company.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
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
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-5 px-5">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1 h-10 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => onViewCompany(company.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {company.website && (
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => onVisitWebsite(company.website!)}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Enhanced Company Row Component (List View)
function EnhancedCompanyRow({
  company,
  onViewCompany,
  onVisitWebsite,
  isFavorite,
  onToggleFavorite,
  formatStatus,
  formatVerificationLevel,
  formatIndustry,
  getIndustryIcon,
  getStatusColor,
  getVerificationColor,
}: any) {
  const IndustryIcon = getIndustryIcon(company.industry);
  const statusColor = getStatusColor(company.status);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-200/50 hover:border-blue-300 bg-gradient-to-r from-white to-gray-50/30">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Left Section - Logo & Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <IndustryIcon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${statusColor} border-2 border-white`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {company.name}
                  </h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={onToggleFavorite}
                  >
                    <Heart
                      className={`w-3 h-3 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
                    />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {formatIndustry(company.industry)}
                  </Badge>
                  <Badge
                    className={`text-xs bg-gradient-to-r ${statusColor} text-white border-0`}
                  >
                    {formatStatus(company.status)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {formatVerificationLevel(company.verificationLevel)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {company.registrationNumber}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {company.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-600 mr-1.5" />
                    {company.location}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 text-green-600 mr-1.5" />
                    {company.employees}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 text-amber-600 mr-1.5" />
                    Est. {company.foundedYear}
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-purple-600 mr-1.5" />
                    {company.revenue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Rating & Actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1.5" />
                <span className="font-bold">{company.rating}</span>
              </div>
              {company.complianceScore > 0 && (
                <div className="text-sm font-bold text-green-700">
                  {company.complianceScore}% Comp
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => onViewCompany(company.id)}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </Button>
              {company.website && (
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-200"
                  onClick={() => onVisitWebsite(company.website!)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Enhanced Stats Cards Component
function EnhancedStatsCards({ totalCount, companies }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-5 border border-blue-200/50 backdrop-blur-sm">
        <div className="text-3xl font-bold text-blue-700 mb-2">
          {totalCount}
        </div>
        <div className="text-sm font-medium text-blue-800">
          Total Businesses
        </div>
        <div className="text-xs text-blue-600 mt-1">Registered & Verified</div>
      </div>
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-5 border border-green-200/50 backdrop-blur-sm">
        <div className="text-3xl font-bold text-green-700 mb-2">
          {companies.filter((c: Company) => c.status === "active").length}
        </div>
        <div className="text-sm font-medium text-green-800">
          Active Companies
        </div>
        <div className="text-xs text-green-600 mt-1">Currently Operating</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-5 border border-purple-200/50 backdrop-blur-sm">
        <div className="text-3xl font-bold text-purple-700 mb-2">
          {
            Array.from(new Set(companies.map((c: Company) => c.industry)))
              .length
          }
        </div>
        <div className="text-sm font-medium text-purple-800">Industries</div>
        <div className="text-xs text-purple-600 mt-1">Diverse Sectors</div>
      </div>
      <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl p-5 border border-amber-200/50 backdrop-blur-sm">
        <div className="text-3xl font-bold text-amber-700 mb-2">
          {
            companies.filter((c: Company) => c.verificationLevel === "verified")
              .length
          }
        </div>
        <div className="text-sm font-medium text-amber-800">Verified</div>
        <div className="text-xs text-amber-600 mt-1">Fully Compliant</div>
      </div>
    </div>
  );
}

// Enhanced View Controls Component
function EnhancedViewControls({
  viewMode,
  setViewMode,
  companies,
  totalCount,
  activeFiltersCount,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Discover Businesses
        </h2>
        <p className="text-sm text-gray-600">
          Showing {companies.length} of {totalCount} results
          {activeFiltersCount > 0 &&
            ` (${activeFiltersCount} filter${activeFiltersCount !== 1 ? "s" : ""} active)`}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-gray-100/50 rounded-xl p-1 backdrop-blur-sm">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`h-9 px-3 rounded-lg ${viewMode === "grid" ? "shadow-sm bg-white" : ""}`}
          >
            <Grid className="w-4 h-4" />
            <span className="ml-2">Grid</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`h-9 px-3 rounded-lg ${viewMode === "list" ? "shadow-sm bg-white" : ""}`}
          >
            <List className="w-4 h-4" />
            <span className="ml-2">List</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Empty State Component
function EnhancedEmptyState({ clearFilters }: any) {
  return (
    <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border-2 border-gray-200/50 shadow-lg">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        No businesses found
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Try adjusting your search criteria or filters to find what you're
        looking for.
      </p>
      <Button
        onClick={clearFilters}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
      >
        <X className="w-4 h-4 mr-2" />
        Clear all filters
      </Button>
    </div>
  );
}

// Enhanced Pagination Component
function EnhancedPagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  goToPage,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={!hasPreviousPage}
          className="h-9 px-4 rounded-xl border-gray-300"
        >
          Previous
        </Button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(pageNum)}
              className={`h-9 w-9 rounded-xl ${currentPage === pageNum ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "border-gray-300"}`}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={!hasNextPage}
          className="h-9 px-4 rounded-xl border-gray-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Enhanced Data Quality Note Component
function EnhancedDataQualityNote() {
  return (
    <div className="mt-12 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl border-2 border-blue-200/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Trusted & Verified Business Data
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            All business information is sourced directly from the Sierra Leone
            Corporate Affairs Commission and verified through official channels.
            Our verification process ensures you get accurate, up-to-date
            information for confident business decisions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
              <span className="text-sm font-medium text-gray-900">
                ✓ Official Registration Data
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"></div>
              <span className="text-sm font-medium text-gray-900">
                ⏳ Real-time Updates
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mr-3"></div>
              <span className="text-sm font-medium text-gray-900">
                🔒 Secure & Verified Sources
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Components
function EnhancedHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
          <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>

          <div className="bg-white/50 rounded-2xl p-6 mb-6">
            <div className="h-14 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedContentSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-300 rounded-2xl"></div>
          ))}
        </div>

        <div className="flex justify-between mb-6">
          <div className="h-8 bg-gray-300 rounded w-48"></div>
          <div className="h-8 bg-gray-300 rounded w-32"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-gray-300 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
