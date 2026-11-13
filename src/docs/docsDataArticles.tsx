import React from 'react';
import { CodeBlock, AlertBox, ParamTable } from './docsContent';

export const DOC_ARTICLES: Record<string, {
  title: string;
  category: string;
  description: string;
  render: () => React.ReactNode;
}> = {
  // 1. Getting Started
  'overview': {
    title: 'Overview & Philosophy',
    category: 'Getting Started',
    description: 'Understand the design motivation behind gryd and how it redefines local development.',
    render: () => (
      <div className="space-y-6">
        <p className="text-base text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">gryd</strong> is a developer-first command-line orchestrator and interactive terminal user interface (TUI) for local multi-service development environments.
        </p>

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Modern web applications rarely consist of a single process. A realistic development stack often involves a Python/Go API backend, a Node/Vite frontend dev server, background job workers, an MCP agent server, and containerized databases like PostgreSQL or Redis.
        </p>

        <h3 className="text-xl font-normal text-[#F0E6E2] pt-4">The Problem with Traditional Workflows</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E] leading-relaxed">
          <li>
            <strong className="text-[#F0E6E2]">Terminal Tab Fatigue:</strong> Juggling 5+ separate terminal tabs just to view logs, restart failed services, or see which server crashed.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Orphaned Processes (<code className="text-[#FF5A1F]">EADDRINUSE</code>):</strong> Hitting <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded text-xs font-mono">Ctrl+C</kbd> in npm or uvicorn often kills the runner shell but leaves child worker processes silently running in the background, locking ports :8000 or :3000.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Heavyweight Container Overhead:</strong> Running full Docker Compose stacks for local development slows down compile cycles, consumes gigabytes of RAM, and complicates debugger attachments.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Manual Port Forwarding:</strong> Setting up external webhooks (such as Stripe or GitHub) requires installing external tools, creating tunnel configs, and manually copying URLs.
          </li>
        </ul>

        <h3 className="text-xl font-normal text-[#F0E6E2] pt-4">How gryd Solves This</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd sits between bare-metal terminal tabs and heavy virtualization. It executes your native binaries directly on your host machine for maximum speed and hot-reload responsiveness, while isolating processes inside dedicated Unix Process Groups (<code className="text-[#F0E6E2] font-mono">pgid</code>).
        </p>

        <AlertBox type="tip" title="Single Static Binary">
          gryd is compiled into a single self-contained Go binary with zero runtime dependencies. It boots in under 15ms and runs seamlessly across macOS, Linux, and Windows.
        </AlertBox>
      </div>
    ),
  },

  'installation': {
    title: 'Installation Guide',
    category: 'Getting Started',
    description: 'Step-by-step instructions for installing gryd on macOS, Linux, and Windows.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd is distributed via official package managers, pre-compiled platform tarballs, and direct source compilation.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">macOS &amp; Linux (via Homebrew)</h3>
        <p className="text-sm text-[#A9A19E]">
          The recommended method for macOS (Apple Silicon &amp; Intel) and Linux (Linuxbrew) is through the official Homebrew tap:
        </p>
        <CodeBlock
          title="Install via Homebrew"
          language="bash"
          code={`# Add the official tap\nbrew tap Sidharth-Prabhu/tap\n\n# Install gryd\nbrew install gryd`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Docker Container (GitHub Container Registry)</h3>
        <p className="text-sm text-[#A9A19E]">
          Run gryd without installing anything locally on the host machine using the multi-arch container image:
        </p>
        <CodeBlock
          title="Run via Docker"
          language="bash"
          code={`# Pull the multi-arch container image\ndocker pull ghcr.io/sidharth-prabhu/gryd:latest\n\n# Run the interactive TUI mounting the host workspace\ndocker run -it --rm \\\n  -v "$(pwd)":/workspace \\\n  -p 8000:8000 \\\n  -p 3000:3000 \\\n  ghcr.io/sidharth-prabhu/gryd:latest run`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Windows (via WinGet)</h3>
        <p className="text-sm text-[#A9A19E]">
          On Windows 10/11, install gryd using the Windows Package Manager (PowerShell):
        </p>
        <CodeBlock
          title="Install via WinGet (Coming Soon)"
          language="powershell"
          code={`# Official package alias\nwinget install gryd\n\n# Or by unique Package Identifier\nwinget install SidharthPrabhu.Gryd`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Pre-Compiled Binaries</h3>
        <p className="text-sm text-[#A9A19E]">
          Download standalone executable archives directly from the <a href="https://github.com/Sidharth-Prabhu/gryd/releases" target="_blank" rel="noreferrer" className="text-[#FF5A1F] hover:underline">GitHub Releases</a> page:
        </p>
        <ParamTable
          headers={['Platform', 'Architecture', 'Archive Format']}
          rows={[
            ['macOS', 'Apple Silicon (arm64: M1/M2/M3/M4)', '.tar.gz'],
            ['macOS', 'Intel 64-bit (amd64)', '.tar.gz'],
            ['Linux', 'x86_64 (amd64)', '.tar.gz'],
            ['Linux', 'ARM64 (aarch64)', '.tar.gz'],
            ['Windows', 'x86_64 (amd64)', '.zip (contains gryd.exe)'],
            ['Windows', 'ARM64', '.zip (contains gryd.exe)'],
          ]}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Build From Source (Go 1.21+)</h3>
        <p className="text-sm text-[#A9A19E]">
          If you have a Go development environment installed, compile the master branch directly:
        </p>
        <CodeBlock
          title="Build from Source"
          language="bash"
          code={`git clone https://github.com/Sidharth-Prabhu/gryd.git\ncd gryd\ngo build -o /usr/local/bin/gryd .`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Verifying Installation</h3>
        <CodeBlock
          title="Check Version"
          language="bash"
          code={`$ gryd --version\ngryd version 0.3.0 (darwin/arm64) built with go1.21.5`}
        />
      </div>
    ),
  },

  'quickstart': {
    title: 'Quick Start Tutorial',
    category: 'Getting Started',
    description: 'From zero to an orchestrated multi-service development stack in 3 minutes.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Follow this 3-step walkthrough to initialize and launch a multi-service project.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Step 1: Scaffold Configuration</h3>
        <p className="text-sm text-[#A9A19E]">
          In the root directory of your project, launch the interactive setup wizard:
        </p>
        <CodeBlock
          title="Scaffold Wizard"
          language="bash"
          code={`# Launch interactive terminal wizard\ngryd init --wizard\n\n# Or scaffold starter template\ngryd init my-app`}
        />

        <p className="text-sm text-[#A9A19E]">
          This creates a <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> file specifying your backend, frontend, and optional container sidecars.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Step 2: Pre-Flight Verification</h3>
        <p className="text-sm text-[#A9A19E]">
          Before opening your workspace, confirm that all configured ports are free and that services boot cleanly:
        </p>
        <CodeBlock
          title="Pre-Flight Verification"
          language="bash"
          code={`gryd test`}
        />

        <AlertBox type="note" title="Automated Verification">
          <code className="font-mono">gryd test</code> boots all services, verifies TCP port readiness, captures early boot panics, safely drains processes, and returns exit code 0.
        </AlertBox>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Step 3: Launch Interactive Dashboard</h3>
        <p className="text-sm text-[#A9A19E]">
          Start all services concurrently and enter the full-screen interactive TUI:
        </p>
        <CodeBlock
          title="Run Development Environment"
          language="bash"
          code={`gryd run`}
        />

        <p className="text-sm text-[#A9A19E]">
          Inside the TUI, press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">c</kbd> to detach and let services run in the background. Re-attach at any time by running <code className="text-[#F0E6E2] font-mono">gryd look</code>.
        </p>
      </div>
    ),
  },

  'architecture': {
    title: 'Core Architecture & Safety',
    category: 'Getting Started',
    description: 'Deep dive into process group management, port conflict resolution, and the IPC daemon.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">Unix Process Group Isolation (<code className="font-mono text-base">pgid</code>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Standard shell execution runners (such as npm scripts or basic Makefiles) invoke commands by spawning a subshell. When the subshell spawns child processes (e.g. Node worker threads, Python uvicorn reloaders, esbuild watchers), standard termination signals only terminate the parent shell. The children continue executing silently as orphaned daemon processes.
        </p>

        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd eliminates this by executing every configured service inside its own isolated Unix Process Group (<code className="text-[#F0E6E2] font-mono">setpgid</code>). When gryd stops a service or shuts down:
        </p>

        <ol className="list-decimal list-inside space-y-2 text-sm text-[#A9A19E]">
          <li>Sends <code className="text-[#FF5A1F] font-mono">SIGTERM</code> to the negative process group ID (<code className="text-[#F0E6E2] font-mono">-pgid</code>), allowing all child processes to gracefully flush buffers and close database connections.</li>
          <li>Waits for the configurable grace period (default 3 seconds).</li>
          <li>Sends <code className="text-rose-400 font-mono">SIGKILL</code> to <code className="text-[#F0E6E2] font-mono">-pgid</code> to immediately terminate any remaining uncooperative processes.</li>
          <li>On Windows, executes recursive tree termination via <code className="text-[#F0E6E2] font-mono">taskkill /F /T /PID &lt;pid&gt;</code>.</li>
        </ol>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Port Conflict Protection &amp; Auto-Purge</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Before launching any service with a declared <code className="text-[#F0E6E2] font-mono">port</code>, gryd inspects local TCP sockets using native OS APIs (<code className="font-mono text-xs">lsof</code> / socket tables). If a port is occupied by a dead or lingering process from a previous crash:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-[#A9A19E]">
          <li>Identifies the listening PID and command name.</li>
          <li>Terminates the conflicting PID automatically.</li>
          <li>Re-checks availability before initiating service boot.</li>
        </ul>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Remote IPC Daemon Architecture</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When gryd runs, it establishes an IPC daemon listening on a local Unix domain socket at <code className="text-[#F0E6E2] font-mono">~/.gryd/&lt;project&gt;.sock</code> (or Named Pipe <code className="text-[#F0E6E2] font-mono">\\.\pipe\gryd-&lt;project&gt;</code> on Windows). 
          This allows external CLI commands like <code className="text-[#F0E6E2] font-mono">gryd service restart backend</code> or <code className="text-[#F0E6E2] font-mono">gryd look</code> to communicate with the active session without port collisions.
        </p>
      </div>
    ),
  },

  // 2. Configuration (gryd.yaml)
  'config-overview': {
    title: 'File Specification & Schema',
    category: 'Configuration',
    description: 'Comprehensive anatomy and top-level schema of gryd.yaml.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The primary configuration file for any project is <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> placed in the root directory.
        </p>

        <CodeBlock
          title="gryd.yaml Root Structure"
          language="yaml"
          code={`name: my-app\nworking_directory: .\n\nservices:\n  backend:\n    directory: api\n    command: uvicorn main:app --reload --port 8000\n    port: 8000\n\n  frontend:\n    directory: web\n    command: npm run dev\n    port: 3000\n    depends_on: [backend]\n\ndependencies:\n  postgres:\n    image: postgres:16-alpine\n    ports: ["5432:5432"]\n\nprofiles:\n  api-only:\n    services: [backend]\n  full:\n    services: [backend, frontend]\n\nsettings:\n  health_check: true\n  restart_on_failure: false`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Root Schema Properties</h3>
        <ParamTable
          headers={['Property', 'Type', 'Default', 'Description']}
          rows={[
            ['name', 'string', 'required', 'Unique identifier for the project and daemon socket.'],
            ['working_directory', 'string', '.', 'Base directory path for resolving relative service paths.'],
            ['services', 'map[string]Service', '{}', 'Map of application service definitions.'],
            ['dependencies', 'map[string]Container', '{}', 'Optional containerized sidecars (Postgres, Redis, etc.).'],
            ['profiles', 'map[string]Profile', '{}', 'Named subsets of services for targeted startup.'],
            ['settings.health_check', 'boolean', 'true', 'Whether to poll TCP ports for service readiness.'],
            ['settings.restart_on_failure', 'boolean', 'false', 'Automatically restart services exiting with non-zero codes.'],
          ]}
        />
      </div>
    ),
  },

  'config-services': {
    title: 'Service Definitions',
    category: 'Configuration',
    description: 'Detailed properties for configuring commands, ports, directories, and environments.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Each entry under the <code className="text-[#F0E6E2] font-mono">services</code> key defines an independently managed process.
        </p>

        <CodeBlock
          title="Service Configuration Example"
          language="yaml"
          code={`services:\n  backend:\n    directory: api\n    command: uv run uvicorn main:app --port 8000\n    port: 8000\n    env:\n      ENVIRONMENT: development\n      DEBUG: "true"\n    env_file: .env.backend\n    depends_on:\n      - postgres\n    watch:\n      - "src/**"\n      - "config/**"\n    ignore:\n      - "*.log"\n      - "tmp/**"`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Service Field Reference</h3>
        <ParamTable
          headers={['Field', 'Type', 'Description']}
          rows={[
            ['directory', 'string', 'Subdirectory where the process command executes.'],
            ['command', 'string', 'Shell command string to launch the service.'],
            ['port', 'integer', 'Listening port used for readiness verification and conflict auto-purge.'],
            ['depends_on', '[]string', 'List of services or sidecars that must reach healthy state first.'],
            ['env', 'map[string]string', 'Key-value environment variables injected into the process.'],
            ['env_file', 'string', 'Path to a dotenv file loaded before process execution.'],
            ['watch', '[]string', 'Glob patterns watched for automatic hot reloading.'],
            ['ignore', '[]string', 'Glob patterns excluded from the file watcher.'],
          ]}
        />
      </div>
    ),
  },

  'config-dependencies': {
    title: 'Container Sidecars (Docker / Podman)',
    category: 'Configuration',
    description: 'Automatic lifecycle management for database, cache, and queue containers.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Instead of running heavy Docker Compose setups, gryd manages containerized infrastructure alongside your host binaries using Docker or Podman:
        </p>

        <CodeBlock
          title="dependencies Configuration"
          language="yaml"
          code={`dependencies:\n  postgres:\n    image: postgres:16-alpine\n    ports: ["5432:5432"]\n    env:\n      POSTGRES_DB: dev_db\n      POSTGRES_USER: dev\n      POSTGRES_PASSWORD: secretpassword\n    volumes:\n      - ./data/postgres:/var/lib/postgresql/data\n\n  redis:\n    image: redis:7-alpine\n    ports: ["6379:6379"]`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Key Sidecar Capabilities</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E] leading-relaxed">
          <li>
            <strong className="text-[#F0E6E2]">Dual Runtime Auto-Detection:</strong> Automatically detects whether <code className="text-[#FF5A1F] font-mono">docker</code> or <code className="text-[#FF5A1F] font-mono">podman</code> CLI is available.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Sidecar Retention on Hot Reload:</strong> When services reload via <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">r</kbd>, sidecar containers remain running. You do not lose active database connections or cache state.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Clean Teardown:</strong> When you stop the project, gryd cleanly stops and removes the transient containers, preventing container name collisions.
          </li>
        </ul>
      </div>
    ),
  },

  'config-watcher': {
    title: 'File Watching & Hot Reload',
    category: 'Configuration',
    description: 'Native debounced file watching with zero external watcher dependencies.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd features built-in recursive file watching powered by <code className="text-[#F0E6E2] font-mono">fsnotify</code>. You do not need external tools like <code className="text-[#A9A19E]">nodemon</code>, <code className="text-[#A9A19E]">air</code>, or <code className="text-[#A9A19E]">watchman</code>.
        </p>

        <CodeBlock
          title="Watch Rules in gryd.yaml"
          language="yaml"
          code={`services:\n  backend:\n    command: go run ./cmd/api\n    watch:\n      - "src/**"\n      - "config/**"\n    ignore:\n      - "*.log"\n      - ".git/**"\n      - "tmp/**"`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Watcher Mechanics</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E]">
          <li><strong className="text-[#F0E6E2]">300ms Debounce Window:</strong> Batches rapid multi-file writes (e.g. git checkout or editor code formatters) into a single clean restart.</li>
          <li><strong className="text-[#F0E6E2]">Isolated Restarts:</strong> Changes in <code className="text-[#F0E6E2] font-mono">api/src/</code> restart only the <code className="text-[#FF5A1F] font-mono">backend</code> service without touching the frontend or workers.</li>
          <li><strong className="text-[#F0E6E2]">Built-in Ignored Directories:</strong> Directories such as <code className="font-mono text-xs">.git</code>, <code className="font-mono text-xs">node_modules</code>, <code className="font-mono text-xs">vendor</code>, and IDE folders are skipped automatically.</li>
        </ul>
      </div>
    ),
  },

  'config-profiles': {
    title: 'Environment Profiles',
    category: 'Configuration',
    description: 'Run targeted subsets of services on different machines or environments.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Profiles enable developers to run only the services relevant to their current task, saving memory on laptops:
        </p>

        <CodeBlock
          title="Profiles Configuration"
          language="yaml"
          code={`profiles:\n  api-only:\n    services: [backend]\n  frontend-only:\n    services: [frontend]\n  full:\n    services: [backend, frontend, worker]`}
        />

        <p className="text-sm text-[#A9A19E]">
          Launch a specific profile with the <code className="text-[#F0E6E2] font-mono">--profile</code> or <code className="text-[#F0E6E2] font-mono">-p</code> flag:
        </p>

        <CodeBlock
          title="Run Profile"
          language="bash"
          code={`gryd run --profile api-only`}
        />
      </div>
    ),
  },

  // 3. CLI Reference
  'cli-core': {
    title: 'Core Lifecycle Commands',
    category: 'CLI Reference',
    description: 'Commands for starting, attaching, stopping, and restarting environments.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]"><code className="font-mono">gryd run [project]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Starts all services defined in <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> concurrently and opens the interactive TUI.
        </p>
        <CodeBlock
          title="gryd run Examples"
          language="bash"
          code={`# Run in default interactive TUI mode\ngryd run\n\n# Run with specific profile\ngryd run --profile api-only\n\n# Run in background daemon mode\ngryd run -d`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd look [project]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Attaches the interactive TUI dashboard to an active background gryd session.
        </p>
        <CodeBlock title="gryd look" language="bash" code={`gryd look`} />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd stop [project]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Gracefully terminates all services and child process groups, frees network ports, and stops container sidecars.
        </p>
        <CodeBlock title="gryd stop" language="bash" code={`gryd stop`} />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd restart [project]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Hard-terminates all active processes, cleans occupied ports, and launches the project fresh.
        </p>
        <CodeBlock title="gryd restart" language="bash" code={`gryd restart`} />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd reload [project]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Triggers an in-place hot reload on running services without restarting containerized sidecars.
        </p>
        <CodeBlock title="gryd reload" language="bash" code={`gryd reload`} />
      </div>
    ),
  },

  'cli-logs-status': {
    title: 'Inspection & Monitoring',
    category: 'CLI Reference',
    description: 'Inspect execution statuses, audit ports, and follow multiplexed log streams.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]"><code className="font-mono">gryd logs [service]</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Inspect or tail multiplexed logs from external terminal tabs:
        </p>
        <CodeBlock
          title="gryd logs Examples"
          language="bash"
          code={`# Combined log stream\ngryd logs\n\n# Filter for specific service\ngryd logs backend\n\n# Live follow (-f)\ngryd logs backend -f\n\n# Export last 500 lines to file\ngryd logs backend -n 500 -o debug.log`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd status</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Displays a tabular summary of running PIDs, memory usage, listening ports, and uptime.
        </p>
        <CodeBlock title="gryd status" language="bash" code={`gryd status`} />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4"><code className="font-mono">gryd ports</code></h3>
        <p className="text-sm text-[#A9A19E]">
          Audits network ports across your development environment and flags conflicting listeners.
        </p>
        <CodeBlock title="gryd ports" language="bash" code={`gryd ports`} />
      </div>
    ),
  },

  'cli-testing': {
    title: 'Pre-Flight Testing (gryd test)',
    category: 'CLI Reference',
    description: 'Automated integration boot verification designed for developers and CI/CD pipelines.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <code className="text-[#F0E6E2] font-mono">gryd test</code> executes an automated integration boot verification:
        </p>

        <ol className="list-decimal list-inside space-y-2 text-sm text-[#A9A19E]">
          <li>Spawns all sidecars and services in dependency order (<code className="text-[#F0E6E2] font-mono">depends_on</code>).</li>
          <li>Verifies TCP port binding and health check responsiveness.</li>
          <li>Ensures no early panics or fatal exceptions occur during startup.</li>
          <li>Terminates all child processes cleanly and frees ports.</li>
          <li>Returns exit code <code className="text-emerald-400 font-mono">0</code> on success, or non-zero on error.</li>
        </ol>

        <CodeBlock
          title="gryd test in CI"
          language="bash"
          code={`# Standard pre-flight test\ngryd test\n\n# Machine-readable JSON output for CI runners\ngryd test --json`}
        />
      </div>
    ),
  },

  'cli-tunnel': {
    title: 'Public Tunneling (gryd tunnel)',
    category: 'CLI Reference',
    description: 'Expose local services to public HTTPS URLs in seconds.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Expose any local service port to an encrypted public HTTPS URL without installing external client binaries:
        </p>

        <CodeBlock
          title="gryd tunnel"
          language="bash"
          code={`# Expose backend port\ngryd tunnel backend\n\n# Specify provider (cloudflare, ngrok, localtunnel)\ngryd tunnel backend --provider cloudflare`}
        />

        <AlertBox type="tip" title="In-TUI Tunneling">
          You can also toggle tunnels on the fly directly inside the interactive TUI dashboard by pressing key <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">t</kbd>.
        </AlertBox>
      </div>
    ),
  },

  'cli-service-ipc': {
    title: 'Remote Socket IPC (gryd service)',
    category: 'CLI Reference',
    description: 'Control individual running services from external terminals or scripts.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Interact with a running gryd background session via the Unix Socket IPC daemon:
        </p>

        <CodeBlock
          title="gryd service Commands"
          language="bash"
          code={`# Restart a single service\ngryd service restart backend\n\n# Stop a specific service\ngryd service stop worker\n\n# Run ad-hoc command within a service context\ngryd service exec backend -- python scripts/seed_db.py`}
        />
      </div>
    ),
  },

  'cli-version-control': {
    title: 'Version Control (gryd vc)',
    category: 'CLI Reference',
    description: 'Interactive Git management dashboard inside your terminal.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd includes an integrated Git workflow helper:
        </p>

        <CodeBlock
          title="gryd vc Commands"
          language="bash"
          code={`# Open full-screen interactive Git branch selector\ngryd vc\n\n# Commit and push changes with one command\ngryd vc push -m "feat: implement payment webhook"\n\n# Safely merge another branch\ngryd vc merge feature/login`}
        />
      </div>
    ),
  },

  'cli-maintenance': {
    title: 'Updates & Maintenance',
    category: 'CLI Reference',
    description: 'Background auto-update checker and version verification.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd checks GitHub releases in the background and notifies you when an update is available:
        </p>

        <CodeBlock
          title="gryd update"
          language="bash"
          code={`# Download latest release binary and replace executable\ngryd update\n\n# Print runtime version info\ngryd --version`}
        />
      </div>
    ),
  },

  // 4. Interactive TUI Manual
  'tui-overview': {
    title: 'Dashboard Navigation & Badges',
    category: 'TUI Manual',
    description: 'Explore the Lip Gloss & Bubble Tea interface layout and indicators.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          When running <code className="text-[#F0E6E2] font-mono">gryd run</code> or <code className="text-[#F0E6E2] font-mono">gryd look</code>, the terminal displays an interactive multi-pane dashboard:
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E]">
          <li><strong className="text-[#F0E6E2]">Left Sidebar:</strong> Lists active services, assigned ports, live CPU% and RSS memory badges, and container sidecar health.</li>
          <li><strong className="text-[#F0E6E2]">Main Log Viewport:</strong> Real-time ANSI-colorized stdout/stderr streams with scrollback buffer up to 10,000 lines per service.</li>
          <li><strong className="text-[#F0E6E2]">Action Header &amp; Footer:</strong> Shows active filters, regex query, JSON viewing mode, and keyboard shortcuts.</li>
        </ul>
      </div>
    ),
  },

  'tui-search-filters': {
    title: 'Live Search & Log Filtering',
    category: 'TUI Manual',
    description: 'Regex searching and log level filtering in real-time.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">Live Search (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">/</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">/</kbd> to enter live search mode. Type any plain text query or regular expression (e.g. <code className="text-[#FF5A1F] font-mono">40[0-9]|stripe</code>). Matches are highlighted instantly in the stream. Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">Esc</kbd> to clear.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Log Level Cycling (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">l</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">l</kbd> to cycle the log level filter:
        </p>
        <p className="font-mono text-sm text-[#F0E6E2]">
          ALL &rarr; <span className="text-rose-400">ERROR</span> &rarr; <span className="text-amber-400">WARN</span> &rarr; <span className="text-blue-400">INFO</span> &rarr; ALL
        </p>
      </div>
    ),
  },

  'tui-json-markers': {
    title: 'Structured JSON & Visual Markers',
    category: 'TUI Manual',
    description: 'Parse structured JSON log payloads and inject timestamp markers.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">Structured JSON Parsing (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">J</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd automatically detects structured JSON logs emitted by libraries like Zap, Zerolog, or Pino. Pressing <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">J</kbd> toggles between:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-[#A9A19E]">
          <li><strong className="text-[#F0E6E2]">compact:</strong> Single line with high-priority keys.</li>
          <li><strong className="text-[#F0E6E2]">pretty:</strong> Indented multi-line syntax-highlighted JSON trees.</li>
          <li><strong className="text-[#F0E6E2]">raw:</strong> Unmodified stdout text stream.</li>
        </ul>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Visual Timestamp Markers (<kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">m</kbd>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">m</kbd> at any time to inject an eye-catching timestamp divider line across the active stream. This allows you to clearly demarcate logs before and after clicking a button or sending an API request.
        </p>
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
          Press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">i</kbd> or <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">p</kbd> inside the TUI to toggle the detailed process tree inspector:
        </p>

        <CodeBlock
          title="Process Tree Inspector Output"
          language="text"
          code={`gryd (PID 48209, pgid 48209)\n├── uvicorn (PID 48210) — :8000 [LISTEN]\n│   └── python worker 1 (PID 48214) — 8 threads, 42 fds\n├── vite (PID 48211) — :3000 [LISTEN]\n│   └── esbuild / rollup (PID 48216) — 4 threads\n└── docker sidecars (bridge)\n    ├── postgres:16-alpine — 127.0.0.1:5432 [LISTEN]\n    └── redis:7-alpine — 127.0.0.1:6379 [LISTEN]`}
        />
      </div>
    ),
  },

  'tui-hotkeys': {
    title: 'Keyboard Shortcuts Cheat Sheet',
    category: 'TUI Manual',
    description: 'Complete reference of single-key shortcuts supported by gryd run.',
    render: () => (
      <div className="space-y-6">
        <ParamTable
          headers={['Key', 'Action', 'Description']}
          rows={[
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">/</kbd>, 'Live Search', 'Filter stream with plain text or regex. Enter confirms, Esc clears.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">l</kbd>, 'Level Filter', 'Cycle log levels: ALL → ERROR → WARN → INFO → ALL.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">J</kbd>, 'JSON Mode', 'Cycle structured JSON view: compact → pretty → raw.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">m</kbd>, 'Visual Marker', 'Inject high-visibility timestamp divider line into stream.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">t</kbd>, 'Tunnel Toggle', 'Establish or terminate public Cloudflare HTTPS tunnel.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">i / p</kbd>, 'Process Tree', 'Inspect child PIDs, threads, and memory allocations.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">r</kbd>, 'Hot Reload', 'Gracefully reload services in-place without restarting sidecars.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">R</kbd>, 'Hard Restart', 'Hard-terminate all processes and ports, boot project fresh.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">c</kbd>, 'Detach Mode', 'Detach TUI to background. Re-attach anytime with gryd look.'],
            [<kbd className="px-2 py-0.5 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold font-mono text-xs">q / Ctrl+C</kbd>, 'Graceful Exit', 'Safely terminate all child processes, release ports, and exit.'],
          ]}
        />
      </div>
    ),
  },

  // 5. Recipes
  'recipe-fullstack': {
    title: 'Full-Stack Recipe (FastAPI + React + DB)',
    category: 'Architecture Recipes',
    description: 'Production-ready local configuration for a modern full-stack web application.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This recipe orchestrates a FastAPI backend, a Vite React frontend, an asynchronous background worker, and PostgreSQL + Redis containers:
        </p>

        <CodeBlock
          title="gryd.yaml (Full-Stack)"
          language="yaml"
          code={`name: fullstack-app\nworking_directory: .\n\nservices:\n  backend:\n    directory: api\n    command: uvicorn main:app --reload --port 8000\n    port: 8000\n    env:\n      DATABASE_URL: "postgresql://dev:secret@localhost:5432/app"\n      REDIS_URL: "redis://localhost:6379/0"\n    watch:\n      - "src/**"\n    depends_on:\n      - postgres\n      - redis\n\n  frontend:\n    directory: web\n    command: npm run dev\n    port: 3000\n    depends_on:\n      - backend\n    watch:\n      - "src/**"\n\n  worker:\n    directory: workers\n    command: python consumer.py\n    depends_on:\n      - redis\n\ndependencies:\n  postgres:\n    image: postgres:16-alpine\n    ports: ["5432:5432"]\n    env:\n      POSTGRES_DB: app\n      POSTGRES_USER: dev\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - ./data/pg:/var/lib/postgresql/data\n\n  redis:\n    image: redis:7-alpine\n    ports: ["6379:6379"]\n\nprofiles:\n  api-only: [backend, postgres]\n  full: [backend, frontend, worker, postgres, redis]`}
        />
      </div>
    ),
  },

  'recipe-ai-mcp': {
    title: 'AI Platform & MCP Server Recipe',
    category: 'Architecture Recipes',
    description: 'Local environment configuration for Model Context Protocol (MCP) agents.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This recipe coordinates an Ollama local LLM container, a Python-based MCP tools server, a Go orchestrator daemon, and a Next.js chat interface:
        </p>

        <CodeBlock
          title="gryd.yaml (AI & MCP)"
          language="yaml"
          code={`name: ai-mcp-workspace\nworking_directory: .\n\nservices:\n  mcp-tools:\n    directory: mcp\n    command: uv run python server.py\n    port: 9000\n    watch:\n      - "tools/**"\n\n  orchestrator:\n    directory: backend\n    command: go run . --mcp-endpoint=http://localhost:9000\n    port: 8080\n    depends_on:\n      - mcp-tools\n      - ollama\n\n  chat-web:\n    directory: frontend\n    command: pnpm dev\n    port: 5173\n    depends_on:\n      - orchestrator\n\ndependencies:\n  ollama:\n    image: ollama/ollama:latest\n    ports: ["11434:11434"]\n    volumes:\n      - ./models:/root/.ollama`}
        />
      </div>
    ),
  },

  'recipe-microservices': {
    title: 'Microservices & Message Queues',
    category: 'Architecture Recipes',
    description: 'Polyglot microservices stack with an API gateway and RabbitMQ message broker.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Configure an asynchronous polyglot stack combining Rust, Go, Node.js, and RabbitMQ:
        </p>

        <CodeBlock
          title="gryd.yaml (Microservices)"
          language="yaml"
          code={`name: commerce-platform\nworking_directory: .\n\nservices:\n  gateway:\n    directory: services/gateway\n    command: cargo run\n    port: 8000\n\n  catalog:\n    directory: services/catalog\n    command: go run .\n    port: 8001\n    depends_on: [gateway]\n\n  orders:\n    directory: services/orders\n    command: node server.js\n    port: 8002\n    depends_on: [rabbitmq, catalog]\n\ndependencies:\n  rabbitmq:\n    image: rabbitmq:3.12-management-alpine\n    ports: ["5672:5672", "15672:15672"]`}
        />
      </div>
    ),
  },

  // 6. CI/CD & Troubleshooting
  'cicd-integration': {
    title: 'GitHub Actions & Automation',
    category: 'CI/CD & Troubleshooting',
    description: 'Integrate pre-flight boot verification into your continuous integration workflow.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Add <code className="text-[#F0E6E2] font-mono">gryd test</code> to your pull request checks to guarantee that proposed code changes boot cleanly without port deadlocks:
        </p>

        <CodeBlock
          title=".github/workflows/verify.yml"
          language="yaml"
          code={`name: Pre-Flight Verification\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  verify-stack:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Install gryd\n        run: |\n          curl -fsSL https://raw.githubusercontent.com/Sidharth-Prabhu/homebrew-tap/main/install.sh | bash\n\n      - name: Run Pre-Flight Boot Test\n        run: gryd test --json`}
        />
      </div>
    ),
  },

  'troubleshooting': {
    title: 'Common Issues & FAQ',
    category: 'CI/CD & Troubleshooting',
    description: 'Diagnostic resolutions for port deadlocks, container sockets, and permission quirks.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">Port is occupied by external system process</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          If a system process (such as a local Apache server or system PostgreSQL) already occupies a port, run <code className="text-[#F0E6E2] font-mono">gryd ports</code> to audit active listeners. Update the <code className="text-[#F0E6E2] font-mono">port</code> attribute in <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> or stop the host service.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Container sidecars fail to start</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Verify that Docker Desktop or the Podman machine is running. Confirm that your user account has permissions to access <code className="text-[#F0E6E2] font-mono">/var/run/docker.sock</code>.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Cannot attach to background session (<code className="font-mono text-sm">gryd look</code>)</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Confirm that gryd is running in the background with <code className="text-[#F0E6E2] font-mono">gryd status</code>. Sockets are stored in <code className="text-[#F0E6E2] font-mono">~/.gryd/</code>. If an unclean OS reboot occurred, running <code className="text-[#F0E6E2] font-mono">gryd stop</code> purges stale socket files.
        </p>
      </div>
    ),
  },
};
