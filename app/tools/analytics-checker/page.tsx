'use client';

import Link from "next/link";
import { useState } from "react";

interface AnalyticsData {
  engagement: number;
  reach: number;
  conversion: number;
  avgWatchTime: number;
  recommendations: string[];
}

export default function AnalyticsCheckerPage() {
  const [platform, setPlatform] = useState('YouTube');
  const [views, setViews] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const platforms = ['YouTube', 'Instagram', 'TikTok', 'Facebook'];

  const analyzePerformance = () => {
    if (!views || !likes) return;

    const viewsNum = parseInt(views) || 0;
    const likesNum = parseInt(likes) || 0;
    const commentsNum = parseInt(comments) || 0;
    const sharesNum = parseInt(shares) || 0;

    // Calculate engagement rate
    const totalEngagements = likesNum + commentsNum + sharesNum;
    const engagementRate = viewsNum > 0 ? (totalEngagements / viewsNum) * 100 : 0;

    // Mock analytics data
    const data: AnalyticsData = {
      engagement: parseFloat(engagementRate.toFixed(2)),
      reach: Math.round(viewsNum * 1.5),
      conversion: parseFloat((engagementRate * 0.3).toFixed(2)),
      avgWatchTime: Math.round((viewsNum / 100) * 2.5),
      recommendations: []
    };

    // Generate recommendations
    if (engagementRate < 2) {
      data.recommendations.push('⚠️ Engagement rate rendah - Tingkatkan interaksi dengan audience');
      data.recommendations.push('💡 Tambahkan CTA yang lebih kuat di konten');
      data.recommendations.push('📢 Gunakan pertanyaan di caption untuk memicu komentar');
    } else if (engagementRate < 5) {
      data.recommendations.push('✅ Engagement rate cukup baik');
      data.recommendations.push('💡 Posting di waktu prime time untuk reach lebih luas');
      data.recommendations.push('🎯 Eksperimen dengan format konten berbeda');
    } else {
      data.recommendations.push('🔥 Engagement rate excellent!');
      data.recommendations.push('💪 Pertahankan konsistensi posting');
      data.recommendations.push('📈 Konten ini bisa dijadikan template untuk konten selanjutnya');
    }

    if (commentsNum < likesNum * 0.1) {
      data.recommendations.push('💬 Tingkatkan komentar dengan mengajukan pertanyaan');
    }

    if (sharesNum < likesNum * 0.05) {
      data.recommendations.push('🔄 Buat konten yang lebih shareable (tips, quotes, infografis)');
    }

    setAnalytics(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
            ← Kembali ke Toolbox
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📊 Analytics Checker
          </h1>
          <p className="text-lg text-gray-600">
            Analisis performa konten dan dapatkan insight untuk meningkatkan engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Data Konten
            </h2>

            <div className="space-y-6">
              {/* Platform */}
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

              {/* Views */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Views/Impressions <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Likes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Likes <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <input
                  type="number"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Shares */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shares
                </label>
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzePerformance}
                disabled={!views || !likes}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  views && likes
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                📊 Analyze Performance
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analytics ? (
              <>
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                    <div className="text-3xl font-bold text-primary-600">
                      {analytics.engagement}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {analytics.engagement >= 5 ? '🔥 Excellent' : analytics.engagement >= 2 ? '✅ Good' : '⚠️ Need Improvement'}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-1">Est. Reach</div>
                    <div className="text-3xl font-bold text-green-600">
                      {analytics.reach.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      📈 Impressions
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-1">Conversion</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {analytics.conversion}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      💡 Action Rate
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-1">Avg Watch Time</div>
                    <div className="text-3xl font-bold text-orange-600">
                      {analytics.avgWatchTime}s
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ⏱️ Estimated
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    💡 Recommendations
                  </h3>
                  <div className="space-y-3">
                    {analytics.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800"
                      >
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-4xl mb-4">📊</p>
                  <p>Masukkan data untuk melihat analisis</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            ℹ️ Benchmark Engagement Rate
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-800">
            <div>
              <strong>YouTube:</strong> 2-5% (Good)
            </div>
            <div>
              <strong>Instagram:</strong> 3-6% (Good)
            </div>
            <div>
              <strong>TikTok:</strong> 5-10% (Good)
            </div>
            <div>
              <strong>Facebook:</strong> 1-3% (Good)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
