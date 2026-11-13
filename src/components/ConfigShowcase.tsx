import React, { useState } from 'react';
import { CONFIG_EXAMPLES } from '../data/mockData';
import { Copy, Check, FileCode } from 'lucide-react';

export const ConfigShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'aiMcp' | 'microservices'>('fullstack');
  const [copied, setCopied] = useState(false);

  const copyYaml = () => {
    navigator.clipboard.writeText(CONFIG_EXAMPLES[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="config" className="py-24 border-b border-[#302C2A] bg-[#141212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
            <FileCode className="w-3.5 h-3.5" />
            <span>Declarative Configuration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
            One simple YAML file. Zero runtime scripts.
          </h2>
          <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
            Configure your entire stack in <code className="text-[#F0E6E2] font-mono text-sm">gryd.yaml</code>. 
            Define services, ports, environment variables, hot-reload patterns, container sidecars, and deployment profiles.
          </p>
        </div>

        {/* Configuration Viewer Frame */}
        <div className="bg-[#171615] border border-[#302C2A] rounded-lg overflow-hidden shadow-2xl">
          
          {/* Tabs & Copy Action */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#191716] border-b border-[#302C2A] gap-3">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('fullstack')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  activeTab === 'fullstack'
                    ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                    : 'text-[#77716E] hover:text-[#A9A19E]'
                }`}
              >
                Full-Stack (API + Web + DB)
              </button>
              <button
                onClick={() => setActiveTab('aiMcp')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  activeTab === 'aiMcp'
                    ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                    : 'text-[#77716E] hover:text-[#A9A19E]'
                }`}
              >
                AI &amp; MCP Servers
              </button>
              <button
                onClick={() => setActiveTab('microservices')}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  activeTab === 'microservices'
                    ? 'bg-[#141212] text-[#F0E6E2] border border-[#302C2A]'
                    : 'text-[#77716E] hover:text-[#A9A19E]'
                }`}
              >
                Microservices &amp; Gateway
              </button>
            </div>

            <button
              onClick={copyYaml}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#A9A19E] hover:text-[#F0E6E2] bg-[#141212] hover:bg-[#171615] border border-[#302C2A] rounded transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copied gryd.yaml</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy YAML</span>
                </>
              )}
            </button>
          </div>

          {/* YAML Code Area */}
          <div className="p-5 bg-[#141212] overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-[#F0E6E2] leading-relaxed selection:bg-[#FF5A1F] selection:text-[#141212]">
              {CONFIG_EXAMPLES[activeTab]}
            </pre>
          </div>

          {/* Configuration Schema Explainer Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-[#302C2A] bg-[#171615] text-xs font-mono divide-y md:divide-y-0 md:divide-x divide-[#302C2A]">
            <div className="p-4">
              <div className="text-[#FF5A1F] font-semibold mb-1">services.&lt;name&gt;</div>
              <p className="text-[#77716E] font-sans text-xs">
                Command, working directory, and port to monitor for readiness and conflict cleanup.
              </p>
            </div>
            <div className="p-4">
              <div className="text-[#FF5A1F] font-semibold mb-1">depends_on</div>
              <p className="text-[#77716E] font-sans text-xs">
                Ensures prerequisite services and databases are healthy before launching downstream apps.
              </p>
            </div>
            <div className="p-4">
              <div className="text-[#FF5A1F] font-semibold mb-1">watch &amp; ignore</div>
              <p className="text-[#77716E] font-sans text-xs">
                Declarative glob patterns for hot reloading with automatic 300ms debouncing.
              </p>
            </div>
            <div className="p-4">
              <div className="text-[#FF5A1F] font-semibold mb-1">profiles</div>
              <p className="text-[#77716E] font-sans text-xs">
                Run targeted subsets of your stack (e.g. <code className="text-[#F0E6E2]">--profile api-only</code>) on lightweight machines.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
