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
                    <div className="text-sm text-gray-600">
                      Accuracy Rate
                    </div>
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
                  <p className="text-gray-600">
                    {value.description}
                  </p>
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

            <Card className="border-2 border-purple-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  support@slregistry.gov.sl
                  <br />
                  verification@cac.gov.sl
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
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
      </section>

      {/* Footer Note */}
      {/* <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">SL Business Registry</div>
                <div className="text-sm text-gray-600">Official Government Directory</div>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              A public service initiative by the Government of Sierra Leone to promote 
              business transparency and economic growth.
            </p>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Sierra Leone Business Registry. All rights reserved.
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
