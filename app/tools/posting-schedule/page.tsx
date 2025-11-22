'use client';

import Link from "next/link";
import { useState } from "react";

interface TimeSlot {
  time: string;
  label: string;
  engagement: 'high' | 'medium' | 'low';
}

export default function PostingSchedulePage() {
  const [platform, setPlatform] = useState('YouTube');
  const [timezone, setTimezone] = useState('WIB');
  const [contentType, setContentType] = useState('general');

  const platforms = ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Twitter/X'];
  const timezones = ['WIB', 'WITA', 'WIT', 'UTC'];
  const contentTypes = [
    { value: 'general', label: 'General/Umum' },
    { value: 'educational', label: 'Educational/Tutorial' },
    { value: 'entertainment', label: 'Entertainment/Hiburan' },
    { value: 'lifestyle', label: 'Lifestyle/Vlog' },
    { value: 'business', label: 'Business/Tips' },
  ];

  // Convert time based on timezone
  const convertTime = (time: string): string => {
    const offset: Record<string, number> = {
      'WIB': 0,
      'WITA': 1,
      'WIT': 2,
      'UTC': -7,
    };

    const timeOffset = offset[timezone];
    
    // Parse time range (e.g., "12:00 - 15:00")
    const [start, end] = time.split(' - ');
    
    const convertSingleTime = (t: string): string => {
      const [hours, minutes] = t.split(':').map(Number);
      let newHours = hours + timeOffset;
      
      // Handle 24-hour wrap
      if (newHours >= 24) newHours -= 24;
      if (newHours < 0) newHours += 24;
      
      return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };
    
    return `${convertSingleTime(start)} - ${convertSingleTime(end)}`;
  };

  const getBestTimes = (): TimeSlot[] => {
    // Base times in WIB
    const schedules: Record<string, TimeSlot[]> = {
      'YouTube': [
        { time: '12:00 - 15:00', label: 'Lunch Break', engagement: 'high' },
        { time: '18:00 - 22:00', label: 'After Work/School', engagement: 'high' },
        { time: '06:00 - 09:00', label: 'Morning Commute', engagement: 'medium' },
        { time: '15:00 - 18:00', label: 'Afternoon', engagement: 'medium' },
      ],
      'Instagram': [
        { time: '11:00 - 13:00', label: 'Late Morning', engagement: 'high' },
        { time: '19:00 - 21:00', label: 'Evening', engagement: 'high' },
        { time: '07:00 - 09:00', label: 'Morning', engagement: 'medium' },
        { time: '17:00 - 19:00', label: 'After Work', engagement: 'medium' },
      ],
      'TikTok': [
        { time: '06:00 - 10:00', label: 'Early Morning', engagement: 'high' },
        { time: '19:00 - 23:00', label: 'Night', engagement: 'high' },
        { time: '12:00 - 14:00', label: 'Lunch', engagement: 'medium' },
        { time: '16:00 - 18:00', label: 'Late Afternoon', engagement: 'medium' },
      ],
      'Facebook': [
        { time: '13:00 - 16:00', label: 'Early Afternoon', engagement: 'high' },
        { time: '18:00 - 21:00', label: 'Evening', engagement: 'high' },
        { time: '09:00 - 12:00', label: 'Morning', engagement: 'medium' },
      ],
      'Twitter/X': [
        { time: '08:00 - 10:00', label: 'Morning Commute', engagement: 'high' },
        { time: '12:00 - 13:00', label: 'Lunch Break', engagement: 'high' },
        { time: '17:00 - 18:00', label: 'After Work', engagement: 'high' },
      ],
    };

    const baseTimes = schedules[platform] || schedules['YouTube'];
    
    // Convert times based on selected timezone
    return baseTimes.map(slot => ({
      ...slot,
      time: convertTime(slot.time)
    }));
  };

  const getWeeklySchedule = () => {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const recommendations: Record<string, string[]> = {
      'YouTube': ['Selasa', 'Kamis', 'Sabtu'],
      'Instagram': ['Senin', 'Rabu', 'Jumat'],
      'TikTok': ['Setiap Hari'],
      'Facebook': ['Rabu', 'Kamis'],
      'Twitter/X': ['Setiap Hari'],
    };

    return days.map(day => ({
      day,
      recommended: recommendations[platform]?.includes(day) || recommendations[platform]?.includes('Setiap Hari')
    }));
  };

  const getPlatformInsights = () => {
    // Base peak times in WIB
    const baseInsights: Record<string, { frequency: string; bestDays: string; peakTime: string }> = {
      'YouTube': {
        frequency: '2-3x per minggu',
        bestDays: 'Selasa, Kamis, Sabtu',
        peakTime: '18:00 - 20:00'
      },
      'Instagram': {
        frequency: '1-2x per hari',
        bestDays: 'Senin - Jumat',
        peakTime: '11:00 - 13:00, 19:00 - 21:00'
      },
      'TikTok': {
        frequency: '2-4x per hari',
        bestDays: 'Setiap hari',
        peakTime: '06:00 - 10:00, 19:00 - 23:00'
      },
      'Facebook': {
        frequency: '1-2x per hari',
        bestDays: 'Rabu, Kamis, Jumat',
        peakTime: '13:00 - 16:00'
      },
      'Twitter/X': {
        frequency: '3-10x per hari',
        bestDays: 'Senin - Jumat',
        peakTime: '08:00 - 10:00, 12:00, 17:00'
      },
    };

    const insight = baseInsights[platform] || baseInsights['YouTube'];
    
    // Convert peak times for multiple ranges (e.g., "11:00 - 13:00, 19:00 - 21:00")
    const convertedPeakTime = insight.peakTime
      .split(', ')
      .map(timeRange => {
        if (timeRange.includes(' - ')) {
          return convertTime(timeRange);
        } else {
          // Single time (e.g., "12:00")
          const offset: Record<string, number> = {
            'WIB': 0,
            'WITA': 1,
            'WIT': 2,
            'UTC': -7,
          };
          const [hours, minutes] = timeRange.split(':').map(Number);
          let newHours = hours + offset[timezone];
          if (newHours >= 24) newHours -= 24;
          if (newHours < 0) newHours += 24;
          return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }
      })
      .join(', ');

    return {
      ...insight,
      peakTime: `${convertedPeakTime} ${timezone}`
    };
  };

  const bestTimes = getBestTimes();
  const weeklySchedule = getWeeklySchedule();
  const insights = getPlatformInsights();

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
            📅 Posting Schedule Planner
          </h1>
          <p className="text-lg text-gray-600">
            Temukan waktu terbaik untuk posting konten di berbagai platform sosial media
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Platform & Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Platform Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Konten
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                {contentTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Best Times */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ⏰ Waktu Terbaik Posting
            </h2>
            <div className="space-y-3">
              {bestTimes.map((slot, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    slot.engagement === 'high'
                      ? 'border-green-500 bg-green-50'
                      : slot.engagement === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-gray-900">
                        {slot.time} {timezone}
                      </div>
                      <div className="text-sm text-gray-600">{slot.label}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        slot.engagement === 'high'
                          ? 'bg-green-500 text-white'
                          : slot.engagement === 'medium'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {slot.engagement === 'high' ? '🔥 High' : slot.engagement === 'medium' ? '📊 Medium' : '📉 Low'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📆 Jadwal Posting Mingguan
            </h2>
            <div className="space-y-2">
              {weeklySchedule.map((day, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    day.recommended
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{day.day}</span>
                    {day.recommended && (
                      <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium">
                        ✅ Recommended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Insights */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            💡 Insights untuk {platform}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-blue-700 mb-1">Frekuensi Posting</div>
              <div className="text-xl font-bold text-blue-900">{insights.frequency}</div>
            </div>
            <div>
              <div className="text-sm text-blue-700 mb-1">Hari Terbaik</div>
              <div className="text-xl font-bold text-blue-900">{insights.bestDays}</div>
            </div>
            <div>
              <div className="text-sm text-blue-700 mb-1">Peak Time</div>
              <div className="text-xl font-bold text-blue-900">{insights.peakTime}</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">
            💡 Tips Posting Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
            <div>
              <strong>1. Konsistensi adalah Kunci</strong>
              <p>Posting secara teratur lebih penting daripada waktu perfect</p>
            </div>
            <div>
              <strong>2. Test & Analyze</strong>
              <p>Monitor analytics dan sesuaikan jadwal dengan audience Anda</p>
            </div>
            <div>
              <strong>3. Batch Content</strong>
              <p>Buat konten di advance, schedule untuk posting optimal</p>
            </div>
            <div>
              <strong>4. Weekend Matters</strong>
              <p>Weekend engagement berbeda, test untuk niche Anda</p>
            </div>
          </div>
        </div>

        {/* Tool Recommendation */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3">
            🛠️ Recommended Scheduling Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <strong className="text-purple-900">Buffer</strong>
              <p className="text-gray-600">Schedule posts across platforms</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <strong className="text-purple-900">Hootsuite</strong>
              <p className="text-gray-600">Advanced analytics & scheduling</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <strong className="text-purple-900">Later</strong>
              <p className="text-gray-600">Visual planning for Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
