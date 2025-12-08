import {
  Building2,
  Target,
  Users,
  Shield,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  MessageCircle,
  Zap,
  Bell,
  FileText,
  Smartphone,
  Clock,
  Send,
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              About Sierra Leone Business Registry
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Trust
              </span>{" "}
              in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Business
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              We're transforming how businesses are verified in Sierra Leone,
              creating transparency that fuels economic growth and protects
              consumers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Explore Directory
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-blue-300"
              >
                <Globe className="mr-2 w-5 h-5" />
                Our Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* WhatsApp Chat Mockup */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />

                <div className="relative bg-white rounded-2xl shadow-2xl shadow-emerald-500/10 border border-emerald-100 overflow-hidden">
                  {/* WhatsApp Header */}
                  <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          SL Business Registry
                        </h3>
                        <p className="text-emerald-100 text-sm">
                          Typically replies in minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 bg-emerald-50/30">
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                          <p className="text-gray-800">
                            Hi! Send "REGISTER [Business Name]" to verify any
                            business in Sierra Leone
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          10:24 AM
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-[80%]">
                        <div className="bg-emerald-100 rounded-2xl rounded-tr-none px-4 py-3">
                          <p className="text-gray-800">
                            REGISTER ABC Enterprises
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block text-right">
                          10:25 AM
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                          <div className="space-y-2">
                            <p className="font-semibold text-emerald-700">
                              ✅ ABC Enterprises Verified
                            </p>
                            <p className="text-sm text-gray-600">
                              Registration: CAC-2023-5678
                            </p>
                            <p className="text-sm text-gray-600">
                              Status: Active • Since: 2023
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge className="bg-emerald-100 text-emerald-700">
                                ✓ Verified
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700">
                                📍 Freetown
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          10:25 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-3 border-t border-gray-100 bg-white">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Get Certificate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                      >
                        <Bell className="w-3 h-3 mr-1" />
                        Status Updates
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-4 top-1/4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 rounded-xl shadow-lg">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Features
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Verify Businesses Instantly via WhatsApp
              </h2>

              <p className="text-lg text-gray-600 mb-8">
                Get instant access to verified business information right from
                your WhatsApp. No app downloads, no complicated forms — just
                simple, fast verification.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Instant Verification",
                    description:
                      "Send a business name and get verification results in seconds",
                    color: "emerald",
                  },
                  {
                    icon: Smartphone,
                    title: "No App Required",
                    description:
                      "Works on any device with WhatsApp — no additional apps needed",
                    color: "blue",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Availability",
                    description:
                      "Access business verification anytime, anywhere",
                    color: "purple",
                  },
                  {
                    icon: Shield,
                    title: "Secure & Private",
                    description:
                      "End-to-end encrypted verification for your security",
                    color: "amber",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Try It Now</h4>
                    <p className="text-gray-600 text-sm">
                      Save our number and start verifying
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white text-emerald-700 border-emerald-200 px-4 py-2 text-lg font-mono">
                      +232 88 123 4567
                    </Badge>
                    <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                      <Send className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Creating a transparent business ecosystem for Sierra Leone
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Verified Business Data
                    </h3>
                    <p className="text-gray-600">
                      Every business in our directory is officially registered
                      and verified with the Sierra Leone Corporate Affairs
                      Commission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Economic Empowerment
                    </h3>
                    <p className="text-gray-600">
                      We reduce business verification time from weeks to
                      seconds, accelerating economic transactions and
                      investment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Consumer Protection
                    </h3>
                    <p className="text-gray-600">
                      Empowering consumers to verify businesses before
                      transactions, reducing fraud and building trust in the
                      marketplace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 md:p-12 shadow-2xl shadow-blue-500/20">
                <div className="text-white">
                  <Building2 className="w-16 h-16 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Official Government Partnership
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Working directly with the Corporate Affairs Commission to
                    ensure all business data is accurate, current, and legally
                    verified.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Real-time Updates</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Legal Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      50,000+
                    </div>
                    <div className="text-sm text-gray-600">
                      Verified Businesses
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700">
              <Heart className="w-4 h-4 mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Principles that guide our work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values shape every decision we make and every feature we
              build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Integrity",
                description:
                  "We maintain the highest standards of accuracy and reliability in all our data.",
                color: "blue",
              },
              {
                icon: Globe,
                title: "Accessibility",
                description:
                  "Free, open access to verified business information for everyone.",
                color: "cyan",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "Continuous improvement to provide the best verification service.",
                color: "amber",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "Working with government, businesses, and citizens to build trust.",
                color: "green",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="group border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 flex items-center justify-center mb-4`}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Transforming Sierra Leone's business landscape
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-blue-100">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-center pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Reduced Fraud
                </h3>
                <p className="text-gray-600">
                  Decrease in business-related fraud since verification became
                  accessible
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-white to-green-50/50 rounded-2xl border border-green-100">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-center pt-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  90%
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Faster Verification
                </h3>
                <p className="text-gray-600">
                  Reduction in time required for business verification processes
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-center pt-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  2.5M+
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Monthly Searches
                </h3>
                <p className="text-gray-600">
                  Businesses and individuals verifying information monthly
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Usage Stats */}
          <div className="mt-16 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                WhatsApp Verification Adoption
              </h3>
              <p className="text-gray-600">
                Join thousands who verify businesses instantly via WhatsApp
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  15K+
                </div>
                <div className="text-sm text-gray-600">Daily Verifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  45s
                </div>
                <div className="text-sm text-gray-600">
                  Average Response Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600">
                  Service Availability
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We're here to help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or need support? Reach out to our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Our Office
                </h3>
                <p className="text-gray-600">
                  Corporate Affairs Commission
                  <br />
                  Freetown, Sierra Leone
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Phone
                </h3>
                <p className="text-gray-600">
                  +232 00 000 000
                  <br />
                  Mon - Fri, 8:00 AM - 5:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  WhatsApp
                </h3>
                <p className="text-gray-600">
                  +232 88 123 4567
                  <br />
                  <span className="text-emerald-600 font-medium">
                    24/7 Verification Service
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Start WhatsApp Verification
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Globe className="mr-2 w-5 h-5" />
                Government Portal
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
