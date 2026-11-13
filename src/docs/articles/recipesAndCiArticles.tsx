import { CodeBlock, AlertBox } from '../docsContent';

export const recipesAndCiArticles = {
  'recipe-fullstack': {
    title: 'Full-Stack Recipe (FastAPI + React + DB)',
    category: 'Architecture Recipes',
    description: 'Production-ready local configuration for a modern full-stack web application.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          This architecture coordinates a high-performance Python FastAPI API backend, a React SPA powered by Vite, an asynchronous Celery background worker, and PostgreSQL + Redis containers:
        </p>

        <CodeBlock
          title="gryd.yaml (Full-Stack Blueprint)"
          language="yaml"
          code={`name: fullstack-production
working_directory: .

services:
  backend:
    directory: api
    command: poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    port: 8000
    env:
      ENVIRONMENT: development
      DATABASE_URL: "postgresql://dev:secret@localhost:5432/app"
      REDIS_URL: "redis://localhost:6379/0"
    watch:
      - "app/**"
      - "pyproject.toml"
    depends_on:
      - postgres
      - redis

  frontend:
    directory: web
    command: npm run dev
    port: 3000
    env:
      VITE_API_ENDPOINT: "http://localhost:8000"
    depends_on:
      - backend
    watch:
      - "src/**"

  worker:
    directory: api
    command: poetry run celery -A app.worker worker --loglevel=info
    env:
      DATABASE_URL: "postgresql://dev:secret@localhost:5432/app"
      REDIS_URL: "redis://localhost:6379/0"
    depends_on:
      - redis

dependencies:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    env:
      POSTGRES_DB: app
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: secret
    volumes:
      - ./data/postgres:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

profiles:
  api-only:
    services: [backend, worker]
    dependencies: [postgres, redis]
  frontend-only:
    services: [frontend]
  full:
    services: [backend, frontend, worker]
    dependencies: [postgres, redis]

settings:
  health_check: true
  restart_on_failure: false`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">Operational Workflow</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[#A9A19E]">
          <li>Run <code className="text-[#F0E6E2] font-mono">gryd run</code> to launch the complete stack.</li>
          <li>Postgres and Redis are booted first; once listening, the backend API begins booting.</li>
          <li>Once port <code className="text-[#FF5A1F] font-mono">:8000</code> responds to TCP handshakes, the frontend Vite server and Celery worker start.</li>
          <li>Editing a React component updates the browser in &lt;50ms via Vite HMR. Editing Python code reloads the backend in ~80ms while database connections are preserved.</li>
        </ol>
      </div>
    ),
  },

  'recipe-ai-mcp': {
    title: 'AI Platform & MCP Server Recipe',
    category: 'Architecture Recipes',
    description: 'Local development setup for Model Context Protocol (MCP) tool servers and LLM agents.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          The Model Context Protocol (MCP) allows AI agents to interface with external tools and local databases. This recipe coordinates a local Ollama container for LLM inference, an MCP Python tool server, an agent orchestrator, and a Next.js chat interface:
        </p>

        <CodeBlock
          title="gryd.yaml (AI Agent & MCP)"
          language="yaml"
          code={`name: ai-agent-workspace
working_directory: .

services:
  # Python MCP Tools Server exposes tools via SSE or stdio
  mcp-tools:
    directory: mcp-server
    command: uv run python server.py --port 9000
    port: 9000
    watch:
      - "tools/**"
      - "server.py"

  # Core Agent Orchestrator connects LLM and tools
  orchestrator:
    directory: orchestrator
    command: go run . --ollama-url=http://localhost:11434 --mcp=http://localhost:9000
    port: 8080
    depends_on:
      - mcp-tools
      - ollama

  # Web Chat UI
  chat-frontend:
    directory: web
    command: pnpm dev
    port: 5173
    env:
      NEXT_PUBLIC_ORCHESTRATOR_URL: "http://localhost:8080"
    depends_on:
      - orchestrator

# Sidecars for local AI persistence and weights
dependencies:
  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
    volumes:
      - ./data/ollama-models:/root/.ollama

  chromadb:
    image: chromadb/chroma:latest
    ports: ["8000:8000"]
    volumes:
      - ./data/chroma:/chroma/chroma`}
        />

        <AlertBox type="tip" title="Instant Webhook Verification">
          When integrating your local MCP agent with external webhook callbacks (e.g. Slack bot events or GitHub webhooks), press <kbd className="px-1 py-0.5 bg-[#171615] border border-[#302C2A] rounded font-mono text-xs">t</kbd> on the orchestrator service to get an instant public Cloudflare HTTPS URL.
        </AlertBox>
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
          Manage an asynchronous polyglot stack combining Rust, Go, Node.js, and RabbitMQ without opening multiple terminals:
        </p>

        <CodeBlock
          title="gryd.yaml (Polyglot Microservices)"
          language="yaml"
          code={`name: commerce-platform
working_directory: .

services:
  gateway:
    directory: services/gateway
    command: cargo run
    port: 8000

  catalog-service:
    directory: services/catalog
    command: go run .
    port: 8001
    depends_on:
      - rabbitmq

  orders-service:
    directory: services/orders
    command: node server.js
    port: 8002
    depends_on:
      - rabbitmq
      - catalog-service

  notifications-worker:
    directory: services/notifications
    command: python -m worker
    depends_on:
      - rabbitmq

dependencies:
  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    ports: 
      - "5672:5672"
      - "15672:15672"
    env:
      RABBITMQ_DEFAULT_USER: dev
      RABBITMQ_DEFAULT_PASS: devpassword`}
        />
      </div>
    ),
  },

  'cicd-integration': {
    title: 'GitHub Actions & Automation',
    category: 'CI/CD & Troubleshooting',
    description: 'Integrate deterministic pre-flight boot verification into continuous integration workflows.',
    render: () => (
      <div className="space-y-6">
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Traditional CI pipelines run unit tests, but often miss configuration deadlocks, missing environment variables, and early boot panics that only appear when services are booted together.
        </p>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          Adding <code className="text-[#F0E6E2] font-mono">gryd test</code> to your GitHub Actions workflow guarantees that all services and database dependencies boot cleanly:
        </p>

        <CodeBlock
          title=".github/workflows/verify-stack.yml"
          language="yaml"
          code={`name: Pre-Flight Stack Verification

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.21'

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: |
          pip install -r api/requirements.txt
          cd web && npm ci

      - name: Install gryd
        run: |
          curl -fsSL https://raw.githubusercontent.com/Sidharth-Prabhu/homebrew-tap/main/install.sh | bash

      - name: Execute Pre-Flight Boot Test
        run: |
          # Boots stack, checks ports, outputs JSON, and terminates cleanly
          gryd test --json --timeout 30s`}
        />
      </div>
    ),
  },

  'troubleshooting': {
    title: 'Common Issues & FAQ',
    category: 'CI/CD & Troubleshooting',
    description: 'Diagnostic resolutions for port deadlocks, container socket permissions, and unclean shutdowns.',
    render: () => (
      <div className="space-y-6">
        <h3 className="text-lg font-normal text-[#F0E6E2]">1. Port conflict: External process occupying target port</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Symptom:</strong> <code className="text-rose-400 font-mono">Error: port :8000 is occupied by PID 12450 (system apache/nginx)</code>.
        </p>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Resolution:</strong> Run <code className="text-[#F0E6E2] font-mono">gryd ports</code> to audit which process owns the port. If it is an unmanaged system daemon, either stop that daemon or update the <code className="text-[#F0E6E2] font-mono">port</code> value inside <code className="text-[#F0E6E2] font-mono">gryd.yaml</code>.
        </p>

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">2. Docker / Podman daemon connectivity error</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Symptom:</strong> <code className="text-rose-400 font-mono">Error: no container runtime (docker or podman) is installed or responsive</code>.
        </p>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Resolution:</strong> Confirm that Docker Desktop, OrbStack, or Podman machine is running. On Linux, ensure your user is added to the <code className="font-mono text-xs">docker</code> group:
        </p>
        <CodeBlock
          title="Add User to Docker Group"
          language="bash"
          code={`sudo usermod -aG docker $USER\nnewgrp docker`}
        />

        <h3 className="text-lg font-normal text-[#F0E6E2] pt-4">3. Unclean system shutdown or stale daemon socket</h3>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Symptom:</strong> <code className="text-rose-400 font-mono">gryd look: socket ~/.gryd/run/app.sock: connection refused</code>.
        </p>
        <p className="text-sm text-[#A9A19E] leading-relaxed">
          <strong className="text-[#F0E6E2]">Resolution:</strong> If an unexpected OS crash or battery death occurred, run <code className="text-[#F0E6E2] font-mono">gryd stop</code> or remove stale socket files directly:
        </p>
        <CodeBlock
          title="Clean Stale Sockets"
          language="bash"
          code={`gryd stop --all\n# Or manual purge:\nrm -f ~/.gryd/run/*.sock`}
        />
      </div>
    ),
  },
};
