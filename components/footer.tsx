import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SLBizRegistry
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            The official directory for verified businesses in Sierra Leone.
          </p>
        </div>

        {/* Simple Links */}
        {/* <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Search
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Explore
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            API
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div> */}

        {/* Copyright */}
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            © {new Date().getFullYear()} Sierra Leone Business Registry
          </div>
          {/* <div className="text-xs text-gray-400">
            Data sourced from Corporate Affairs Commission • Updated daily
          </div> */}
        </div>
      </div>
    </footer>
  );
}
