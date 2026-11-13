import { CodeBlock, ParamTable } from '../docsContent';

export const tuiManualArticles = {
  'tui-overview': {
    title: 'Dashboard Navigation & Badges',
    category: 'TUI Manual',
    description: 'Deep dive into the Bubble Tea multi-pane layout, service badges, and telemetry stream.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The gryd terminal user interface is built on the Elm architecture using <strong className="text-[#F0E6E2]">Bubble Tea</strong> and styled with <strong className="text-[#F0E6E2]">Lip Gloss</strong>. It adapts dynamically to terminal resizing and supports high-density ANSI color multiplexing.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Screen Layout Anatomy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">1. Header Bar</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Displays project name pill, total uptime counter, active log level filter indicator, and active search queries.
            </p>
          </div>
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">2. Service Sidebar</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Interactive service list. Shows assigned TCP ports, live status badges (<code className="text-emerald-400">● Running</code>, <code className="text-rose-400">✖ Failed</code>), and containerized sidecars.
            </p>
          </div>
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">3. Main Viewport</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Virtual scrolling log viewport with 10,000-line buffer per service, real-time color highlighting, and auto-scrolling to newest output.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Service Status Indicators</h3>
        <ParamTable
          headers={['Badge', 'State', 'Meaning']}
          rows={[
            [<span className="text-emerald-400 font-mono">● :8000</span>, 'Running & Listening', 'Service process is alive and actively accepting TCP connections on port 8000.'],
            [<span className="text-emerald-400 font-mono">● Running</span>, 'Running (No Port)', 'Worker or queue consumer process is actively executing with no HTTP port.'],
            [<span className="text-rose-400 font-mono">✖ Failed</span>, 'Crashed', 'Process terminated with non-zero exit code. Exit status and stderr are highlighted.'],
            [<span className="text-[#77716E] font-mono">○ Waiting</span>, 'Dependency Wait', 'Service is waiting for its prerequisite dependencies to complete boot.'],
          ]}
        />
      </div>
    ),
  },

  'tui-search-filters': {
    title: 'Live Search & Log Filtering',
    category: 'TUI Manual',
    description: 'Instant regex searching, highlight matching, and log level cycle filtering.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">1. Real-Time Search &amp; Regex (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">/</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Pressing <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">/</kbd> opens an input bar at the bottom of the screen. As you type, gryd matches both plain text and full regular expressions against the active log stream.
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E] leading-relaxed">
          <li>Matches are highlighted in bold gold across the entire viewport.</li>
          <li>The header displays total matches found (e.g. <code className="text-[#F0E6E2] font-mono">[14 matches]</code>).</li>
          <li>Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">Enter</kbd> to lock in the search query and scroll freely through matching lines.</li>
          <li>Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">Esc</kbd> to cancel search mode and clear highlights.</li>
        </ul>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">2. Log Level Cycle Filtering (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">l</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When dealing with high-throughput services emitting hundreds of log lines per second, isolate issues instantly with the level filter:
        </p>

        <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg font-mono text-sm space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[#77716E]">Cycle:</span>
            <span className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#F0E6E2]">ALL</span>
            <span className="text-[#77716E]">&rarr;</span>
            <span className="px-2 py-0.5 bg-rose-950/60 border border-rose-800 rounded text-rose-300 font-bold">ERROR</span>
            <span className="text-[#77716E]">&rarr;</span>
            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-800 rounded text-amber-300 font-bold">WARN</span>
            <span className="text-[#77716E]">&rarr;</span>
            <span className="px-2 py-0.5 bg-blue-950/60 border border-blue-800 rounded text-blue-300 font-bold">INFO</span>
          </div>
          <p className="text-xs text-[#A9A19E] font-sans">
            Filtered views automatically suppress lower-priority debug lines, displaying only lines matching or exceeding the chosen severity threshold.
          </p>
        </div>
      </div>
    ),
  },

  'tui-json-markers': {
    title: 'Structured JSON & Visual Markers',
    category: 'TUI Manual',
    description: 'Parse structured JSON log payloads and inject timestamp markers into your trace.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">1. Structured JSON Format Modes (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">J</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Modern application loggers (such as Go Zap, Python structlog, or Node Pino) emit JSON strings. Reading unformatted JSON in a terminal can be exhausting. Pressing <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">J</kbd> cycles between 3 viewing modes:
        </p>

        <ParamTable
          headers={['Mode', 'Visual Representation', 'Best Used For']}
          rows={[
            ['compact (Default)', '14:22:01 [backend] INFO /api/checkout 200 OK (duration=12ms user_id=98)', 'Everyday monitoring. Cleans JSON payloads into readable single-line summaries.'],
            ['pretty', '14:22:01 [backend] {\n  "level": "info",\n  "route": "/api/checkout",\n  "status": 200\n}', 'Deep debugging of complex nested JSON payloads and error stack traces.'],
            ['raw', '{"timestamp":"2026-11-14T02:00:00Z","level":"info","msg":"ok"}', 'Unfiltered inspection of raw binary stdout streams.'],
          ]}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">2. Visual Timestamp Markers (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">m</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When testing complex flows (like submitting a checkout form or receiving a webhook), it is easy to lose track of where previous logs ended.
        </p>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Pressing <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">m</kbd> injects a high-contrast divider into the live log viewport:
        </p>
        <CodeBlock
          title="Marker Divider in Live Log Stream"
          language="text"
          code={`14:22:05 [frontend] GET /assets/index.js 200 OK (4ms)
14:22:08 [backend]  POST /auth/token 200 OK (18ms)
──────────────────────── [ Marker: 14:22:15 ] ────────────────────────
14:22:16 [backend]  Incoming webhook from stripe: evt_3N9q8s
14:22:16 [worker]   Processing async credit fulfillment...`}
        />
      </div>
    ),
  },

  'tui-tree-telemetry': {
    title: 'Process Tree & Resource Telemetry',
    category: 'TUI Manual',
    description: 'Inspect live CPU, memory, child PIDs, threads, and open file descriptors.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Pressing <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">i</kbd> or <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">p</kbd> in the TUI toggles the interactive Process Tree and Resource Telemetry Inspector.
        </p>

        <CodeBlock
          title="Telemetry Viewport"
          language="text"
          code={`PROCESS HIERARCHY & TELEMETRY INSPECTOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PID    PGID   SERVICE     CPU%    RAM (RSS)   THREADS   FDS   STATE
48209  48209  [gryd]      0.2%    14.2 MB     12        18    RUNNING
 ├─ 48210  48210  backend     1.4%    48.2 MB     8         34    LISTEN :8000
 │   └─ 48214 48210 python-worker 0.8% 32.0 MB  4         12    ACTIVE
 ├─ 48211  48211  frontend    0.6%    56.1 MB     6         48    LISTEN :3000
 │   └─ 48216 48211 esbuild-bundler 0.0% 18.0 MB 4        8     IDLE
 └─ SIDECARS (Docker Bridge)
     ├─ postgres:16-alpine        0.3%    82.4 MB     -     -     LISTEN :5432
     └─ redis:7-alpine            0.1%    12.1 MB     -     -     LISTEN :6379

TOTAL MEMORY RSS: 262.9 MB  ·  TOTAL CORES: 8  ·  FD LEAKS: 0 DETECTED`}
        />

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This inspector allows you to quickly detect memory leaks in worker processes or runaway CPU threads without opening external tools like Activity Monitor or <code className="font-mono text-xs">htop</code>.
        </p>
      </div>
    ),
  },

  'tui-hotkeys': {
    title: 'Keyboard Shortcuts Cheat Sheet',
    category: 'TUI Manual',
    description: 'Complete reference of single-key shortcuts supported by gryd run.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Every capability inside the gryd TUI can be operated via single-key commands:
        </p>

        <ParamTable
          headers={['Key', 'Action', 'Description']}
          rows={[
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">↑ / ↓</kbd>, 'Navigate Services', 'Switch active viewport between specific services and combined log stream.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">/</kbd>, 'Live Search', 'Open live search bar. Supports plain text and regex. Enter locks, Esc cancels.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">l</kbd>, 'Level Filter', 'Cycle log severity filters: ALL → ERROR → WARN → INFO → ALL.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">J</kbd>, 'JSON Mode', 'Toggle structured JSON formatting: compact → pretty → raw.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">m</kbd>, 'Visual Marker', 'Inject a high-visibility timestamp divider line into the active log stream.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">t</kbd>, 'Tunnel Toggle', 'Establish or terminate public Cloudflare HTTPS ingress tunnel.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">i / p</kbd>, 'Process Tree', 'Toggle process tree hierarchy, CPU%, RSS memory, and open file descriptors.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">r</kbd>, 'In-Place Reload', 'Gracefully reload running application services without restarting database sidecars.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">R</kbd>, 'Hard Restart', 'Hard-kill all processes, purge ports, and boot entire project fresh.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">c</kbd>, 'Detach to Background', 'Detach TUI safely. Services keep running in background. Re-attach via gryd look.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">q / Ctrl+C</kbd>, 'Graceful Exit', 'Safely terminate all child process groups, clean ports, and exit.'],
          ]}
        />
      </div>
    ),
  },
};
