import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 py-4 shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-white">
          © {new Date().getFullYear()} TheZip. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
