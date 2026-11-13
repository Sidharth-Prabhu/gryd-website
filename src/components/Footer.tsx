import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { GithubIcon } from './Icons';
import { GrydLogo } from './GrydLogo';

interface FooterProps {
  onDocsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDocsClick }) => {
  return (
    <footer className="bg-[#141212] border-t border-[#302C2A] py-16 text-xs font-mono text-[#A9A19E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#302C2A]">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-[#171615] border border-[#302C2A] flex items-center justify-center p-1 text-[#F0E6E2]">
                <GrydLogo className="w-full h-full" />
              </div>
              <span className="text-base font-semibold tracking-wider text-[#F0E6E2] lowercase">
                gryd
              </span>
            </div>
            
            <p className="text-[#77716E] font-sans text-xs leading-relaxed max-w-sm">
              The cross-platform, developer-first command-line orchestrator and terminal user interface for modern multi-service development environments.
            </p>

            <div className="pt-2 text-[11px] text-[#77716E]">
              Engineered with Go 1.21+, Bubble Tea, Lip Gloss &amp; Unix process groups.
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-3">
            <div className="text-[#F0E6E2] uppercase tracking-wider text-[11px] font-semibold">
              Product &amp; Docs
            </div>
            <ul className="space-y-2 text-xs">
              {onDocsClick && (
                <li>
                  <button 
                    onClick={onDocsClick} 
                    className="text-[#FF5A1F] hover:text-[#FF6B35] transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Full Documentation</span>
                  </button>
                </li>
              )}
              <li>
                <a href="#features" className="hover:text-[#F0E6E2] transition-colors">
                  Features &amp; Safety
                </a>
              </li>
              <li>
                <a href="#tui-demo" className="hover:text-[#F0E6E2] transition-colors">
                  Interactive TUI
                </a>
              </li>
              <li>
                <a href="#config" className="hover:text-[#F0E6E2] transition-colors">
                  gryd.yaml Reference
                </a>
              </li>
              <li>
                <a href="#cli" className="hover:text-[#F0E6E2] transition-colors">
                  CLI &amp; Shortcuts
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-[#F0E6E2] transition-colors">
                  Downloads Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Ecosystem */}
          <div className="space-y-3">
            <div className="text-[#F0E6E2] uppercase tracking-wider text-[11px] font-semibold">
              Ecosystem
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/homebrew-tap"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F0E6E2] transition-colors flex items-center gap-1"
                >
                  <span>Homebrew Tap</span>
                  <ArrowUpRight className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/microsoft/winget-pkgs"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F0E6E2] transition-colors flex items-center gap-1"
                >
                  <span>WinGet Manifests</span>
                  <ArrowUpRight className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F0E6E2] transition-colors flex items-center gap-1"
                >
                  <span>GitHub Releases</span>
                  <ArrowUpRight className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Open Source */}
          <div className="space-y-3">
            <div className="text-[#F0E6E2] uppercase tracking-wider text-[11px] font-semibold">
              Open Source
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F0E6E2] transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </a>
              </li>
              <li>
                <span className="text-[#77716E]">License: MIT</span>
              </li>
              <li>
                <span className="text-[#77716E]">Author: Sidharth Prabhu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77716E]">
          <div>
            © {new Date().getFullYear()} gryd. Open source software under the MIT License.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#FF5A1F]">●</span>
            <span>All systems nominal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
