import { CodeBlock, AlertBox, ParamTable } from '../docsContent';

export const gettingStartedArticles = {
  'overview': {
    title: 'Overview & Philosophy',
    category: 'Getting Started',
    description: 'Understand the design motivation behind gryd, its architecture, and how it redefines local development.',
    render: () => (
      <div className="space-y-6">
        <p className="text-base text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">gryd</strong> is a developer-first command-line orchestrator and interactive terminal user interface (TUI) for local multi-service development environments.
        </p>

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Modern software development rarely involves a single monolithic process. A realistic cloud-native or modern web workspace typically consists of a high-performance backend API (FastAPI, Go, Axum, Rails), a frontend single-page application dev server (Vite, Next.js, Remix), asynchronous background task queues (Celery, Sidekiq, Temporal), Model Context Protocol (MCP) AI agents, and local persistence infrastructure (PostgreSQL, Redis, RabbitMQ, Ollama).
        </p>

        <h3 className="text-xl font-normal text-[#F0E6E2] pt-4">The Friction in Modern Local Development</h3>
        <ul className="list-disc list-inside space-y-2.5 text-sm text-[#A9A19E] leading-relaxed">
          <li>
            <strong className="text-[#F0E6E2]">Terminal Sprawl:</strong> Developers frequently maintain 5 to 8 open terminal windows or TMux split panes just to view logs, spot crashes, and restart dependent microservices.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">The Orphan Process Zombie Hazard (<code className="text-[#FF5A1F] font-mono">EADDRINUSE</code>):</strong> Pressing <kbd className="px-1.5 py-0.5 bg-[#171615] border border-[#302C2A] rounded text-xs font-mono text-[#F0E6E2]">Ctrl+C</kbd> in a Node, Python, or Ruby runner terminates the parent shell, but detached child subprocesses (bundlers, hot-reloaders, thread workers) continue running silently in the background, locking ports <code className="text-[#FF5A1F] font-mono">:8000</code>, <code className="text-[#FF5A1F] font-mono">:3000</code>, or <code className="text-[#FF5A1F] font-mono">:5432</code>.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Heavyweight Docker Compose Friction:</strong> Running all services in containers locally introduces severe filesystem translation overhead (e.g. VirtioFS / gRPC-FUSE lag on macOS), slows hot reloading from milliseconds to several seconds, and consumes 2.5 GB to 4 GB of RAM before writing a single line of code.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Inconsistent Developer Onboarding:</strong> New team members spend hours configuring environment variables, verifying port availability, and running disparate launch scripts across macOS, Linux, and Windows.
          </li>
        </ul>

        <h3 className="text-xl font-normal text-[#F0E6E2] pt-4">The gryd Architecture Solution</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd occupies the sweet spot between unmanaged terminal tabs and heavy virtualization:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">1. Bare-Metal Speed</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Your source code runs directly as native binaries on your host machine. No VM filesystem translation layer, giving you sub-80ms hot reload cycles.
            </p>
          </div>
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">2. Unix PGID Isolation</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Every service executes in a dedicated Unix process group (<code className="font-mono text-[11px]">setpgid</code>). Stopping a service broadcasts signals to the negative PGID, eliminating all zombie children.
            </p>
          </div>
          <div className="p-4 bg-[#171615] border border-[#302C2A] rounded-lg space-y-2">
            <div className="text-xs font-mono uppercase text-[#FF5A1F] font-bold">3. Hybrid Sidecars</div>
            <p className="text-xs text-[#A9A19E] leading-relaxed">
              Databases and queues run in isolated Docker or Podman sidecars. When application code reloads, sidecars stay alive, preserving active connections and database state.
            </p>
          </div>
        </div>

        <AlertBox type="tip" title="Self-Contained Single Static Binary">
          gryd is engineered in Go 1.21+ as a statically linked binary with zero external runtime dependencies. It boots up its orchestration runtime and IPC daemon in under 15ms.
        </AlertBox>
      </div>
    ),
  },

  'installation': {
    title: 'Installation Guide',
    category: 'Getting Started',
    description: 'Detailed platform-by-platform instructions for installing gryd on macOS, Linux, and Windows.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd provides verified distribution channels for all major operating systems and architectures.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">1. macOS &amp; Linux via Homebrew (Recommended)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Install the official formula from the <code className="text-[#F0E6E2] font-mono">Sidharth-Prabhu/tap</code> repository. Pre-built bottles are provided for macOS Apple Silicon (ARM64), macOS Intel (x86_64), and Linux (x86_64 &amp; aarch64):
        </p>
        <CodeBlock
          title="Homebrew Installation"
          language="bash"
          code={`brew install gryd`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">2. Linux Direct Shell Installer</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          On Linux workstations or CI environments where Homebrew is not installed, use the automated installer script:
        </p>
        <CodeBlock
          title="Automated Shell Installer"
          language="bash"
          code={`curl -fsSL https://raw.githubusercontent.com/Sidharth-Prabhu/homebrew-tap/main/install.sh | bash`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">3. Docker Multi-Arch Container Image</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          If you prefer containerized workflows, pull and run the official multi-architecture container from the GitHub Container Registry. Mount your host workspace into <code className="text-[#F0E6E2] font-mono">/workspace</code>:
        </p>
        <CodeBlock
          title="Docker Pull & Run"
          language="bash"
          code={`# Pull the image (amd64 / arm64)
docker pull ghcr.io/sidharth-prabhu/gryd:latest

# Run interactive TUI mounting local directory
docker run -it --rm \\
  -v "$(pwd)":/workspace \\
  -p 8000:8000 \\
  -p 3000:3000 \\
  ghcr.io/sidharth-prabhu/gryd:latest run`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">4. Windows (WinGet &amp; PowerShell)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          On Windows 10/11, install via Windows Package Manager or manual ZIP archive:
        </p>
        <CodeBlock
          title="Windows Installation"
          language="powershell"
          code={`# WinGet (Package catalog sync in progress)
winget install gryd

# Manual Install via GitHub Releases:
# 1. Download gryd_0.3.0_windows_amd64.zip from GitHub Releases
# 2. Extract gryd.exe to C:\\Program Files\\gryd\\ or C:\\Users\\<You>\\bin
# 3. Add directory to your User PATH environment variable`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">5. Build From Source (Go 1.21+)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          To compile directly from the latest GitHub commit:
        </p>
        <CodeBlock
          title="Compile from Source"
          language="bash"
          code={`git clone https://github.com/Sidharth-Prabhu/gryd.git
cd gryd
go mod download
go build -ldflags="-s -w -X main.version=0.3.0" -o /usr/local/bin/gryd .`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Verifying Your Installation</h3>
        <CodeBlock
          title="Version Check"
          language="bash"
          code={`$ gryd --version
gryd version 0.3.0 (darwin/arm64) built with go1.21.5`}
        />
      </div>
    ),
  },

  'quickstart': {
    title: 'Quick Start Tutorial',
    category: 'Getting Started',
    description: 'From an unconfigured repository to an orchestrated multi-service stack in 3 minutes.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This tutorial walks you through scaffolding, testing, and running an application stack with backend API, frontend SPA, and database dependencies.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Step 1: Automatic Stack Auto-Detection &amp; Scaffolding</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Navigate to your project root. gryd includes an intelligent heuristic scanner that examines package manifests (<code className="text-[#F0E6E2] font-mono">package.json</code>, <code className="text-[#F0E6E2] font-mono">pyproject.toml</code>, <code className="text-[#F0E6E2] font-mono">go.mod</code>, <code className="text-[#F0E6E2] font-mono">Cargo.toml</code>, <code className="text-[#F0E6E2] font-mono">docker-compose.yml</code>) across root and immediate subdirectories:
        </p>
        <CodeBlock
          title="Interactive Scaffolding"
          language="bash"
          code={`# Launch the interactive terminal setup wizard
gryd init --wizard

# Or scaffold a default configuration for your project name
gryd init my-fullstack-app`}
        />

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This generates a clean, well-commented <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> file ready for customization.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Step 2: Automated Pre-Flight Test (<code className="font-mono text-sm">gryd test</code>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Before opening terminal windows or editor debugging, run an automated pre-flight boot verification. gryd launches database sidecars, verifies TCP socket readiness, ensures no services crash, and safely terminates everything cleanly:
        </p>
        <CodeBlock
          title="Pre-Flight Test"
          language="bash"
          code={`$ gryd test
[gryd] Starting pre-flight verification for 'my-fullstack-app'...
[sidecars] Starting postgres:16-alpine on 127.0.0.1:5432... READY (210ms)
[service] Spawning backend -> uvicorn main:app --port 8000... READY (84ms)
[service] Spawning frontend -> npm run dev... READY (120ms)
[verify] All 3 target ports listening. Healthchecks PASSED.
[cleanup] Clean shutdown complete. Zero orphaned processes.
Exit Code: 0 (OK)`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Step 3: Launch the Full-Screen TUI Dashboard</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Start all services concurrently with live ANSI log multiplexing:
        </p>
        <CodeBlock
          title="Launch Orchestrator"
          language="bash"
          code={`gryd run`}
        />

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          You are now inside the Bubble Tea TUI. From here:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-[#A9A19E]">
          <li>Use <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">↑ / ↓</kbd> to switch between services or view the combined stream.</li>
          <li>Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">/</kbd> to search logs in real time using text or regular expressions.</li>
          <li>Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">c</kbd> to detach the session to the background, and re-attach anytime with <code className="text-[#F0E6E2] font-mono">gryd look</code>.</li>
        </ul>
      </div>
    ),
  },

  'architecture': {
    title: 'Core Architecture & Safety',
    category: 'Getting Started',
    description: 'Deep dive into process group isolation, kernel socket inspection, and IPC daemon mechanics.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">1. Unix Process Group Isolation (<code className="font-mono text-base">pgid</code>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When a standard shell command like <code className="font-mono text-xs">npm run dev</code> or <code className="font-mono text-xs">uvicorn --reload</code> executes, it launches child subprocesses (e.g. Node cluster workers, esbuild bundlers, Python reloaders). Standard signals (<code className="font-mono text-xs">SIGINT</code>) sent to the parent process do not reliably reach deeply nested child processes, causing them to detach and become orphaned background processes.
        </p>

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd solves this at the kernel level by assigning each service its own dedicated Unix Process Group (<code className="text-[#F0E6E2] font-mono">syscall.SysProcAttr&#123; Setpgid: true &#125;</code>).
        </p>

        <CodeBlock
          title="Internal Go Process Group Signal Dispatch (internal/runner/kill_unix.go)"
          language="go"
          code={`// Broadcast signal to negative PID, which signals the entire process group
func terminatePID(pid int) error {
    _ = syscall.Kill(-pid, syscall.SIGTERM) // Broadcast SIGTERM to entire process tree
    return syscall.Kill(pid, syscall.SIGTERM)
}

func killPID(pid int) error {
    _ = syscall.Kill(-pid, syscall.SIGKILL) // Broadcast SIGKILL if process fails to terminate
    return syscall.Kill(pid, syscall.SIGKILL)
}`}
        />

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          On Windows systems, gryd invokes the Win32 Process Tree Termination API via <code className="text-[#F0E6E2] font-mono">taskkill /F /T /PID &lt;pid&gt;</code>, ensuring parity across operating systems.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">2. Kernel Socket Inspection &amp; Port Auto-Purge</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Before launching any service configured with a <code className="text-[#F0E6E2] font-mono">port</code> attribute, gryd performs pre-flight socket inspection:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[#A9A19E]">
          <li>Performs a non-blocking TCP socket probe to verify if the port is currently listening on <code className="font-mono text-xs">127.0.0.1</code>.</li>
          <li>If the port is occupied, queries the operating system kernel socket table via <code className="font-mono text-xs">lsof -t -i :&lt;port&gt; -sTCP:LISTEN</code> to identify all listening PIDs.</li>
          <li>Sends a polite <code className="font-mono text-xs">SIGTERM</code> followed by <code className="font-mono text-xs">SIGKILL</code> to free the occupied socket before launching the configured service.</li>
          <li>Polls the socket until availability is confirmed, preventing race conditions.</li>
        </ol>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">3. Local Socket IPC Daemon (<code className="font-mono text-sm">~/.gryd/run/&lt;project&gt;.sock</code>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When gryd launches, it starts a lightweight local Unix domain socket IPC listener:
        </p>
        <ParamTable
          headers={['Action', 'Payload', 'Description']}
          rows={[
            ['restart', '{"service": "backend"}', 'Triggers in-place hot reload of a specific service.'],
            ['stop', '{"service": "worker"}', 'Gracefully terminates a single service without stopping the stack.'],
            ['exec', '{"service": "backend", "command": ["python", "seed.py"]}', 'Executes an ad-hoc command within the service working directory.'],
          ]}
        />
      </div>
    ),
  },
};
