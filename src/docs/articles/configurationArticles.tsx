import { CodeBlock, AlertBox, ParamTable } from '../docsContent';

export const configurationArticles = {
  'config-overview': {
    title: 'File Specification & Schema',
    category: 'Configuration',
    description: 'Complete schema reference for gryd.yaml including top-level properties and validation rules.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The behavior of gryd is declared in <code className="text-[#F0E6E2] font-mono">gryd.yaml</code> placed in the root of your repository (or specified using the <code className="text-[#F0E6E2] font-mono">-c / --config</code> flag).
        </p>

        <CodeBlock
          title="Complete gryd.yaml Schema Blueprint"
          language="yaml"
          code={`# Unique project identifier (used for state files, log filenames, and IPC sockets)
name: relationos-platform

# Working directory root for resolving relative paths (default: .)
working_directory: .

# Application services running on native host
services:
  backend:
    directory: api
    command: uv run uvicorn main:app --port 8000
    port: 8000
    env:
      ENVIRONMENT: development
      PORT: "8000"
    watch:
      - "src/**"
      - "config/**"
    ignore:
      - "*.log"
      - ".git/**"
    depends_on:
      - postgres
      - redis

  frontend:
    directory: web
    command: npm run dev
    port: 3000
    depends_on:
      - backend

# Infrastructure sidecars running via Docker or Podman
dependencies:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    env:
      POSTGRES_DB: app_dev
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

# Targeted execution subsets
profiles:
  api-only:
    services: [backend]
    dependencies: [postgres, redis]
  frontend-only:
    services: [frontend]

# Global orchestration settings
settings:
  health_check: true
  restart_on_failure: false`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Root Keys Reference</h3>
        <ParamTable
          headers={['Field', 'Type', 'Required', 'Description']}
          rows={[
            ['name', 'string', 'Yes', 'Unique project name. Used in socket paths ~/.gryd/run/<name>.sock and logs ~/.gryd/logs/<name>.log.'],
            ['working_directory', 'string', 'No (default: .)', 'Root directory against which all service subdirectories are resolved.'],
            ['services', 'map[string]Service', 'Yes', 'Map of application services to be managed and orchestrated.'],
            ['dependencies', 'map[string]Dependency', 'No', 'Map of containerized sidecars running via Docker or Podman.'],
            ['profiles', 'map[string]ProfileConfig', 'No', 'Custom subsets of services and dependencies runnable with --profile.'],
            ['settings.health_check', 'boolean', 'No (default: true)', 'Whether gryd polls TCP ports to verify service readiness before launching dependents.'],
            ['settings.restart_on_failure', 'boolean', 'No (default: false)', 'Automatically restart services if they terminate with a non-zero exit status.'],
          ]}
        />
      </div>
    ),
  },

  'config-services': {
    title: 'Service Definitions',
    category: 'Configuration',
    description: 'Detailed properties for configuring commands, ports, directories, environments, and dependencies.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The <code className="text-[#F0E6E2] font-mono">services</code> map contains one or more named execution blocks. Each service runs natively on your host in an isolated process group.
        </p>

        <CodeBlock
          title="Advanced Service Definition"
          language="yaml"
          code={`services:
  backend-api:
    directory: services/api
    command: poetry run python -m uvicorn main:app --host 0.0.0.0 --port 8000
    port: 8000
    depends_on:
      - postgres
      - redis
    env:
      APP_ENV: local
      WORKERS: "4"
      LOG_LEVEL: debug
    watch:
      - "app/**/*.py"
      - "pyproject.toml"
    ignore:
      - "**/*.pyc"
      - "**/__pycache__/**"
      - "*.tmp"`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">Service Configuration Properties</h3>
        <ParamTable
          headers={['Key', 'Type', 'Description']}
          rows={[
            ['directory', 'string', 'Subdirectory where command will be executed. Defaults to working_directory.'],
            ['command', 'string', 'The executable command line string invoked in the shell.'],
            ['port', 'integer', 'Listening TCP port. Used for readiness probing, conflict auto-kill, and TUI indicators.'],
            ['depends_on', '[]string', 'Names of other services or dependencies that must be listening before this service boots.'],
            ['env', 'map[string]string', 'Key-value map of environment variables injected into the process.'],
            ['watch', '[]string', 'Glob patterns watched by fsnotify for automatic debounced restarts.'],
            ['ignore', '[]string', 'Glob patterns excluded from the file watcher.'],
          ]}
        />

        <AlertBox type="tip" title="Dependency Resolution Order">
          gryd performs a topological sort on all declared <code className="font-mono">depends_on</code> relationships. Circular dependencies are detected and rejected at configuration parse time with actionable error messages.
        </AlertBox>
      </div>
    ),
  },

  'config-dependencies': {
    title: 'Container Sidecars (Docker / Podman)',
    category: 'Configuration',
    description: 'Manage persistence containers like PostgreSQL, Redis, RabbitMQ, and Ollama without Docker Compose.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The <code className="text-[#F0E6E2] font-mono">dependencies</code> block defines containerized services that run alongside your host-native application code:
        </p>

        <CodeBlock
          title="dependencies Configuration in gryd.yaml"
          language="yaml"
          code={`dependencies:
  postgres:
    image: postgres:16-alpine
    ports: 
      - "5432:5432"
    env:
      POSTGRES_DB: app
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    command: postgres -c shared_buffers=256MB -c max_connections=200

  redis:
    image: redis:7-alpine
    ports: 
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    ports: 
      - "6333:6333"
    volumes:
      - ./data/qdrant:/qdrant/storage`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Sidecar Architecture Highlights</h3>
        <ul className="list-disc list-inside space-y-2.5 text-sm text-[#A9A19E] leading-relaxed">
          <li>
            <strong className="text-[#F0E6E2]">Dual Runtime Auto-Detection:</strong> gryd automatically inspects your environment for either <code className="text-[#FF5A1F] font-mono">docker</code> or <code className="text-[#FF5A1F] font-mono">podman</code>. If Podman is detected without Docker, gryd seamlessly adapts CLI arguments.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Deterministic Container Naming:</strong> Containers are created with the deterministic name <code className="text-[#F0E6E2] font-mono">gryd-&lt;project&gt;-&lt;dep_name&gt;</code>, preventing collisions across multiple repositories.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Connection Preservation:</strong> During application hot reloads (triggered by file saves or the <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">r</kbd> key), sidecar containers remain running. You avoid reconnect timeouts and database warm-up delays.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Automated Teardown:</strong> When you stop gryd via <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">q</kbd> or <code className="text-[#F0E6E2] font-mono">gryd stop</code>, sidecars are cleanly shut down and transient containers removed.
          </li>
        </ul>
      </div>
    ),
  },

  'config-watcher': {
    title: 'File Watching & Hot Reload',
    category: 'Configuration',
    description: 'Native fsnotify file watching, debounced reloads, and intelligent path filtering.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd embeds a native recursive filesystem watcher powered by Go's <code className="text-[#F0E6E2] font-mono">fsnotify</code> library. You no longer need to install or configure external file-watching daemons such as <code className="text-[#A9A19E]">nodemon</code>, <code className="text-[#A9A19E]">air</code>, <code className="text-[#A9A19E]">cargo-watch</code>, or <code className="text-[#A9A19E]">watchman</code>.
        </p>

        <CodeBlock
          title="Fine-Grained Watch Configuration"
          language="yaml"
          code={`services:
  backend:
    directory: api
    command: go run ./cmd/server
    watch:
      - "cmd/**/*.go"
      - "internal/**/*.go"
      - "pkg/**/*.go"
      - "config/*.json"
    ignore:
      - "**/*_test.go"
      - "**/docs/**"
      - "*.tmp"`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-2">How gryd File Watching Works</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#A9A19E] leading-relaxed">
          <li>
            <strong className="text-[#F0E6E2]">300ms Debounce Window:</strong> Multiple rapid filesystem events (such as formatting a file on save, running <code className="font-mono text-xs">git checkout</code>, or auto-generating TypeScript types) are batched into a single clean restart.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Service-Level Granularity:</strong> Editing a file in <code className="text-[#F0E6E2] font-mono">api/</code> restarts only the backend process without interrupting your frontend dev server or worker queue.
          </li>
          <li>
            <strong className="text-[#F0E6E2]">Default Global Exclusions:</strong> gryd automatically excludes high-churn directories like <code className="font-mono text-xs">.git/</code>, <code className="font-mono text-xs">node_modules/</code>, <code className="font-mono text-xs">vendor/</code>, <code className="font-mono text-xs">.idea/</code>, and <code className="font-mono text-xs">.vscode/</code> to conserve OS file descriptors.
          </li>
        </ul>
      </div>
    ),
  },

  'config-profiles': {
    title: 'Environment Profiles',
    category: 'Configuration',
    description: 'Targeted sub-stacks for frontend developers, backend engineers, and memory-constrained laptops.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Large microservice projects can easily exceed 10+ services. With <code className="text-[#F0E6E2] font-mono">profiles</code>, developers can declare and launch only the subset of services required for their current focus area.
        </p>

        <CodeBlock
          title="Profiles Specification"
          language="yaml"
          code={`profiles:
  # Run only backend services and database dependencies
  api-dev:
    services: [backend, worker]
    dependencies: [postgres, redis]

  # Run only the frontend dev server (points to staging API)
  frontend-dev:
    services: [frontend]
    env:
      VITE_API_URL: "https://api.staging.example.com"

  # Minimal profile for CI pipeline test validation
  ci:
    services: [backend]
    dependencies: [postgres]`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Running with Profiles</h3>
        <p className="text-sm text-[#A9A19E]">
          Execute gryd with the <code className="text-[#F0E6E2] font-mono">--profile</code> (or <code className="text-[#F0E6E2] font-mono">-p</code>) flag:
        </p>
        <CodeBlock
          title="Profile CLI Usage"
          language="bash"
          code={`# Run only api-dev stack
gryd run --profile api-dev

# Test only CI profile
gryd test --profile ci`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Cascading Environment Variable Files</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          gryd automatically loads cascading <code className="text-[#F0E6E2] font-mono">.env</code> files in standard hierarchy:
        </p>
        <div className="p-3 font-mono text-xs bg-[#171615] border border-[#302C2A] rounded-lg text-[#F0E6E2] space-y-1">
          <div>1. <code className="text-[#77716E]">.env</code> (base defaults)</div>
          <div>2. <code className="text-[#77716E]">.env.local</code> (local developer overrides)</div>
          <div>3. <code className="text-[#FF5A1F]">.env.&lt;profile&gt;</code> (profile-specific values)</div>
          <div>4. <code className="text-emerald-400">.env.&lt;profile&gt;.local</code> (profile private secrets)</div>
        </div>
      </div>
    ),
  },
};
