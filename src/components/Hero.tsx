import React, { useState } from 'react';
import { Copy, Check, Terminal, ArrowRight, ShieldCheck, Cpu, Zap, Radio } from 'lucide-react';
import { GrydLogo } from './GrydLogo';

interface HeroProps {
  onExploreClick: () => void;
  onDownloadClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDownloadClick }) => {
  const [activeTab, setActiveTab] = useState<'macos-linux' | 'windows'>('macos-linux');
  const [copied, setCopied] = useState(false);

  const commands = {
    'macos-linux': 'brew install gryd',
    'windows': 'winget install gryd',
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-14 pb-20 border-b border-[#302C2A] bg-tech-grid">
      {/* Decorative vertical guide lines */}
      <div className="hidden lg:block absolute left-8 top-0 bottom-0 technical-line-v opacity-40"></div>
      <div className="hidden lg:block absolute right-8 top-0 bottom-0 technical-line-v opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Brand Mark (frameless and prominent) */}
          <div className="flex items-center justify-center pt-2 pb-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 text-[#F0E6E2] hover:text-[#FF5A1F] transition-colors group cursor-default">
              <GrydLogo className="w-full h-full" />
            </div>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F0E6E2] leading-[1.12]">
            Local multi-service development,{' '}
            <span className="text-[#A9A19E] block sm:inline">orchestrated without chaos.</span>
          </h1>

          {/* Subhead / Lead Paragraph */}
          <p className="text-base sm:text-lg text-[#A9A19E] max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate terminal tab sprawl, orphan port listeners (<code className="text-[#F0E6E2] font-mono text-sm">EADDRINUSE</code>), and heavyweight container overhead. 
            Configure, launch, monitor, live-search, and hot-reload your full stack in a single interactive TUI.
          </p>

          {/* Quick Install Interactive Terminal Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="bg-[#171615] border border-[#302C2A] rounded-md overflow-hidden text-left shadow-2xl">
              {/* Tab Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#302C2A] bg-[#191716]">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveTab('macos-linux')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                      activeTab === 'macos-linux'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#77716E] hover:text-[#A9A19E]'
                    }`}
                  >
                    macOS &amp; Linux
                  </button>
                  <button
                    onClick={() => setActiveTab('windows')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors flex items-center gap-1.5 ${
                      activeTab === 'windows'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#77716E] hover:text-[#A9A19E]'
                    }`}
                  >
                    <span>Windows</span>
                    <span className="text-[10px] bg-[#302C2A] text-[#FF5A1F] px-1 py-0.2 rounded font-sans">
                      Coming Soon
                    </span>
                  </button>
                </div>
                <div className="flex items-center space-x-1.5 text-[#77716E]">
                  <span className="text-[11px] font-mono">Quick Install</span>
                </div>
              </div>

              {/* Command row */}
              <div className="p-3.5 flex items-center justify-between gap-4 bg-[#141212]">
                <div className="flex items-center gap-3 overflow-x-auto font-mono text-sm text-[#F0E6E2]">
                  <span className="text-[#FF5A1F] select-none font-bold">$</span>
                  <span className="tracking-wide">{commands[activeTab]}</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#A9A19E] hover:text-[#F0E6E2] bg-[#171615] hover:bg-[#191716] border border-[#302C2A] rounded transition-all shrink-0"
                  title="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sub-hint */}
              <div className="px-3.5 py-2 border-t border-[#302C2A]/60 bg-[#171615] text-[11px] font-mono text-[#77716E] flex items-center justify-between">
                {activeTab === 'macos-linux' ? (
                  <span>Official Tap: Sidharth-Prabhu/tap · Brew Bottle formula</span>
                ) : (
                  <span>WinGet package manifest SidharthPrabhu.Gryd pending catalog sync</span>
                )}
                <a href="#downloads" className="text-[#A9A19E] hover:text-[#FF5A1F] transition-colors">
                  Manual .tar.gz / .zip →
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-mono">
            <button
              onClick={onDownloadClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF5A1F] hover:bg-[#FF6B35] text-[#141212] font-semibold rounded transition-all shadow-sm"
            >
              <span>Download for Your OS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#171615] hover:bg-[#191716] border border-[#302C2A] hover:border-[#423D3A] text-[#F0E6E2] rounded transition-all"
            >
              <Terminal className="w-4 h-4 text-[#FF5A1F]" />
              <span>Try Interactive TUI</span>
            </button>
          </div>

          {/* Technical Architecture Strip */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 bg-[#171615] border border-[#302C2A] rounded">
              <div className="flex items-center gap-2 text-[#FF5A1F] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-mono text-xs font-medium text-[#F0E6E2]">Unix pgid Isolation</span>
              </div>
              <p className="text-xs text-[#77716E]">
                Process groups guarantee child trees die when stopped. No dangling ports.
              </p>
            </div>

            <div className="p-3 bg-[#171615] border border-[#302C2A] rounded">
              <div className="flex items-center gap-2 text-[#FF5A1F] mb-1">
                <Cpu className="w-4 h-4" />
                <span className="font-mono text-xs font-medium text-[#F0E6E2]">Lip Gloss / Bubble Tea</span>
              </div>
              <p className="text-xs text-[#77716E]">
                High-performance terminal rendering engine with Catppuccin color accents.
              </p>
            </div>

            <div className="p-3 bg-[#171615] border border-[#302C2A] rounded">
              <div className="flex items-center gap-2 text-[#FF5A1F] mb-1">
                <Radio className="w-4 h-4" />
                <span className="font-mono text-xs font-medium text-[#F0E6E2]">Instant Tunneling</span>
              </div>
              <p className="text-xs text-[#77716E]">
                Expose any local service port to a public HTTPS URL with key <code className="text-[#F0E6E2]">t</code>.
              </p>
            </div>

            <div className="p-3 bg-[#171615] border border-[#302C2A] rounded">
              <div className="flex items-center gap-2 text-[#FF5A1F] mb-1">
                <Zap className="w-4 h-4" />
                <span className="font-mono text-xs font-medium text-[#F0E6E2]">Zero Runtime Deps</span>
              </div>
              <p className="text-xs text-[#77716E]">
                Single compiled Go binary. Sub-15ms boot overhead. Pure local control.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
