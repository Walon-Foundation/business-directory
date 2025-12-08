import { Search, Shield, TrendingUp, MessageCircle, Globe, AlertCircle, Database, BadgeCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Everything you need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600">
              verify businesses in Sierra Leone
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            The Sierra Leone Business Directory brings together real-time verification, rich company profiles,
            analytics and multi-channel access (web + WhatsApp) in a single modern platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="px-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
              <Link href="/explore">Browse Businesses</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 rounded-full border-blue-300">
              <Link href="/api-page">View API for Developers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core feature grid */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Search}
              title="Smart business search"
              description="Fuzzy matching across names, registration numbers, directors and locations so you can find the right company even with partial information."
              chip="Search"
            />
            <FeatureCard
              icon={Shield}
              title="Verification & compliance"
              description="Status, verification level, compliance scores and risk indicators surfaced at a glance for each business."
              chip="Trust"
            />
            <FeatureCard
              icon={Database}
              title="Rich company profiles"
              description="Structured data for ownership, directors, financial ranges, ESG scores, market coverage and more in a single profile."
              chip="Profiles"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Analytics-ready schema"
              description="PostgreSQL + Drizzle ORM schema designed for dashboards, policy analysis and market research out of the box."
              chip="Analytics"
            />
            <FeatureCard
              icon={MessageCircle}
              title="WhatsApp verification bot"
              description="Citizens can verify a business by sending its name or registration number via WhatsApp using the Wasender-powered bot."
              chip="WhatsApp"
            />
            <FeatureCard
              icon={Globe}
              title="Public REST API"
              description="Open API endpoints for search and detailed profiles so banks, fintechs and partners can plug verification into their own systems."
              chip="API"
            />
          </div>
        </div>
      </section>

      {/* How it fits together */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for government, banks and citizens
            </h2>
            <p className="text-gray-700 mb-6">
              The platform is designed as a shared verification layer for the Sierra Leonean economy. Government
              registries provide authoritative data, financial institutions use it for due diligence, and
              everyday citizens use it to avoid scams.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <BadgeCheck className="w-5 h-5 mt-0.5 text-emerald-600" />
                <span>Single source of truth for registered businesses and their current status.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 mt-0.5 text-amber-600" />
                <span>Complaint records help surface patterns of fraud and unresolved issues.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-5 h-5 mt-0.5 text-blue-600" />
                <span>Fast lookups via web, API or WhatsApp depending on the user&apos;s context.</span>
              </li>
            </ul>
          </div>

          <Card className="bg-gradient-to-br from-white to-blue-50/40 border-2 border-blue-100 shadow-2xl">
            <CardHeader className="border-b border-blue-100/70">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                Verification flow at a glance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm text-gray-700">
              <StepRow step="1" label="User submits a search" detail="Via web, API or WhatsApp (Wasender webhook)." />
              <StepRow step="2" label="Directory queries PostgreSQL" detail="Using optimized indexes and Drizzle ORM to locate the matching business." />
              <StepRow step="3" label="Rules & risk checks" detail="Status, verification level, complaints and scores are combined into a human-readable response." />
              <StepRow step="4" label="Response delivered" detail="Results are returned to the channel that initiated the request in under a second in most cases." />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function FeatureCard(props: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  chip: string;
}) {
  const Icon = props.icon;
  return (
    <Card className="h-full border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 w-fit">
          {props.chip}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{props.title}</h3>
        </div>
        <p className="text-sm text-gray-600 flex-1">{props.description}</p>
      </CardContent>
    </Card>
  );
}

function StepRow(props: { step: string; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
        {props.step}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{props.label}</div>
        <div className="text-gray-600 text-xs mt-0.5">{props.detail}</div>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3l1.5 3.5L10 8l-3.5 1.5L5 13l-1.5-3.5L0 8l3.5-1.5L5 3zM19 4l1 2.5L23 8l-3 1.5L19 12l-1-2.5L15 8l3-1.5L19 4zM14 12l1.5 3.5L19 17l-3.5 1.5L14 22l-1.5-3.5L9 17l3.5-1.5L14 12z"
        fill="currentColor"
      />
    </svg>
  );
}
