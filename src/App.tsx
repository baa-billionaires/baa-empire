import React, { useState, useEffect } from 'react';
import { EcosystemProvider, useEcosystem } from './context/EcosystemContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Certificate } from './components/Certificate';

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
          'home', 'academy', 'university', 'datacenter', 'tools', 'ebooks', 
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

        {/* Autonomous Admin Command Routes */}
        {currentPage === 'marketing' && (
          <MarketingCommandPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'social' && (
          <SocialCommandPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'whatsapp-broadcast' && (
          <WhatsAppBroadcastPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'whatsapp-closer' && (
          <WhatsAppCloserPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'whatsapp-contacts' && (
          <WhatsAppContactsPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'translations' && (
          <AdminTranslationsPage
            onBack={() => handleNav('admin')}
          />
        )}

        {currentPage === 'course-studio' && (
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
        )}

        {currentPage === 'bulk-videos' && (
          <BulkGenerateVideosPage
            onBack={() => handleNav('admin')}
          />
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
          <AdminPage
            onNavigate={handleNav}
          />
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
