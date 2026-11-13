import React from 'react';
import { 
  Zap, 
  Check, 
  Copy, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-lg border border-[#302C2A] bg-[#171615] overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#302C2A] bg-[#191716] text-xs font-mono text-[#A9A19E]">
          <span>{title}</span>
          <span className="text-[10px] text-[#77716E] uppercase">{language}</span>
        </div>
      )}
      <div className="relative p-4 bg-[#141212] overflow-x-auto">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-1.5 rounded bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] text-[#A9A19E] hover:text-[#F0E6E2] transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
        <pre className="font-mono text-xs sm:text-sm text-[#F0E6E2] leading-relaxed selection:bg-[#FF5A1F] selection:text-[#141212]">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

export const AlertBox: React.FC<{
  type?: 'note' | 'tip' | 'warning' | 'caution';
  title?: string;
  children: React.ReactNode;
}> = ({ type = 'note', title, children }) => {
  const styles = {
    note: 'border-blue-900/50 bg-blue-950/20 text-blue-200',
    tip: 'border-emerald-900/50 bg-emerald-950/20 text-emerald-200',
    warning: 'border-amber-900/50 bg-amber-950/20 text-amber-200',
    caution: 'border-rose-900/50 bg-rose-950/20 text-rose-200',
  };

  const icons = {
    note: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
    tip: <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
    caution: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
  };

  return (
    <div className={`my-5 p-4 rounded-lg border ${styles[type]} flex items-start gap-3 text-xs sm:text-sm`}>
      {icons[type]}
      <div className="space-y-1">
        {title && <div className="font-semibold">{title}</div>}
        <div className="text-[#A9A19E] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export const ParamTable: React.FC<{
  headers: string[];
  rows: (string | React.ReactNode)[][];
}> = ({ headers, rows }) => {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[#302C2A] bg-[#171615]">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-[#191716] border-b border-[#302C2A] text-[#77716E]">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#302C2A] text-[#F0E6E2]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#191716]/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 font-sans text-xs">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
