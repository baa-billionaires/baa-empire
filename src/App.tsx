import React, { useState, useEffect } from 'react';
import { EcosystemProvider, useEcosystem } from './context/EcosystemContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Certificate } from './components/Certificate';
import { BaaLiveNewsHeader } from './components/BaaLiveNewsHeader';
import { AdminGate } from './components/AdminGate';

// Pages
import { HomePage } from './pages/HomePage';
import { AcademyPage } from './pages/AcademyPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LearnPage } from './pages/LearnPage';
import { UniversityPage } from './pages/UniversityPage';
import { DataCenterPage } from './pages/DataCenterPage';
import { ToolsPage } from './pages/ToolsPage';
import { EbooksPage } from './pages/EbooksPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { TutorDetailPage } from './pages/TutorDetailPage';
import { TutorEmbedPage } from './pages/TutorEmbedPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { FreePage } from './pages/FreePage';
import { TVPage } from './pages/TVPage';
import { TVLivePage } from './pages/TVLivePage';
import { TVStudioPage } from './pages/TVStudioPage';
import { TVWatchPage } from './pages/TVWatchPage';
import { BountiesPage } from './pages/BountiesPage';
import { MarketingCommandPage } from './pages/MarketingCommandPage';
import { SocialCommandPage } from './pages/SocialCommandPage';
import { WhatsAppBroadcastPage } from './pages/WhatsAppBroadcastPage';
import { WhatsAppCloserPage } from './pages/WhatsAppCloserPage';
import { WhatsAppContactsPage } from './pages/WhatsAppContactsPage';
import { AdminTranslationsPage } from './pages/AdminTranslationsPage';
import { CourseStudioPage } from './pages/CourseStudioPage';
import { BulkGenerateVideosPage } from './pages/BulkGenerateVideosPage';
import { UADCLab } from './pages/UADCLab';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { InvestorOnePagerPage } from './pages/InvestorOnePagerPage';
import { WalletPage } from './pages/WalletPage';

import { CertificateNFT } from './types';
import { ArrowLeft } from 'lucide-react';

