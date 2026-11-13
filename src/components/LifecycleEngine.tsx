import React, { useState } from 'react';
import { Terminal, Zap } from 'lucide-react';

interface Stage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  terminalOutput: string[];
  metrics: { label: string; value: string; status: 'good' | 'accent' | 'neutral' }[];
  technicalDetails: { label: string; value: string }[];
}

const STAGES: Stage[] = [
  {
    id: 'preflight',
    step: '01',
    title: 'Pre-Flight & Port Clearance',
    subtitle: 'Zero EADDRINUSE Conflicts',
    badge: 'PORT INTEGRITY',
    description: 'Before a single process launches, gryd audits all target ports (:8000, :3000, :5432). If a zombie worker from an earlier crash is occupying a port, gryd purges it automatically and brings up database sidecars in dependency order.',
    terminalOutput: [
      '[preflight] Auditing host network ports for conflicts...',
      '[preflight] Detected stale PID 41289 occupying port :8000 (uvicorn zombie)',
      '[preflight] Sent SIGKILL to PID 41289 -> Port :8000 freed successfully',
      '[sidecars] Starting postgres:16-alpine on 127.0.0.1:5432...',
      '[sidecars] Starting redis:7-alpine on 127.0.0.1:6379...',
      '[healthcheck] Polling TCP :5432 and :6379 -> HEALTHY in 18ms',
      '[ready] All prerequisite dependencies satisfied. Proceeding to boot.'
    ],
    metrics: [
      { label: 'Port Conflicts Auto-Purged', value: '1 detected & freed', status: 'accent' },
      { label: 'Sidecar Health Latency', value: '18ms', status: 'good' },
      { label: 'Orphan Risk', value: '0%', status: 'good' }
    ],
    technicalDetails: [
      { label: 'Port Resolution', value: 'Kernel socket table inspection (lsof / netstat)' },
      { label: 'Startup Order', value: 'Strict topological dependency sort (depends_on)' },
      { label: 'Verification', value: 'TCP handshake polling before downstream boot' }
    ]
  },
  {
    id: 'isolation',
    step: '02',
    title: 'Process Group Isolation',
    subtitle: 'Unix pgid & Windows Tree Safety',
    badge: 'PROCESS SAFETY',
    description: 'Traditional task runners only track the top-level shell, letting child subprocesses (Node workers, Python reloaders, esbuild) detach and run invisibly. gryd executes every service in an isolated Unix process group (setpgid), guaranteeing complete termination on stop.',
    terminalOutput: [
      '[runner] Spawning backend -> api/uvicorn main:app (PID 48210, pgid 48210)',
      '[runner] Subprocess worker spawned -> PID 48214 (pgid 48210, 8 threads)',
      '[runner] Spawning frontend -> web/npm run dev (PID 48211, pgid 48211)',
      '[runner] Subprocess bundler -> esbuild (PID 48216, pgid 48211, 4 threads)',
      '[telemetry] Live RSS: backend 48MB, frontend 56MB, worker 32MB',
      '[pgid-guard] Process trees indexed. Signal trapping active for SIGINT/SIGTERM.'
    ],
    metrics: [
      { label: 'Process Group Mode', value: 'setpgid (-pgid)', status: 'accent' },
      { label: 'Child PID Coverage', value: '100% Tree Traversal', status: 'good' },
      { label: 'Memory Footprint', value: '136 MB RSS (Total)', status: 'good' }
    ],
    technicalDetails: [
      { label: 'Termination Mechanism', value: 'SIGTERM -> 3s grace -> SIGKILL to -pgid' },
      { label: 'Windows Engine', value: 'taskkill /F /T /PID <pid> recursive tree' },
      { label: 'Runtime Overhead', value: '< 2MB RAM for daemon orchestrator' }
    ]
  },
  {
    id: 'hotreload',
    step: '03',
    title: 'Intelligent Hot Reloading',
    subtitle: 'Debounced fsnotify without Container Restarts',
    badge: 'ZERO STATE LOSS',
    description: 'With Docker Compose, code modifications frequently trigger heavyweight container rebuilds. gryd’s native fsnotify watcher batches filesystem events with 300ms debouncing, reloading only your code while preserving database connections and Redis cache state.',
    terminalOutput: [
      '[watcher] Watching src/**, config/** for service [backend] (300ms debounce)',
      '[watcher] File modified: src/api/routes/billing.py (Write event)',
      '[watcher] Debounce window elapsed: 1 change batched',
      '[reload] Gracefully cycling backend workers (PID 48210 -> 48312)...',
      '[sidecars] postgres:16 and redis:7 retained intact (0 downtime)',
      '[reload] Backend reloaded in 79ms. Database connection pool preserved.'
    ],
    metrics: [
      { label: 'Reload Latency', value: '~79ms', status: 'accent' },
      { label: 'Sidecar Rebuild Time', value: '0ms (Retained)', status: 'good' },
      { label: 'Event Debounce', value: '300ms window', status: 'neutral' }
    ],
    technicalDetails: [
      { label: 'Watcher Engine', value: 'Native fsnotify (cross-platform kernel epoll/kqueue)' },
      { label: 'State Preservation', value: 'Database TCP sockets kept warm during restart' },
      { label: 'Granularity', value: 'Per-service isolated triggers; frontend unaffected' }
    ]
  },
  {
    id: 'tunneling',
    step: '04',
    title: 'Edge Tunneling & Socket IPC',
    subtitle: 'Public HTTPS & Detached Daemon Control',
    badge: 'EXTERNAL ACCESS',
    description: 'Instantly expose local ports to Cloudflare Quick Tunnels, ngrok, or localtunnel without installing separate CLI tools. Run gryd detached in the background and control services from external terminals or scripts via Unix Domain Sockets.',
    terminalOutput: [
      '[tunnel] Initializing Cloudflare Quick Tunnel for service [backend] (:8000)...',
      '[tunnel] Edge tunnel established -> https://gryd-backend-7f8a.trycloudflare.com',
      '[tunnel] TLS 1.3 encrypted · Public webhook testing enabled',
      '[ipc] Unix Domain Socket active at ~/.gryd/fullstack-app.sock',
      '[ipc] External command received: gryd service restart worker',
      '[ipc] Service [worker] restarted cleanly via daemon IPC (12ms).'
    ],
    metrics: [
      { label: 'Tunnel Encryption', value: 'TLS 1.3 (Cloudflare)', status: 'accent' },
      { label: 'Tunnel Setup Time', value: '1.2s', status: 'good' },
      { label: 'IPC Latency', value: '< 1ms (Unix Socket)', status: 'good' }
    ],
    technicalDetails: [
      { label: 'Tunnel Providers', value: 'Cloudflare Quick Tunnels, ngrok, localtunnel' },
      { label: 'Daemon IPC', value: 'Unix socket (POSIX) / Named Pipes (Windows)' },
      { label: 'Remote Control', value: 'gryd service restart, stop, exec from any tab' }
    ]
  }
];

