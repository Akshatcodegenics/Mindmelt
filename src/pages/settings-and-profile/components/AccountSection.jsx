import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Icon from '../../../components/AppIcon.jsx';

const AccountSection = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailData, setEmailData] = useState({
    currentEmail: 'sarah.johnson@email.com',
    newEmail: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handlePasswordChange = async () => {
    setErrors({});
    
    // Validation
    if (passwordData?.currentPassword !== 'mindmate123') {
      setErrors({ currentPassword: 'Current password is incorrect' });
      return;
    }
    
    if (passwordData?.newPassword?.length < 8) {
      setErrors({ newPassword: 'Password must be at least 8 characters' });
      return;
    }
    
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEmailChange = async () => {
    setErrors({});
    
    // Validation
    if (emailData?.password !== 'mindmate123') {
      setErrors({ password: 'Password is incorrect' });
      return;
    }
    
    if (!emailData?.newEmail?.includes('@')) {
      setErrors({ newEmail: 'Please enter a valid email address' });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsChangingEmail(false);
    setEmailData({ ...emailData, newEmail: '', password: '' });
  };

  const securityItems = [
    {
      icon: 'Shield',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: 'Disabled',
      action: 'Enable 2FA',
      color: 'var(--color-warning)'
    },
    {
      icon: 'Smartphone',
      title: 'Login Devices',
      description: 'Manage devices that have access to your account',
      status: '3 active devices',
      action: 'Manage Devices',
      color: 'var(--color-primary)'
    },
    {
      icon: 'Clock',
      title: 'Session Timeout',
      description: 'Automatically log out after inactivity',
      status: '30 minutes',
      action: 'Change',
      color: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-6">
        Account Security
      </h2>
      <div className="space-y-6">
        {/* Password Change */}
        <div className="p-4 bg-muted organic-radius-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                <Icon name="Lock" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-fluid-base font-medium text-foreground">
                  Password
                </h3>
                <p className="text-fluid-sm text-muted-foreground">
                  Last changed 2 months ago
                </p>
              </div>
            </div>
            
            {!isChangingPassword && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            )}
          </div>

          {isChangingPassword && (
            <div className="space-y-4 pt-4 border-t border-border">
              <Input
                label="Current Password"
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                error={errors?.currentPassword}
                required
              />
              
              <Input
                label="New Password"
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
                error={errors?.newPassword}
                description="Must be at least 8 characters"
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
                error={errors?.confirmPassword}
                required
              />

              <div className="flex space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePasswordChange}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                >
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setErrors({});
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Email Change */}
        <div className="p-4 bg-muted organic-radius-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                <Icon name="Mail" size={20} color="var(--color-secondary)" />
              </div>
              <div>
                <h3 className="text-fluid-base font-medium text-foreground">
                  Email Address
                </h3>
                <p className="text-fluid-sm text-muted-foreground">
                  {emailData?.currentEmail}
                </p>
              </div>
            </div>
            
            {!isChangingEmail && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangingEmail(true)}
              >
                Change Email
              </Button>
            )}
          </div>

          {isChangingEmail && (
            <div className="space-y-4 pt-4 border-t border-border">
              <Input
                label="New Email Address"
                type="email"
                value={emailData?.newEmail}
                onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e?.target?.value }))}
                error={errors?.newEmail}
                required
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={emailData?.password}
                onChange={(e) => setEmailData(prev => ({ ...prev, password: e?.target?.value }))}
                error={errors?.password}
                description="Enter your current password to confirm"
                required
              />

              <div className="flex space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleEmailChange}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                >
                  Update Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsChangingEmail(false);
                    setEmailData({ ...emailData, newEmail: '', password: '' });
                    setErrors({});
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Security Features */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Security Features
          </h3>
          <div className="space-y-4">
            {securityItems?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted organic-radius-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                    <Icon name={item?.icon} size={20} color={item?.color} />
                  </div>
                  <div>
                    <h4 className="text-fluid-base font-medium text-foreground">
                      {item?.title}
                    </h4>
                    <p className="text-fluid-sm text-muted-foreground">
                      {item?.description}
                    </p>
                    <p className="text-fluid-xs font-medium text-primary">
                      Status: {item?.status}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                >
                  {item?.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Credentials Info */}
        <div className="p-4 bg-primary/5 border border-primary/20 organic-radius-md">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 organic-radius-md flex items-center justify-center mt-1">
              <Icon name="Info" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-fluid-base font-medium text-foreground mb-2">
                Demo Account Information
              </h4>
              <div className="text-fluid-sm text-muted-foreground space-y-1">
                <p><strong>Email:</strong> sarah.johnson@email.com</p>
                <p><strong>Password:</strong> mindmate123</p>
                <p className="text-fluid-xs text-primary mt-2">
                  Use these credentials for testing password and email changes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;