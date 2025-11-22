'use client';

import Link from "next/link";
import { useState } from "react";

export default function ScriptWriterPage() {
  const [contentType, setContentType] = useState('video');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('5');
  const [tone, setTone] = useState('casual');
  const [script, setScript] = useState('');

  const contentTypes = [
    { value: 'video', label: 'Video YouTube' },
    { value: 'shorts', label: 'Shorts/Reels' },
    { value: 'podcast', label: 'Podcast' },
    { value: 'livestream', label: 'Livestream' },
  ];

  const tones = ['Casual', 'Formal', 'Energetic', 'Educational', 'Storytelling'];

  const generateScript = () => {
    if (!topic) return;

    const scripts = {
      video: `[INTRO - 0:00]
Halo semuanya! Selamat datang kembali di channel saya.
Hari ini kita akan bahas tentang "${topic}".
Video ini penting banget buat kalian yang ${tone === 'casual' ? 'pengen tau lebih dalam' : 'ingin memahami secara mendalam'}.

[OPENING HOOK - 0:15]
Tahukah kalian bahwa ${topic} ini sangat berpengaruh di era digital seperti sekarang?
Yuk kita bahas satu-satu!

[MAIN CONTENT - 0:45]
Pertama, kita mulai dari dasar dulu...
[Jelaskan poin utama 1]

Kedua, hal penting yang perlu kalian tau adalah...
[Jelaskan poin utama 2]

Ketiga, tips praktis yang bisa langsung kalian terapkan...
[Jelaskan poin utama 3]

[CALL TO ACTION - ${duration}:00]
Nah, itu dia pembahasan tentang ${topic}.
Jangan lupa LIKE, COMMENT, dan SUBSCRIBE ya!
Kalau ada pertanyaan, tulis di kolom komentar.
Sampai jumpa di video berikutnya!

[OUTRO]
*End screen dengan video rekomendasi*`,

      shorts: `[HOOK - 0:01]
Nih rahasia ${topic}! 👇

[MAIN POINT - 0:03]
${tone === 'casual' ? 'Gampang banget kok!' : 'Sangat mudah dipahami!'}
1. [Poin 1]
2. [Poin 2]  
3. [Poin 3]

[CTA - 0:25]
Save dulu biar ga lupa!
Follow untuk tips lainnya 🔥

#${topic.replace(/\s+/g, '')} #ContentCreator`,

      podcast: `[INTRO MUSIC - 0:00]

[OPENING - 0:30]
Host: Halo listeners! Welcome back to [Nama Podcast].
Hari ini kita akan deep dive ke topik yang menarik: "${topic}".

[PERSONAL CONNECTION - 1:00]
Kalian pernah ngerasain ga...
[Cerita relatable tentang topik]

[MAIN DISCUSSION - 2:00]
Mari kita breakdown topik ini dari berbagai sudut pandang:

Point 1: [Pembahasan mendalam]
Point 2: [Analisis detail]
Point 3: [Perspektif berbeda]

[Q&A / DISCUSSION - ${duration}:00]
Nah, menarik kan?
[Pertanyaan reflektif untuk audience]

[CLOSING - ${duration}:30]
Thanks for listening!
Jangan lupa subscribe dan kasih review ya.
See you next episode!

[OUTRO MUSIC]`,

      livestream: `[PRE-STREAM SETUP]
- Test audio dan video
- Siapkan backdrop / lighting
- Buka moderator chat

[OPENING - 0:00]
Halo semuanya! Apa kabar?
Drop "HADIR" di chat ya!

[INTRODUCTION - 1:00]
Oke, hari ini kita akan bahas tentang "${topic}".
Livestream ini akan berguna banget buat kalian yang ${tone === 'casual' ? 'lagi belajar' : 'sedang mempelajari'} hal ini.

[MAIN CONTENT - 5:00]
Langsung aja ya, kita mulai dari:
- Point 1: [Penjelasan + demo]
- Point 2: [Contoh real]
- Point 3: [Tips praktis]

[Q&A SESSION - ${duration}:00]
Sekarang waktunya Q&A!
Drop pertanyaan kalian di chat.

[CLOSING - ${duration}:30]
Thank you semuanya yang udah join!
Nantiin livestream selanjutnya ya.
Jangan lupa subscribe!`
    };

    setScript(scripts[contentType as keyof typeof scripts]);
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
            📝 Script Writer
          </h1>
          <p className="text-lg text-gray-600">
            Bantu tulis script untuk video atau podcast dengan template yang sudah terbukti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Script Generator
            </h2>

            <div className="space-y-6">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Konten
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setContentType(type.value)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                        contentType === type.value
                          ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topik Konten <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: cara edit video untuk pemula"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi (menit)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  max="60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone/Gaya
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                >
                  {tones.map((t) => (
                    <option key={t.toLowerCase()} value={t.toLowerCase()}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateScript}
                disabled={!topic}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  topic
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✨ Generate Script
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Script Output
              </h2>
              {script && (
                <button
                  onClick={() => navigator.clipboard.writeText(script)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  📋 Copy
                </button>
              )}
            </div>

            {script ? (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {script}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-lg mb-2">📄</p>
                  <p>Script akan muncul di sini</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Box */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">
            💡 Tips Menulis Script
          </h3>
          <ul className="text-yellow-800 space-y-2">
            <li>• <strong>Hook di 3 detik pertama</strong> - Buat audience penasaran</li>
            <li>• <strong>Struktur jelas</strong> - Intro, Main Content, Closing</li>
            <li>• <strong>Natural dan conversational</strong> - Jangan terlalu kaku</li>
            <li>• <strong>Call-to-action</strong> - Like, subscribe, comment</li>
            <li>• <strong>Edit dan practice</strong> - Sesuaikan dengan gaya bicara Anda</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
