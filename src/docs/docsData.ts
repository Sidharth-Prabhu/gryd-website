export interface DocSection {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string; // Markdown / structured HTML
  subsections?: { id: string; title: string }[];
}

export interface DocCategory {
  id: string;
  title: string;
  sections: { id: string; title: string }[];
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    sections: [
      { id: 'overview', title: 'Overview & Philosophy' },
      { id: 'installation', title: 'Installation' },
      { id: 'quickstart', title: 'Quick Start Tutorial' },
      { id: 'architecture', title: 'Core Architecture & Safety' },
    ],
  },
  {
    id: 'configuration',
    title: 'Configuration (gryd.yaml)',
    sections: [
      { id: 'config-overview', title: 'File Specification & Schema' },
      { id: 'config-services', title: 'Service Definitions' },
      { id: 'config-dependencies', title: 'Container Sidecars (Docker/Podman)' },
      { id: 'config-watcher', title: 'File Watching & Hot Reload' },
      { id: 'config-profiles', title: 'Environment Profiles' },
    ],
  },
  {
    id: 'cli-reference',
    title: 'CLI Reference',
    sections: [
      { id: 'cli-core', title: 'Core Lifecycle (run, look, stop)' },
      { id: 'cli-logs-status', title: 'Inspection (logs, status, ports)' },
      { id: 'cli-testing', title: 'Pre-Flight Testing (test)' },
      { id: 'cli-tunnel', title: 'Public Tunneling (tunnel)' },
      { id: 'cli-service-ipc', title: 'Remote Socket IPC (service)' },
      { id: 'cli-version-control', title: 'Version Control (vc)' },
      { id: 'cli-maintenance', title: 'Updates & Maintenance' },
    ],
  },
  {
    id: 'tui-manual',
    title: 'Interactive TUI Manual',
    sections: [
      { id: 'tui-overview', title: 'Dashboard Navigation & Badges' },
      { id: 'tui-search-filters', title: 'Live Search & Log Filtering' },
      { id: 'tui-json-markers', title: 'Structured JSON & Visual Markers' },
      { id: 'tui-tree-telemetry', title: 'Process Tree & Resource Telemetry' },
      { id: 'tui-hotkeys', title: 'Keyboard Shortcuts Cheat Sheet' },
    ],
  },
  {
    id: 'recipes',
    title: 'Architecture Recipes',
    sections: [
      { id: 'recipe-fullstack', title: 'Full-Stack (FastAPI + React + DB)' },
      { id: 'recipe-ai-mcp', title: 'AI Platform & MCP Servers' },
      { id: 'recipe-microservices', title: 'Microservices & Message Queues' },
    ],
  },
  {
    id: 'ci-troubleshooting',
    title: 'CI/CD & Troubleshooting',
    sections: [
      { id: 'cicd-integration', title: 'GitHub Actions & Automation' },
      { id: 'troubleshooting', title: 'Common Issues & FAQ' },
    ],
  },
];
