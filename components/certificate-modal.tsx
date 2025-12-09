"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import { Company } from "@/types/company";

interface CertificateModalProps {
  company: Company;
  trigger?: React.ReactNode;
}

export default function CertificateModal({
  company,
  trigger,
}: CertificateModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            View Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full bg-white p-0 overflow-hidden border-4 sm:border-8 border-double border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8 md:p-12 text-center relative">
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <ShieldCheck className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96" />
          </div>

          {/* Border Design */}
          <div className="absolute inset-2 sm:inset-4 border-2 border-gray-900 pointer-events-none" />
          <div className="absolute inset-3 sm:inset-6 border border-gray-900 pointer-events-none" />

          {/* Header */}
          <div className="mb-6 sm:mb-8 relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <BadgeCheck className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 tracking-wide uppercase text-center">
              Certificate of Registration
            </DialogTitle>
            <p className="text-gray-500 uppercase tracking-widest text-xs sm:text-sm">
              Official Business Directory
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6 relative z-10 font-serif">
            <p className="text-base sm:text-xl text-gray-700">
              This is to certify that
            </p>

            <div className="py-2 sm:py-4 border-b-2 border-gray-900 inline-block min-w-[200px] sm:min-w-[300px] px-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-900 italic break-words">
                {company.name}
              </h1>
            </div>

            <p className="text-base sm:text-xl text-gray-700 mt-4 sm:mt-6 px-4">
              has been duly registered and verified in accordance with the
              standards of the Official Business Directory.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto mt-8 sm:mt-12 text-left px-4 sm:px-0">
              <div className="bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Registration Number
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-900 break-all">
                  {company.registrationNumber || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Date of Issue
                </p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {new Date().toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Status
                </p>
                <p className="text-base sm:text-lg font-bold text-emerald-600 uppercase">
                  {company.status}
                </p>
              </div>
              <div className="bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Verification Level
                </p>
                <p className="text-base sm:text-lg font-bold text-blue-600 uppercase">
                  {company.verificationLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-8 sm:gap-0 relative z-10">
            <div className="text-center order-2 sm:order-1">
              <div className="w-32 border-b border-gray-900 mb-2 mx-auto sm:mx-0"></div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Authorized Signature
              </p>
            </div>

            <div className="w-20 h-20 sm:w-24 sm:h-24 relative opacity-80 order-1 sm:order-2">
              {/* Seal Placeholder */}
              <div className="absolute inset-0 border-4 border-blue-900 rounded-full flex items-center justify-center">
                <div className="text-[8px] sm:text-[10px] uppercase font-bold text-blue-900 text-center leading-tight">
                  Official
                  <br />
                  Seal
                </div>
              </div>
            </div>

            <div className="text-center order-3">
              <div className="w-32 border-b border-gray-900 mb-2 mx-auto sm:mx-0"></div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Director of Registry
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
