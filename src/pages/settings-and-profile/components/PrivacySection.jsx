import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const PrivacySection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    aiAnalysis: true,
    anonymousUsage: true,
    thirdPartyIntegration: false,
    moodDataRetention: '1year',
    profileVisibility: 'private'
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleRetentionChange = (value) => {
    setPrivacySettings(prev => ({
      ...prev,
      moodDataRetention: value
    }));
  };

  const ToggleSwitch = ({ isEnabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isEnabled ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const privacyItems = [
    {
      key: 'dataSharing',
      icon: 'Share2',
      title: 'Data Sharing',
      description: 'Share anonymized data to improve mental health research',
      impact: 'Helps advance mental wellness understanding',
      color: 'var(--color-primary)'
    },
    {
      key: 'aiAnalysis',
      icon: 'Brain',
      title: 'AI Mood Analysis',
      description: 'Allow AI to analyze your mood patterns for insights',
      impact: 'Enables personalized recommendations',
      color: 'var(--color-secondary)'
    },
    {
      key: 'anonymousUsage',
      icon: 'BarChart3',
      title: 'Anonymous Usage Analytics',
      description: 'Help improve the app with anonymous usage data',
      impact: 'No personal information is collected',
      color: 'var(--color-success)'
    },
    {
      key: 'thirdPartyIntegration',
      icon: 'Link',
      title: 'Third-party Integrations',
      description: 'Allow connections with fitness and health apps',
      impact: 'Enables comprehensive wellness tracking',
      color: 'var(--color-warning)'
    }
  ];

  const retentionOptions = [
    { value: '3months', label: '3 Months', description: 'Minimal data retention' },
    { value: '6months', label: '6 Months', description: 'Short-term tracking' },
    { value: '1year', label: '1 Year', description: 'Recommended for trends' },
    { value: '2years', label: '2 Years', description: 'Long-term analysis' },
    { value: 'indefinite', label: 'Indefinite', description: 'Keep all data' }
  ];

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-6">
        Privacy & Data Control
      </h2>
      <div className="space-y-6">
        {/* Privacy Controls */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Data Usage Preferences
          </h3>
          <div className="space-y-4">
            {privacyItems?.map((item) => (
              <div key={item?.key} className="p-4 bg-muted organic-radius-md">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center mt-1">
                      <Icon name={item?.icon} size={20} color={item?.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-fluid-base font-medium text-foreground">
                        {item?.title}
                      </h4>
                      <p className="text-fluid-sm text-muted-foreground mb-1">
                        {item?.description}
                      </p>
                      <p className="text-fluid-xs text-success font-medium">
                        Impact: {item?.impact}
                      </p>
                    </div>
                  </div>
                  
                  <ToggleSwitch
                    isEnabled={privacySettings?.[item?.key]}
                    onToggle={() => handleToggle(item?.key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Data Retention Policy
          </h3>
          <div className="p-4 bg-muted organic-radius-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                <Icon name="Database" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="text-fluid-base font-medium text-foreground">
                  Mood Data Retention
                </h4>
                <p className="text-fluid-sm text-muted-foreground">
                  How long should we keep your mood tracking data?
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {retentionOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleRetentionChange(option?.value)}
                  className={`p-3 text-left organic-radius-md border-2 transition-all duration-200 ${
                    privacySettings?.moodDataRetention === option?.value
                      ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-fluid-sm text-foreground">
                    {option?.label}
                  </div>
                  <div className="text-fluid-xs text-muted-foreground">
                    {option?.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Data Export & Control
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted organic-radius-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                  <Icon name="Download" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="text-fluid-base font-medium text-foreground">
                    Export Your Data
                  </h4>
                  <p className="text-fluid-sm text-muted-foreground">
                    Download all your mood data and reports
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Request Data Export
              </Button>
            </div>

            <div className="p-4 bg-destructive/5 border border-destructive/20 organic-radius-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-destructive/10 organic-radius-md flex items-center justify-center">
                  <Icon name="Trash2" size={20} color="var(--color-destructive)" />
                </div>
                <div>
                  <h4 className="text-fluid-base font-medium text-foreground">
                    Delete Account
                  </h4>
                  <p className="text-fluid-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                iconSize={16}
                fullWidth
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card organic-radius-lg soft-shadow-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-destructive/10 organic-radius-md flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
                </div>
                <div>
                  <h3 className="text-fluid-lg font-semibold text-foreground">
                    Delete Account
                  </h3>
                  <p className="text-fluid-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <p className="text-fluid-sm text-foreground mb-6">
                Are you sure you want to permanently delete your account? All your mood data, 
                journal entries, and settings will be permanently removed.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="destructive"
                  size="sm"
                  fullWidth
                >
                  Yes, Delete Account
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySection;