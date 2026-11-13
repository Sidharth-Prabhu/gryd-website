import React, { useState, useEffect } from 'react';
import { X, ArrowDownToLine, BookOpen, Cpu, Sparkles, Sliders, Layers, Download, Check, Copy } from 'lucide-react';
import { GithubIcon } from './Icons';
import { GrydLogo } from './GrydLogo';

interface NavbarProps {
  onDownloadClick: () => void;
  onDocsClick: () => void;
  onHomeClick: () => void;
  isDocsPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onDownloadClick, 
  onDocsClick, 
  onHomeClick,
  isDocsPage = false 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);

  // Close sandwich menu on window resize if scaled up to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile sandwich drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const copyQuickInstall = () => {
    navigator.clipboard.writeText('brew install gryd');
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (isDocsPage) {
      onHomeClick();
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#141212]/95 backdrop-blur-md border-b border-[#302C2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Brand Identity (Logo + Name + Tag) */}
            <div className="flex items-center space-x-3 shrink-0">
              <button 
                onClick={onHomeClick} 
                className="flex items-center space-x-2.5 group text-left cursor-pointer transition-opacity hover:opacity-90"
                aria-label="gryd home"
              >
                <div className="w-8 h-8 rounded bg-[#171615] border border-[#302C2A] group-hover:border-[#FF5A1F] transition-colors flex items-center justify-center p-1.5 text-[#F0E6E2] group-hover:text-[#FF5A1F]">
                  <GrydLogo className="w-full h-full" />
                </div>
                <span className="font-mono text-lg font-semibold tracking-wider text-[#F0E6E2] lowercase">
                  gryd
                </span>
              </button>
              
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium bg-[#191716] text-[#A9A19E] border border-[#302C2A] rounded">
                v0.3.0
              </span>
            </div>

            {/* Center: Desktop Navigation Bar (Only on xl screens to prevent cramping) */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
              <button
                onClick={onDocsClick}
                className={`whitespace-nowrap transition-colors flex items-center gap-1.5 py-1 px-2 rounded ${
                  isDocsPage 
                    ? 'text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 font-semibold' 
                    : 'text-[#A9A19E] hover:text-[#F0E6E2]'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#FF5A1F]" />
                <span>Documentation</span>
              </button>

              <button 
                onClick={() => handleNavClick('features')}
                className="whitespace-nowrap text-[#A9A19E] hover:text-[#F0E6E2] transition-colors py-1"
              >
                Features
              </button>
              
              <button 
                onClick={() => handleNavClick('lifecycle-engine')}
                className="whitespace-nowrap text-[#A9A19E] hover:text-[#F0E6E2] transition-colors flex items-center gap-1.5 py-1"
              >
                <span>Lifecycle Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse"></span>
              </button>

              <button 
                onClick={() => handleNavClick('config')}
                className="whitespace-nowrap text-[#A9A19E] hover:text-[#F0E6E2] transition-colors py-1"
              >
                gryd.yaml
              </button>

              <button 
                onClick={() => handleNavClick('cli')}
                className="whitespace-nowrap text-[#A9A19E] hover:text-[#F0E6E2] transition-colors py-1"
              >
                CLI &amp; Shortcuts
              </button>

              <button 
                onClick={() => handleNavClick('downloads')}
                className="whitespace-nowrap text-[#A9A19E] hover:text-[#F0E6E2] transition-colors py-1"
              >
                Downloads
              </button>
            </nav>

            {/* Right: Actions on Desktop (xl+) */}
            <div className="hidden xl:flex items-center space-x-3.5 shrink-0">
              <a
                href="https://github.com/Sidharth-Prabhu/gryd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#A9A19E] hover:text-[#F0E6E2] bg-[#171615] hover:bg-[#191716] border border-[#302C2A] hover:border-[#423D3A] rounded transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <span className="text-[#77716E]">★</span>
              </a>

              <button
                onClick={() => {
                  if (isDocsPage) {
                    onHomeClick();
                    setTimeout(() => {
                      document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  } else {
                    onDownloadClick();
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide text-[#141212] bg-[#FF5A1F] hover:bg-[#FF6B35] rounded transition-all shadow-sm shrink-0"
              >
                <ArrowDownToLine className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Install gryd</span>
              </button>
            </div>

            {/* Mobile & Tablet Controls (Below xl) */}
            <div className="flex xl:hidden items-center space-x-2.5">
              
              {/* Quick Docs Pill on Tablet */}
              <button
                onClick={onDocsClick}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  isDocsPage
                    ? 'text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/40'
                    : 'text-[#A9A19E] hover:text-[#F0E6E2] bg-[#171615] border border-[#302C2A]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Docs</span>
              </button>

              {/* Install Shortcut on Tablet */}
              <button
                onClick={() => {
                  if (isDocsPage) {
                    onHomeClick();
                    setTimeout(() => {
                      document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  } else {
                    onDownloadClick();
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium text-[#141212] bg-[#FF5A1F] hover:bg-[#FF6B35] rounded transition-colors"
              >
                <ArrowDownToLine className="w-3 h-3 stroke-[2.5]" />
                <span>Install</span>
              </button>

              {/* The Sandwich (Hamburger) Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded transition-all flex items-center justify-center border ${
                  menuOpen 
                    ? 'bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#FF5A1F]' 
                    : 'bg-[#171615] border-[#302C2A] hover:border-[#423D3A] text-[#F0E6E2]'
                }`}
                aria-label="Toggle navigation options"
                title="View Navigation Options"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  /* Editorial Sandwich (3-line) Icon */
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Full-Featured Mobile & Tablet Sandwich Drawer Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#171615] border-l border-[#302C2A] shadow-2xl flex flex-col justify-between overflow-y-auto">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-[#302C2A] bg-[#191716]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded bg-[#141212] border border-[#302C2A] flex items-center justify-center p-1 text-[#F0E6E2]">
                    <GrydLogo className="w-full h-full" />
                  </div>
                  <span className="font-mono text-base font-semibold text-[#F0E6E2]">
                    gryd menu
                  </span>
                  <span className="px-1.5 py-0.2 text-[10px] font-mono bg-[#141212] border border-[#302C2A] text-[#77716E] rounded">
                    v0.3.0
                  </span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded text-[#A9A19E] hover:text-[#F0E6E2] bg-[#141212] border border-[#302C2A]"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Options List */}
              <div className="p-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#77716E] px-3 py-1">
                  Navigation
                </div>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDocsClick();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    isDocsPage
                      ? 'bg-[#FF5A1F]/10 border border-[#FF5A1F]/40 text-[#FF5A1F] font-semibold'
                      : 'text-[#F0E6E2] hover:bg-[#191716] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#FF5A1F]" />
                    <span className="text-sm font-medium">Full Documentation</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141212] border border-[#302C2A] text-[#FF5A1F]">
                    25+ Articles
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('features')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716] flex items-center gap-3 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#77716E]" />
                  <span>Architecture &amp; Features</span>
                </button>

                <button
                  onClick={() => handleNavClick('lifecycle-engine')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716] flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-[#77716E]" />
                    <span>Lifecycle Engine</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse"></span>
                </button>

                <button
                  onClick={() => handleNavClick('config')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716] flex items-center gap-3 transition-colors"
                >
                  <Sliders className="w-4 h-4 text-[#77716E]" />
                  <span>gryd.yaml Configuration Spec</span>
                </button>

                <button
                  onClick={() => handleNavClick('cli')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716] flex items-center gap-3 transition-colors"
                >
                  <Layers className="w-4 h-4 text-[#77716E]" />
                  <span>CLI Commands &amp; Shortcuts</span>
                </button>

                <button
                  onClick={() => handleNavClick('downloads')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716] flex items-center gap-3 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#77716E]" />
                  <span>Downloads (macOS, Linux, Win)</span>
                </button>
              </div>

              {/* Quick Terminal Command Box */}
              <div className="px-4 py-2">
                <div className="p-3 bg-[#141212] border border-[#302C2A] rounded-lg">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#77716E] mb-1.5">
                    <span>QUICK BREW INSTALL</span>
                    <button
                      onClick={copyQuickInstall}
                      className="text-[#FF5A1F] hover:underline flex items-center gap-1"
                    >
                      {copiedQuick ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedQuick ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-xs text-[#F0E6E2]">
                    $ brew install gryd
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#302C2A] bg-[#191716] space-y-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (isDocsPage) {
                    onHomeClick();
                    setTimeout(() => {
                      document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  } else {
                    onDownloadClick();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FF5A1F] hover:bg-[#FF6B35] text-[#141212] font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
                <span>Download for Your OS</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-xs font-mono text-[#77716E]">
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#A9A19E] hover:text-[#F0E6E2] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>MIT License</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
