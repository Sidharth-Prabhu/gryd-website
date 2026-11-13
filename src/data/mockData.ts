export interface ServiceLog {
  id: string;
  time: string;
  service: 'backend' | 'frontend' | 'worker' | 'system';
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  isMarker?: boolean;
  jsonData?: Record<string, any>;
}

export const INITIAL_LOGS: ServiceLog[] = [
  {
    id: 'log-1',
    time: '20:00:12.104',
    service: 'system',
    level: 'INFO',
    message: 'gryd v0.3.0 initialized. Loading configuration from ./gryd.yaml',
  },
  {
    id: 'log-2',
    time: '20:00:12.118',
    service: 'system',
    level: 'INFO',
    message: 'Dependencies started: postgres:16-alpine (:5432) [HEALTHY], redis:7-alpine (:6379) [HEALTHY]',
  },
  {
    id: 'log-3',
    time: '20:00:12.145',
    service: 'backend',
    level: 'INFO',
    message: 'Starting uvicorn server on http://127.0.0.1:8000 (PID 48210, pgid 48210)',
    jsonData: { event: "startup", port: 8000, pid: 48210, env: "development" }
  },
  {
    id: 'log-4',
    time: '20:00:12.310',
    service: 'frontend',
    level: 'INFO',
    message: 'Vite v5.4.6 dev server running at: http://localhost:3000/ (network exposed)',
  },
  {
    id: 'log-5',
    time: '20:00:12.450',
    service: 'worker',
    level: 'INFO',
    message: 'Queue consumer connected to redis://localhost:6379/0. Waiting for tasks...',
    jsonData: { queue: "default", concurrency: 4, broker: "redis" }
  },
  {
    id: 'log-6',
    time: '20:00:13.020',
    service: 'backend',
    level: 'INFO',
    message: 'GET /api/v1/health -> 200 OK (0.84ms)',
    jsonData: { method: "GET", path: "/api/v1/health", status: 200, duration_ms: 0.84 }
  },
  {
    id: 'log-7',
    time: '20:00:14.210',
    service: 'frontend',
    level: 'DEBUG',
    message: 'HMR update /src/components/Dashboard.tsx (1 module invalidated)',
  },
  {
    id: 'log-8',
    time: '20:00:15.540',
    service: 'worker',
    level: 'INFO',
    message: 'Processed job #8942: invoice.generate completed in 142ms',
    jsonData: { job_id: "8942", task: "invoice.generate", status: "success", latency_ms: 142 }
  },
  {
    id: 'log-9',
    time: '20:00:16.890',
    service: 'backend',
    level: 'WARN',
    message: 'Cache miss on key: user:session:9941. Falling back to primary DB.',
    jsonData: { key: "user:session:9941", action: "cache_miss", source: "database" }
  },
  {
    id: 'log-10',
    time: '20:00:17.100',
    service: 'backend',
    level: 'ERROR',
    message: 'POST /api/v1/webhooks/stripe -> 400 Bad Request: Invalid signature header',
    jsonData: { method: "POST", path: "/api/v1/webhooks/stripe", status: 400, err: "missing_signature" }
  }
];

export const CONFIG_EXAMPLES = {
  fullstack: `name: my-app
working_directory: .

services:
  backend:
    directory: api
    command: uvicorn main:app --reload --port 8000
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

  frontend:
    directory: web
    command: npm run dev
    port: 3000
    depends_on:
      - backend
    watch:
      - "src/**"
      - "public/**"

  worker:
    directory: workers
    command: python queue_consumer.py
    env_file: .env.worker
    depends_on:
      - backend

# Automatic Container Sidecars
dependencies:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    env:
      POSTGRES_DB: dev_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

profiles:
  api-only:
    services: [backend]
  full:
    services: [backend, frontend, worker]`,

  aiMcp: `name: ai-agent-platform
working_directory: .

services:
  mcp-server:
    directory: mcp
    command: uv run python -m server.main
    port: 9000
    watch:
      - "server/**"
      - "tools/**"

  agent-orchestrator:
    directory: backend
    command: go run cmd/orchestrator/main.go
    port: 8080
    depends_on:
      - mcp-server
    env:
      MODEL_ENDPOINT: "http://localhost:11434"

  chat-ui:
    directory: frontend
    command: pnpm dev
    port: 5173
    depends_on:
      - agent-orchestrator

dependencies:
  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
    volumes:
      - ./data/ollama:/root/.ollama

profiles:
  light:
    services: [mcp-server, agent-orchestrator]
  full:
    services: [mcp-server, agent-orchestrator, chat-ui]`,

  microservices: `name: commerce-platform
working_directory: .

services:
  gateway:
    directory: services/gateway
    command: cargo run
    port: 8000

  catalog:
    directory: services/catalog
    command: go run .
    port: 8001
    depends_on:
      - gateway

  orders:
    directory: services/orders
    command: npm run start:dev
    port: 8002
    depends_on:
      - catalog

dependencies:
  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    ports: ["5672:5672", "15672:15672"]`
};

