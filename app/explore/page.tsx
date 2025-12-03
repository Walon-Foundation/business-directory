"use client"

import { useState, useMemo } from 'react';
import { Search, Filter, Building2, MapPin, Users, Calendar, TrendingUp, Star, ChevronRight, Eye, Shield, ExternalLink, Grid, List, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

// Type definitions
export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  status: 'Active' | 'Pending' | 'Suspended' | 'Inactive';
  industry: string;
  location: string;
  foundedYear: number;
  employees: string;
  revenue: string;
  description: string;
  verificationLevel: 'Verified' | 'Pending' | 'Unverified';
  rating: number;
  tags: string[];
  contactEmail?: string;
  website?: string;
}

// Demo data
const demoCompanies: Company[] = [
  {
    id: 'SL-2023-001',
    name: 'Africell Sierra Leone Limited',
    registrationNumber: 'C123456',
    status: 'Active',
    industry: 'Telecommunications',
    location: 'Freetown',
    foundedYear: 2010,
    employees: '500-1000',
    revenue: '$100M+',
    description: 'Leading telecommunications provider in Sierra Leone with nationwide coverage.',
    verificationLevel: 'Verified',
    rating: 4.8,
    tags: ['Telecom', 'ISP', 'Mobile', 'National'],
    website: 'https://africell.sl'
  },
  {
    id: 'SL-2023-002',
    name: 'Sierra Leone Commercial Bank',
    registrationNumber: 'B789012',
    status: 'Active',
    industry: 'Banking & Finance',
    location: 'Freetown',
    foundedYear: 1973,
    employees: '1000+',
    revenue: '$500M+',
    description: 'National commercial bank providing comprehensive financial services.',
    verificationLevel: 'Verified',
    rating: 4.6,
    tags: ['Banking', 'Finance', 'Loans', 'National'],
    website: 'https://slcb.com'
  },
  {
    id: 'SL-2023-003',
    name: 'Makeni Agro Processing Ltd',
    registrationNumber: 'A345678',
    status: 'Active',
    industry: 'Agriculture',
    location: 'Makeni',
    foundedYear: 2018,
    employees: '50-100',
    revenue: '$5M-10M',
    description: 'Agricultural processing company specializing in rice and palm oil production.',
    verificationLevel: 'Verified',
    rating: 4.2,
    tags: ['Agriculture', 'Processing', 'Export', 'SME'],
    contactEmail: 'info@makeniagro.sl'
  },
  {
    id: 'SL-2023-004',
    name: 'Kono Diamond Mining Corporation',
    registrationNumber: 'M901234',
    status: 'Active',
    industry: 'Mining',
    location: 'Kono District',
    foundedYear: 2005,
    employees: '200-500',
    revenue: '$50M-100M',
    description: 'Diamond mining and export company operating in the Kono diamond fields.',
    verificationLevel: 'Verified',
    rating: 4.4,
    tags: ['Mining', 'Diamonds', 'Export', 'Extractive'],
    website: 'https://konodiamonds.sl'
  },
  {
    id: 'SL-2023-005',
    name: 'Freetown Port Authority',
    registrationNumber: 'G567890',
    status: 'Active',
    industry: 'Logistics & Shipping',
    location: 'Freetown',
    foundedYear: 1961,
    employees: '500-1000',
    revenue: '$200M+',
    description: 'Government agency managing port operations and maritime activities.',
    verificationLevel: 'Verified',
    rating: 4.0,
    tags: ['Logistics', 'Shipping', 'Government', 'Port'],
    website: 'https://freetownport.gov.sl'
  },
  {
    id: 'SL-2023-006',
    name: 'Salone Tech Solutions',
    registrationNumber: 'T234567',
    status: 'Active',
    industry: 'Technology',
    location: 'Freetown',
    foundedYear: 2020,
    employees: '10-50',
    revenue: '$1M-5M',
    description: 'Innovative tech startup providing software development and IT consulting services.',
    verificationLevel: 'Pending',
    rating: 4.7,
    tags: ['Technology', 'Startup', 'Software', 'IT'],
    website: 'https://salonetech.sl'
  },
  {
    id: 'SL-2023-007',
    name: 'Bo Healthcare Center',
    registrationNumber: 'H890123',
    status: 'Active',
    industry: 'Healthcare',
    location: 'Bo',
    foundedYear: 2015,
    employees: '100-200',
    revenue: '$10M-20M',
    description: 'Modern healthcare facility providing medical services in the Southern Province.',
    verificationLevel: 'Verified',
    rating: 4.5,
    tags: ['Healthcare', 'Hospital', 'Medical', 'Southern'],
    contactEmail: 'contact@bohealthcare.sl'
  },
  {
    id: 'SL-2023-008',
    name: 'Sierra Fisheries Ltd',
    registrationNumber: 'F456789',
    status: 'Active',
    industry: 'Fisheries',
    location: 'Waterloo',
    foundedYear: 1998,
    employees: '200-300',
    revenue: '$20M-50M',
    description: 'Sustainable fishing and seafood processing company.',
    verificationLevel: 'Verified',
    rating: 4.1,
    tags: ['Fisheries', 'Seafood', 'Export', 'Sustainable'],
    website: 'https://sierrafisheries.sl'
  }
];

const industries = ['All Industries', 'Technology', 'Banking & Finance', 'Agriculture', 'Mining', 'Healthcare', 'Telecommunications', 'Logistics & Shipping', 'Fisheries'];
const locations = ['All Locations', 'Freetown', 'Makeni', 'Bo', 'Kono District', 'Waterloo', 'Kenema', 'Koidu'];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return demoCompanies.filter(company => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Industry filter
      const matchesIndustry = selectedIndustry === 'all' || 
        company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

      // Location filter
      const matchesLocation = selectedLocation === 'all' || 
        company.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Verified filter
      const matchesVerified = !showVerifiedOnly || company.verificationLevel === 'Verified';

      return matchesSearch && matchesIndustry && matchesLocation && matchesVerified;
    });
  }, [searchQuery, selectedIndustry, selectedLocation, showVerifiedOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedLocation('all');
    setShowVerifiedOnly(false);
  };

  const activeFiltersCount = [
    searchQuery !== '' ? 1 : 0,
    selectedIndustry !== 'all' ? 1 : 0,
    selectedLocation !== 'all' ? 1 : 0,
    showVerifiedOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-emerald-600/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Businesses</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Discover all legally registered businesses in Sierra Leone. Filter by industry, location, and status.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by company name, registration number, or keyword..."
                      className="pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Industry Filter */}
                <div>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry.toLowerCase()}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Bar */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {filteredCompanies.length} results found
                    </span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}

              {/* Quick Filters */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                  >
                    <Shield className={`w-4 h-4 mr-2 ${showVerifiedOnly ? 'text-green-600' : ''}`} />
                    Verified Only
                    {showVerifiedOnly && <CheckCircle className="w-3 h-3 ml-1 text-green-600" />}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Large Employers
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Recently Registered
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Verified Only</span>
                  <Switch checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-blue-600">{demoCompanies.length}</div>
            <div className="text-sm text-gray-600">Showing Now</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-green-600">
              {demoCompanies.filter(c => c.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Status</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-amber-600">
              {Array.from(new Set(demoCompanies.map(c => c.industry))).length}
            </div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-purple-600">
              {Array.from(new Set(demoCompanies.map(c => c.location))).length}
            </div>
            <div className="text-sm text-gray-600">Locations</div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Featured Businesses</h2>
            <p className="text-gray-600">
              Showing {filteredCompanies.length} of {demoCompanies.length} results
              {activeFiltersCount > 0 && ' (filtered)'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'shadow-sm' : ''}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'shadow-sm' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Companies Grid/List */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyRowCard key={company.id} company={company} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Businesses
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Data Quality Note */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Data Quality & Verification</h3>
              <p className="text-gray-700 mb-4">
                All business data is sourced directly from the Sierra Leone Corporate Affairs Commission 
                and updated daily. Verification status indicates the level of due diligence completed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">✓ Verified - Full due diligence</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">⏳ Pending - Under review</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">○ Unverified - Basic registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid View Company Card Component
function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 bg-gradient-to-b from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Badge 
                className={`${
                  company.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                  company.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                  'bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {company.status}
              </Badge>
              <Badge 
                variant="outline" 
                className={`${
                  company.verificationLevel === 'Verified' ? 'border-green-300 text-green-700 bg-green-50' :
                  company.verificationLevel === 'Pending' ? 'border-amber-300 text-amber-700 bg-amber-50' :
                  'border-gray-300 text-gray-600 bg-gray-50'
                }`}
              >
                {company.verificationLevel === 'Verified' ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 mr-1" />
                )}
                {company.verificationLevel}
              </Badge>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {company.name}
                </CardTitle>
                <CardDescription className="text-sm mt-1 truncate">
                  {company.registrationNumber} • {company.industry}
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="font-bold ml-1">{company.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{company.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{company.employees}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-700">
            <p className="line-clamp-3" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {company.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {company.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full border border-gray-300">
                {tag}
              </span>
            ))}
            {company.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{company.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-gray-500">
            Est. {company.foundedYear} • {company.revenue}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="h-8 gap-1">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View</span>
            </Button>
            {company.website && (
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Site</span>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// List View Company Card Component
function CompanyRowCard({ company }: { company: Company }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Company Logo and Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {company.name}
                  </h3>
                  <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-sm ml-1">{company.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge 
                    className={`${
                      company.status === 'Active' ? 'bg-green-100 text-green-700' :
                      company.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {company.status}
                  </Badge>
                  <Badge variant="outline">{company.industry}</Badge>
                  <Badge variant="outline">
                    <MapPin className="w-3 h-3 mr-1" />
                    {company.location}
                  </Badge>
                  <span className="text-sm text-gray-500">{company.registrationNumber}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {company.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">
                    <Users className="w-3 h-3 inline mr-1" />
                    {company.employees}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Est. {company.foundedYear}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{company.revenue}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
              company.verificationLevel === 'Verified' ? 'bg-green-100 text-green-700' :
              company.verificationLevel === 'Pending' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {company.verificationLevel}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="flex-1 sm:flex-none">
                <Eye className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">View</span>
              </Button>
              {company.website && (
                <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                  <ExternalLink className="w-4 h-4 sm:mr-2" />
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