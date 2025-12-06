"use client";

import {
  Terminal,
  Code,
  Key,
  Shield,
  Zap,
  Globe,
  BookOpen,
  FileJson,
  Server,
  Cpu,
  LockOpen,
  Search,
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Building2,
  MapPin,
  Star,
  TrendingUp,
  Sparkles,
  Layers,
  Target,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-violet-600/10 dark:from-purple-600/5 dark:via-transparent dark:to-violet-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 dark:from-purple-500/30 dark:to-violet-500/30 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm shadow-lg animate-pulse-subtle">
              <Code className="w-4 h-4 mr-2" />
              Open Business Intelligence API
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Power Your Apps with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 animate-gradient">
                Sierra Leone Business Data
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Access the complete Sierra Leone business registry through our RESTful API. 
              No authentication required. Build powerful applications with verified, 
              real-time business intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Terminal className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Building
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-purple-300 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group"
              >
                <BookOpen className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50K+", label: "Businesses", icon: Building2, color: "purple" },
            { value: "24/7", label: "Uptime", icon: Clock, color: "green" },
            { value: "0ms", label: "Latency", icon: Zap, color: "blue" },
            { value: "100%", label: "Free Access", icon: LockOpen, color: "amber" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{stat.label}</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="grid md:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {[
            {
              icon: LockOpen,
              title: "Zero Authentication",
              description: "No API keys, no registration. Instant access to all endpoints.",
              color: "emerald",
              gradient: "from-emerald-500 to-green-500",
            },
            {
              icon: Zap,
              title: "Real-time Data",
              description: "Live sync with Corporate Affairs Commission database.",
              color: "blue",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: ShieldCheck,
              title: "Government Verified",
              description: "All data is officially verified and legally accurate.",
              color: "purple",
              gradient: "from-purple-500 to-violet-500",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-white/50 dark:border-gray-700/50 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Endpoints */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/30 dark:to-cyan-500/30 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
              <Server className="w-4 h-4 mr-2" />
              RESTful API Endpoints
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Query Parameters
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Advanced filtering and sorting capabilities for precise data retrieval
            </p>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-white/50 dark:border-gray-700/50 p-1 rounded-2xl shadow-lg">
              <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl transition-all">
                <Filter className="w-4 h-4 mr-2" />
                List Businesses
              </TabsTrigger>
              <TabsTrigger value="single" className="data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl transition-all">
                <Search className="w-4 h-4 mr-2" />
                Single Business
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <Card className="border-2 border-white/50 dark:border-gray-700/50 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          GET
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          Public Access
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        List All Businesses
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Retrieve paginated business data with advanced filtering options
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700">
                      <Download className="w-3 h-3 mr-1" />
                      Available Now
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* URL */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Endpoint URL
                        </span>
                      </div>
                      <div className="relative bg-gradient-to-r from-blue-900 to-gray-900 text-gray-100 rounded-xl p-5 font-mono text-sm overflow-x-auto shadow-inner">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-l-xl" />
                        <div className="pl-4">
                          GET /api/explore
                        </div>
                      </div>
                    </div>

                    {/* Parameters Grid */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Layers className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-semibold text-gray-900">
                          Available Parameters
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {[
                          { param: "page", type: "number", desc: "Page number (default: 1)" },
                          { param: "limit", type: "number", desc: "Items per page (max: 100)" },
                          { param: "search", type: "string", desc: "Search across multiple fields" },
                          { param: "status", type: "string", desc: "active, pending, suspended, inactive" },
                          { param: "industry", type: "string", desc: "Filter by industry" },
                          { param: "businessType", type: "string", desc: "Type of business" },
                          { param: "ownership", type: "string", desc: "Ownership structure" },
                          { param: "location", type: "string", desc: "General location" },
                          { param: "city", type: "string", desc: "Specific city" },
                          { param: "province", type: "string", desc: "Province/region" },
                          { param: "minRating", type: "number", desc: "Minimum rating (1-5)" },
                          { param: "maxRating", type: "number", desc: "Maximum rating (1-5)" },
                          { param: "minCompliance", type: "number", desc: "Minimum compliance score" },
                          { param: "maxCompliance", type: "number", desc: "Maximum compliance score" },
                          { param: "sortBy", type: "string", desc: "Field to sort by" },
                          { param: "sortOrder", type: "string", desc: "asc or desc" },
                          { param: "tags", type: "string", desc: "Comma-separated tags" },
                          { param: "verificationLevel", type: "string", desc: "verified, pending, unverified" },
                        ].map((param, idx) => (
                          <div
                            key={idx}
                            className="group relative p-4 bg-white/50 backdrop-blur-sm border border-blue-100/50 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-sm font-semibold text-blue-700">
                                    {param.param}
                                  </span>
                                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                                    {param.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{param.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example Request */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-blue-600" />
                          <span className="text-lg font-semibold text-gray-900">
                            Example Request
                          </span>
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700">
                          JavaScript
                        </Badge>
                      </div>
                      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                        <div className="px-4 py-3 bg-gray-800 text-gray-300 text-sm font-medium flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          Live Example
                        </div>
                        <pre className="p-5 text-sm text-gray-100 overflow-x-auto">
                          {`// Advanced search with multiple filters
const fetchBusinesses = async () => {
  const params = new URLSearchParams({
    page: '1',
    limit: '20',
    search: 'technology',
    industry: 'IT_Services',
    status: 'active',
    minRating: '4',
    verificationLevel: 'verified',
    sortBy: 'complianceScore',
    sortOrder: 'desc',
    tags: 'startup,innovative,tech',
  });

  const response = await fetch(\`/api/explore?\${params}\`);
  const data = await response.json();
  return data;
};`}
                        </pre>
                      </div>
                    </div>

                    {/* Try It Yourself */}
                    <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl border-2 border-blue-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Try It Yourself</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Quick Examples:</label>
                          <div className="space-y-2">
                            {[
                              { label: "Top Rated Businesses", query: "?sortBy=rating&sortOrder=desc&minRating=4" },
                              { label: "Newest Companies", query: "?sortBy=foundedYear&sortOrder=desc" },
                              { label: "High Compliance", query: "?minCompliance=90&verificationLevel=verified" },
                            ].map((example, idx) => (
                              <div
                                key={idx}
                                className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg hover:border-blue-300 transition-all group cursor-pointer"
                                onClick={() => navigator.clipboard.writeText(`/api/explore${example.query}`)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900">{example.label}</span>
                                  <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to copy
                                  </span>
                                </div>
                                <code className="text-xs text-gray-600 font-mono">{example.query}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Response Preview:</label>
                          <div className="p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700/50">
                            <div className="text-xs text-gray-400 mb-2">Pagination included</div>
                            <div className="text-sm text-green-400 font-mono">✓ 200 OK</div>
                            <div className="text-xs text-gray-300 mt-2">
                              Returns paginated array with metadata
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-blue-50/30 to-cyan-50/30 border-t border-blue-100/50">
                  <Button
                    variant="ghost"
                    className="text-blue-700 hover:text-blue-800 hover:bg-blue-100/50"
                    onClick={() => window.open('/api/explore', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Test Endpoint Live
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="single" className="space-y-6">
              <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          GET
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          Public Access
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Get Business Details
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Retrieve comprehensive information about a specific business
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700">
                      <Download className="w-3 h-3 mr-1" />
                      Available Now
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* URL */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Endpoint URL
                        </span>
                      </div>
                      <div className="relative bg-gradient-to-r from-emerald-900 to-gray-900 text-gray-100 rounded-xl p-5 font-mono text-sm overflow-x-auto shadow-inner">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-green-500 rounded-l-xl" />
                        <div className="pl-4">
                          GET /api/explore/{"{id}"}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        <span className="font-medium text-emerald-700">ID can be:</span> Database ID, Registration Number, or Business Name
                      </p>
                    </div>

                    {/* Example Requests */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-emerald-600" />
                          <span className="text-lg font-semibold text-gray-900">
                            Example Usage
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-emerald-500/10 text-emerald-700">ID</Badge>
                          <Badge className="bg-blue-500/10 text-blue-700">Registration</Badge>
                          <Badge className="bg-purple-500/10 text-purple-700">Name</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            type: "By ID",
                            color: "emerald",
                            code: "/api/explore/abc123-def456-789",
                            desc: "Internal database identifier"
                          },
                          {
                            type: "By Registration",
                            color: "blue",
                            code: "/api/explore/C123456",
                            desc: "Official registration number"
                          },
                          {
                            type: "By Name",
                            color: "purple",
                            code: "/api/explore/Africell Sierra Leone",
                            desc: "URL-encoded business name"
                          },
                        ].map((example, idx) => (
                          <div
                            key={idx}
                            className="group relative p-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-3 h-3 rounded-full bg-${example.color}-500`} />
                              <span className="text-sm font-semibold text-gray-900">
                                {example.type}
                              </span>
                            </div>
                            <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-2">
                              {example.code}
                            </div>
                            <p className="text-xs text-gray-600">{example.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rich Response Preview */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FileJson className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-semibold text-gray-900">
                          Rich Data Response
                        </span>
                      </div>
                      
                      <div className="bg-gradient-to-br from-emerald-50/30 to-green-50/30 border-2 border-emerald-200/50 rounded-2xl p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[
                            { label: "Basic Info", icon: Building2, color: "emerald" },
                            { label: "Financial", icon: TrendingUp, color: "blue" },
                            { label: "Compliance", icon: Shield, color: "green" },
                            { label: "Operations", icon: Target, color: "purple" },
                          ].map((section, idx) => (
                            <div key={idx} className="text-center group">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${section.color}-500 to-${section.color}-600 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <section.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                {section.label}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                            <div className="text-sm font-medium text-gray-900">Full Company Profile</div>
                            <Badge className="bg-emerald-100 text-emerald-700">40+ Fields</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                            <div className="text-sm font-medium text-gray-900">Directors & Leadership</div>
                            <Badge className="bg-blue-100 text-blue-700">Array Data</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                            <div className="text-sm font-medium text-gray-900">Financial Metrics</div>
                            <Badge className="bg-purple-100 text-purple-700">Growth Data</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                            <div className="text-sm font-medium text-gray-900">Compliance Records</div>
                            <Badge className="bg-green-100 text-green-700">Live Status</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Advanced Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {/* Rate Limits */}
          <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-amber-50/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-6 h-6 mr-2 text-amber-600" />
                Performance & Limits
              </CardTitle>
              <CardDescription>Optimized for high-performance applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: "Requests per Second", value: "10", color: "green", icon: "⚡" },
                  { label: "Response Time", value: "< 100ms", color: "blue", icon: "🚀" },
                  { label: "Cache Duration", value: "5 minutes", color: "purple", icon: "💾" },
                  { label: "Max Page Size", value: "100 items", color: "amber", icon: "📄" },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-amber-100/50 rounded-xl hover:border-amber-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{metric.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{metric.label}</div>
                        <div className="text-sm text-gray-600">Production ready</div>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold text-${metric.color}-600`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-xl border border-amber-200/50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Need Higher Limits?
                      </p>
                      <p className="text-sm text-gray-600">
                        Contact us for enterprise access with increased rate limits and priority support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="border-2 border-white/50 bg-gradient-to-br from-white to-purple-50/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                Roadmap & Future
              </CardTitle>
              <CardDescription>Exciting features coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    feature: "GraphQL API",
                    status: "In Development",
                    desc: "Flexible querying with GraphQL",
                    eta: "Q1 2024"
                  },
                  {
                    feature: "WebSocket Stream",
                    status: "Planned",
                    desc: "Real-time business updates",
                    eta: "Q2 2024"
                  },
                  {
                    feature: "Bulk Export",
                    status: "Planned",
                    desc: "CSV/JSON full dataset export",
                    eta: "Q2 2024"
                  },
                  {
                    feature: "Advanced Analytics",
                    status: "Research",
                    desc: "Industry trends and insights",
                    eta: "Q3 2024"
                  },
                  {
                    feature: "Webhook Support",
                    status: "Planned",
                    desc: "Real-time event notifications",
                    eta: "Q2 2024"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-purple-100/50 rounded-xl hover:border-purple-300 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Cpu className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.feature}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700 mb-1">
                        {item.status}
                      </Badge>
                      <div className="text-xs text-gray-500">{item.eta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-violet-600/10 to-blue-600/10 rounded-3xl blur-xl" />
          <Card className="relative border-2 border-white/50 bg-gradient-to-br from-white to-purple-50/30 shadow-2xl overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Start Building in Seconds
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                No setup required. Just start making requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: "1. Make Request",
                      desc: "Use any HTTP client",
                      code: "curl /api/explore",
                    },
                    {
                      title: "2. Add Filters",
                      desc: "Refine your results",
                      code: "?status=active&minRating=4",
                    },
                    {
                      title: "3. Get Data",
                      desc: "Receive JSON response",
                      code: '{"data": [], "pagination": {}}',
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className="relative p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl group hover:-translate-y-1 transition-all"
                    >
                      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {idx + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.desc}</p>
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                        {step.code}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="px-10 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    onClick={() => window.open('/api/explore', '_blank')}
                  >
                    <Terminal className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Try Live API Endpoint
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    No API key required • Rate limited per IP • Commercial use allowed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}