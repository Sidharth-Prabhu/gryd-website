import React from 'react';
import { 
  ShieldCheck, 
  Radio, 
  RefreshCw, 
  Server, 
  Activity, 
  GitBranch,
  Search,
  Zap
} from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 border-b border-[#302C2A] bg-[#141212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Industrial Minimalism · Technical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
            Architected for reliability, speed, and zero orphaned ports.
          </h2>
          <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
            Every feature in gryd is purpose-built to solve the real friction points of running distributed microservices, APIs, and sidecars on local machines.
          </p>
        </div>

        {/* Structured Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Process Group Isolation (Large 8-col) */}
          <div className="lg:col-span-8 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">01 / SAFETY</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Unix Process Group Isolation (<code className="font-mono text-sm">pgid</code>) & Port Cleanup
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-6">
                Most task runners only kill the top-level shell script, leaving child processes (Node sub-workers, Python uvicorn reloaders, Go binaries) running invisibly and locking your ports. 
                gryd assigns each service its own Unix process group (<code className="text-[#F0E6E2]">pgid</code>) and uses Windows taskkill tree termination. When gryd stops, <strong>everything stops</strong>.
              </p>
            </div>

            {/* Visual technical illustration */}
            <div className="bg-[#141212] border border-[#302C2A] rounded p-4 font-mono text-xs text-[#A9A19E]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#302C2A] text-[11px] text-[#77716E]">
                <span>ORPHAN PROTECTION AUDIT</span>
                <span className="text-emerald-400">PASSED: 0 LINGERING PORTS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="bg-[#171615] p-2 rounded border border-[#302C2A]">
                  <div className="text-[#77716E]">SIGTERM Broadcast</div>
                  <div className="text-[#F0E6E2] font-semibold mt-0.5">Graceful drain</div>
                </div>
                <div className="bg-[#171615] p-2 rounded border border-[#302C2A]">
                  <div className="text-[#77716E]">Port Auto-Purge</div>
                  <div className="text-[#FF5A1F] font-semibold mt-0.5">Auto-free on conflict</div>
                </div>
                <div className="bg-[#171615] p-2 rounded border border-[#302C2A]">
                  <div className="text-[#77716E]">Zombie Detection</div>
                  <div className="text-[#F0E6E2] font-semibold mt-0.5">Child tree wiped</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Instant Public Tunneling (4-col) */}
          <div className="lg:col-span-4 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <Radio className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">02 / NETWORKING</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Instant Public Tunneling
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-6">
                Expose any local service port to an encrypted public HTTPS URL in seconds with key <code className="text-[#F0E6E2]">t</code> or <code className="text-[#F0E6E2]">gryd tunnel</code>. Powered by Cloudflare Quick Tunnels, ngrok, or localtunnel without extra binaries.
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs">
              <div className="text-[11px] text-[#77716E] mb-1">$ gryd tunnel backend</div>
              <div className="text-emerald-400 truncate">https://api-tunnel-94a2.trycloudflare.com</div>
              <div className="text-[10px] text-[#77716E] mt-1">Webhook ready · TLS 1.3</div>
            </div>
          </div>

          {/* Card 3: In-TUI Log Searching & Regex (4-col) */}
          <div className="lg:col-span-4 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <Search className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">03 / OBSERVABILITY</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Regex Search &amp; Markers
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-6">
                Press <code className="text-[#F0E6E2]">/</code> to filter thousands of logs with regex or substrings in real time. Drop visual timestamp divider lines (<code className="text-[#F0E6E2]">m</code>) to instantly isolate what logs fired after clicking a button.
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs space-y-1">
              <div className="text-[11px] text-[#FF5A1F]">/stripe|webhook|40[0-9]</div>
              <div className="text-[10px] text-[#A9A19E]">Matches 4 entries across 3 services</div>
            </div>
          </div>

          {/* Card 4: Hot Reload vs Hard Restart (4-col) */}
          <div className="lg:col-span-4 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <RefreshCw className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">04 / WATCHER</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Hot Reload (<code className="font-mono text-sm">r</code>) vs. Hard Restart (<code className="font-mono text-sm">R</code>)
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-6">
                Built-in file watcher with 300ms debouncing. Graceful reload (<code className="text-[#F0E6E2]">r</code>) updates your code without tearing down database sidecars. Hard restart (<code className="text-[#F0E6E2]">R</code>) wipes state and boots fresh.
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs">
              <div className="flex justify-between text-[11px] text-[#77716E]">
                <span>Sidecar Retention:</span>
                <span className="text-emerald-400">Postgres + Redis Intact</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#77716E] mt-1">
                <span>Reload Latency:</span>
                <span className="text-[#F0E6E2]">~80ms</span>
              </div>
            </div>
          </div>

          {/* Card 5: Pre-Flight Boot Verification (4-col) */}
          <div className="lg:col-span-4 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <Activity className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">05 / VERIFICATION</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Pre-Flight Boot CI Tests
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-6">
                Run <code className="text-[#F0E6E2]">gryd test</code> in your CI/CD pipeline or before git push. It boots your stack, validates health checks and port bindings, shuts down cleanly, and returns standard exit codes or JSON (<code className="text-[#F0E6E2]">--json</code>).
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs">
              <div className="text-[11px] text-emerald-400">✓ All 3 services boot &amp; bind cleanly</div>
              <div className="text-[10px] text-[#77716E] mt-1">CI Execution Time: 1.4s · Exit: 0</div>
            </div>
          </div>

          {/* Card 6: Remote Unix Socket IPC Daemon (6-col) */}
          <div className="lg:col-span-6 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <Server className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">06 / IPC DAEMON</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Detached Daemon &amp; Unix Socket IPC
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-4">
                Run gryd in detached mode (<code className="text-[#F0E6E2]">gryd run -d</code>) and control services from other terminal tabs via the lightweight IPC socket. Re-attach the full interactive TUI anytime with <code className="text-[#F0E6E2]">gryd look</code>.
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs space-y-1">
              <div className="text-[#77716E]">$ gryd service restart backend</div>
              <div className="text-emerald-400">Restarted 'backend' (PID 48210 → 48390)</div>
              <div className="text-[#77716E] mt-1">$ gryd service exec backend -- uv run pytest</div>
            </div>
          </div>

          {/* Card 7: Git Version Control Manager (6-col) */}
          <div className="lg:col-span-6 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg p-7 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded bg-[#191716] border border-[#302C2A] text-[#FF5A1F]">
                  <GitBranch className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs text-[#77716E]">07 / VERSION CONTROL</span>
              </div>
              <h3 className="text-xl font-normal text-[#F0E6E2] mb-2 group-hover:text-[#FF5A1F] transition-colors">
                Integrated Git Workflow (<code className="font-mono text-sm">gryd vc</code>)
              </h3>
              <p className="text-sm text-[#A9A19E] leading-relaxed mb-4">
                Switch branches with live fuzzy search, stage changes, commit, resolve conflicts, and push to remotes without leaving your dev environment or switching windows.
              </p>
            </div>

            <div className="bg-[#141212] border border-[#302C2A] rounded p-3 font-mono text-xs space-y-1">
              <div className="text-[#77716E]">$ gryd vc push -m "feat: new payment flow"</div>
              <div className="text-[#F0E6E2]">Staged 4 files · Committed 7f8a91b · Pushed to origin/main</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
