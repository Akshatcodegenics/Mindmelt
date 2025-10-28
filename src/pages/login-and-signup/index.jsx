import React from 'react';
import AuthForm from './components/AuthForm.jsx';
import SocialAuth from './components/SocialAuth.jsx';
import FeatureHighlight from './components/FeatureHighlights.jsx';

const LoginAndSignup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Column - Feature Highlight (Hidden on mobile) */}
          <div className="hidden lg:block">
            <FeatureHighlight />
          </div>

          {/* Right Column - Authentication Form */}
          <div className="flex flex-col justify-center">
            <AuthForm />
            
            {/* Social Authentication */}
            <div className="mt-6">
              <SocialAuth />
            </div>

            {/* Mobile Feature Highlight */}
            <div className="lg:hidden mt-8">
              <FeatureHighlight />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-fluid-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
              
              <div className="mt-4 flex items-center justify-center space-x-4 text-fluid-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>SSL Secured</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignup;