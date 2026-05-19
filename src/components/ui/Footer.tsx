import { Link } from 'react-router-dom';
import { Zap, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sole-surface border-t border-sole-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sole-amber rounded flex items-center justify-center">
                <Zap size={18} className="text-sole-black fill-sole-black" />
              </div>
              <span className="font-display text-2xl text-sole-white tracking-widest">SOLE</span>
            </Link>
            <p className="font-body text-sole-muted text-sm leading-relaxed max-w-xs">
              India's premium sneaker destination. Authentic kicks, AI-powered discovery, and a 48-hour reservation guarantee.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/kushal-ctrl-del" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-sole-border rounded-full flex items-center justify-center text-sole-muted hover:text-sole-amber hover:border-sole-amber transition-all duration-200">
                <Github size={15} />
              </a>
              <a href="https://www.linkedin.com/in/kushal-jain-bb10a3336" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-sole-border rounded-full flex items-center justify-center text-sole-muted hover:text-sole-amber hover:border-sole-amber transition-all duration-200">
                <Linkedin size={15} />
              </a>
              <a href="mailto:kushalsankala@gmail.com" className="w-9 h-9 border border-sole-border rounded-full flex items-center justify-center text-sole-muted hover:text-sole-amber hover:border-sole-amber transition-all duration-200">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-sole-white text-lg mb-4 tracking-wider">Shop</h4>
            <ul className="space-y-2">
              {['All Sneakers', "Men's", "Women's", 'New Arrivals', 'Sale'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="font-body text-sm text-sole-muted hover:text-sole-amber transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sole-white text-lg mb-4 tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:kushalsankala@gmail.com" className="font-body text-sm text-sole-muted hover:text-sole-amber transition-colors flex items-center gap-1.5">
                  <Mail size={13} />
                  kushalsankala@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/kushal-ctrl-del" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-sole-muted hover:text-sole-amber transition-colors flex items-center gap-1.5">
                  <Github size={13} />
                  kushal-ctrl-del
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kushal-jain-bb10a3336" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-sole-muted hover:text-sole-amber transition-colors flex items-center gap-1.5">
                  <Linkedin size={13} />
                  Kushal Jain
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sole-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-sole-muted">
            &copy; 2024 SOLE. Built by Kushal. All rights reserved.
          </p>
          <p className="font-body text-xs text-sole-muted">
            Test mode — no real transactions processed.
          </p>
        </div>
      </div>
    </footer>
  );
}
