import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const MetricsPanel = ({ metrics }) => {
  const metricCards = [
    {
      id: 1,
      title: 'Current Streak',
      value: metrics?.currentStreak,
      unit: 'days',
      icon: 'Flame',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 2,
      title: 'Journal Entries',
      value: metrics?.journalEntries,
      unit: 'this week',
      icon: 'BookOpen',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      title: 'Wellness Score',
      value: metrics?.wellnessScore,
      unit: '/100',
      icon: 'TrendingUp',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      title: 'Chat Sessions',
      value: metrics?.chatSessions,
      unit: 'this month',
      icon: 'MessageCircle',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="bg-card soft-shadow-md organic-radius-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          Your Progress
        </h2>
        <Icon name="Award" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards?.map((metric) => (
          <div
            key={metric?.id}
            className={`${metric?.bgColor} ${metric?.borderColor} border organic-radius-md p-4 text-center`}
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-white organic-radius-md">
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-fluid-xl font-heading font-bold text-foreground">
                  {metric?.value}
                </span>
                <span className="text-fluid-xs text-muted-foreground">
                  {metric?.unit}
                </span>
              </div>
              <p className="text-fluid-sm font-medium text-foreground">
                {metric?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 organic-radius-md border border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary organic-radius-md">
            <Icon name="Trophy" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-fluid-base font-heading font-medium text-foreground">
              Keep it up!
            </h3>
            <p className="text-fluid-sm text-muted-foreground">
              You're on track to reach your wellness goals this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;