export const CLI_COMMANDS = [
  {
    name: 'gryd run',
    args: '[project]',
    category: 'Core',
    description: 'Boots all configured services concurrently and enters the responsive TUI dashboard.',
    example: 'gryd run --profile api-only',
    flags: [
      { flag: '-p, --profile <name>', desc: 'Launch specified service profile subset' },
      { flag: '-d, --detach', desc: 'Run services in background daemon mode' },
      { flag: '-c, --config <path>', desc: 'Path to custom config (default gryd.yaml)' }
    ]
  },
  {
    name: 'gryd look',
    args: '[project]',
    category: 'Core',
    description: 'Attaches the interactive TUI dashboard to an active background gryd daemon session.',
    example: 'gryd look',
    flags: []
  },
  {
    name: 'gryd test',
    args: '[project]',
    category: 'Safety & CI',
    description: 'Performs pre-flight verification: boots services, checks port bindings, and cleanly terminates.',
    example: 'gryd test --json',
    flags: [
      { flag: '--json', desc: 'Output machine-readable JSON for CI integration' },
      { flag: '--timeout <sec>', desc: 'Maximum seconds to wait for port readiness' }
    ]
  },
  {
    name: 'gryd stop',
    args: '[project]',
    category: 'Core',
    description: 'Terminates all process groups (SIGTERM/SIGKILL) and verifies all ports are freed.',
    example: 'gryd stop',
    flags: []
  },
  {
    name: 'gryd restart',
    args: '[project]',
    category: 'Core',
    description: 'Hard-terminates all processes, purges stale ports, and restarts the environment cleanly.',
    example: 'gryd restart',
    flags: []
  },
  {
    name: 'gryd reload',
    args: '[project]',
    category: 'Core',
    description: 'Gracefully reloads application services in-place without destroying container sidecars.',
    example: 'gryd reload',
    flags: []
  },
  {
    name: 'gryd tunnel',
    args: '<service>',
    category: 'Networking',
    description: 'Exposes local service port to a public HTTPS URL (via Cloudflare, ngrok, or localtunnel).',
    example: 'gryd tunnel backend',
    flags: [
      { flag: '--provider <name>', desc: 'Tunnel provider (cloudflare, ngrok, localtunnel)' }
    ]
  },
  {
    name: 'gryd service',
    args: '<cmd> <svc>',
    category: 'IPC Daemon',
    description: 'Interacts with running services via Unix socket / Named Pipe IPC daemon.',
    example: 'gryd service restart backend',
    flags: [
      { flag: 'restart <svc>', desc: 'Restart a specific service' },
      { flag: 'stop <svc>', desc: 'Stop a specific service' },
      { flag: 'exec <svc> -- <cmd>', desc: 'Execute command in service context' }
    ]
  },
  {
    name: 'gryd vc',
    args: '[action]',
    category: 'Tools',
    description: 'Integrated interactive Git branch selector, quick commit/push, and merge manager.',
    example: 'gryd vc push -m "feat: new api"',
    flags: []
  },
  {
    name: 'gryd update',
    args: '',
    category: 'System',
    description: 'Checks GitHub releases, self-updates the binary in-place, and verifies the new build.',
    example: 'gryd update',
    flags: []
  }
];

export const TUI_SHORTCUTS = [
  { key: '/', name: 'Live Search', desc: 'Filter logs instantly with plain text or regex. Esc to exit.' },
  { key: 'l', name: 'Level Cycle', desc: 'Cycle log filters: ALL → ERROR → WARN → INFO → ALL.' },
  { key: 'J', name: 'JSON Mode', desc: 'Toggle structured JSON view: compact → pretty → raw.' },
  { key: 'm', name: 'Visual Marker', desc: 'Drop high-visibility timestamp divider into the stream.' },
  { key: 't', name: 'Tunnel Toggle', desc: 'Instantly spawn or destroy public HTTPS tunnel for service.' },
  { key: 'i / p', name: 'Process Tree', desc: 'Inspect child PIDs, threads, and memory allocations.' },
  { key: 'r', name: 'Hot Reload', desc: 'Reload active services without tearing down sidecars.' },
  { key: 'R', name: 'Hard Restart', desc: 'Hard kill process trees and boot project fresh.' },
  { key: 'c', name: 'Detach', desc: 'Detach TUI to background. Re-attach any time with gryd look.' },
  { key: 'q', name: 'Graceful Exit', desc: 'Kill all child processes, release ports, and exit safely.' },
];
