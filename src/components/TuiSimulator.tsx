import React, { useState } from 'react';
import { 
  INITIAL_LOGS, 
  ServiceLog 
} from '../data/mockData';
import { 
  Search, 
  Filter, 
  Layers, 
  Bookmark, 
  Globe, 
  RefreshCw, 
  Terminal, 
  Check, 
  Copy,
  FolderTree
} from 'lucide-react';

export const TuiSimulator: React.FC = () => {
  const [logs, setLogs] = useState<ServiceLog[]>(INITIAL_LOGS);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO'>('ALL');
  const [jsonMode, setJsonMode] = useState<'compact' | 'pretty' | 'raw'>('compact');
  const [tunnelActive, setTunnelActive] = useState<boolean>(false);
  const [showProcessTree, setShowProcessTree] = useState<boolean>(false);
  const [copiedTunnel, setCopiedTunnel] = useState<boolean>(false);

  const tunnelUrl = 'https://gryd-8000-demo.trycloudflare.com';

  // Cycle level filter
  const cycleLevel = () => {
    const levels: ('ALL' | 'ERROR' | 'WARN' | 'INFO')[] = ['ALL', 'ERROR', 'WARN', 'INFO'];
    const nextIndex = (levels.indexOf(levelFilter) + 1) % levels.length;
    setLevelFilter(levels[nextIndex]);
  };

  // Cycle JSON mode
  const cycleJsonMode = () => {
    const modes: ('compact' | 'pretty' | 'raw')[] = ['compact', 'pretty', 'raw'];
    const nextIndex = (modes.indexOf(jsonMode) + 1) % modes.length;
    setJsonMode(modes[nextIndex]);
  };

  // Drop visual marker
  const dropMarker = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const markerLog: ServiceLog = {
      id: 'marker-' + Date.now(),
      time: timeStr,
      service: 'system',
      level: 'INFO',
      message: `──────── [MARKER] Inspection point set at ${timeStr} ────────`,
      isMarker: true,
    };
    setLogs(prev => [...prev, markerLog]);
  };

  // Simulate Hot Reload
  const triggerReload = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const reloadLog: ServiceLog = {
      id: 'reload-' + Date.now(),
      time: timeStr,
      service: 'system',
      level: 'INFO',
      message: '⚡ [HOT RELOAD] Detected changes in src/api/routes.py. Reloading services in-place...',
    };
    const readyLog: ServiceLog = {
      id: 'reload-ready-' + (Date.now() + 1),
      time: timeStr,
      service: 'backend',
      level: 'INFO',
      message: 'Application reloaded in 82ms. Sidecars postgres & redis retained untouched.',
    };
    setLogs(prev => [...prev, reloadLog, readyLog]);
  };

  // Add random activity
  const addSimulatedLog = () => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const sampleEndpoints = ['/api/v1/users', '/api/v1/auth/login', '/api/v1/query', '/metrics'];
    const ep = sampleEndpoints[Math.floor(Math.random() * sampleEndpoints.length)];
    const duration = (Math.random() * 12 + 0.4).toFixed(2);
    
    const newLog: ServiceLog = {
      id: 'sim-' + Date.now(),
      time: timeStr,
      service: 'backend',
      level: 'INFO',
      message: `GET ${ep} -> 200 OK (${duration}ms)`,
      jsonData: { method: 'GET', endpoint: ep, duration_ms: parseFloat(duration), status: 200 }
    };
    setLogs(prev => [...prev, newLog]);
  };

  // Filter logs
  const filteredLogs = logs.filter(log => {
    if (log.isMarker) return true;
    if (selectedService !== 'all' && log.service !== selectedService) return false;
    if (levelFilter !== 'ALL' && log.level !== levelFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const inMsg = log.message.toLowerCase().includes(q);
      const inService = log.service.toLowerCase().includes(q);
      const inLevel = log.level.toLowerCase().includes(q);
      const inJson = log.jsonData ? JSON.stringify(log.jsonData).toLowerCase().includes(q) : false;
      return inMsg || inService || inLevel || inJson;
    }
    return true;
  });

  return (
    <section id="tui-demo" className="py-20 border-b border-[#302C2A] bg-[#141212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive TUI Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#F0E6E2]">
              Live Terminal Dashboard Simulator
            </h2>
            <p className="text-sm text-[#A9A19E] mt-1 max-w-xl">
              gryd’s full-screen TUI powered by Bubble Tea &amp; Lip Gloss. Try the interactive keyboard shortcuts below.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-mono text-[#77716E]">STATUS:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#F0E6E2] bg-[#171615] border border-[#302C2A] rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ALL SERVICES HEALTHY
            </span>
          </div>
        </div>

        {/* TUI Container Frame */}
        <div className="bg-[#171615] border border-[#302C2A] rounded-lg overflow-hidden shadow-2xl">
          
          {/* Top Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#191716] border-b border-[#302C2A]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#302C2A] hover:bg-[#FF5A1F] transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#302C2A]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#302C2A]"></div>
              <span className="ml-3 font-mono text-xs text-[#A9A19E]">
                gryd run — project: <strong className="text-[#F0E6E2]">relationos</strong> (profile: full)
              </span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs font-mono text-[#77716E]">
              <span className="hidden sm:inline">PID: 48209</span>
              <span>IPC: ~/.gryd/relationos.sock</span>
            </div>
          </div>

          {/* Interactive Keyboard Shortcuts Action Ribbon */}
          <div className="px-4 py-2 bg-[#141212] border-b border-[#302C2A] flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                isSearchActive || searchQuery
                  ? 'bg-[#FF5A1F] text-[#141212] border-[#FF5A1F] font-semibold'
                  : 'bg-[#171615] text-[#A9A19E] border-[#302C2A] hover:text-[#F0E6E2]'
              }`}
              title="Shortcut: /"
            >
              <Search className="w-3 h-3" />
              <span>/ Search</span>
            </button>

            <button
              onClick={cycleLevel}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                levelFilter !== 'ALL'
                  ? 'bg-[#FF5A1F]/20 text-[#FF5A1F] border-[#FF5A1F]'
                  : 'bg-[#171615] text-[#A9A19E] border-[#302C2A] hover:text-[#F0E6E2]'
              }`}
              title="Shortcut: l"
            >
              <Filter className="w-3 h-3" />
              <span>l Level: <strong className="text-[#F0E6E2]">{levelFilter}</strong></span>
            </button>

            <button
              onClick={cycleJsonMode}
              className="px-2.5 py-1 bg-[#171615] text-[#A9A19E] hover:text-[#F0E6E2] border border-[#302C2A] rounded transition-colors flex items-center gap-1.5"
              title="Shortcut: J"
            >
              <Layers className="w-3 h-3" />
              <span>J JSON: <strong className="text-[#F0E6E2]">{jsonMode}</strong></span>
            </button>

            <button
              onClick={dropMarker}
              className="px-2.5 py-1 bg-[#171615] text-[#A9A19E] hover:text-[#F0E6E2] border border-[#302C2A] rounded transition-colors flex items-center gap-1.5"
              title="Shortcut: m"
            >
              <Bookmark className="w-3 h-3 text-[#FF5A1F]" />
              <span>m Drop Marker</span>
            </button>

            <button
              onClick={() => setTunnelActive(!tunnelActive)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                tunnelActive
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-[#171615] text-[#A9A19E] border-[#302C2A] hover:text-[#F0E6E2]'
              }`}
              title="Shortcut: t"
            >
              <Globe className="w-3 h-3" />
              <span>t Tunnel: {tunnelActive ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setShowProcessTree(!showProcessTree)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                showProcessTree
                  ? 'bg-[#FF5A1F]/20 text-[#FF5A1F] border-[#FF5A1F]'
                  : 'bg-[#171615] text-[#A9A19E] border-[#302C2A] hover:text-[#F0E6E2]'
              }`}
              title="Shortcut: i or p"
            >
              <FolderTree className="w-3 h-3" />
              <span>i Inspect Tree</span>
            </button>

            <button
              onClick={triggerReload}
              className="px-2.5 py-1 bg-[#171615] text-[#A9A19E] hover:text-[#F0E6E2] border border-[#302C2A] rounded transition-colors flex items-center gap-1.5"
              title="Shortcut: r"
            >
              <RefreshCw className="w-3 h-3 text-[#FF5A1F]" />
              <span>r Hot Reload</span>
            </button>

            <button
              onClick={addSimulatedLog}
              className="ml-auto px-2 py-1 bg-[#171615] hover:bg-[#191716] text-[#A9A19E] hover:text-[#F0E6E2] border border-[#302C2A] rounded transition-colors text-[11px]"
            >
              + Trigger Traffic
            </button>
          </div>

          {/* Search Bar Input (When activated) */}
          {isSearchActive && (
            <div className="px-4 py-2 bg-[#191716] border-b border-[#302C2A] flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <input
                type="text"
                placeholder="Regex search logs (/stripe, 400, health, error)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-[#F0E6E2] placeholder-[#77716E] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#77716E] hover:text-[#F0E6E2] font-mono"
                >
                  Clear (Esc)
                </button>
              )}
            </div>
          )}

          {/* Public Tunnel Banner (When toggled) */}
          {tunnelActive && (
            <div className="px-4 py-2 bg-[#141212] border-b border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-emerald-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Cloudflare Tunnel:</span>
                <a
                  href={tunnelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-emerald-300 font-semibold"
                >
                  {tunnelUrl}
                </a>
                <span className="text-xs text-[#77716E]">→ :8000 (backend)</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(tunnelUrl);
                  setCopiedTunnel(true);
                  setTimeout(() => setCopiedTunnel(false), 2000);
                }}
                className="px-2 py-0.5 border border-emerald-800 rounded bg-emerald-950/60 hover:bg-emerald-900 flex items-center gap-1"
              >
                {copiedTunnel ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTunnel ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          )}

          {/* Main Grid: Sidebar + Terminal Logs */}
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[420px] bg-[#141212]">
            
            {/* Left Sidebar: Services & Telemetry */}
            <div className="p-3 border-b md:border-b-0 md:border-r border-[#302C2A] bg-[#171615] space-y-4">
              
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#77716E] px-2 mb-2">
                  Active Services
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedService('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors ${
                      selectedService === 'all'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716]'
                    }`}
                  >
                    <span>All Services</span>
                    <span className="text-[10px] text-[#77716E]">{logs.length}</span>
                  </button>

                  <button
                    onClick={() => setSelectedService('backend')}
                    className={`w-full text-left px-2.5 py-2 rounded text-xs font-mono transition-colors ${
                      selectedService === 'backend'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#F0E6E2]">backend</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">:8000</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[#77716E]">
                      <span>CPU 1.4%</span>
                      <span>·</span>
                      <span>RSS 48MB</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedService('frontend')}
                    className={`w-full text-left px-2.5 py-2 rounded text-xs font-mono transition-colors ${
                      selectedService === 'frontend'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#F0E6E2]">frontend</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">:3000</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[#77716E]">
                      <span>CPU 0.6%</span>
                      <span>·</span>
                      <span>RSS 56MB</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedService('worker')}
                    className={`w-full text-left px-2.5 py-2 rounded text-xs font-mono transition-colors ${
                      selectedService === 'worker'
                        ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                        : 'text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#191716]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#F0E6E2]">worker</span>
                      <span className="text-[10px] text-cyan-400">queue</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[#77716E]">
                      <span>CPU 0.2%</span>
                      <span>·</span>
                      <span>RSS 32MB</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sidecars */}
              <div className="pt-2 border-t border-[#302C2A]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#77716E] px-2 mb-2">
                  Container Sidecars
                </div>
                <div className="space-y-1.5 text-xs font-mono px-2">
                  <div className="flex items-center justify-between text-[#A9A19E]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>postgres:16</span>
                    </div>
                    <span className="text-[10px] text-[#77716E]">:5432</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A9A19E]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>redis:7</span>
                    </div>
                    <span className="text-[10px] text-[#77716E]">:6379</span>
                  </div>
                </div>
              </div>

              {/* Memory Telemetry Summary */}
              <div className="pt-2 border-t border-[#302C2A] px-2 text-[11px] font-mono text-[#77716E] space-y-1">
                <div className="flex justify-between">
                  <span>Total RSS:</span>
                  <span className="text-[#F0E6E2]">136 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Aggregate CPU:</span>
                  <span className="text-[#F0E6E2]">2.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Process Group:</span>
                  <span className="text-[#FF5A1F]">pgid 48209</span>
                </div>
              </div>

            </div>

            {/* Right Pane: Logs Stream OR Process Tree */}
            <div className="md:col-span-3 p-4 flex flex-col justify-between overflow-y-auto max-h-[460px]">
              
              {showProcessTree ? (
                /* Process Tree Inspector View */
                <div className="font-mono text-xs text-[#A9A19E] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#302C2A]">
                    <span className="text-[#F0E6E2] font-semibold">Active Process Tree &amp; Port Bindings</span>
                    <button
                      onClick={() => setShowProcessTree(false)}
                      className="text-xs text-[#FF5A1F] hover:underline"
                    >
                      Close (Esc)
                    </button>
                  </div>
                  <pre className="bg-[#171615] p-3 rounded border border-[#302C2A] text-xs text-[#F0E6E2] overflow-x-auto leading-relaxed">
{`gryd (PID 48209, pgid 48209)
├── uvicorn (PID 48210) — :8000 [LISTEN]
│   └── python worker 1 (PID 48214) — 8 threads, 42 fds
├── vite (PID 48211) — :3000 [LISTEN]
│   └── esbuild / rollup (PID 48216) — 4 threads
├── python queue_consumer.py (PID 48212) — 2 threads
└── docker sidecars (bridge)
    ├── postgres:16-alpine — 127.0.0.1:5432 [LISTEN]
    └── redis:7-alpine — 127.0.0.1:6379 [LISTEN]`}
                  </pre>
                  <p className="text-[11px] text-[#77716E]">
                    Notice: Killing gryd sends SIGTERM then SIGKILL to pgid 48209, safely cascading down every child PID so no node/python orphan remains bound to :8000 or :3000.
                  </p>
                </div>
              ) : (
                /* Terminal Logs View */
                <div className="space-y-1.5 font-mono text-xs">
                  {filteredLogs.length === 0 ? (
                    <div className="py-12 text-center text-[#77716E]">
                      No log entries match the current filter criteria.
                    </div>
                  ) : (
                    filteredLogs.map(log => {
                      if (log.isMarker) {
                        return (
                          <div
                            key={log.id}
                            className="py-1 text-[#FF5A1F] font-bold text-center border-y border-[#FF5A1F]/30 bg-[#FF5A1F]/10 select-none tracking-wide text-[11px]"
                          >
                            {log.message}
                          </div>
                        );
                      }

                      // Badge styling by level
                      const levelColors = {
                        INFO: 'text-[#A9A19E]',
                        WARN: 'text-amber-400 bg-amber-950/40 border border-amber-800/60',
                        ERROR: 'text-rose-400 bg-rose-950/40 border border-rose-800/60 font-semibold',
                        DEBUG: 'text-blue-400',
                      };

                      const serviceColors = {
                        backend: 'text-[#FF5A1F]',
                        frontend: 'text-emerald-400',
                        worker: 'text-cyan-400',
                        system: 'text-[#77716E]',
                      };

                      return (
                        <div
                          key={log.id}
                          className="flex items-start gap-2.5 py-0.5 hover:bg-[#171615] px-1 rounded transition-colors group"
                        >
                          <span className="text-[#77716E] select-none text-[11px] shrink-0">
                            {log.time}
                          </span>
                          
                          <span className={`px-1.5 py-0 text-[10px] rounded font-bold uppercase shrink-0 ${levelColors[log.level]}`}>
                            {log.level}
                          </span>

                          <span className={`text-[11px] font-semibold shrink-0 w-16 ${serviceColors[log.service]}`}>
                            [{log.service}]
                          </span>

                          <div className="text-[#F0E6E2] break-all flex-1">
                            {log.message}
                            
                            {/* Structured JSON display if available and mode is pretty */}
                            {log.jsonData && jsonMode === 'pretty' && (
                              <pre className="mt-1 p-2 bg-[#171615] border border-[#302C2A] text-[10px] text-[#A9A19E] rounded overflow-x-auto">
                                {JSON.stringify(log.jsonData, null, 2)}
                              </pre>
                            )}

                            {log.jsonData && jsonMode === 'compact' && (
                              <span className="ml-2 text-[10px] text-[#77716E]">
                                {JSON.stringify(log.jsonData)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Bottom status line */}
              <div className="mt-4 pt-3 border-t border-[#302C2A] flex items-center justify-between text-[11px] font-mono text-[#77716E]">
                <div>
                  Showing {filteredLogs.length} lines · Level: <span className="text-[#F0E6E2]">{levelFilter}</span> · JSON: <span className="text-[#F0E6E2]">{jsonMode}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Press <code className="text-[#F0E6E2]">c</code> to detach</span>
                  <span><code className="text-[#F0E6E2]">q</code> to exit safely</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
