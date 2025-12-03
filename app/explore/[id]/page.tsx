"use client";

import { useState } from "react";
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
  ExternalLink,
  BarChart,
  Target,
  Building,
  Home,
  Wallet,
  Award,
  Briefcase,
  Users as UsersIcon,
  CreditCard,
  FileCheck,
  Sparkles,
  ChevronRight,
  Download,
  Eye,
  Zap,
  Heart,
  Share2,
  Flag,
  BuildingIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock detailed company data
const detailedCompany = {
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
    "Leading telecommunications provider in Sierra Leone with nationwide coverage. Africell is committed to connecting communities and driving digital transformation across the country.",
  verificationLevel: "Verified",
  rating: 4.8,
  tags: ["Telecom", "ISP", "Mobile", "National", "Digital Services"],
  website: "https://africell.sl",
  contactEmail: "info@africell.sl",
  ceo: "Mr. John Doe",
  contactPhone: "+232 76 123 456",
  address: "25 Siaka Stevens Street, Freetown, Sierra Leone",
  taxId: "TAX-2023-001234",
  businessType: "Private Limited Company",
  ownership: "Foreign Investment",
  yearEnd: "December 31",
  lastUpdated: "2024-01-15",
  complianceScore: 92,
  financialSummary:
    "Strong financial performance with consistent year-over-year growth. Market leader in telecommunications with expanding customer base.",
  services: [
    "Mobile Voice Services",
    "4G/5G Data Services",
    "Mobile Money (AfriMoney)",
    "Corporate Solutions",
    "Internet Services",
    "Digital Content",
  ],
  subsidiaries: [
    "Africell Mobile Money Ltd",
    "Africell Digital Services Ltd",
    "Africell Towers Ltd",
  ],
  certifications: [
    "ISO 9001:2015 Certified",
    "GSMA Member",
    "Sierra Leone Chamber of Commerce",
    "Telecommunications Regulatory Commission Licensed",
  ],
  recentNews: [
    {
      title: "Africell expands 4G coverage to rural areas",
      date: "2024-01-10",
      source: "Sierra Leone Business News",
    },
    {
      title: "Company reports 20% revenue growth",
      date: "2023-12-15",
      source: "Financial Times",
    },
    {
      title: "Launches new digital payment platform",
      date: "2023-11-20",
      source: "Tech Africa",
    },
  ],
};

