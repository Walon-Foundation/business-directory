"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Shield,
  Building2,
  TrendingUp,
  CheckCircle,
  Users,
  Banknote,
  Globe,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Lock,
  BadgeCheck,
  FileText,
  LineChart,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Search categories for quick filters
const searchCategories = [
  "Technology",
  "Construction",
  "Import/Export",
  "Healthcare",
  "Agriculture",
  "Telecommunications",
  "Banking & Finance",
  "Transport & Logistics",
  "Mining",
  "Real Estate",
  "Manufacturing",
  "Retail",
];

interface Business {
  id: string;
  name: string;
  registrationNumber: string;
  status: "active" | "pending" | "suspended" | "inactive";
  industry: string;
  location: string;
  city?: string;
  rating?: string;
  verificationLevel: "verified" | "pending" | "unverified";
  complianceScore?: number;
  employees?: string;
  foundedYear: number;
  description?: string;
  businessType: string;
  ownership: string;
  revenue?: string;
  tags: string[];
}

interface ApiResponse {
  success: boolean;
  data: {
    businesses: Business[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  timestamp: string;
}

// Helper functions
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

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // Debounced search function using real API
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setTotalResults(0);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setShowSearchResults(true);

    try {
      // Make API call to search endpoint
      const response = await fetch(`/api/explore?search=${encodeURIComponent(query)}&limit=6`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setSearchResults(data.data.businesses);
        setTotalResults(data.data.pagination.total);
      } else {
        throw new Error('Failed to load search results');
      }
    } catch (error) {
      setSearchError("Search service temporarily unavailable. Please try again later.");
      console.error("Search error:", error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch();
    }
  };

  const handleResultClick = (result: Business) => {
    router.push(`/explore/${result.id}`);
    setShowSearchResults(false);
    setSearchQuery(result.name);
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    setTotalResults(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-24 sm:pb-32 md:pb-48 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-green-50/20" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700">
                Live • Official Government Partnership
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="relative inline-block">
                <span className="relative z-10">Business Verification</span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-md" />
              </span>
              <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">
                Reimagined for Sierra Leone
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed px-4 font-light">
              The definitive registry transforming how businesses are verified.
              Real-time data, AI-powered search, and complete transparency for
              economic growth.
            </p>

            {/* Interactive Search with Suggestions */}
            <div className="max-w-xl sm:max-w-2xl mx-auto mb-8 px-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" />
                <div className="relative bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
                  <div className="flex items-center p-1">
                    <div className="flex-1 flex items-center relative">
                      <Search className="ml-4 w-5 h-5 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search business, registration ID, director name..."
                        className="flex-1 border-0 bg-transparent pl-3 pr-12 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || isSearching}
                      className="mx-4 px-8 py-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Search className="mr-2 w-5 h-5" />
                      )}
                      {isSearching ? "Searching..." : "Verify Now"}
                    </Button>
                  </div>

                  {/* Search Suggestions */}
                  <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white/50 p-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {searchCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors hover:shadow-sm"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">
                          Search Results
                          {totalResults > 0 && (
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              ({totalResults} found)
                            </span>
                          )}
                        </h3>
                        <button
                          onClick={() => setShowSearchResults(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                          <span className="ml-2 text-gray-600">
                            Searching....................
                          </span>
                        </div>
                      ) : searchError ? (
                        <div className="text-center py-8">
                          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                          <p className="text-rose-600 font-medium">{searchError}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Please try again or contact support
                          </p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              onClick={() => handleResultClick(result)}
                              className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 truncate">
                                    {result.name}
                                  </div>
                                  <div className="text-sm text-gray-600 truncate">
                                    {formatIndustry(result.industry)} • {result.city || result.location}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <Badge
                                      variant="outline"
                                      className="text-xs px-2"
                                    >
                                      {result.registrationNumber}
                                    </Badge>
                                    <Badge
                                      className={cn(
                                        "text-xs px-2",
                                        result.verificationLevel === "verified"
                                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                                          : result.verificationLevel === "pending"
                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                      )}
                                    >
                                      {formatVerificationLevel(result.verificationLevel)}
                                    </Badge>
                                    <Badge
                                      className={cn(
                                        "text-xs px-2",
                                        result.status === "active"
                                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                          : result.status === "pending"
                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                      )}
                                    >
                                      {formatStatus(result.status)}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center ml-4">
                                  {result.rating && (
                                    <StarRating rating={parseFloat(result.rating)} />
                                  )}
                                  <ArrowRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                              </div>
                              
                              {result.description && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                              
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                  {result.employees && (
                                    <span className="text-xs text-gray-600">
                                      👥 {result.employees}
                                    </span>
                                  )}
                                  {result.foundedYear && (
                                    <span className="text-xs text-gray-600">
                                      📅 Est. {result.foundedYear}
                                    </span>
                                  )}
                                  {result.complianceScore && (
                                    <span className="text-xs text-gray-600">
                                      🛡️ {result.complianceScore}%
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-medium text-blue-600">
                                  View Details →
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No businesses found for "{searchQuery}"</p>
                          <p className="text-sm mt-1">
                            Try searching with different keywords
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => router.push('/explore')}
                          >
                            Browse All Businesses
                          </Button>
                        </div>
                      )}

                      {!isSearching && searchResults.length > 0 && totalResults > searchResults.length && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Button
                            onClick={handleSearch}
                            variant="outline"
                            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            View all {totalResults} results
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats with Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Registered Businesses
                </div>
                <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-4/5" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    99.9%
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Data Accuracy
                </div>
                <div className="mt-2 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-full" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-amber-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-amber-600">100ms</div>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium">Response Time</div>
                <div className="mt-2 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Enhanced Cards */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200 hover:bg-rose-100">
              <Target className="w-4 h-4 mr-2" />
              The Challenge
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why Verification Fails
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Current systems create friction at every level of business interaction
            </p>
          </div>

          {/* Modern Card Grid with Glass Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Consumer Fraud Risk",
                description: "No way to verify online businesses before transactions",
                gradient: "from-rose-500 to-pink-500",
                bg: "bg-gradient-to-br from-rose-50 to-pink-50",
                border: "border-rose-200",
                stats: "70% of online fraud cases",
                delay: "0",
              },
              {
                icon: Banknote,
                title: "Slow Due Diligence",
                description: "Banks take 2-3 weeks for basic business verification",
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
                border: "border-blue-200",
                stats: "15+ days average delay",
                delay: "100",
              },
              {
                icon: Globe,
                title: "Investor Uncertainty",
                description: "Foreign investors hesitate without reliable partner verification",
                gradient: "from-emerald-500 to-green-500",
                bg: "bg-gradient-to-br from-emerald-50 to-green-50",
                border: "border-emerald-200",
                stats: "$2M+ lost investments monthly",
                delay: "200",
              },
              {
                icon: LineChart,
                title: "Economic Inefficiency",
                description: "Every delayed transaction reduces economic velocity",
                gradient: "from-violet-500 to-purple-500",
                bg: "bg-gradient-to-br from-violet-50 to-purple-50",
                border: "border-violet-200",
                stats: "30% slower business growth",
                delay: "300",
              },
            ].map((card, index) => (
              <div key={index} className="group relative">
                {/* Card Shadow Effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500`}
                />

                <Card
                  className={`relative ${card.bg} ${card.border} border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group-hover:scale-[1.02]`}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent rounded-full" />
                  </div>

                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} p-0.5`}
                      >
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                          <card.icon
                            className={`w-6 h-6 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/80 rounded-full text-gray-700">
                        {card.stats}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <span className="mr-2">Impact Score</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
                          style={{ width: `${80 + index * 5}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Effect Line */}
                  <div
                    className={`h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Interactive Tabs */}
      <section className="px-4 sm:px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200 hover:bg-blue-100">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Innovation
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
              How We Transform Verification
            </h2>
          </div>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 p-1 rounded-2xl">
              <TabsTrigger
                value="search"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Instant Search
              </TabsTrigger>
              <TabsTrigger
                value="verify"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                Live Verification
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Business Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">
                      AI-Powered
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Lightning-Fast Business Search
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our intelligent search engine understands partial names,
                    registration numbers, and even common typos. Get accurate
                    results in milliseconds, not minutes.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Fuzzy name matching",
                      "Registration ID parsing",
                      "Director name search",
                      "Location-based filtering",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(true);
                      const searchInput = document.querySelector('input[placeholder*="Search business"]') as HTMLInputElement;
                      if (searchInput) {
                        searchInput.focus();
                      }
                    }}
                    className="px-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                  >
                    Try Live Search
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <Card className="bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-100 rounded-2xl overflow-hidden shadow-2xl">
                  <CardHeader className="border-b border-blue-100">
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2 text-blue-600" />
                      Search Results Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Real-time search results from Sierra Leone Business Registry
                      </p>
                      <div className="space-y-3">
                        {[
                          "Search by business name or registration number",
                          "Filter by industry, location, or status",
                          "View detailed business profiles",
                          "Real-time verification status",
                        ].map((item, i) => (
                          <div key={i} className="flex items-center p-3 bg-blue-50/50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-blue-600 mr-3" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="verify" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Card className="bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-100 rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
                  <CardHeader className="border-b border-emerald-100">
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                      Verification Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">
                          Verification Status
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                          <span className="font-semibold text-emerald-700">
                            Verified & Active
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600">
                            Registration
                          </div>
                          <div className="font-semibold">Valid</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600">
                            Tax Status
                          </div>
                          <div className="font-semibold">Compliant</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-6">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">
                      Bank-Grade Security
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Real-Time Legal Verification
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Direct API integration with government registries ensures
                    you get the most current business status. No outdated
                    records, no manual verification delays.
                  </p>
                  <Button 
                    onClick={() => router.push('/explore')}
                    className="px-8 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg"
                  >
                    Browse Verified Businesses
                    <FileText className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full mb-6">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700">
                      Data Analytics
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Market Intelligence Insights
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Access comprehensive analytics on business sectors, growth
                    trends, and market opportunities. Make data-driven decisions
                    with confidence.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Industry growth trends",
                      "Market share analysis",
                      "Competitor intelligence",
                      "Investment opportunity mapping",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => router.push('/api')}
                    className="px-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg"
                  >
                    Access API Data
                    <TrendingUp className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <Card className="bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-100 rounded-2xl overflow-hidden shadow-2xl">
                  <CardHeader className="border-b border-purple-100">
                    <CardTitle className="flex items-center">
                      <LineChart className="w-5 h-5 mr-2 text-purple-600" />
                      Industry Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Real business data from Sierra Leone Business Registry
                      </p>
                      <div className="space-y-3">
                        {[
                          "Technology sector growth: +24% YoY",
                          "Agriculture: 856 active businesses",
                          "Healthcare expansion: +32% YoY",
                          "Construction industry: 721 registered companies",
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="text-sm text-gray-700">{item.split(':')[0]}:</div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              {item.split(':')[1].trim()}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Feature Showcase */}
          <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Matching",
                description: "Smart algorithms that understand your search intent",
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
              {
                icon: Target,
                title: "Pinpoint Accuracy",
                description: "99.9% accurate business identification",
                color: "text-rose-600",
                bg: "bg-rose-100",
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get verified results in under 2 seconds",
                color: "text-amber-600",
                bg: "bg-amber-100",
              },
              {
                icon: Globe,
                title: "Global Access",
                description: "Accessible from anywhere, 24/7",
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Enterprise-level data protection",
                color: "text-emerald-600",
                bg: "bg-emerald-100",
              },
              {
                icon: TrendingUp,
                title: "Growth Insights",
                description: "Analytics on business trends and sectors",
                color: "text-cyan-600",
                bg: "bg-cyan-100",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative">
          <div className="text-gray-300">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          {i < fullStars && (
            <div className="absolute top-0 left-0 text-amber-500">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
          {hasHalfStar && i === fullStars && (
            <div className="absolute top-0 left-0 text-amber-500" style={{ width: '50%', overflow: 'hidden' }}>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};