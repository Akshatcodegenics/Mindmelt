import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const ThemeSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)')?.matches);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-6">
        Theme & Appearance
      </h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted organic-radius-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 organic-radius-md flex items-center justify-center">
              <Icon 
                name={isDarkMode ? "Moon" : "Sun"} 
                size={20} 
                color="var(--color-primary)" 
              />
            </div>
            <div>
              <h3 className="text-fluid-base font-medium text-foreground">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </h3>
              <p className="text-fluid-sm text-muted-foreground">
                {isDarkMode ? 'Easy on the eyes for evening use' : 'Bright and clear for daytime use'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleThemeToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isDarkMode ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Theme Preview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-4 organic-radius-md border-2 cursor-pointer transition-all duration-200 ${
              !isDarkMode ? 'border-primary bg-primary/5' : 'border-border bg-background'
            }`}
            onClick={() => !isDarkMode || handleThemeToggle()}
          >
            <div className="space-y-2">
              <div className="w-full h-2 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
            </div>
            <p className="text-fluid-sm font-medium text-foreground mt-3">Light Theme</p>
          </div>

          <div 
            className={`p-4 organic-radius-md border-2 cursor-pointer transition-all duration-200 ${
              isDarkMode ? 'border-primary bg-primary/5' : 'border-border bg-background'
            }`}
            onClick={() => isDarkMode || handleThemeToggle()}
          >
            <div className="space-y-2">
              <div className="w-full h-2 bg-gray-600 rounded"></div>
              <div className="w-3/4 h-2 bg-gray-500 rounded"></div>
              <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
            </div>
            <p className="text-fluid-sm font-medium text-foreground mt-3">Dark Theme</p>
          </div>
        </div>

        {/* Auto Theme Option */}
        <div className="flex items-center justify-between p-4 bg-muted organic-radius-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 organic-radius-md flex items-center justify-center">
              <Icon name="Monitor" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-fluid-base font-medium text-foreground">
                Auto Theme
              </h3>
              <p className="text-fluid-sm text-muted-foreground">
                Follow system preference
              </p>
            </div>
          </div>
          
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;