import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import Button from '../../../components/ui/Button.jsx';

const MoodTrendChart = ({ weeklyData, monthlyData }) => {
  const [activeView, setActiveView] = useState('weekly');
  const [chartType, setChartType] = useState('line');

  const data = activeView === 'weekly' ? weeklyData : monthlyData;

  const moodColors = {
    happy: '#68D391',
    calm: '#7C9CBF',
    stressed: '#F6AD55',
    sad: '#A0AEC0'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border organic-radius-md p-3 soft-shadow-md">
          <p className="text-fluid-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 organic-radius-sm"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-fluid-sm text-muted-foreground capitalize">
                {entry?.dataKey}: {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card soft-shadow-md organic-radius-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          Mood Trends
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted organic-radius-md p-1">
            <Button
              variant={activeView === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={activeView === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('monthly')}
            >
              Monthly
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
            iconName={chartType === 'line' ? 'BarChart3' : 'TrendingUp'}
            iconSize={16}
          />
        </div>
      </div>
      <div className="w-full h-64 mb-6" aria-label="Mood Trend Visualization">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="period" 
                stroke="#718096"
                fontSize={12}
              />
              <YAxis 
                stroke="#718096"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="happy" 
                stroke={moodColors?.happy}
                strokeWidth={3}
                dot={{ fill: moodColors?.happy, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: moodColors?.happy, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="calm" 
                stroke={moodColors?.calm}
                strokeWidth={3}
                dot={{ fill: moodColors?.calm, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: moodColors?.calm, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="stressed" 
                stroke={moodColors?.stressed}
                strokeWidth={3}
                dot={{ fill: moodColors?.stressed, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: moodColors?.stressed, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="sad" 
                stroke={moodColors?.sad}
                strokeWidth={3}
                dot={{ fill: moodColors?.sad, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: moodColors?.sad, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="period" 
                stroke="#718096"
                fontSize={12}
              />
              <YAxis 
                stroke="#718096"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="happy" fill={moodColors?.happy} radius={[2, 2, 0, 0]} />
              <Bar dataKey="calm" fill={moodColors?.calm} radius={[2, 2, 0, 0]} />
              <Bar dataKey="stressed" fill={moodColors?.stressed} radius={[2, 2, 0, 0]} />
              <Bar dataKey="sad" fill={moodColors?.sad} radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(moodColors)?.map(([mood, color]) => (
          <div key={mood} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 organic-radius-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-fluid-sm text-muted-foreground capitalize">
              {mood}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTrendChart;