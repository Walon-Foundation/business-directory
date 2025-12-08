import { Building2, MapPin, Globe2, Users, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BusinessesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 border-blue-200">
              Business Ecosystem
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              Explore Sierra Leone&apos;s
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">
                registered businesses
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8">
              The directory aggregates structured information about companies operating in Sierra Leone so you
              can quickly understand who they are, where they operate and how trustworthy they are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="px-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                <Link href="/explore">
                  Browse all businesses
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 rounded-full border-blue-300">
                <Link href="/api-page">Use the data via API</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-6">
            <StatCard label="Demo records" value="50+" detail="Seeded sample businesses across key sectors" />
            <StatCard label="Industries" value="10+" detail="Technology, banking, mining, agriculture & more" />
            <StatCard label="Coverage" value="Nationwide" detail="Location, city, district & province fields" />
            <StatCard label="Verification" value="Multi-layer" detail="Status, verification level, complaints & scores" />
          </div>
        </div>
      </section>

      {/* What we store per business */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What a business profile contains
            </h2>
            <p className="text-gray-700 mb-6">
              Each row in the <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">business</code> table
              represents a single company with a rich set of attributes designed for compliance checks,
              onboarding and market analysis.
            </p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <Building2 className="w-5 h-5 mt-0.5 text-blue-600" />
                <span>
                  <strong>Identification:</strong> registration number, tax ID, official name and trading name.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-emerald-600" />
                <span>
                  <strong>Location:</strong> address, city, district, province, country and optional geo-coordinates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-5 h-5 mt-0.5 text-purple-600" />
                <span>
                  <strong>People & ownership:</strong> directors, ownership type and major clients stored as structured JSON.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 mt-0.5 text-amber-600" />
                <span>
                  <strong>Financial & growth:</strong> revenue ranges, investment, revenue growth and market position.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 mt-0.5 text-emerald-600" />
                <span>
                  <strong>Risk & compliance:</strong> compliance score, risk assessment, regulatory filings and complaint
                  history.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Globe2 className="w-5 h-5 mt-0.5 text-cyan-600" />
                <span>
                  <strong>Online presence:</strong> websites and social media links for due-diligence research.
                </span>
              </li>
            </ul>
          </div>

          <Card className="bg-gradient-to-br from-white to-gray-50/40 border-2 border-gray-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
                Example use cases
              </CardTitle>
            </CardHeader>
          <CardContent className="pt-4 space-y-4 text-sm text-gray-700">
              <UseCase
                title="Bank onboarding"
                description="Verify registration, ownership and compliance score before opening accounts or approving loans."
              />
              <UseCase
                title="Vendor due diligence"
                description="Organizations can quickly check whether suppliers are legitimate and currently active."
              />
              <UseCase
                title="Investor research"
                description="Investors explore sectors, locations and growth data to understand where opportunities are."
              />
              <UseCase
                title="Citizen protection"
                description="Members of the public can look up a company before paying bills, investing or signing contracts."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl py-10 px-6 sm:px-10 text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to explore the businesses in our directory?</h2>
          <p className="mb-6 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Remember: the current dataset is demo data seeded into PostgreSQL while we work with the Government of
            Sierra Leone to onboard official registry records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" className="px-8 rounded-full text-blue-900 font-semibold">
              <Link href="/explore">Open the Explore page</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 rounded-full border-white text-white hover:bg-white/10">
              <Link href="/">Back to landing page</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard(props: { label: string; value: string; detail: string }) {
  return (
    <Card className="border-2 border-white/70 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4">
        <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          {props.label}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{props.value}</div>
        <div className="text-xs text-gray-600">{props.detail}</div>
      </CardContent>
    </Card>
  );
}

function UseCase(props: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <Badge className="mt-0.5 bg-blue-50 text-blue-700 border-blue-200">
        {props.title}
      </Badge>
            <p className="text-gray-700 text-sm flex-1">{props.description}</p>
    </div>
  );
}
