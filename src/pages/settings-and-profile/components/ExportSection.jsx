import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const ExportSection = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('');

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setExportType('');
  };

  const exportOptions = [
    {
      type: 'mood-data',
      icon: 'Heart',
      title: 'Mood Data Export',
      description: 'Download all your mood entries and tracking data',
      format: 'CSV, JSON',
      size: '~2.5 MB',
      color: 'var(--color-primary)'
    },
    {
      type: 'journal-entries',
      icon: 'BookOpen',
      title: 'Journal Entries',
      description: 'Export all your personal journal entries and reflections',
      format: 'PDF, TXT',
      size: '~1.8 MB',
      color: 'var(--color-secondary)'
    },
    {
      type: 'ai-conversations',
      icon: 'MessageCircle',
      title: 'AI Chat History',
      description: 'Download your conversations with the AI companion',
      format: 'PDF, JSON',
      size: '~3.2 MB',
      color: 'var(--color-success)'
    },
    {
      type: 'wellness-reports',
      icon: 'BarChart3',
      title: 'Wellness Reports',
      description: 'Export generated wellness reports and analytics',
      format: 'PDF, Excel',
      size: '~1.1 MB',
      color: 'var(--color-warning)'
    },
    {
      type: 'complete-backup',
      icon: 'Database',
      title: 'Complete Data Backup',
      description: 'Full backup of all your MindMate data',
      format: 'ZIP Archive',
      size: '~8.6 MB',
      color: 'var(--color-accent)'
    }
  ];

  const recentExports = [
    {
      name: 'Mood Data - October 2024',
      date: '2024-10-20',
      size: '2.3 MB',
      format: 'CSV',
      status: 'completed'
    },
    {
      name: 'Weekly Wellness Report',
      date: '2024-10-15',
      size: '856 KB',
      format: 'PDF',
      status: 'completed'
    },
    {
      name: 'Journal Entries - Q3 2024',
      date: '2024-10-01',
      size: '1.7 MB',
      format: 'PDF',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-card organic-radius-lg soft-shadow-md p-6">
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-6">
        Data Export & Backup
      </h2>
      <div className="space-y-6">
        {/* Export Options */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Export Your Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportOptions?.map((option) => (
              <div key={option?.type} className="p-4 bg-muted organic-radius-md">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-background organic-radius-md flex items-center justify-center">
                    <Icon name={option?.icon} size={24} color={option?.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-fluid-base font-medium text-foreground">
                      {option?.title}
                    </h4>
                    <p className="text-fluid-sm text-muted-foreground mb-2">
                      {option?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-fluid-xs text-muted-foreground">
                      <span>Format: {option?.format}</span>
                      <span>Size: {option?.size}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleExport(option?.type)}
                  loading={isExporting && exportType === option?.type}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                  disabled={isExporting}
                >
                  {isExporting && exportType === option?.type ? 'Exporting...' : 'Export Data'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Export Settings */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Export Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted organic-radius-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-fluid-base font-medium text-foreground">
                    Date Range
                  </h4>
                  <p className="text-fluid-sm text-muted-foreground">
                    Choose data timeframe for exports
                  </p>
                </div>
              </div>
              <select className="w-full p-2 bg-background border border-border organic-radius-md text-fluid-sm">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>

            <div className="p-4 bg-muted organic-radius-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-background organic-radius-md flex items-center justify-center">
                  <Icon name="FileType" size={20} color="var(--color-secondary)" />
                </div>
                <div>
                  <h4 className="text-fluid-base font-medium text-foreground">
                    Default Format
                  </h4>
                  <p className="text-fluid-sm text-muted-foreground">
                    Preferred export file format
                  </p>
                </div>
              </div>
              <select className="w-full p-2 bg-background border border-border organic-radius-md text-fluid-sm">
                <option>PDF</option>
                <option>CSV</option>
                <option>JSON</option>
                <option>Excel</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Exports */}
        <div>
          <h3 className="text-fluid-lg font-medium text-foreground mb-4">
            Recent Exports
          </h3>
          <div className="space-y-3">
            {recentExports?.map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted organic-radius-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 organic-radius-md flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  </div>
                  <div>
                    <h4 className="text-fluid-base font-medium text-foreground">
                      {export_?.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-fluid-sm text-muted-foreground">
                      <span>{export_?.date}</span>
                      <span>{export_?.size}</span>
                      <span className="uppercase">{export_?.format}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconSize={16}
                  >
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconSize={16}
                  >
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automatic Backup */}
        <div className="p-4 bg-primary/5 border border-primary/20 organic-radius-md">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 organic-radius-md flex items-center justify-center">
              <Icon name="RefreshCw" size={24} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <h4 className="text-fluid-base font-medium text-foreground mb-2">
                Automatic Backup
              </h4>
              <p className="text-fluid-sm text-muted-foreground mb-4">
                Enable automatic weekly backups of your data to ensure nothing is lost. 
                Backups are stored securely and can be downloaded anytime.
              </p>
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={16}
                >
                  Configure Auto-Backup
                </Button>
                <span className="text-fluid-sm text-muted-foreground">
                  Currently: Disabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;