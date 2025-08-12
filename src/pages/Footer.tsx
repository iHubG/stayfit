import { Dumbbell, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center"
            aria-hidden="true"
          >
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-base">StayFit</span>
        </div>

        {/* Copyright + Tagline */}
        <p className="text-sm text-gray-500 flex items-center gap-1 text-center md:text-left">
          © {currentYear} StayFit. Built with{" "}
          <Heart className="text-rose-500" size={16} aria-label="love" />{" "}
          for simple AI fitness coaching.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
