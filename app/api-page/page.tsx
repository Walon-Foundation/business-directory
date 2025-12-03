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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700 border-purple-200/50 backdrop-blur-sm">
              <Code className="w-4 h-4 mr-2" />
              Open API Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                Sierra Leone Business Data
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Access verified business information through our open API. No API
              key required. Build applications that leverage official Sierra
              Leone business registry data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                <Terminal className="mr-2 w-5 h-5" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-purple-300"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="grid md:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {[
            {
              icon: LockOpen,
              title: "No API Key Required",
              description:
                "Open access for all developers. No registration or authentication needed.",
              color: "green",
            },
            {
              icon: Zap,
              title: "Real-time Data",
              description:
                "Direct integration with Corporate Affairs Commission for up-to-date information.",
              color: "blue",
            },
            {
              icon: Shield,
              title: "Verified Sources",
              description:
                "All data is officially verified and legally accurate.",
              color: "amber",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Endpoints */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-10">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700">
              <Server className="w-4 h-4 mr-2" />
              Available Endpoints
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              API Endpoints
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Currently available endpoints with more coming soon
            </p>
          </div>

          <div className="space-y-6">
            {/* List All Businesses Endpoint */}
            <Card className="border-2 border-blue-100/50 bg-gradient-to-b from-white to-blue-50/30 shadow-lg overflow-hidden">
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
                    <CardTitle className="text-xl font-bold text-gray-900">
                      List All Businesses
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Retrieve a paginated list of all registered businesses
                      with filtering options
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700">
                    <Download className="w-3 h-3 mr-1" />
                    Available Now
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* URL */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Endpoint URL
                      </span>
                    </div>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      GET https://api.slbizregistry.gov.sl/v1/businesses
                    </div>
                  </div>

                  {/* Parameters */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Query Parameters
                      </span>
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          param: "page",
                          type: "number",
                          default: "1",
                          desc: "Page number for pagination",
                        },
                        {
                          param: "limit",
                          type: "number",
                          default: "20",
                          desc: "Number of items per page (max: 100)",
                        },
                        {
                          param: "industry",
                          type: "string",
                          default: "-",
                          desc: 'Filter by industry (e.g., "technology")',
                        },
                        {
                          param: "location",
                          type: "string",
                          default: "-",
                          desc: 'Filter by location (e.g., "freetown")',
                        },
                        {
                          param: "status",
                          type: "string",
                          default: "-",
                          desc: "Filter by status: active, pending, inactive",
                        },
                        {
                          param: "verified",
                          type: "boolean",
                          default: "-",
                          desc: "Filter by verification status",
                        },
                        {
                          param: "search",
                          type: "string",
                          default: "-",
                          desc: "Search across name, registration number, description",
                        },
                      ].map((param, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="font-mono text-sm">
                            <span className="text-purple-600">
                              {param.param}
                            </span>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {param.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            Default:{" "}
                            <span className="font-mono">{param.default}</span>
                          </div>
                          <div className="text-sm text-gray-600 md:col-span-2 md:col-start-4">
                            {param.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example Request */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Example Request
                      </span>
                    </div>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                        JavaScript (Fetch API)
                      </div>
                      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                        {`fetch('https://api.slbizregistry.gov.sl/v1/businesses?page=1&limit=10&industry=technology&verified=true')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>

                  {/* Example Response */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileJson className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Example Response
                      </span>
                    </div>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                        JSON Response
                      </div>
                      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                        {`{
  "success": true,
  "data": {
    "businesses": [
      {
        "id": "SL-2023-001",
        "name": "Africell Sierra Leone Limited",
        "registrationNumber": "C123456",
        "status": "Active",
        "industry": "Telecommunications",
        "location": "Freetown",
        "foundedYear": 2010,
        "employees": "500-1000",
        "verificationLevel": "Verified",
        "rating": 4.8,
        "website": "https://africell.sl"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8432,
      "pages": 844
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Single Business Endpoint */}
            <Card className="border-2 border-green-100/50 bg-gradient-to-b from-white to-green-50/30 shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
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
                        className="bg-green-50 text-green-700"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        Public Access
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Get Single Business
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Retrieve detailed information about a specific business by
                      ID, name, or registration number
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700">
                    <Download className="w-3 h-3 mr-1" />
                    Available Now
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* URL */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Endpoint URL
                      </span>
                    </div>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      GET https://api.slbizregistry.gov.sl/v1/businesses/
                      {"{identifier}"}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium">Identifier can be:</span>{" "}
                      Business ID (SL-2023-001), Registration Number (C123456),
                      or Business Name (Africell Sierra Leone Limited)
                    </p>
                  </div>

                  {/* Example Requests */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Example Requests
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                          By Business ID
                        </div>
                        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                          {`fetch('https://api.slbizregistry.gov.sl/v1/businesses/SL-2023-001')
  .then(response => response.json())
  .then(data => console.log(data));`}
                        </pre>
                      </div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                          By Registration Number
                        </div>
                        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                          {`fetch('https://api.slbizregistry.gov.sl/v1/businesses/C123456')
  .then(response => response.json())
  .then(data => console.log(data));`}
                        </pre>
                      </div>
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                          By Business Name (URL encoded)
                        </div>
                        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                          {`fetch('https://api.slbizregistry.gov.sl/v1/businesses/Africell%20Sierra%20Leone%20Limited')
  .then(response => response.json())
  .then(data => console.log(data));`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Example Response */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileJson className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Example Response
                      </span>
                    </div>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium">
                        JSON Response
                      </div>
                      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                        {`{
  "success": true,
  "data": {
    "business": {
      "id": "SL-2023-001",
      "name": "Africell Sierra Leone Limited",
      "registrationNumber": "C123456",
      "status": "Active",
      "industry": "Telecommunications",
      "location": "Freetown",
      "foundedYear": 2010,
      "employees": "500-1000",
      "revenue": "$100M+",
      "description": "Leading telecommunications provider...",
      "verificationLevel": "Verified",
      "rating": 4.8,
      "tags": ["Telecom", "ISP", "Mobile", "National"],
      "website": "https://africell.sl",
      "contactEmail": "info@africell.sl",
      "address": "25 Siaka Stevens Street, Freetown",
      "taxId": "TAX-2023-001234",
      "businessType": "Private Limited Company",
      "ownership": "Foreign Investment",
      "yearEnd": "December 31",
      "lastUpdated": "2024-01-15T08:30:00Z",
      "complianceScore": 92,
      "services": ["Mobile Voice Services", "4G/5G Data Services"],
      "certifications": ["ISO 9001:2015 Certified", "GSMA Member"]
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rate Limits & Guidelines */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {/* Rate Limits */}
          <Card className="border-2 border-amber-100/50 bg-gradient-to-b from-white to-amber-50/30">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-amber-600" />
                Rate Limits
              </CardTitle>
              <CardDescription>Current API usage limitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">
                      Requests per Minute
                    </div>
                    <div className="text-sm text-gray-600">Per IP address</div>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">60</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">
                      Requests per Hour
                    </div>
                    <div className="text-sm text-gray-600">Per IP address</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">1,000</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">
                      Requests per Day
                    </div>
                    <div className="text-sm text-gray-600">Per IP address</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    10,000
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4 inline mr-1 text-gray-400" />
                  Rate limits are subject to change as we scale. Contact us for
                  higher limits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="border-2 border-purple-100/50 bg-gradient-to-b from-white to-purple-50/30">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-600" />
                Coming Soon
              </CardTitle>
              <CardDescription>Planned API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    endpoint: "Search by Director/CEO",
                    status: "In Development",
                  },
                  { endpoint: "Industry Statistics", status: "Planned" },
                  { endpoint: "Business Verification API", status: "Planned" },
                  { endpoint: "Webhook Support", status: "Planned" },
                  { endpoint: "Bulk Data Export", status: "Planned" },
                  { endpoint: "Historical Data Access", status: "Planned" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-500/10 to-violet-500/10 flex items-center justify-center mr-3">
                        <Cpu className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.endpoint}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-purple-500/5 to-violet-500/5 text-purple-700"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-lg border border-purple-200/50">
                <p className="text-sm text-gray-700">
                  <Users className="w-4 h-4 inline mr-1 text-purple-600" />
                  Have suggestions for new endpoints? Contact our developer
                  relations team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Guide */}
        <Card className="border-2 border-blue-100/50 bg-gradient-to-b from-white to-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>Get started in 5 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: 1,
                    title: "Make Your First Request",
                    description:
                      "Start with a simple GET request to explore the data",
                    code: "curl https://api.slbizregistry.gov.sl/v1/businesses",
                  },
                  {
                    step: 2,
                    title: "Add Parameters",
                    description: "Filter results with query parameters",
                    code: "curl 'https://api.slbizregistry.gov.sl/v1/businesses?industry=technology&verified=true'",
                  },
                  {
                    step: 3,
                    title: "Get Detailed Data",
                    description: "Retrieve specific business information",
                    code: "curl https://api.slbizregistry.gov.sl/v1/businesses/SL-2023-001",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="relative p-6 bg-white border border-gray-200 rounded-xl"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      {step.code}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Need Help?
                    </h3>
                    <p className="text-gray-600">
                      Check our documentation or contact our developer support
                      team.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    View Full Documentation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      {/* <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">SL BizRegistry API</div>
                <div className="text-sm text-gray-600">Open Data • No API Key Required • Official Source</div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Data License
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Support
              </a>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Sierra Leone Business Registry API. All data is public domain.
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
