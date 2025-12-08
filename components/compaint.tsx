import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  FileWarning,
  Scale,
  FileText,
  CreditCard,
  Shield,
  Globe,
  AlertCircle,
  Bell,
  UsersIcon,
  Phone,
  Briefcase,
  Upload,
  Camera,
  CheckCircle,
  Loader2,
  Send,
  X,
  Copy,
  Check,
  Mail,
  Calendar,
  FileSearch,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

type ComplaintStatus = "form" | "submitting" | "success" | "error";

export default function ComplaintModal({
  companyId,
  companyName,
  onOpenChange,
}: {
  companyId: string;
  companyName: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ComplaintStatus>("form");
  const [submissionData, setSubmissionData] = useState<{
    referenceNumber: string;
    complaintId: string;
    nextSteps: string[];
    submittedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    username: "",
    userPhone: "",
    evidenceUrl: "",
    source: "web",
    anonymous: false,
  });

  const complaintTypes = [
    { value: "fraud", label: "Fraudulent Activity", icon: AlertTriangle },
    {
      value: "non_compliance",
      label: "Regulatory Non-Compliance",
      icon: FileWarning,
    },
    { value: "poor_service", label: "Poor Service Quality", icon: Scale },
    { value: "contract_breach", label: "Contract Breach", icon: FileText },
    { value: "financial", label: "Financial Issues", icon: CreditCard },
    { value: "safety", label: "Safety Concerns", icon: Shield },
    { value: "environmental", label: "Environmental Violations", icon: Globe },
    { value: "other", label: "Other Issues", icon: AlertCircle },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Show notification for anonymous submission
    if (formData.anonymous) {
      toast.info("Submitting anonymously", {
        description: "Your identity will not be shared with the company.",
        duration: 3000,
      });
    }

    // Prepare payload - clear personal info if anonymous
    const payload = {
      ...formData,
      username: formData.anonymous ? "" : formData.username,
      userPhone: formData.anonymous ? "" : formData.userPhone,
    };

    try {
      const res = await axios.post(
        `/api/explore/${companyId}/complaint`,
        payload,
      );

      if (res.status !== 201) throw new Error("Failed to submit complaint");

      // Store submission data for success view
      setSubmissionData({
        referenceNumber: res.data.data.referenceNumber,
        complaintId: res.data.data.id,
        nextSteps: res.data.nextSteps,
        submittedAt: new Date().toLocaleString(),
      });

      setStatus("success");

      toast.success("Complaint submitted successfully!", {
        description: `Reference: ${res.data.data.referenceNumber}`,
        duration: 5000,
      });

      // Reset form but keep modal open for success view
      setFormData({
        type: "",
        description: "",
        username: "",
        userPhone: "",
        evidenceUrl: "",
        source: "web",
        anonymous: false,
      });

      // Reload the page after 2 seconds to show updated complaints
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setStatus("error");

      // Extract detailed error message from API response
      let errorMessage = "Please try again or contact support.";
      let errorTitle = "Failed to submit complaint";

      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error;

        if (apiError) {
          // Handle validation errors
          if (apiError.fieldErrors) {
            const fieldErrors = Object.entries(apiError.fieldErrors)
              .map(
                ([field, errors]) =>
                  `${field}: ${(errors as string[]).join(", ")}`,
              )
              .join("; ");
            errorMessage = fieldErrors;
            errorTitle = "Validation Error";
          } else if (apiError.message) {
            errorMessage = apiError.message;
          }
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorTitle, {
        description: errorMessage,
        duration: 7000,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);

    // Reset status when closing
    if (!newOpen) {
      setTimeout(() => {
        setStatus("form");
        setSubmissionData(null);
        setCopied(false);
      }, 300);
    }
  };

  const copyReferenceNumber = () => {
    if (submissionData?.referenceNumber) {
      navigator.clipboard.writeText(submissionData.referenceNumber);
      setCopied(true);
      toast.success("Reference number copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewComplaint = () => {
    setStatus("form");
    setSubmissionData(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 group">
          <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          <span className="font-semibold">File Complaint</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
        {status === "success" && submissionData ? (
          <div className="py-6">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                Complaint Submitted Successfully!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Your complaint against{" "}
                <span className="font-semibold text-emerald-700">
                  {companyName}
                </span>{" "}
                has been recorded.
              </DialogDescription>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-3">
                {submissionData.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-600" />
                  <h4 className="font-medium text-gray-900 text-sm">
                    Email Confirmation
                  </h4>
                </div>
                <p className="text-xs text-gray-600">
                  {formData.anonymous || !formData.username
                    ? "No email will be sent (anonymous submission)"
                    : "Check your email for confirmation and updates"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                  <h4 className="font-medium text-gray-900 text-sm">
                    Review Timeline
                  </h4>
                </div>
                <p className="text-xs text-gray-600">
                  Initial review within 24 hours, full review in 5-7 business
                  days
                </p>
              </div>
            </div>

            {/* Actions */}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                Close
              </Button>
              <div className="flex gap-3 flex-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNewComplaint}
                  className="flex-1 h-12 rounded-xl border-2 border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                >
                  File Another Complaint
                </Button>
              </div>
            </DialogFooter>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-rose-500 flex items-center justify-center">
                    <AlertTriangle className="w-2.5 h-2.5 text-rose-500" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    File a Complaint
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Report an issue with{" "}
                    <span className="font-semibold text-rose-700">
                      {companyName}
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Complaint Type */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-rose-600" />
                  Complaint Type <span className="text-rose-500 ml-1">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {complaintTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: type.value })
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                          formData.type === type.value
                            ? "border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 text-rose-700 shadow-sm"
                            : "border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/50 text-gray-700"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${formData.type === type.value ? "text-rose-600" : "text-gray-500"}`}
                        />
                        <div className="text-xs font-medium text-center">
                          {type.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-rose-600" />
                  Detailed Description{" "}
                  <span className="text-rose-500 ml-1">*</span>
                </Label>
                <Textarea
                  placeholder="Please provide detailed information about your complaint..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[120px] border-2 border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50 rounded-xl bg-gray-50/50"
                  required
                />
                <p className="text-xs text-gray-500 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                  Be specific about dates, amounts, and people involved if
                  possible
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center">
                    <UsersIcon className="w-4 h-4 mr-2 text-rose-600" />
                    Contact Information
                  </Label>
                  <div
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-200 ${
                      formData.anonymous
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Switch
                      checked={formData.anonymous}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, anonymous: checked })
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label
                      className={`text-sm font-medium ${formData.anonymous ? "text-blue-700" : "text-gray-700"}`}
                    >
                      {formData.anonymous
                        ? "Anonymous Mode Active"
                        : "Submit Anonymously"}
                    </Label>
                  </div>
                </div>

                {/* Anonymous mode notification */}
                {formData.anonymous && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 text-sm mb-1">
                          Anonymous Submission Active
                        </h4>
                        <p className="text-xs text-blue-700">
                          Your identity will not be shared with the company.
                          Contact information fields are hidden.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!formData.anonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                        Your Name
                      </Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="border-2 border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        Phone Number
                      </Label>
                      <Input
                        placeholder="+232 XX XXX XXX"
                        value={formData.userPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userPhone: e.target.value,
                          })
                        }
                        className="border-2 border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Evidence Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-900 flex items-center">
                  <Upload className="w-4 h-4 mr-2 text-rose-600" />
                  Evidence (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-rose-300 transition-colors bg-gray-50/30">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-rose-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Upload supporting documents
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
                      Screenshots, photos, contracts, receipts, etc. Max file
                      size: 10MB
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="evidence-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // In a real app, upload to storage and get URL
                          setFormData({ ...formData, evidenceUrl: file.name });
                        }
                      }}
                    />
                    <Label
                      htmlFor="evidence-upload"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 hover:from-rose-100 hover:to-pink-100 cursor-pointer transition-colors border border-rose-200 hover:border-rose-300"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Label>
                  </div>
                  {formData.evidenceUrl && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm font-medium text-gray-900 block">
                              {formData.evidenceUrl}
                            </span>
                            <span className="text-xs text-emerald-600">
                              Ready to upload
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setFormData({ ...formData, evidenceUrl: "" })
                          }
                          className="h-8 w-8 p-0 hover:bg-white"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Important Notes */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                  Important Information
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="text-sm text-amber-800">
                      All complaints are treated confidentially
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="text-sm text-amber-800">
                      We review complaints within 5-7 business days
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="text-sm text-amber-800">
                      You may be contacted for additional information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="text-sm text-amber-800">
                      False complaints may result in legal action
                    </span>
                  </li>
                </ul>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="flex-1 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !formData.type ||
                    !formData.description ||
                    status === "submitting"
                  }
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
