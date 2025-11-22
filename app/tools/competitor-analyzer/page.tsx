'use client';

import Link from "next/link";
import { useState } from "react";

interface CompetitorData {
  id: string;
  name: string;
  subscribers: number;
  avgViews: number;
  uploadFrequency: number; // per month
  engagementRate: number; // percentage
}

export default function CompetitorAnalyzerPage() {
  const [platform, setPlatform] = useState('YouTube');
  const [yourChannel, setYourChannel] = useState<CompetitorData>({
    id: 'you',
    name: 'Your Channel',
    subscribers: 0,
    avgViews: 0,
    uploadFrequency: 0,
    engagementRate: 0,
  });

  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [newCompetitor, setNewCompetitor] = useState<Partial<CompetitorData>>({
    name: '',
    subscribers: 0,
    avgViews: 0,
    uploadFrequency: 0,
    engagementRate: 0,
  });

  const platforms = ['YouTube', 'Instagram', 'TikTok'];

  const addCompetitor = () => {
    if (!newCompetitor.name) {
      alert('Masukkan nama competitor!');
      return;
    }

    const competitor: CompetitorData = {
      id: Date.now().toString(),
      name: newCompetitor.name || '',
      subscribers: newCompetitor.subscribers || 0,
      avgViews: newCompetitor.avgViews || 0,
      uploadFrequency: newCompetitor.uploadFrequency || 0,
      engagementRate: newCompetitor.engagementRate || 0,
    };

    setCompetitors([...competitors, competitor]);
    setNewCompetitor({
      name: '',
      subscribers: 0,
      avgViews: 0,
      uploadFrequency: 0,
      engagementRate: 0,
    });
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const calculateGrowthRate = (channel: CompetitorData) => {
    // Simplified growth rate estimate
    const viewsToSubsRatio = channel.avgViews / channel.subscribers;
    const frequency = channel.uploadFrequency;
    const engagement = channel.engagementRate;
    
    const growthScore = (viewsToSubsRatio * 0.4 + frequency * 0.3 + engagement * 0.3) * 100;
    return Math.min(growthScore, 100).toFixed(1);
  };

  const getPerformanceGap = (metric: keyof CompetitorData, isHigherBetter: boolean = true) => {
    if (competitors.length === 0) return 'N/A';
    
    const yourValue = yourChannel[metric] as number;
    const avgCompetitor = competitors.reduce((sum, c) => sum + (c[metric] as number), 0) / competitors.length;
    
    if (yourValue === 0 || avgCompetitor === 0) return 'N/A';
    
    const gap = ((yourValue - avgCompetitor) / avgCompetitor) * 100;
    const isWinning = isHigherBetter ? gap > 0 : gap < 0;
    
    return {
      percentage: Math.abs(gap).toFixed(1),
      status: isWinning ? 'ahead' : 'behind',
      emoji: isWinning ? '📈' : '📉'
    };
  };

  const getInsights = () => {
    if (competitors.length === 0) return [];
    
    const insights = [];
    const avgCompSubs = competitors.reduce((sum, c) => sum + c.subscribers, 0) / competitors.length;
    const avgCompViews = competitors.reduce((sum, c) => sum + c.avgViews, 0) / competitors.length;
    const avgCompFreq = competitors.reduce((sum, c) => sum + c.uploadFrequency, 0) / competitors.length;
    const avgCompEng = competitors.reduce((sum, c) => sum + c.engagementRate, 0) / competitors.length;

    if (yourChannel.subscribers < avgCompSubs) {
      const gap = ((avgCompSubs - yourChannel.subscribers) / avgCompSubs * 100).toFixed(0);
      insights.push({
        type: 'warning',
        title: 'Subscriber Gap',
        message: `You're ${gap}% behind average competitor subscribers. Focus on consistency and quality content.`
      });
    }

    if (yourChannel.uploadFrequency < avgCompFreq) {
      insights.push({
        type: 'warning',
        title: 'Posting Frequency',
        message: `Competitors upload ${avgCompFreq.toFixed(1)} times/month vs your ${yourChannel.uploadFrequency}. Consider increasing frequency.`
      });
    } else if (yourChannel.uploadFrequency > avgCompFreq) {
      insights.push({
        type: 'success',
        title: 'Consistent Posting',
        message: `Great job! You're posting more frequently than competitors.`
      });
    }

    if (yourChannel.engagementRate > avgCompEng) {
      insights.push({
        type: 'success',
        title: 'Strong Engagement',
        message: `Your ${yourChannel.engagementRate}% engagement rate beats competitor average of ${avgCompEng.toFixed(1)}%!`
      });
    } else if (yourChannel.engagementRate < avgCompEng) {
      insights.push({
        type: 'warning',
        title: 'Engagement Opportunity',
        message: `Work on engagement! Competitors average ${avgCompEng.toFixed(1)}% vs your ${yourChannel.engagementRate}%.`
      });
    }

    const viewsToSubsRatio = yourChannel.avgViews / yourChannel.subscribers;
    const compAvgRatio = avgCompViews / avgCompSubs;
    
    if (viewsToSubsRatio > compAvgRatio && yourChannel.avgViews > 0) {
      insights.push({
        type: 'success',
        title: 'High View Rate',
        message: `Your views-to-subscribers ratio is excellent! Keep it up.`
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
            ← Kembali ke Toolbox
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🔍 Competitor Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Bandingkan performa channel Anda dengan kompetitor dan temukan peluang untuk berkembang
          </p>
        </div>

        {/* Platform Select */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Channel */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📊 Your Channel</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Channel Name</label>
                <input
                  type="text"
                  value={yourChannel.name}
                  onChange={(e) => setYourChannel({...yourChannel, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg text-gray-900"
                  placeholder="Your Channel"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {platform === 'YouTube' ? 'Subscribers' : 'Followers'}
                  </label>
                  <input
                    type="number"
                    value={yourChannel.subscribers || ''}
                    onChange={(e) => setYourChannel({...yourChannel, subscribers: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Avg Views</label>
                  <input
                    type="number"
                    value={yourChannel.avgViews || ''}
                    onChange={(e) => setYourChannel({...yourChannel, avgViews: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Uploads/Month</label>
                  <input
                    type="number"
                    value={yourChannel.uploadFrequency || ''}
                    onChange={(e) => setYourChannel({...yourChannel, uploadFrequency: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Engagement %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={yourChannel.engagementRate || ''}
                    onChange={(e) => setYourChannel({...yourChannel, engagementRate: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                    placeholder="5.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Competitor */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">➕ Add Competitor</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Name</label>
                <input
                  type="text"
                  value={newCompetitor.name || ''}
                  onChange={(e) => setNewCompetitor({...newCompetitor, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Competitor Channel"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {platform === 'YouTube' ? 'Subscribers' : 'Followers'}
                  </label>
                  <input
                    type="number"
                    value={newCompetitor.subscribers || ''}
                    onChange={(e) => setNewCompetitor({...newCompetitor, subscribers: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avg Views</label>
                  <input
                    type="number"
                    value={newCompetitor.avgViews || ''}
                    onChange={(e) => setNewCompetitor({...newCompetitor, avgViews: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="20000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uploads/Month</label>
                  <input
                    type="number"
                    value={newCompetitor.uploadFrequency || ''}
                    onChange={(e) => setNewCompetitor({...newCompetitor, uploadFrequency: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engagement %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newCompetitor.engagementRate || ''}
                    onChange={(e) => setNewCompetitor({...newCompetitor, engagementRate: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="4.5"
                  />
                </div>
              </div>
              <button
                onClick={addCompetitor}
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                ➕ Add Competitor
              </button>
            </div>
          </div>
        </div>

        {/* Competitors List */}
        {competitors.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Competitors</h2>
            <div className="space-y-4">
              {competitors.map((competitor) => (
                <div key={competitor.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{competitor.name}</h3>
                    <button
                      onClick={() => removeCompetitor(competitor.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Subscribers</div>
                      <div className="font-bold text-gray-900">{formatNumber(competitor.subscribers)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Avg Views</div>
                      <div className="font-bold text-gray-900">{formatNumber(competitor.avgViews)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Uploads/Month</div>
                      <div className="font-bold text-gray-900">{competitor.uploadFrequency}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Engagement</div>
                      <div className="font-bold text-gray-900">{competitor.engagementRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison */}
        {competitors.length > 0 && yourChannel.subscribers > 0 && (
          <>
            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Performance Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 mb-1">Subscribers Gap</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {getPerformanceGap('subscribers') !== 'N/A' 
                      ? `${(getPerformanceGap('subscribers') as any).emoji} ${(getPerformanceGap('subscribers') as any).percentage}%`
                      : 'N/A'
                    }
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {getPerformanceGap('subscribers') !== 'N/A' && `You're ${(getPerformanceGap('subscribers') as any).status}`}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 mb-1">Views Gap</div>
                  <div className="text-2xl font-bold text-green-900">
                    {getPerformanceGap('avgViews') !== 'N/A' 
                      ? `${(getPerformanceGap('avgViews') as any).emoji} ${(getPerformanceGap('avgViews') as any).percentage}%`
                      : 'N/A'
                    }
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    {getPerformanceGap('avgViews') !== 'N/A' && `You're ${(getPerformanceGap('avgViews') as any).status}`}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 mb-1">Frequency Gap</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {getPerformanceGap('uploadFrequency') !== 'N/A' 
                      ? `${(getPerformanceGap('uploadFrequency') as any).emoji} ${(getPerformanceGap('uploadFrequency') as any).percentage}%`
                      : 'N/A'
                    }
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    {getPerformanceGap('uploadFrequency') !== 'N/A' && `You're ${(getPerformanceGap('uploadFrequency') as any).status}`}
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm text-yellow-700 mb-1">Engagement Gap</div>
                  <div className="text-2xl font-bold text-yellow-900">
                    {getPerformanceGap('engagementRate') !== 'N/A' 
                      ? `${(getPerformanceGap('engagementRate') as any).emoji} ${(getPerformanceGap('engagementRate') as any).percentage}%`
                      : 'N/A'
                    }
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    {getPerformanceGap('engagementRate') !== 'N/A' && `You're ${(getPerformanceGap('engagementRate') as any).status}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            {insights.length > 0 && (
              <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-purple-900 mb-4">💡 AI Insights & Recommendations</h2>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        insight.type === 'success' 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-yellow-50 border-yellow-300'
                      }`}
                    >
                      <div className={`font-bold mb-1 ${
                        insight.type === 'success' ? 'text-green-900' : 'text-yellow-900'
                      }`}>
                        {insight.type === 'success' ? '✅' : '⚠️'} {insight.title}
                      </div>
                      <div className={`text-sm ${
                        insight.type === 'success' ? 'text-green-700' : 'text-yellow-700'
                      }`}>
                        {insight.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            📌 Tips Menggunakan Competitor Analyzer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>1. Input Accurate Data</strong>
              <p>Gunakan data real dari competitor untuk hasil akurat</p>
            </div>
            <div>
              <strong>2. Track Multiple Competitors</strong>
              <p>Add 3-5 competitors di niche yang sama untuk comparison terbaik</p>
            </div>
            <div>
              <strong>3. Update Regularly</strong>
              <p>Update data setiap bulan untuk track progress</p>
            </div>
            <div>
              <strong>4. Focus on Gaps</strong>
              <p>Prioritas improve metric yang paling tertinggal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
