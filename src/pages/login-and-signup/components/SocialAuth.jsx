import React from 'react';
import Button from '../../../components/ui/Button.jsx';


const SocialAuth = () => {
  const handleSocialAuth = (provider) => {
    // Mock social authentication
    alert(`${provider} authentication would be handled here with Supabase`);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-fluid-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('Google')}
          iconName="Chrome"
          iconPosition="left"
          iconSize={16}
          className="micro-feedback"
        >
          Google
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('GitHub')}
          iconName="Github"
          iconPosition="left"
          iconSize={16}
          className="micro-feedback"
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;