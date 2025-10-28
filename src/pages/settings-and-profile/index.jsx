import React from 'react';
import Header from '../../components/ui/Header.jsx';
import ProfileSection from './components/ProfileSection.jsx';
import ThemeSection from './components/ThemeSection.jsx';
import NotificationSection from './components/NotificationSection.jsx';
import PrivacySection from './components/PrivacySection.jsx';
import AccountSection from './components/AccountSection.jsx';
import ExportSection from './components/ExportSection.jsx';

const SettingsAndProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-fluid-3xl font-heading font-semibold text-foreground mb-2">
              Settings & Profile
            </h1>
            <p className="text-fluid-lg text-muted-foreground">
              Manage your account, customize your experience, and control your data
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <ProfileSection />
              <ThemeSection />
              <NotificationSection />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <PrivacySection />
              <AccountSection />
              <ExportSection />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-muted organic-radius-lg">
            <div className="text-center">
              <h3 className="text-fluid-lg font-medium text-foreground mb-2">
                Need Help?
              </h3>
              <p className="text-fluid-sm text-muted-foreground mb-4">
                If you have questions about your settings or need assistance, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#" 
                  className="text-fluid-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Contact Support
                </a>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <a 
                  href="#" 
                  className="text-fluid-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <a 
                  href="#" 
                  className="text-fluid-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsAndProfile;