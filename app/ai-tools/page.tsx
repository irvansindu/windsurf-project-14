'use client';

import { useState } from "react";

type ToolType = 'caption' | 'idea' | 'ad_title' | 'bio';

interface FormData {
  topic: string;
  platform: string;
  tone: string;
  language: string;
}

interface GenerationResult {
  suggestions: string[];
}

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolType>('caption');
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'Instagram',
    tone: 'Santai',
    language: 'Bahasa Indonesia',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter/X', 'LinkedIn'];
  const tones = ['Santai', 'Formal', 'Lucu', 'Edukasi', 'Inspiratif', 'Promosi'];
  const languages = ['Bahasa Indonesia', 'English'];

  const toolInfo = {
    caption: {
      title: 'Caption Generator',
      description: 'Generate caption menarik untuk postingan media sosial Anda',
      placeholder: 'Contoh: jualan baju muslim, tips diet sehat, tutorial makeup',
    },
    idea: {
      title: 'Content Idea Generator',
      description: 'Dapatkan ide konten fresh untuk channel atau akun sosial media Anda',
      placeholder: 'Contoh: konten edukasi finansial, video traveling, resep masakan',
    },
    ad_title: {
      title: 'Ad Title / Hook Generator',
      description: 'Buat judul iklan atau hook yang menarik perhatian audience',
      placeholder: 'Contoh: promo diskon gadget, kursus online, jasa desain',
    },
    bio: {
      title: 'Social Bio Generator',
      description: 'Buat bio profil yang profesional, aesthetic, dan engaging',
      placeholder: 'Contoh: Digital Marketer, Food Blogger, Travel Enthusiast',
    },
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    // Validation
    if (!formData.topic.trim()) {
      setError('Mohon masukkan topik/niche terlebih dahulu');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: activeTab,
          ...formData,
        }),
      });

      const data: GenerationResult | { error: string } = await response.json();

      if (!response.ok) {
        throw new Error('error' in data ? data.error : 'Terjadi kesalahan');
      }

      if ('suggestions' in data) {
        setResults(data.suggestions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal generate. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            AI Tools untuk Kreator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate caption, content ideas, dan ad titles dengan bantuan AI. 
            Gunakan hasil sebagai inspirasi dan sesuaikan dengan gaya brand Anda.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            {(Object.keys(toolInfo) as ToolType[]).map((tool) => (
              <button
                key={tool}
                onClick={() => {
                  setActiveTab(tool);
                  setResults([]);
                  setError('');
                }}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tool
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {toolInfo[tool].title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {toolInfo[activeTab].title}
              </h2>
              <p className="text-gray-600">
                {toolInfo[activeTab].description}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topik / Niche <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder={toolInfo[activeTab].placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Contoh: {toolInfo[activeTab].placeholder}
                </p>
              </div>

              {/* Platform Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => handleInputChange('platform', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone / Gaya
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bahasa
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all shadow-lg ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-xl'
                }`}
              >
                {loading ? 'Generating...' : '✨ Generate'}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Results Display */}
            {results.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  💡 Hasil Generate:
                </h3>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <p className="flex-1 text-gray-800 leading-relaxed">
                          {result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Helper Note */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Tips:</strong> Gunakan hasil AI sebagai inspirasi. Sesuaikan dengan gaya dan brand voice Anda untuk hasil terbaik.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            ℹ️ Cara Menggunakan AI Tools
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Pilih tool yang ingin Anda gunakan (Caption, Content Idea, atau Ad Title)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Isi topik/niche yang spesifik untuk hasil yang lebih relevan</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Pilih platform, tone, dan bahasa sesuai kebutuhan Anda</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <span>Klik Generate dan tunggu AI menghasilkan beberapa opsi untuk Anda</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">5.</span>
              <span>Edit dan sesuaikan hasil dengan gaya personal Anda</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
