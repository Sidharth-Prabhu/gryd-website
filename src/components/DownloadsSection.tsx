import React, { useState } from 'react';
import { 
  ArrowDownToLine, 
  Terminal, 
  Copy, 
  Check, 
  Apple, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  RefreshCw,
  GitFork,
  Box
} from 'lucide-react';

export const DownloadsSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="downloads" className="py-24 border-b border-[#302C2A] bg-[#141212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>Official Releases &amp; Package Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
            Install gryd on macOS, Linux, Windows, or Docker.
          </h2>
          <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
            Choose your preferred installation method: package managers with automatic updates, multi-arch container images, standalone pre-built binaries, or build directly from source.
          </p>
        </div>

        {/* 4 Main Download Cards (macOS, Linux, Docker, Windows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* macOS Card */}
          <div className="bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-6 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-[#191716] border border-[#302C2A] flex items-center justify-center text-[#F0E6E2]">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-[#F0E6E2]">macOS</h3>
                    <p className="text-[11px] font-mono text-[#77716E]">Apple Silicon &amp; Intel</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/30 rounded">
                  Homebrew
                </span>
              </div>

              <p className="text-xs text-[#A9A19E] mb-4">
                Install via official tap with automatic formula updates:
              </p>

              {/* Code Box */}
              <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#A9A19E] select-none text-[11px]"># Add tap &amp; install</span>
                  <button
                    onClick={() => copyText('mac-brew', 'brew tap Sidharth-Prabhu/tap\nbrew install gryd')}
                    className="text-[#77716E] hover:text-[#F0E6E2] text-[11px] flex items-center gap-1"
                  >
                    {copiedKey === 'mac-brew' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'mac-brew' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[#F0E6E2] font-medium leading-relaxed">
                  <div>brew tap Sidharth-Prabhu/tap</div>
                  <div className="text-[#FF5A1F]">brew install gryd</div>
                </div>
              </div>

              {/* Direct Binary links */}
              <div className="space-y-1.5 pt-2 border-t border-[#302C2A]/60">
                <div className="text-[11px] font-mono text-[#77716E] mb-1">Pre-built Binaries (.tar.gz):</div>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Apple Silicon (arm64)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Intel 64-bit (amd64)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#302C2A] text-[11px] font-mono text-[#77716E]">
              Requires macOS 12+ · Native pgid
            </div>
          </div>

          {/* Linux Card */}
          <div className="bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-6 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-[#191716] border border-[#302C2A] flex items-center justify-center text-[#F0E6E2]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-[#F0E6E2]">Linux</h3>
                    <p className="text-[11px] font-mono text-[#77716E]">AMD64 &amp; ARM64</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#191716] text-[#A9A19E] border border-[#302C2A] rounded">
                  POSIX
                </span>
              </div>

              <p className="text-xs text-[#A9A19E] mb-4">
                Install via Linuxbrew or download native static binaries:
              </p>

              {/* Code Box */}
              <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#A9A19E] select-none text-[11px]"># Homebrew on Linux</span>
                  <button
                    onClick={() => copyText('linux-brew', 'brew install gryd')}
                    className="text-[#77716E] hover:text-[#F0E6E2] text-[11px] flex items-center gap-1"
                  >
                    {copiedKey === 'linux-brew' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'linux-brew' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[#F0E6E2] font-medium leading-relaxed">
                  <div className="text-[#FF5A1F]">brew install gryd</div>
                </div>
              </div>

              {/* Direct Binary links */}
              <div className="space-y-1.5 pt-2 border-t border-[#302C2A]/60">
                <div className="text-[11px] font-mono text-[#77716E] mb-1">Pre-built Binaries (.tar.gz):</div>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Linux 64-bit (amd64)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Linux ARM64 (aarch64)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#302C2A] text-[11px] font-mono text-[#77716E]">
              Ubuntu, Debian, Fedora, Arch, Alpine
            </div>
          </div>

          {/* Docker Container Card (NEW) */}
          <div className="bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-6 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-[#191716] border border-[#302C2A] flex items-center justify-center text-[#F0E6E2]">
                    <Box className="w-5 h-5 text-[#FF5A1F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-[#F0E6E2]">Docker</h3>
                    <p className="text-[11px] font-mono text-[#77716E]">Multi-Arch Image</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/30 rounded">
                  GHCR
                </span>
              </div>

              <p className="text-xs text-[#A9A19E] mb-4">
                Run without host install via GitHub Container Registry:
              </p>

              {/* Code Box */}
              <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#A9A19E] select-none text-[11px]"># Pull &amp; run TUI</span>
                  <button
                    onClick={() => copyText('docker-run', 'docker pull ghcr.io/sidharth-prabhu/gryd:latest\n\ndocker run -it --rm \\\n  -v "$(pwd)":/workspace \\\n  -p 8000:8000 \\\n  -p 3000:3000 \\\n  ghcr.io/sidharth-prabhu/gryd:latest run')}
                    className="text-[#77716E] hover:text-[#F0E6E2] text-[11px] flex items-center gap-1"
                  >
                    {copiedKey === 'docker-run' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'docker-run' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[#F0E6E2] font-medium leading-relaxed text-[11px]">
                  <div className="text-[#77716E]"># Pull image:</div>
                  <div className="text-[#FF5A1F] truncate">docker pull ghcr.io/sidharth-prabhu/gryd:latest</div>
                  <div className="text-[#77716E] mt-1"># Mount workspace &amp; run:</div>
                  <div className="text-[#F0E6E2]">docker run -it --rm -v "$(pwd)":/workspace ... run</div>
                </div>
              </div>

              {/* Direct links */}
              <div className="space-y-1.5 pt-2 border-t border-[#302C2A]/60">
                <div className="text-[11px] font-mono text-[#77716E] mb-1">Supported Container Runtimes:</div>
                <div className="flex items-center justify-between text-xs font-mono text-[#A9A19E] py-0.5">
                  <span>Docker &amp; Podman</span>
                  <span className="text-emerald-400">Ready</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#A9A19E] py-0.5">
                  <span>linux/amd64 &amp; linux/arm64</span>
                  <span className="text-emerald-400">Multi-Arch</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#302C2A] text-[11px] font-mono text-[#77716E]">
              Zero host contamination · Workspace mounted
            </div>
          </div>

          {/* Windows Card */}
          <div className="bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-6 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-[#191716] border border-[#302C2A] flex items-center justify-center text-[#F0E6E2]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-[#F0E6E2]">Windows</h3>
                    <p className="text-[11px] font-mono text-[#77716E]">AMD64 &amp; ARM64</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/30 rounded">
                  Coming Soon
                </span>
              </div>

              <p className="text-xs text-[#A9A19E] mb-4">
                Install via Windows Package Manager (WinGet):
              </p>

              {/* Code Box */}
              <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#A9A19E] select-none text-[11px]"># PowerShell (WinGet)</span>
                  <button
                    onClick={() => copyText('win-winget', 'winget install gryd')}
                    className="text-[#77716E] hover:text-[#F0E6E2] text-[11px] flex items-center gap-1"
                  >
                    {copiedKey === 'win-winget' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'win-winget' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[#F0E6E2] font-medium leading-relaxed">
                  <div className="text-[#FF5A1F]">winget install gryd</div>
                  <div className="text-[#77716E] text-[11px]"># Or: winget install SidharthPrabhu.Gryd</div>
                </div>
              </div>

              {/* Direct Binary links */}
              <div className="space-y-1.5 pt-2 border-t border-[#302C2A]/60">
                <div className="text-[11px] font-mono text-[#77716E] mb-1">Pre-built Binaries (.zip with gryd.exe):</div>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Windows 64-bit (.zip)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A9A19E] hover:text-[#FF5A1F] py-1 transition-colors"
                >
                  <span>Windows ARM64 (.zip)</span>
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#302C2A] text-[11px] font-mono text-[#77716E]">
              Uses Windows taskkill process tree
            </div>
          </div>

        </div>

        {/* Secondary Download Options: From Source & Verification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Build From Source */}
          <div className="p-6 bg-[#171615] border border-[#302C2A] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <GitFork className="w-4 h-4 text-[#FF5A1F]" />
              <h3 className="text-base font-normal text-[#F0E6E2]">Build From Source (Go 1.21+)</h3>
            </div>
            <p className="text-xs text-[#A9A19E] mb-4 leading-relaxed">
              For developers who prefer compiling from source or running the absolute latest commit:
            </p>
            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs text-[#F0E6E2] space-y-1">
              <div>git clone https://github.com/Sidharth-Prabhu/gryd.git</div>
              <div>cd gryd</div>
              <div className="text-[#FF5A1F]">go build -o /usr/local/bin/gryd .</div>
            </div>
          </div>

          {/* Verification & Self-Update */}
          <div className="p-6 bg-[#171615] border border-[#302C2A] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 text-[#FF5A1F]" />
              <h3 className="text-base font-normal text-[#F0E6E2]">Automatic Upgrades &amp; Verification</h3>
            </div>
            <p className="text-xs text-[#A9A19E] mb-4 leading-relaxed">
              gryd checks GitHub releases silently and notifies you when updates land. Upgrade with one command:
            </p>
            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs text-[#F0E6E2] space-y-1">
              <div className="text-[#77716E]"># Verify installation:</div>
              <div>gryd --version</div>
              <div className="text-[#77716E] mt-1"># Upgrade to newest release:</div>
              <div className="text-[#FF5A1F]">gryd update</div>
            </div>
          </div>

        </div>

        {/* GitHub Releases External Banner */}
        <div className="mt-8 p-4 bg-[#171615] border border-[#302C2A] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[#A9A19E]">
              All release binaries are signed and published with SHA256 checksums in GitHub Releases.
            </span>
          </div>
          <a
            href="https://github.com/Sidharth-Prabhu/gryd/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FF5A1F] hover:text-[#FF6B35] font-semibold transition-colors"
          >
            <span>View Release Manifests &amp; Checksums</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
