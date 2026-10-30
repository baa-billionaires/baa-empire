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
import { AIWorkforcePage } from './pages/AIWorkforcePage';
import { OmniAdGrowthPage } from './pages/OmniAdGrowthPage';
import { ExchangePage } from './pages/ExchangePage';
import { ReferralHubPage } from './pages/ReferralHubPage';
import { ProjectsFundingPage } from './pages/ProjectsFundingPage';
import { GeneralMarketplacePage } from './pages/GeneralMarketplacePage';
import { AutonomousCyberEcoDashboard } from './components/AutonomousCyberEcoDashboard';
import { AutonomousGrowthMafiaPage } from './pages/AutonomousGrowthMafiaPage';
import { SpotlightNewsDrawer } from './components/SpotlightNewsDrawer';
import { AmbienceProvider } from './context/AmbienceContext';
import { AmbienceBackground } from './components/AmbienceBackground';
import { AmbienceCustomizerModal } from './components/AmbienceCustomizerModal';
import { GlobalLiveClassroomModal } from './components/GlobalLiveClassroomModal';

import { CertificateNFT } from './types';
import { ArrowLeft } from 'lucide-react';
import { ViewModeProvider } from './context/ViewModeContext';
import { DeviceViewportFrame } from './components/viewmodes/DeviceViewportFrame';
import { ComputerSmartReadingAssistant } from './components/viewmodes/ComputerSmartReadingAssistant';
import { ViewModeSwitcherBar } from './components/viewmodes/ViewModeSwitcherBar';

import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { UniversalPageNavigator } from './components/navigation/UniversalPageNavigator';
import { FloatingNavDock } from './components/navigation/FloatingNavDock';
import { AllPagesDirectoryModal } from './components/navigation/AllPagesDirectoryModal';

function AppContent() {
  const { isAdmin } = useEcosystem();
  const { currentPage, navigateTo } = useNavigation();

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
        navigateTo('investor-one-pager');
        return;
      }
      if (window.location.pathname === '/wallet' || window.location.pathname === '/wallet/') {
        navigateTo('wallet');
        return;
      }
      if (window.location.pathname === '/ai-workforce' || window.location.pathname === '/ai-workforce/') {
        navigateTo('ai-workforce');
        return;
      }
      if (window.location.pathname === '/omni-ad-swarm' || window.location.pathname === '/omni-ad-swarm/') {
        navigateTo('omni-ad-swarm');
        return;
      }
      if (window.location.pathname === '/exchange' || window.location.pathname === '/exchange/') {
        navigateTo('exchange');
        return;
      }
      if (window.location.pathname === '/cyber-eco' || window.location.pathname === '/cyber-eco/') {
        navigateTo('cyber-eco');
        return;
      }
      if (window.location.pathname === '/referrals' || window.location.pathname === '/referral-hub') {
        navigateTo('referrals');
        return;
      }
      if (window.location.pathname === '/projects' || window.location.pathname === '/funding') {
        navigateTo('projects');
        return;
      }
      if (window.location.pathname === '/general-marketplace' || window.location.pathname === '/general-market') {
        navigateTo('general-marketplace');
        return;
      }

      if (window.location.pathname === '/growth-mafia' || window.location.pathname === '/mafia' || window.location.pathname === '/growth') {
        navigateTo('growth-mafia');
        return;
      }

      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash.startsWith('learn/')) {
          setSelectedCourseId(hash.replace('learn/', ''));
          navigateTo('learn');
        } else if (hash.startsWith('tutor/')) {
          setSelectedTutorId(hash.replace('tutor/', ''));
          navigateTo('tutor-detail');
        } else if (hash.startsWith('embed/tutor/')) {
          setSelectedTutorId(hash.replace('embed/tutor/', ''));
          navigateTo('embed-tutor');
        } else if (hash.startsWith('show/')) {
          setSelectedShowId(hash.replace('show/', ''));
          navigateTo('tv-watch');
        } else if (hash === 'admin') {
          navigateTo('admin');
        } else if (hash === 'growth-mafia' || hash === 'mafia' || hash === 'growth') {
          navigateTo('growth-mafia');
        } else if (hash === 'referral-hub' || hash === 'referrals') {
          navigateTo('referrals');
        } else if (hash === 'funding' || hash === 'projects') {
          navigateTo('projects');
        } else if (hash === 'general-marketplace' || hash === 'general-market') {
          navigateTo('general-marketplace');
        } else if (hash === 'library') {
          navigateTo('ebooks');
        } else if ([
          'home', 'wallet', 'uadc-lab', 'investor-one-pager', 'about', 'partners', 'academy', 'university', 'datacenter', 'tools', 'ebooks', 'library',
          'marketplace', 'dashboard', 'free', 'tv', 'tv-live', 'tv-studio',
          'bounties', 'marketing', 'social', 'whatsapp-broadcast', 
          'whatsapp-closer', 'whatsapp-contacts', 'translations', 
          'course-studio', 'bulk-videos', 'ai-workforce', 'omni-ad-swarm', 'exchange', 'cyber-eco', 'referrals', 'projects', 'general-marketplace', 'growth-mafia', 'mafia'
        ].includes(hash)) {
          navigateTo(hash === 'library' ? 'ebooks' : (hash === 'mafia' ? 'growth-mafia' : hash));
        }
      }

    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateTo]);

  const handleNav = (page: string) => {
    navigateTo(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigateTo('course-detail');
    window.location.hash = `course/${courseId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigateTo('learn');
    window.location.hash = `learn/${courseId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    navigateTo('tutor-detail');
    window.location.hash = `tutor/${tutorId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWatchShow = (showId: string) => {
    setSelectedShowId(showId);
    navigateTo('tv-watch');
    window.location.hash = `show/${showId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCertificate = (cert: CertificateNFT) => {
    setSelectedCertificate(cert);
    navigateTo('certificate-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in pure iframe embed mode:
  if (currentPage === 'embed-tutor') {
    return <TutorEmbedPage tutorId={selectedTutorId} />;
  }

  return (
    <DeviceViewportFrame>
      <div className="min-h-screen text-slate-100 flex flex-col font-sans relative">
      {/* Dynamic Animated Canvas & Video Ambience Background */}
      <AmbienceBackground />

      {/* Top Autonomous Live Breaking Video News & Headlines Header */}
      <BaaLiveNewsHeader onNavigate={handleNav} />

      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNav}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Universal Sub-Header Navigation Bar: Back, Forward, Dashboard & All Pages Directory */}
      <UniversalPageNavigator />

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

        {currentPage === 'ai-workforce' && (
          <AIWorkforcePage />
        )}

        {currentPage === 'omni-ad-swarm' && (
          <OmniAdGrowthPage />
        )}

        {currentPage === 'growth-mafia' && (
          <AutonomousGrowthMafiaPage onNavigate={handleNav} />
        )}

        {currentPage === 'exchange' && (
          <ExchangePage />
        )}

        {currentPage === 'cyber-eco' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <AutonomousCyberEcoDashboard onNavigate={handleNav} />
          </div>
        )}

        {currentPage === 'referrals' && (
          <ReferralHubPage />
        )}

        {currentPage === 'projects' && (
          <ProjectsFundingPage />
        )}


        {currentPage === 'datacenter' && (
          <DataCenterPage />
        )}

        {currentPage === 'tools' && (
          <ToolsPage />
        )}

        {currentPage === 'ebooks' && (
          <EbooksPage 
            onNavigateToCourse={handleSelectCourse}
            onNavigateToAcademy={() => handleNav('academy')}
          />
        )}

        {currentPage === 'marketplace' && (
          <MarketplacePage
            onSelectTutor={handleSelectTutor}
            onSelectCertificate={handleSelectCertificate}
          />
        )}

        {currentPage === 'general-marketplace' && (
          <GeneralMarketplacePage
            onNavigateToAcademy={() => handleNav('academy')}
            onNavigateToWallet={() => handleNav('wallet')}
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
        {/* Floating Spotlight & Video News Radar with Periodic Notifications */}
        <SpotlightNewsDrawer onNavigate={handleNav} />

        {/* Ambience, Color, & Video Theme Customizer Floating Toolbar & Modal */}
        <AmbienceCustomizerModal />

        {/* Global Live Class Big Screen Theater Modal */}
        <GlobalLiveClassroomModal />
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

      {/* Floating Device View Mode Switcher (Mobile Phone, IPAD, Computer Smart Reading Assistant) */}
      <ViewModeSwitcherBar />

      {/* Floating Universal Quick Navigation Dock (Back, Forward, Dashboard, All Pages) */}
      <FloatingNavDock />

      {/* Searchable All Pages Directory Modal */}
      <AllPagesDirectoryModal />

      {/* Computer Smart Reading Assistant Companion Console */}
      <ComputerSmartReadingAssistant />
    </div>
    </DeviceViewportFrame>
  );
}

export default function App() {
  return (
    <EcosystemProvider>
      <AmbienceProvider>
        <ViewModeProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </ViewModeProvider>
      </AmbienceProvider>
    </EcosystemProvider>
  );
}