export default function CompanyDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/20">
      {/* Back Navigation */}
      <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/explore"
              className="inline-flex items-center group text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mr-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              Back to Explore
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-gray-500 hover:text-rose-500"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-amber-500"
              >
                <Flag className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Header with Glass Effect */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Company Logo & Basic Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                    <Building2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge
                      className={`backdrop-blur-sm ${
                        detailedCompany.status === "Active"
                          ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-200/50"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                      {detailedCompany.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 text-blue-700 border-blue-200/50 backdrop-blur-sm"
                    >
                      <Shield className="w-3 h-3 mr-1.5" />
                      {detailedCompany.verificationLevel}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 text-amber-700 border-amber-200/50 backdrop-blur-sm"
                    >
                      <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-500 text-amber-500" />
                      {detailedCompany.rating}
                    </Badge>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                    {detailedCompany.name}
                    <span className="block text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-normal mt-1">
                      {detailedCompany.registrationNumber}
                    </span>
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 mb-6">
                    <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200/50">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-medium">
                        {detailedCompany.location}
                      </span>
                    </div>
                    <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200/50">
                      <Building className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="font-medium">
                        {detailedCompany.industry}
                      </span>
                    </div>
                    <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200/50">
                      <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                      <span className="font-medium">
                        Est. {detailedCompany.foundedYear}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 max-w-3xl text-lg leading-relaxed">
                    {detailedCompany.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-64">
              {detailedCompany.website && (
                <Button
                  asChild
                  variant="outline"
                  className="group h-12 bg-white/80 backdrop-blur-sm border-gray-300/50 hover:border-blue-300 hover:bg-white"
                >
                  <a
                    href={detailedCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4 mr-2 group-hover:text-blue-600 transition-colors" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              )}
              <Button
                variant="default"
                className="h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Facts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Registration Card */}
            <Card className="border-2 border-blue-100/50 bg-gradient-to-b from-white to-blue-50/30 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                    <FileCheck className="w-5 h-5 text-white" />
                  </div>
                  <span>Registration Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    label: "Registration Number",
                    value: detailedCompany.registrationNumber,
                    icon: CreditCard,
                  },
                  {
                    label: "Business Type",
                    value: detailedCompany.businessType,
                    icon: BuildingIcon,
                  },
                  {
                    label: "Ownership",
                    value: detailedCompany.ownership,
                    icon: UsersIcon,
                  },
                  {
                    label: "Year End",
                    value: detailedCompany.yearEnd,
                    icon: Calendar,
                  },
                  {
                    label: "Tax ID",
                    value: detailedCompany.taxId,
                    icon: Wallet,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <item.icon className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Contact Card */}
            <Card className="border-2 border-cyan-100/50 bg-gradient-to-b from-white to-cyan-50/30 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mr-3">
                    <UsersIcon className="w-5 h-5 text-white" />
                  </div>
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { label: "CEO", value: detailedCompany.ceo, icon: Briefcase },
                  {
                    label: "Phone",
                    value: detailedCompany.contactPhone,
                    icon: Phone,
                  },
                  {
                    label: "Email",
                    value: detailedCompany.contactEmail,
                    icon: Mail,
                  },
                  {
                    label: "Address",
                    value: detailedCompany.address,
                    icon: Home,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <item.icon className="w-4 h-4 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors break-all">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Compliance Score Card */}
            <Card className="border-2 border-green-100/50 bg-gradient-to-b from-white to-green-50/30 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span>Compliance Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="text-4xl font-bold text-green-700 mb-1">
                      {detailedCompany.complianceScore}%
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Regulatory Compliance</p>
                </div>
                <div className="space-y-2">
                  <Progress
                    value={detailedCompany.complianceScore}
                    className="h-3 bg-gray-200"
                  />
                  <div className="flex justify-between text-xs font-medium text-gray-600">
                    <span>Poor</span>
                    <span>Average</span>
                    <span className="text-green-700">Excellent</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-600 hover:text-green-700"
                  >
                    <Eye className="w-3 h-3 mr-1.5" />
                    View Compliance Details
                    <ChevronRight className="w-3 h-3 ml-1.5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Last Updated Badge */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl border border-blue-200/50 p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Data Verified & Updated
                  </p>
                  <p className="text-xs text-gray-600">
                    Last updated:{" "}
                    {new Date(detailedCompany.lastUpdated).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gradient-to-r from-gray-100/50 to-gray-200/50 backdrop-blur-sm border border-gray-200/50 p-1 rounded-2xl">
                {[
                  { value: "overview", label: "Overview", icon: Eye },
                  { value: "financial", label: "Financial", icon: BarChart },
                  { value: "operations", label: "Operations", icon: Zap },
                  { value: "compliance", label: "Compliance", icon: Shield },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-xl transition-all"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Enhanced Stats Card */}
                <Card className="border-2 border-blue-100/50 bg-gradient-to-b from-white to-blue-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                      Company Statistics
                    </CardTitle>
                    <CardDescription>
                      Key metrics and performance indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          value: detailedCompany.employees,
                          label: "Employees",
                          color: "blue",
                          icon: Users,
                        },
                        {
                          value: detailedCompany.revenue,
                          label: "Annual Revenue",
                          color: "green",
                          icon: TrendingUp,
                        },
                        {
                          value: "14",
                          label: "Years Operating",
                          color: "purple",
                          icon: Calendar,
                        },
                        {
                          value: "98%",
                          label: "Service Coverage",
                          color: "amber",
                          icon: Target,
                        },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className={`relative p-4 rounded-xl bg-gradient-to-br from-${stat.color}-50 to-white border border-${stat.color}-200/50 group hover:scale-[1.02] transition-transform`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}
                            >
                              <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {stat.label}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Services Card */}
                <Card className="border-2 border-green-100/50 bg-gradient-to-b from-white to-green-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-green-600" />
                      Services & Offerings
                    </CardTitle>
                    <CardDescription>
                      Core business services provided
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {detailedCompany.services.map((service, index) => (
                        <div
                          key={index}
                          className="group flex items-center p-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg hover:border-green-300 hover:bg-green-50/30 transition-all"
                        >
                          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Tags Card */}
                <Card className="border-2 border-purple-100/50 bg-gradient-to-b from-white to-purple-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-purple-600" />
                      Business Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {detailedCompany.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1.5 backdrop-blur-sm bg-white/50 border-purple-200/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-300 transition-all group"
                        >
                          <span className="text-purple-700 group-hover:text-purple-800">
                            {tag}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                {/* Financial Overview Card */}
                <Card className="border-2 border-emerald-100/50 bg-gradient-to-b from-white to-emerald-50/30 shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                      Financial Overview
                    </CardTitle>
                    <CardDescription>
                      Revenue, growth, and financial health
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Annual Revenue
                        </p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                          {detailedCompany.revenue}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Financial Summary
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {detailedCompany.financialSummary}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Growth Chart */}
                    <div className="border border-emerald-200/50 rounded-xl p-5 bg-gradient-to-br from-white to-emerald-50/30 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                          Revenue Growth (Last 5 Years)
                        </h4>
                        <div className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          +20% CAGR
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { year: "2023", growth: 20, amount: "$120M" },
                          { year: "2022", growth: 18, amount: "$100M" },
                          { year: "2021", growth: 15, amount: "$85M" },
                          { year: "2020", growth: 12, amount: "$74M" },
                          { year: "2019", growth: 10, amount: "$66M" },
                        ].map((item) => (
                          <div
                            key={item.year}
                            className="flex items-center group"
                          >
                            <span className="w-16 text-sm font-medium text-gray-700">
                              {item.year}
                            </span>
                            <div className="flex-1 ml-4">
                              <div className="relative h-3 bg-gray-200/50 rounded-full overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500 group-hover:opacity-90"
                                  style={{ width: `${item.growth * 3}%` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                            <div className="w-28 text-right">
                              <span className="text-sm font-semibold text-emerald-700">
                                {item.amount}
                              </span>
                              <span className="text-xs text-emerald-600 ml-2">
                                (+{item.growth}%)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subsidiaries Card */}
                {detailedCompany.subsidiaries &&
                  detailedCompany.subsidiaries.length > 0 && (
                    <Card className="border-2 border-blue-100/50 bg-gradient-to-b from-white to-blue-50/30 shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                          Subsidiaries & Affiliates
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {detailedCompany.subsidiaries.map(
                            (subsidiary, index) => (
                              <div
                                key={index}
                                className="flex items-center p-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4 flex-shrink-0">
                                  <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                  {subsidiary}
                                </span>
                                <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </TabsContent>

              <TabsContent value="operations" className="space-y-6">
                {/* Operations Card */}
                <Card className="border-2 border-amber-100/50 bg-gradient-to-b from-white to-amber-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-amber-600" />
                      Operational Details
                    </CardTitle>
                    <CardDescription>
                      Business operations and structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          label: "Business Type",
                          value: detailedCompany.businessType,
                          icon: BuildingIcon,
                        },
                        {
                          label: "Ownership Structure",
                          value: detailedCompany.ownership,
                          icon: UsersIcon,
                        },
                        {
                          label: "Year Established",
                          value: detailedCompany.foundedYear,
                          icon: Calendar,
                        },
                        {
                          label: "Primary Location",
                          value: detailedCompany.location,
                          icon: MapPin,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/50 backdrop-blur-sm border border-amber-200/50 rounded-xl"
                        >
                          <div className="flex items-center mb-2">
                            <item.icon className="w-4 h-4 text-amber-600 mr-2" />
                            <p className="text-sm font-medium text-gray-700">
                              {item.label}
                            </p>
                          </div>
                          <p className="text-lg font-semibold text-gray-900">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications Card */}
                <Card className="border-2 border-indigo-100/50 bg-gradient-to-b from-white to-indigo-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-indigo-600" />
                      Certifications & Memberships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {detailedCompany.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden p-4 bg-gradient-to-br from-white to-indigo-50/50 rounded-xl border border-indigo-200/50 hover:border-indigo-300 transition-all"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-3 flex-shrink-0">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                              {cert}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                {/* Compliance Status Card */}
                <Card className="border-2 border-green-100/50 bg-gradient-to-b from-white to-green-50/30 shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Regulatory Compliance
                    </CardTitle>
                    <CardDescription>
                      Legal and regulatory standing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "Tax Compliance",
                        status: "Active",
                        description: "Fully compliant - All taxes paid",
                        score: 95,
                      },
                      {
                        title: "Business License",
                        status: "Active",
                        description: "Valid until December 2024",
                        score: 100,
                      },
                      {
                        title: "Environmental Compliance",
                        status: "Active",
                        description: "All standards met",
                        score: 90,
                      },
                      {
                        title: "Labor Regulations",
                        status: "Active",
                        description: "Compliant with all labor laws",
                        score: 88,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-green-200/50 rounded-xl hover:border-green-300 transition-all"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-3 ${item.score > 90 ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-700">
                              {item.score}%
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent News Card */}
                {detailedCompany.recentNews && (
                  <Card className="border-2 border-cyan-100/50 bg-gradient-to-b from-white to-cyan-50/30 shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-cyan-600" />
                        Recent News & Updates
                      </CardTitle>
                      <CardDescription>
                        Latest company developments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {detailedCompany.recentNews.map((news, index) => (
                          <div
                            key={index}
                            className="group p-4 bg-white/50 backdrop-blur-sm border border-cyan-200/50 rounded-xl hover:border-cyan-300 hover:bg-cyan-50/30 transition-all"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                                {news.title}
                              </h4>
                              <span className="text-xs font-medium text-cyan-700 bg-cyan-100/50 px-2 py-1 rounded-full">
                                {news.source}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-3 h-3 mr-1.5" />
                              {new Date(news.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Enhanced Verification Status */}
            <div className="mt-8 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Officially Verified Business
                  </h3>
                  <p className="text-gray-700">
                    This company has been verified by the Sierra Leone Corporate
                    Affairs Commission. All registration details are current and
                    up-to-date as of {detailedCompany.lastUpdated}.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 shadow-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Official Government Data Source
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Data provided by Sierra Leone Corporate Affairs Commission • Last
              verified on{" "}
              {new Date(detailedCompany.lastUpdated).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              For official verification, contact the Corporate Affairs
              Commission at verification@cac.gov.sl
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
