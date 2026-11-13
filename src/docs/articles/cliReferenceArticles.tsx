import { CodeBlock, AlertBox } from '../docsContent';

export const cliReferenceArticles = {
  'cli-core': {
    title: 'Core Lifecycle Commands',
    category: 'CLI Reference',
    description: 'Commands for starting, attaching, stopping, and reloading local development sessions.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]"><code className="font-mono text-base">gryd run [project]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The main entrypoint. Parses <code className="text-[#F0E6E2] font-mono">gryd.yaml</code>, resolves dependencies, cleans ports, launches containers, and opens the full-screen Bubble Tea TUI dashboard.
        </p>
        <CodeBlock
          title="gryd run Examples"
          language="bash"
          code={`# Standard run in interactive TUI mode
gryd run

# Run a specific environment profile
gryd run --profile api-only

# Run detached in background daemon mode
gryd run -d

# Run using a custom configuration file
gryd run -c ./deploy/local.yaml`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono text-base">gryd look [project]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Attaches an interactive TUI dashboard to an already-running background session without restarting or disrupting active services.
        </p>
        <CodeBlock
          title="gryd look"
          language="bash"
          code={`gryd look
gryd look relationos-platform`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono text-base">gryd stop [project]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Gracefully terminates all child processes in the Unix process group, releases allocated TCP ports, and shuts down container sidecars:
        </p>
        <CodeBlock
          title="gryd stop"
          language="bash"
          code={`gryd stop
gryd stop --all`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono text-base">gryd reload [project]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Sends an in-place reload signal to running services via the local IPC daemon. Database and cache sidecars remain alive, eliminating connection teardown overhead.
        </p>
        <CodeBlock
          title="gryd reload"
          language="bash"
          code={`gryd reload`}
        />
      </div>
    ),
  },

  'cli-logs-status': {
    title: 'Inspection & Monitoring',
    category: 'CLI Reference',
    description: 'Inspect execution statuses, audit ports, and follow multiplexed log streams.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]"><code className="font-mono text-base">gryd logs [service]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Inspect, filter, follow, and export logs from secondary terminal windows or scripts:
        </p>
        <CodeBlock
          title="gryd logs Reference"
          language="bash"
          code={`# Combined logs of all services
gryd logs

# Filter logs for a specific service
gryd logs backend

# Live stream / follow logs (equivalent to tail -f)
gryd logs backend -f

# Show last N lines
gryd logs backend -n 200

# Export logs to a local file
gryd logs backend -n 1000 -o debug-session.log`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono text-base">gryd status [project]</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Displays real-time execution telemetry, including PID numbers, RSS memory consumption, assigned ports, and container health:
        </p>
        <CodeBlock
          title="gryd status Output"
          language="bash"
          code={`$ gryd status
PROJECT: relationos-platform (Running since 14:22:01, 1h 24m)
CONFIG:  /Users/dev/relationos/gryd.yaml
LOGS:    ~/.gryd/logs/relationos-platform.log

SERVICE     STATUS      PID     PORT     MEMORY      THREADS   UPTIME
backend     ● Running   48210   :8000    48.2 MB     8         1h 24m
frontend    ● Running   48211   :3000    56.1 MB     4         1h 24m
worker      ● Running   48214   -        32.0 MB     2         1h 24m

SIDECARS (Docker)
postgres    ● Healthy   5432:5432        Up 1h 24m (healthy)
redis       ● Healthy   6379:6379        Up 1h 24m`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono text-base">gryd ports</code></h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Audits network ports across your system and flags active listeners and zombie processes:
        </p>
        <CodeBlock
          title="gryd ports"
          language="bash"
          code={`$ gryd ports
PORT    STATUS      PID     PROCESS              MANAGED BY
:3000   LISTENING   48211   node (vite)          gryd (frontend)
:8000   LISTENING   48210   python3 (uvicorn)    gryd (backend)
:5432   LISTENING   41002   docker-proxy         gryd (postgres)
:6379   LISTENING   41005   docker-proxy         gryd (redis)`}
        />
      </div>
    ),
  },

  'cli-testing': {
    title: 'Pre-Flight Testing (gryd test)',
    category: 'CLI Reference',
    description: 'Deterministic integration boot verification designed for CI/CD pipelines and local pre-commit checks.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <code className="text-[#F0E6E2] font-mono">gryd test</code> performs automated integration boot validation. It guarantees that a pull request does not introduce startup panics, configuration syntax regressions, or port deadlocks.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Execution Pipeline</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[#A9A19E]">
          <li>Parses <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> and builds dependency DAG.</li>
          <li>Spawns container sidecars and waits for TCP readiness.</li>
          <li>Launches all services concurrently with a configurable timeout (default 20 seconds).</li>
          <li>Verifies that all services reach healthy listening states and do not exit prematurely.</li>
          <li>Broadcasts termination signals to all process groups, frees ports, and cleans up containers.</li>
          <li>Returns exit code <code className="text-emerald-400 font-mono">0</code> on success, or non-zero on failure.</li>
        </ol>

        <CodeBlock
          title="CI/CD Integration"
          language="bash"
          code={`# Standard pre-flight test
gryd test

# Test with custom timeout (e.g. 45 seconds for heavy builds)
gryd test --timeout 45s

# Output structured JSON for automated test parsers
gryd test --json`}
        />

        <CodeBlock
          title="Machine-Readable JSON Output"
          language="json"
          code={`{
  "project": "relationos-platform",
  "success": true,
  "duration_ms": 1420,
  "services": [
    { "name": "backend", "port": 8000, "ready": true, "duration_ms": 184 },
    { "name": "frontend", "port": 3000, "ready": true, "duration_ms": 320 }
  ],
  "dependencies": [
    { "name": "postgres", "ready": true, "duration_ms": 410 },
    { "name": "redis", "ready": true, "duration_ms": 120 }
  ]
}`}
        />
      </div>
    ),
  },

  'cli-tunnel': {
    title: 'Public Tunneling (gryd tunnel)',
    category: 'CLI Reference',
    description: 'Expose local services to instant, encrypted public HTTPS URLs for testing webhooks and mobile clients.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <code className="text-[#F0E6E2] font-mono">gryd tunnel</code> instantly creates an encrypted HTTPS ingress tunnel directly to any local service port without needing external tunnel configurations.
        </p>

        <CodeBlock
          title="gryd tunnel Command"
          language="bash"
          code={`# Expose backend service port
gryd tunnel backend

# Output:
# [tunnel] Established Cloudflare Quick Tunnel:
# [tunnel] Public URL: https://damp-valley-829.trycloudflare.com -> http://127.0.0.1:8000
# [tunnel] Live traffic streaming active...`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Supported Providers &amp; Fallbacks</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd automatically detects installed tunneling providers on your machine:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E]">
          <li><strong className="text-[#F0E6E2]">Cloudflare Quick Tunnels (Default):</strong> Zero-auth ephemeral tunnels via Cloudflare Edge (<code className="font-mono text-xs">*.trycloudflare.com</code>).</li>
          <li><strong className="text-[#F0E6E2]">ngrok:</strong> Supports custom subdomains and ngrok auth tokens.</li>
          <li><strong className="text-[#F0E6E2]">Localtunnel:</strong> Node-based fallback tunnel provider.</li>
        </ul>

        <AlertBox type="tip" title="TUI Shortcut">
          Inside the running TUI dashboard, simply press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">t</kbd> to toggle the public tunnel for the currently selected service.
        </AlertBox>
      </div>
    ),
  },

  'cli-service-ipc': {
    title: 'Remote Socket IPC (gryd service)',
    category: 'CLI Reference',
    description: 'Control individual running services and execute ad-hoc commands through the Unix socket daemon.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When gryd runs, it listens on a Unix domain socket at <code className="text-[#F0E6E2] font-mono">~/.gryd/run/&lt;project&gt;.sock</code>. The <code className="text-[#F0E6E2] font-mono">gryd service</code> subcommands allow you to send commands to this daemon from external terminals or IDE hotkeys:
        </p>

        <CodeBlock
          title="gryd service Commands"
          language="bash"
          code={`# Restart only the backend service
gryd service restart backend

# Stop a single background worker
gryd service stop worker

# Execute an ad-hoc command within the service working directory & environment
gryd service exec backend -- alembic upgrade head`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">IPC Protocol Format</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The IPC protocol uses simple JSON messages over the local socket:
        </p>
        <CodeBlock
          title="Sample IPC JSON Request"
          language="json"
          code={`{
  "action": "restart",
  "service": "backend",
  "command": []
}`}
        />
      </div>
    ),
  },

  'cli-version-control': {
    title: 'Version Control (gryd vc)',
    category: 'CLI Reference',
    description: 'Integrated interactive Git management dashboard inside your terminal.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd embeds a native interactive Git branch and staging manager built using Lip Gloss:
        </p>

        <CodeBlock
          title="gryd vc Usage"
          language="bash"
          code={`# Open full-screen interactive Git dashboard
gryd vc

# Commit and push all staged and modified files with one command
gryd vc push -m "feat(api): add subscription checkout route"

# Safely merge another branch into your current checkout
gryd vc merge feature/login`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Interactive Conflict Resolution</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          If switching branches causes conflicts due to uncommitted working directory modifications, <code className="text-[#F0E6E2] font-mono">gryd vc</code> prompts you with an interactive selection dialog:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-[#A9A19E]">
          <li><strong className="text-[#F0E6E2]">Auto-Stash &amp; Switch:</strong> Automatically runs <code className="font-mono text-xs">git stash</code>, checks out the target branch, and reapplies the stash.</li>
          <li><strong className="text-[#F0E6E2]">Discard Changes:</strong> Discards uncommitted modifications and forces checkout.</li>
          <li><strong className="text-[#F0E6E2]">Cancel:</strong> Aborts checkout cleanly with zero state mutation.</li>
        </ul>
      </div>
    ),
  },

  'cli-maintenance': {
    title: 'Updates & Maintenance',
    category: 'CLI Reference',
    description: 'Background auto-update checker and self-updating binary mechanism.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd features an automated GitHub release checker that queries the GitHub Releases API every 6 hours and caches results in <code className="text-[#F0E6E2] font-mono">~/.gryd/version_check.json</code>.
        </p>

        <CodeBlock
          title="gryd update Command"
          language="bash"
          code={`# Check and self-update gryd binary in-place
$ gryd update
Checking for updates...
Current version: v0.3.0
Latest version:  v0.3.1 (Published 2 hours ago)
Downloading https://github.com/Sidharth-Prabhu/gryd/releases/download/v0.3.1/gryd_0.3.1_darwin_arm64.tar.gz...
Extracting and replacing binary at /usr/local/bin/gryd...
Successfully updated gryd to v0.3.1!`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Homebrew Update Path</h3>
        <p className="text-sm text-[#A9A19E]">
          If you originally installed gryd through Homebrew, upgrade via standard brew commands:
        </p>
        <CodeBlock
          title="Homebrew Upgrade"
          language="bash"
          code={`brew update && brew upgrade gryd`}
        />
      </div>
    ),
  },
};