function AppContent() {
  const { isAdmin } = useEcosystem();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-1');
  const [selectedTutorId, setSelectedTutorId] = useState<string>('tutor-1');
  const [selectedShowId, setSelectedShowId] = useState<string>('show-1');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateNFT | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync with browser hash / path if desired
  useEffect(() => {
    const handleHashChange = () => {
      // Check pathname first
      if (window.location.pathname === '/investor-one-pager' || window.location.pathname === '/investor-one-pager/') {
        setCurrentPage('investor-one-pager');
        return;
      }
      if (window.location.pathname === '/wallet' || window.location.pathname === '/wallet/') {
        setCurrentPage('wallet');
        return;
      }

      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash.startsWith('learn/')) {
          setSelectedCourseId(hash.replace('learn/', ''));
          setCurrentPage('learn');
        } else if (hash.startsWith('tutor/')) {
          setSelectedTutorId(hash.replace('tutor/', ''));
          setCurrentPage('tutor-detail');
        } else if (hash.startsWith('embed/tutor/')) {
          setSelectedTutorId(hash.replace('embed/tutor/', ''));
          setCurrentPage('embed-tutor');
        } else if (hash.startsWith('show/')) {
          setSelectedShowId(hash.replace('show/', ''));
          setCurrentPage('tv-watch');
        } else if (hash === 'admin') {
          setCurrentPage('admin');
        } else if ([
          'home', 'wallet', 'uadc-lab', 'investor-one-pager', 'about', 'partners', 'academy', 'university', 'datacenter', 'tools', 'ebooks', 
          'marketplace', 'dashboard', 'free', 'tv', 'tv-live', 'tv-studio',
          'bounties', 'marketing', 'social', 'whatsapp-broadcast', 
          'whatsapp-closer', 'whatsapp-contacts', 'translations', 
          'course-studio', 'bulk-videos'
        ].includes(hash)) {
          setCurrentPage(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-detail');
    window.location.hash = `course/${courseId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('learn');
    window.location.hash = `learn/${courseId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    setCurrentPage('tutor-detail');
    window.location.hash = `tutor/${tutorId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWatchShow = (showId: string) => {
    setSelectedShowId(showId);
    setCurrentPage('tv-watch');
    window.location.hash = `show/${showId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCertificate = (cert: CertificateNFT) => {
    setSelectedCertificate(cert);
    setCurrentPage('certificate-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in pure iframe embed mode:
  if (currentPage === 'embed-tutor') {
    return <TutorEmbedPage tutorId={selectedTutorId} />;
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans">
      {/* Top Autonomous Live Breaking Video News & Headlines Header */}
      <BaaLiveNewsHeader onNavigate={handleNav} />

      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNav}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={handleNav}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentPage === 'academy' && (
          <AcademyPage
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentPage === 'course-detail' && (
          <CourseDetailPage
            courseId={selectedCourseId}
            onBack={() => handleNav('academy')}
            onStartLearning={handleStartLearning}
          />
        )}

        {currentPage === 'learn' && (
          <LearnPage
            courseId={selectedCourseId}
            onBack={() => handleNav('academy')}
            onNavigateToMarketplace={() => handleNav('marketplace')}
          />
        )}

        {currentPage === 'university' && (
          <UniversityPage
            onNavigateToAcademy={() => handleNav('academy')}
          />
        )}

        {currentPage === 'wallet' && (
          <WalletPage onNavigate={handleNav} />
        )}

        {currentPage === 'uadc-lab' && (
          <UADCLab />
        )}

        {currentPage === 'investor-one-pager' && (
          <InvestorOnePagerPage onBack={() => handleNav('home')} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNav} />
        )}

        {currentPage === 'partners' && (
          <PartnersPage onNavigate={handleNav} />
        )}

        {currentPage === 'datacenter' && (
          <DataCenterPage />
        )}

        {currentPage === 'tools' && (
          <ToolsPage />
        )}

        {currentPage === 'ebooks' && (
          <EbooksPage />
        )}

        {currentPage === 'marketplace' && (
          <MarketplacePage
            onSelectTutor={handleSelectTutor}
            onSelectCertificate={handleSelectCertificate}
          />
        )}

        {currentPage === 'tutor-detail' && (
          <TutorDetailPage
            tutorId={selectedTutorId}
            onBack={() => handleNav('marketplace')}
            onViewCertificate={handleSelectCertificate}
          />
        )}

        {/* AI TV Routes */}
        {currentPage === 'tv' && (
          <TVPage
            onWatchShow={handleWatchShow}
            onOpenLive={() => handleNav('tv-live')}
            onOpenStudio={() => handleNav('tv-studio')}
          />
        )}

        {currentPage === 'tv-live' && (
          <TVLivePage
            onBack={() => handleNav('tv')}
          />
        )}

        {currentPage === 'tv-studio' && (
          <TVStudioPage
            onBack={() => handleNav('tv')}
          />
        )}

        {currentPage === 'tv-watch' && (
          <TVWatchPage
            showId={selectedShowId}
            onBack={() => handleNav('tv')}
            onCloneShow={() => handleNav('tv-studio')}
          />
        )}

        {/* Bounties & Learn-to-Own */}
        {currentPage === 'bounties' && (
          <BountiesPage />
        )}

        {/* Autonomous Admin Command Routes (Guarded for Admins Only) */}
        {currentPage === 'marketing' && (
          isAdmin ? (
            <MarketingCommandPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="Marketing Command Center (Multi-Channel Ads)"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('marketing')}
            />
          )
        )}

        {currentPage === 'social' && (
          isAdmin ? (
            <SocialCommandPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="Social Media Autopilot (AI Viral Poster)"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('social')}
            />
          )
        )}

        {currentPage === 'whatsapp-broadcast' && (
          isAdmin ? (
            <WhatsAppBroadcastPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="WhatsApp Mass Broadcast Console"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('whatsapp-broadcast')}
            />
          )
        )}

        {currentPage === 'whatsapp-closer' && (
          isAdmin ? (
            <WhatsAppCloserPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="WhatsApp 24/7 AI Closer Bot"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('whatsapp-closer')}
            />
          )
        )}

        {currentPage === 'whatsapp-contacts' && (
          isAdmin ? (
            <WhatsAppContactsPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="WhatsApp Scraper &amp; Verified CRM"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('whatsapp-contacts')}
            />
          )
        )}

        {currentPage === 'translations' && (
          isAdmin ? (
            <AdminTranslationsPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="Pan-African AI Course Translator"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('translations')}
            />
          )
        )}

        {currentPage === 'course-studio' && (
          isAdmin ? (
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin Vault</span>
              </button>
              <CourseStudioPage />
            </div>
          ) : (
            <AdminGate
              targetFeatureName="AI Video Course Studio"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('course-studio')}
            />
          )
        )}

        {currentPage === 'bulk-videos' && (
          isAdmin ? (
            <BulkGenerateVideosPage onBack={() => handleNav('admin')} />
          ) : (
            <AdminGate
              targetFeatureName="Bulk 100 Course Video Generator"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('bulk-videos')}
            />
          )
        )}

        {currentPage === 'certificate-view' && selectedCertificate && (
          <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto mb-6">
              <button
                onClick={() => handleNav('marketplace')}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FFD700] transition font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Marketplace</span>
              </button>
            </div>
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                ON-CHAIN PROOF OF MASTERY
              </span>
              <h1 className="text-3xl font-heading font-black text-white mt-1">
                Verified Sovereign Certificate
              </h1>
            </div>
            <Certificate certificate={selectedCertificate} showActions={true} />
          </div>
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onContinueCourse={handleStartLearning}
            onNavigateToAcademy={() => handleNav('academy')}
            onNavigateToMarketplace={() => handleNav('marketplace')}
          />
        )}

        {currentPage === 'admin' && (
          isAdmin ? (
            <AdminPage onNavigate={handleNav} />
          ) : (
            <AdminGate
              targetFeatureName="Admin Command Vault &amp; Sovereign Operations"
              onBackToPublic={() => handleNav('academy')}
              onSuccess={() => handleNav('admin')}
            />
          )
        )}

        {currentPage === 'free' && (
          <FreePage
            onNavigateToAcademy={() => handleNav('academy')}
          />
        )}
      </main>

      <Footer
        setCurrentPage={handleNav}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => handleNav('admin')}
      />
    </div>
  );
}

export default function App() {
  return (
    <EcosystemProvider>
      <AppContent />
    </EcosystemProvider>
  );
}
