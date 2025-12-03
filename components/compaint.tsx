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
import { AlertTriangle, FileWarning, Scale,FileText, CreditCard, Shield, Globe,AlertCircle, Bell, UsersIcon, Phone, Briefcase, Upload, Camera, CheckCircle, Loader2, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Switch } from "@radix-ui/react-switch";





export default function ComplaintModal({ companyId, companyName, onOpenChange }: { 
  companyId: string; 
  companyName: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    { value: "non_compliance", label: "Regulatory Non-Compliance", icon: FileWarning },
    { value: "poor_service", label: "Poor Service Quality", icon: Scale },
    { value: "contract_breach", label: "Contract Breach", icon: FileText },
    { value: "financial", label: "Financial Issues", icon: CreditCard },
    { value: "safety", label: "Safety Concerns", icon: Shield },
    { value: "environmental", label: "Environmental Violations", icon: Globe },
    { value: "other", label: "Other Issues", icon: AlertCircle },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: companyId,
          ...formData,
          username: formData.anonymous ? "Anonymous" : formData.username,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit complaint");

      toast.success("Complaint submitted successfully!", {
        description: "Your complaint has been recorded and will be reviewed.",
      });

      setOpen(false);
      setFormData({
        type: "",
        description: "",
        username: "",
        userPhone: "",
        evidenceUrl: "",
        source: "web",
        anonymous: false,
      });
    } catch (error) {
      toast.error("Failed to submit complaint", {
        description: "Please try again or contact support.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          <span className="font-semibold">File Complaint</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
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
                Report an issue with <span className="font-semibold text-rose-700">{companyName}</span>
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
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      formData.type === type.value
                        ? "border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 text-rose-700 shadow-sm"
                        : "border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/50 text-gray-700"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${formData.type === type.value ? "text-rose-600" : "text-gray-500"}`} />
                    <div className="text-xs font-medium text-center">{type.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-rose-600" />
              Detailed Description <span className="text-rose-500 ml-1">*</span>
            </Label>
            <Textarea
              placeholder="Please provide detailed information about your complaint..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] border-2 border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200/50 rounded-xl bg-gray-50/50"
              required
            />
            <p className="text-xs text-gray-500 flex items-start">
              <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
              Be specific about dates, amounts, and people involved if possible
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-900 flex items-center">
                <UsersIcon className="w-4 h-4 mr-2 text-rose-600" />
                Contact Information
              </Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.anonymous}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, anonymous: checked })
                  }
                  className="data-[state=checked]:bg-rose-600"
                />
                <Label className="text-sm text-gray-700">Submit anonymously</Label>
              </div>
            </div>

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
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
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
                  Screenshots, photos, contracts, receipts, etc. Max file size: 10MB
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
                        <span className="text-sm font-medium text-gray-900 block">{formData.evidenceUrl}</span>
                        <span className="text-xs text-emerald-600">Ready to upload</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({ ...formData, evidenceUrl: "" })}
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
                <span className="text-sm text-amber-800">All complaints are treated confidentially</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-sm text-amber-800">We review complaints within 5-7 business days</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-sm text-amber-800">You may be contacted for additional information</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-sm text-amber-800">False complaints may result in legal action</span>
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
              disabled={!formData.type || !formData.description || submitting}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
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
      </DialogContent>
    </Dialog>
  );
}