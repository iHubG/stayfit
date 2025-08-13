import { Dumbbell } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center"
            aria-hidden="true"
          >
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-base">StayFit</span>
        </div>

        <p className="text-sm text-gray-500">
          © {currentYear} StayFit. All rights reserved. 
            Made by <a href="https://github.com/iHubG" target="_blank" className="underline">Ian</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
