'use client';

import Link from "next/link";
import { useState } from "react";

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const platforms = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube'];

  const generateHashtags = () => {
    if (!topic) return;

    // Generate hashtags based on topic
    const baseHashtags = [
      `#${topic.replace(/\s+/g, '')}`,
      `#${topic.replace(/\s+/g, '')}Indonesia`,
      `#${topic.split(' ')[0]}`,
    ];

    const trendingHashtags = platform === 'Instagram' 
      ? ['#ContentCreator', '#KontenKreator', '#ViralIndonesia', '#FYP', '#Explore']
      : platform === 'TikTok'
      ? ['#TikTokIndonesia', '#FYP', '#Viral', '#TikTokers', '#ForYouPage']
      : platform === 'Twitter/X'
      ? ['#Thread', '#TwitterIndonesia', '#Viral', '#Trending']
      : platform === 'LinkedIn'
      ? ['#ProfessionalGrowth', '#LinkedInIndonesia', '#CareerTips', '#Business']
      : ['#YouTubeIndonesia', '#YouTuber', '#Subscribe', '#ContentCreator'];

    const nicheTags = [
      `#Tips${topic.split(' ')[0]}`,
      `#Belajar${topic.split(' ')[0]}`,
      `#Tutorial${topic.split(' ')[0]}`,
      `#${topic.split(' ')[0]}Indonesia`,
    ];

    const allHashtags = [...baseHashtags, ...trendingHashtags, ...nicheTags]
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .slice(0, 15);

    setHashtags(allHashtags);
  };

  const copyToClipboard = () => {
    const text = hashtags.join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
            ← Kembali ke Toolbox
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            #️⃣ Hashtag Generator
          </h1>
          <p className="text-lg text-gray-600">
            Temukan hashtag yang tepat untuk meningkatkan reach konten Anda
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topik Konten <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: tutorial editing video"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

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

            {/* Generate Button */}
            <button
              onClick={generateHashtags}
              disabled={!topic}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                topic
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🚀 Generate Hashtags
            </button>
          </div>

          {/* Results */}
          {hashtags.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  📋 Hashtags Generated
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  {copied ? '✓ Copied!' : '📋 Copy All'}
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tips:</strong> Gunakan 5-10 hashtag yang paling relevan. 
                  Kombinasikan hashtag populer dan niche untuk hasil terbaik.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            ℹ️ Cara Kerja Hashtag Generator
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Masukkan topik atau niche konten Anda</li>
            <li>• Pilih platform media sosial target</li>
            <li>• Dapatkan kombinasi hashtag trending dan niche-specific</li>
            <li>• Copy dan paste ke caption konten Anda</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
