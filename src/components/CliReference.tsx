import React, { useState } from 'react';
import { CLI_COMMANDS, TUI_SHORTCUTS } from '../data/mockData';
import { Terminal, Keyboard, Copy, Check } from 'lucide-react';

export const CliReference: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = ['All', 'Core', 'Safety & CI', 'Networking', 'IPC Daemon', 'Tools', 'System'];

  const filteredCommands = CLI_COMMANDS.filter(cmd => 
    selectedCategory === 'All' ? true : cmd.category === selectedCategory
  );

  const copyCommand = (cmdStr: string) => {
    navigator.clipboard.writeText(cmdStr);
    setCopiedCmd(cmdStr);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="cli" className="py-24 border-b border-[#302C2A] bg-[#141212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Command-Line &amp; TUI Reference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
            Precision commands for every developer workflow.
          </h2>
          <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
            Run, inspect, reload, test, and tunnel your services from the CLI or manipulate the live session using fast single-key TUI shortcuts.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#FF5A1F] text-[#141212] font-semibold'
                  : 'bg-[#171615] text-[#A9A19E] hover:text-[#F0E6E2] border border-[#302C2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CLI Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {filteredCommands.map(cmd => (
            <div
              key={cmd.name}
              className="p-5 bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] rounded-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-base font-semibold text-[#F0E6E2]">{cmd.name}</span>
                    <span className="text-xs text-[#77716E]">{cmd.args}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#191716] border border-[#302C2A] text-[#A9A19E] rounded">
                    {cmd.category}
                  </span>
                </div>
                
                <p className="text-xs text-[#A9A19E] leading-relaxed mb-4">
                  {cmd.description}
                </p>

                {cmd.flags.length > 0 && (
                  <div className="mb-4 pt-2 border-t border-[#302C2A]/60 space-y-1">
                    {cmd.flags.map(f => (
                      <div key={f.flag} className="flex items-start justify-between text-[11px] font-mono">
                        <span className="text-[#FF5A1F]">{f.flag}</span>
                        <span className="text-[#77716E] font-sans text-right max-w-[65%]">{f.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Example box with quick copy */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-2.5 bg-[#141212] border border-[#302C2A] rounded font-mono text-xs">
                  <span className="text-[#F0E6E2] truncate">{cmd.example}</span>
                  <button
                    onClick={() => copyCommand(cmd.example)}
                    className="ml-2 text-[#77716E] hover:text-[#F0E6E2] transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedCmd === cmd.example ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TUI Shortcuts Reference Table */}
        <div className="bg-[#171615] border border-[#302C2A] rounded-lg overflow-hidden shadow-xl">
          <div className="px-5 py-4 bg-[#191716] border-b border-[#302C2A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#FF5A1F]" />
              <h3 className="text-base font-normal text-[#F0E6E2]">Interactive TUI Keyboard Shortcut Cheat Sheet</h3>
            </div>
            <span className="text-xs font-mono text-[#77716E]">Active in 'gryd run' &amp; 'gryd look'</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#141212] text-[#77716E] border-b border-[#302C2A]">
                <tr>
                  <th className="py-2.5 px-5 w-24">Key</th>
                  <th className="py-2.5 px-5 w-44">Action</th>
                  <th className="py-2.5 px-5 font-sans">Behavior &amp; Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#302C2A] text-[#F0E6E2]">
                {TUI_SHORTCUTS.map(sc => (
                  <tr key={sc.key} className="hover:bg-[#191716]/60 transition-colors">
                    <td className="py-3 px-5">
                      <kbd className="px-2 py-1 bg-[#141212] border border-[#302C2A] rounded text-[#FF5A1F] font-bold">
                        {sc.key}
                      </kbd>
                    </td>
                    <td className="py-3 px-5 font-semibold text-[#F0E6E2]">
                      {sc.name}
                    </td>
                    <td className="py-3 px-5 text-[#A9A19E] font-sans text-xs">
                      {sc.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
