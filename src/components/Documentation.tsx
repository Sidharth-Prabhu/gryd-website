import React, { useState, useEffect } from 'react';
import { DOC_CATEGORIES } from '../docs/docsData';
import { DOC_ARTICLES } from '../docs/docsDataArticles';
import { 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface DocumentationProps {
  onBackToHome: () => void;
  initialSectionId?: string;
}

export const Documentation: React.FC<DocumentationProps> = ({ 
  onBackToHome,
  initialSectionId = 'overview'
}) => {
  const [activeId, setActiveId] = useState<string>(initialSectionId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Sync active section to URL hash so users can bookmark / share doc links
  useEffect(() => {
    if (window.location.hash.startsWith('#docs/')) {
      const hashId = window.location.hash.replace('#docs/', '');
      if (DOC_ARTICLES[hashId]) {
        setActiveId(hashId);
      }
    }
  }, []);

  const handleSelectSection = (id: string) => {
    setActiveId(id);
    window.location.hash = `docs/${id}`;
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find previous and next articles for pagination
  const allSectionIds: string[] = [];
  DOC_CATEGORIES.forEach(cat => {
    cat.sections.forEach(sec => allSectionIds.push(sec.id));
  });

  const currentIndex = allSectionIds.indexOf(activeId);
  const prevId = currentIndex > 0 ? allSectionIds[currentIndex - 1] : null;
  const nextId = currentIndex < allSectionIds.length - 1 ? allSectionIds[currentIndex + 1] : null;

  const currentArticle = DOC_ARTICLES[activeId] || DOC_ARTICLES['overview'];

  // Filter categories and topics based on search
  const filteredCategories = DOC_CATEGORIES.map(cat => {
    const matchingSections = cat.sections.filter(sec => {
      const q = searchQuery.toLowerCase();
      const inTitle = sec.title.toLowerCase().includes(q);
      const article = DOC_ARTICLES[sec.id];
      const inDesc = article ? article.description.toLowerCase().includes(q) : false;
      return inTitle || inDesc;
    });
    return {
      ...cat,
      sections: matchingSections,
    };
  }).filter(cat => cat.sections.length > 0);

  return (
    <div className="min-h-screen bg-[#141212] text-[#F0E6E2] flex flex-col selection:bg-[#FF5A1F] selection:text-[#141212]">
      
      {/* Docs Header Bar */}
      <header className="sticky top-0 z-40 bg-[#141212]/95 backdrop-blur-md border-b border-[#302C2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A9A19E] hover:text-[#F0E6E2] transition-colors py-1 px-2 rounded bg-[#171615] border border-[#302C2A] hover:border-[#423D3A]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Landing</span>
              </button>

              <span className="hidden sm:inline-block text-[#302C2A]">|</span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FF5A1F]">
                  DOCUMENTATION
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#171615] border border-[#302C2A] text-[#77716E]">
                  v0.3.0
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Sidharth-Prabhu/gryd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A9A19E] hover:text-[#F0E6E2] px-2.5 py-1 rounded bg-[#171615] border border-[#302C2A] hover:border-[#423D3A] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {/* Mobile Sidebar toggle */}
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-1.5 rounded bg-[#171615] border border-[#302C2A] text-[#A9A19E] hover:text-[#F0E6E2]"
                aria-label="Toggle docs navigation"
              >
                {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Documentation Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-10">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#77716E]" />
            <input
              type="text"
              placeholder="Search docs (/)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171615] border border-[#302C2A] rounded px-3 py-2 pl-9 text-xs font-mono text-[#F0E6E2] placeholder-[#77716E] focus:outline-none focus:border-[#FF5A1F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-[#77716E] hover:text-[#F0E6E2]"
              >
                ×
              </button>
            )}
          </div>

          {/* Categorized Topic Tree */}
          <nav className="space-y-6 font-mono text-xs">
            {filteredCategories.map(cat => (
              <div key={cat.id} className="space-y-1.5">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-[#77716E] px-2 mb-2">
                  {cat.title}
                </div>
                <ul className="space-y-0.5">
                  {cat.sections.map(sec => {
                    const isActive = sec.id === activeId;
                    return (
                      <li key={sec.id}>
                        <button
                          onClick={() => handleSelectSection(sec.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-[#171615] text-[#FF5A1F] font-semibold border-l-2 border-[#FF5A1F] pl-2'
                              : 'text-[#A9A19E] hover:text-[#F0E6E2] hover:bg-[#171615]/60'
                          }`}
                        >
                          <span className="truncate">{sec.title}</span>
                          {isActive && <ChevronRight className="w-3 h-3 text-[#FF5A1F] shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#171615] border-r border-[#302C2A] p-5 flex flex-col gap-5 overflow-y-auto z-10">
              <div className="flex items-center justify-between pb-3 border-b border-[#302C2A]">
                <span className="text-xs font-mono font-semibold uppercase text-[#F0E6E2]">Topics Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded text-[#77716E] hover:text-[#F0E6E2]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#77716E]" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141212] border border-[#302C2A] rounded px-3 py-2 pl-9 text-xs font-mono text-[#F0E6E2] placeholder-[#77716E] focus:outline-none"
                />
              </div>

              <nav className="space-y-6 font-mono text-xs">
                {filteredCategories.map(cat => (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="text-[11px] font-semibold uppercase text-[#77716E] px-2 mb-1.5">
                      {cat.title}
                    </div>
                    <ul className="space-y-1">
                      {cat.sections.map(sec => {
                        const isActive = sec.id === activeId;
                        return (
                          <li key={sec.id}>
                            <button
                              onClick={() => handleSelectSection(sec.id)}
                              className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                                isActive
                                  ? 'bg-[#141212] text-[#FF5A1F] font-semibold border-l-2 border-[#FF5A1F]'
                                  : 'text-[#A9A19E] hover:text-[#F0E6E2]'
                              }`}
                            >
                              {sec.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Center Main Documentation Article */}
        <main className="flex-1 min-w-0 max-w-4xl pb-24">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#77716E] mb-4">
            <button onClick={onBackToHome} className="hover:text-[#A9A19E] transition-colors">
              Docs
            </button>
            <span>/</span>
            <span className="text-[#A9A19E]">{currentArticle.category}</span>
            <span>/</span>
            <span className="text-[#F0E6E2] font-semibold">{currentArticle.title}</span>
          </div>

          {/* Article Header */}
          <div className="border-b border-[#302C2A] pb-8 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider mb-2">
              <span>{currentArticle.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F0E6E2]">
              {currentArticle.title}
            </h1>
            <p className="text-base text-[#A9A19E] mt-3 leading-relaxed">
              {currentArticle.description}
            </p>
          </div>

          {/* Article Render Content */}
          <div className="prose prose-invert max-w-none">
            {currentArticle.render()}
          </div>

          {/* Article Bottom Pagination (Prev / Next) */}
          <div className="mt-16 pt-8 border-t border-[#302C2A] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevId ? (
              <button
                onClick={() => handleSelectSection(prevId)}
                className="p-4 rounded-lg border border-[#302C2A] hover:border-[#423D3A] bg-[#171615] text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#77716E] group-hover:text-[#A9A19E]">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </div>
                <div className="text-sm font-normal text-[#F0E6E2] group-hover:text-[#FF5A1F] transition-colors mt-1">
                  {DOC_ARTICLES[prevId]?.title}
                </div>
              </button>
            ) : <div />}

            {nextId && (
              <button
                onClick={() => handleSelectSection(nextId)}
                className="p-4 rounded-lg border border-[#302C2A] hover:border-[#423D3A] bg-[#171615] text-right transition-all group sm:col-start-2"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-[#77716E] group-hover:text-[#A9A19E]">
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-normal text-[#F0E6E2] group-hover:text-[#FF5A1F] transition-colors mt-1">
                  {DOC_ARTICLES[nextId]?.title}
                </div>
              </button>
            )}
          </div>

        </main>

        {/* Right Sidebar: Helpful Links & Meta */}
        <div className="hidden xl:block w-48 shrink-0 space-y-6 sticky top-20 self-start text-xs font-mono">
          <div className="space-y-3 p-4 rounded-lg border border-[#302C2A] bg-[#171615]">
            <div className="text-[#F0E6E2] font-semibold text-[11px] uppercase tracking-wider">
              Quick Resources
            </div>
            <ul className="space-y-2 text-[#A9A19E]">
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/gryd/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between"
                >
                  <span>Report an Issue</span>
                  <ExternalLink className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Sidharth-Prabhu/homebrew-tap"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between"
                >
                  <span>Homebrew Formula</span>
                  <ExternalLink className="w-3 h-3 text-[#77716E]" />
                </a>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-[#302C2A]/60 bg-[#141212] text-[#77716E] text-[11px] leading-relaxed">
            Need help with a complex profile? Refer to the <button onClick={() => handleSelectSection('recipe-fullstack')} className="text-[#FF5A1F] underline">Architecture Recipes</button> section.
          </div>
        </div>

      </div>

    </div>
  );
};
