import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState({
    moodReminders: true,
    wellnessTips: true,
    aiRecommendations: false,
    weeklyReports: true,
    chatMessages: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const notificationItems = [
    {
      key: 'moodReminders',
      icon: 'Bell',
      title: 'Mood Check-in Reminders',
      description: 'Daily prompts to log your mood and feelings',
      color: 'var(--color-primary)'
    },
    {
      key: 'wellnessTips',
      icon: 'Heart',
      title: 'Wellness Tips',
      description: 'Personalized mental health and wellness advice',
      color: 'var(--color-success)'
    },
    {
      key: 'aiRecommendations',
      icon: 'Brain',
      title: 'AI Recommendations',
      description: 'Smart suggestions based on your mood patterns',
      color: 'var(--color-secondary)'
    },
    {
      key: 'weeklyReports',
      icon: 'BarChart3',
      title: 'Weekly Reports',
      description: 'Summary of your mood trends and progress',
      color: 'var(--color-warning)'
    },
    {
      key: 'chatMessages',
      icon: 'MessageCircle',
      title: 'Chat Companion',
      description: 'Notifications from your AI wellness companion',
      color: 'var(--color-accent)'
    },
    {
      key: 'systemUpdates',
      icon: 'Settings',
      title: 'System Updates',
      description: 'App updates and new feature announcements',
      color: 'var(--color-muted-foreground)'
    }
  ];

  const communicationItems = [
    {
      key: 'emailNotifications',
      icon: 'Mail',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      color: 'var(--color-primary)'
    },
    {
      key: 'pushNotifications',
      icon: 'Smartphone',
      title: 'Push Notifications',
      description: 'Browser and mobile push notifications',
      color: 'var(--color-secondary)'
    }
  ];

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

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-6">
        Notification Preferences
      </h2>
      <div className="space-y-6">
        {/* Wellness Notifications */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Wellness Notifications
          </h3>
          <div className="space-y-4">
            {notificationItems?.map((item) => (
              <div key={item?.key} className="flex items-center justify-between p-4 bg-muted organic-radius-md">
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
                  </div>
                </div>
                
                <ToggleSwitch
                  isEnabled={notifications?.[item?.key]}
                  onToggle={() => handleToggle(item?.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Communication Preferences */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Communication Channels
          </h3>
          <div className="space-y-4">
            {communicationItems?.map((item) => (
              <div key={item?.key} className="flex items-center justify-between p-4 bg-muted organic-radius-md">
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
                  </div>
                </div>
                
                <ToggleSwitch
                  isEnabled={notifications?.[item?.key]}
                  onToggle={() => handleToggle(item?.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="p-4 bg-muted organic-radius-md">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-fluid-base font-medium text-foreground">
                Quiet Hours
              </h4>
              <p className="text-fluid-sm text-muted-foreground">
                No notifications between 10:00 PM - 8:00 AM
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-fluid-sm text-muted-foreground">
            <span>From: 10:00 PM</span>
            <span>To: 8:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;