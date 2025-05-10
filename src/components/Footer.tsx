
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-ninja-accent font-poppins font-bold text-xl">ninja</span>
              <span className="font-poppins font-bold text-xl">Chef</span>
            </div>
            <p className="text-sm text-white/60">Your AI cooking assistant</p>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Contact
            </a>
            <a href="https://github.com" className="text-white/70 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
          
          <div className="text-sm text-white/60">
            Built with AI &copy; 2025 ninjaChef
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