export const LifecycleEngine: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('preflight');

  const activeStage = STAGES.find(s => s.id === activeStageId) || STAGES[0];

  return (
    <section id="lifecycle-engine" className="py-24 border-b border-[#302C2A] bg-[#141212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Under the Hood · Orchestration Mechanics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
              How gryd orchestrates your local stack.
            </h2>
            <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
              Explore the four-stage lifecycle engine that prevents port collisions, guarantees clean process termination, and enables sub-80ms reloads.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#77716E]">
            <span>ENGINE STATUS:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              DETERMINISTIC LIFECYCLE
            </span>
          </div>
        </div>

        {/* 4 Interactive Stage Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 font-mono">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-4 rounded-lg text-left transition-all border ${
                  isActive
                    ? 'bg-[#171615] border-[#FF5A1F] text-[#F0E6E2] shadow-lg'
                    : 'bg-[#141212] border-[#302C2A] hover:border-[#423D3A] text-[#A9A19E] hover:text-[#F0E6E2]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isActive ? 'text-[#FF5A1F]' : 'text-[#77716E]'}`}>
                    STAGE {stage.step}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                    isActive 
                      ? 'bg-[#FF5A1F]/10 border-[#FF5A1F]/40 text-[#FF5A1F]' 
                      : 'bg-[#171615] border-[#302C2A] text-[#77716E]'
                  }`}>
                    {stage.badge}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#F0E6E2] truncate">
                  {stage.title}
                </div>
                <div className="text-xs text-[#77716E] truncate mt-0.5 font-sans">
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Frame */}
        <div className="bg-[#171615] border border-[#302C2A] rounded-lg overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#191716] border-b border-[#302C2A] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FF5A1F] font-bold">
                  STAGE {activeStage.step}:
                </span>
                <h3 className="text-lg font-normal text-[#F0E6E2]">
                  {activeStage.title}
                </h3>
              </div>
              <p className="text-xs text-[#77716E] font-sans mt-0.5">
                {activeStage.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#77716E]">Active Engine Mode:</span>
              <span className="px-2.5 py-1 rounded bg-[#141212] border border-[#302C2A] text-[#F0E6E2]">
                {activeStage.badge}
              </span>
            </div>
          </div>

          {/* Grid Layout: Description & Specs + Interactive Terminal Log Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#302C2A]">
            
            {/* Left Column (5 Cols): Explanations & Key Metrics */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <p className="text-sm text-[#A9A19E] leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Performance Metrics */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono text-[#77716E] uppercase tracking-wider">
                    Execution Telemetry
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeStage.metrics.map((m, i) => (
                      <div 
                        key={i} 
                        className="p-2.5 bg-[#141212] border border-[#302C2A] rounded flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-[#A9A19E]">{m.label}:</span>
                        <span className={`font-semibold ${
                          m.status === 'accent' 
                            ? 'text-[#FF5A1F]' 
                            : m.status === 'good' 
                            ? 'text-emerald-400' 
                            : 'text-[#F0E6E2]'
                        }`}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-[#77716E] uppercase tracking-wider mb-2">
                    Technical Specifications
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {activeStage.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#302C2A]/40 text-[11px]">
                        <span className="text-[#77716E]">{detail.label}</span>
                        <span className="text-[#F0E6E2] font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#302C2A] flex items-center justify-between text-xs font-mono text-[#77716E]">
                <span>Deterministic Execution</span>
                <span className="text-[#FF5A1F]">0 Lingering Ports</span>
              </div>

            </div>

            {/* Right Column (7 Cols): Real-Time Terminal Trace Stream */}
            <div className="lg:col-span-7 p-6 bg-[#141212] flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#302C2A] text-xs font-mono text-[#77716E]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>LIFECYCLE EXECUTION TRACE</span>
                  </div>
                  <span>SESSION: #48209</span>
                </div>

                {/* Terminal Log Lines */}
                <div className="space-y-2 font-mono text-xs">
                  {activeStage.terminalOutput.map((line, idx) => {
                    const isError = line.includes('ERR') || line.includes('stale') || line.includes('conflict');
                    const isSuccess = line.includes('HEALTHY') || line.includes('freed') || line.includes('preserved') || line.includes('established');
                    const isAccent = line.includes('PID') || line.includes('pgid') || line.includes('uvicorn') || line.includes('Cloudflare');

                    return (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-1.5 rounded hover:bg-[#171615] transition-colors"
                      >
                        <span className="text-[#77716E] select-none text-[11px] shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`break-all ${
                          isError 
                            ? 'text-amber-400 font-medium' 
                            : isSuccess 
                            ? 'text-emerald-400' 
                            : isAccent 
                            ? 'text-[#F0E6E2]' 
                            : 'text-[#A9A19E]'
                        }`}>
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Console Status Bar */}
              <div className="mt-6 pt-4 border-t border-[#302C2A] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#77716E]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[#F0E6E2]">Stage verified</span>
                </div>
                <div>
                  Next: Switch tabs above or run <code className="text-[#FF5A1F]">gryd run</code>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Comparative Architecture Matrix: gryd vs The Alternatives */}
        <div className="mt-16 bg-[#171615] border border-[#302C2A] rounded-lg p-6 lg:p-8">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-normal text-[#F0E6E2]">
              Why developers choose gryd over Docker Compose &amp; TMux
            </h3>
            <p className="text-xs sm:text-sm text-[#A9A19E] mt-1.5 leading-relaxed font-sans">
              Compare resource consumption, process guarantees, and developer ergonomics across standard tooling.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#141212] border-b border-[#302C2A] text-[#77716E]">
                <tr>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Feature / Metric</th>
                  <th className="py-3 px-4 text-[#FF5A1F] font-bold text-[11px]">gryd</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px]">Docker Compose</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px]">5+ Terminal Tabs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#302C2A] text-[#F0E6E2]">
                <tr className="hover:bg-[#191716]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#F0E6E2]">Memory RSS Overhead</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 150 MB (Host Native)</td>
                  <td className="py-3 px-4 text-[#A9A19E]">2.5 GB – 4.0 GB (VM/Containers)</td>
                  <td className="py-3 px-4 text-[#A9A19E]">~300 MB + Shell overhead</td>
                </tr>
                <tr className="hover:bg-[#191716]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#F0E6E2]">Hot Reload Latency</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">~80ms (In-place)</td>
                  <td className="py-3 px-4 text-rose-400">2s – 8s (Volume lag / Rebuild)</td>
                  <td className="py-3 px-4 text-[#A9A19E]">Fast (Requires nodemon/air)</td>
                </tr>
                <tr className="hover:bg-[#191716]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#F0E6E2]">Orphan Port Safety (EADDRINUSE)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Guaranteed (pgid Auto-Kill)</td>
                  <td className="py-3 px-4 text-amber-400">Container only; host unmanaged</td>
                  <td className="py-3 px-4 text-rose-400">Frequent (Ctrl+C leaves zombies)</td>
                </tr>
                <tr className="hover:bg-[#191716]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#F0E6E2]">Integrated Public Tunneling</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Built-in (Cloudflare / ngrok)</td>
                  <td className="py-3 px-4 text-[#77716E]">Manual external container</td>
                  <td className="py-3 px-4 text-[#77716E]">Requires separate CLI session</td>
                </tr>
                <tr className="hover:bg-[#191716]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#F0E6E2]">Pre-Flight CI Boot Verification</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Yes (gryd test --json)</td>
                  <td className="py-3 px-4 text-[#77716E]">Slow container healthchecks</td>
                  <td className="py-3 px-4 text-[#77716E]">None (Manual bash scripts)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
