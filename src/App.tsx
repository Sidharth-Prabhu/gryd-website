import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TuiSimulator } from './components/TuiSimulator';
import { BentoFeatures } from './components/BentoFeatures';
import { ConfigShowcase } from './components/ConfigShowcase';
import { CliReference } from './components/CliReference';
import { DownloadsSection } from './components/DownloadsSection';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'docs'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash.startsWith('#docs') || window.location.pathname === '/docs') {
        return 'docs';
      }
    }
    return 'landing';
  });

  const [initialDocSection, setInitialDocSection] = useState<string>('overview');

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#docs')) {
        const section = hash.replace('#docs/', '');
        if (section && section !== '#docs') {
          setInitialDocSection(section);
        }
        setCurrentView('docs');
      } else if (currentView === 'docs' && !hash.startsWith('#docs')) {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [currentView]);

  const navigateToDocs = (sectionId: string = 'overview') => {
    setInitialDocSection(sectionId);
    setCurrentView('docs');
    window.location.hash = `docs/${sectionId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('landing');
    if (window.location.hash.startsWith('#docs')) {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDownloads = () => {
    if (currentView === 'docs') {
      navigateToHome();
      setTimeout(() => {
        document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('downloads');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTui = () => {
    const el = document.getElementById('tui-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'docs') {
    return (
      <Documentation 
        onBackToHome={navigateToHome} 
        initialSectionId={initialDocSection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#141212] text-[#F0E6E2] flex flex-col selection:bg-[#FF5A1F] selection:text-[#141212]">
      <Navbar 
        onDownloadClick={scrollToDownloads} 
        onDocsClick={() => navigateToDocs('overview')}
        onHomeClick={navigateToHome}
        isDocsPage={false}
      />
      
      <main className="flex-1">
        <Hero 
          onExploreClick={scrollToTui} 
          onDownloadClick={scrollToDownloads} 
        />
        <TuiSimulator />
        <BentoFeatures />
        <ConfigShowcase />
        <CliReference />
        <DownloadsSection />
      </main>

      <Footer onDocsClick={() => navigateToDocs('overview')} />
    </div>
  );
};

export default App;
