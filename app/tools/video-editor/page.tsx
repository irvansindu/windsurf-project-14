'use client';

import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  features: string[];
  icon: string;
  url: string;
  external?: boolean;
}

export default function VideoEditorToolsPage() {
  const videoTools: Tool[] = [
    {
      name: "Video Trimmer",
      description: "Potong dan trim video dengan mudah",
      features: ["Cut video", "Trim timeline", "Export HD"],
      icon: "✂️",
      url: "#trimmer",
    },
    {
      name: "Video Merger",
      description: "Gabungkan beberapa video menjadi satu",
      features: ["Merge clips", "Add transitions", "Export seamlessly"],
      icon: "🔗",
      url: "#merger",
    },
    {
      name: "Video Compressor",
      description: "Compress video tanpa kehilangan kualitas",
      features: ["Reduce file size", "Maintain quality", "Fast processing"],
      icon: "📦",
      url: "#compressor",
    },
    {
      name: "Add Text/Subtitle",
      description: "Tambahkan teks dan subtitle ke video",
      features: ["Custom fonts", "Subtitle timing", "Multiple styles"],
      icon: "📝",
      url: "#subtitle",
    },
    {
      name: "Video to GIF",
      description: "Convert video ke GIF animated",
      features: ["Select duration", "Adjust speed", "Custom size"],
      icon: "🎞️",
      url: "#gif",
    },
    {
      name: "Background Remover",
      description: "Hapus background video (Green screen)",
      features: ["Remove green screen", "Add custom bg", "HD quality"],
      icon: "🎭",
      url: "#bgremover",
    },
  ];

  const externalTools: Tool[] = [
    {
      name: "CapCut Online",
      description: "Video editor online terlengkap",
      features: ["Templates", "Effects", "Music library"],
      icon: "🎬",
      url: "https://www.capcut.com",
      external: true,
    },
    {
      name: "Canva Video Editor",
      description: "Edit video dengan drag & drop",
      features: ["Easy to use", "Templates", "Collaboration"],
      icon: "🎨",
      url: "https://www.canva.com/video-editor/",
      external: true,
    },
    {
      name: "Clipchamp",
      description: "Video editor by Microsoft",
      features: ["Browser-based", "AI features", "Stock assets"],
      icon: "🎥",
      url: "https://clipchamp.com",
      external: true,
    },
  ];

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎬 Video Editor Tools
          </h1>
          <p className="text-lg text-gray-600">
            Koleksi tools online untuk edit video dengan cepat tanpa software berat
          </p>
        </div>

        {/* Built-in Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🛠️ Built-in Tools (Coming Soon)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-1 mb-4">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* External Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🌐 Recommended External Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalTools.map((tool, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl shadow-lg border border-primary-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-1 mb-4">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="text-primary-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Kunjungi →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-yellow-900 mb-4">
            💡 Tips Editing Video untuk Pemula
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
            <div>
              <strong>1. Keep it Simple</strong>
              <p>Jangan terlalu banyak efek transisi</p>
            </div>
            <div>
              <strong>2. Audio is King</strong>
              <p>Kualitas audio lebih penting dari video</p>
            </div>
            <div>
              <strong>3. Cut the Fluff</strong>
              <p>Potong bagian yang tidak perlu</p>
            </div>
            <div>
              <strong>4. Use B-Roll</strong>
              <p>Tambahkan footage tambahan untuk variasi</p>
            </div>
            <div>
              <strong>5. Color Grading</strong>
              <p>Sesuaikan warna untuk mood yang tepat</p>
            </div>
            <div>
              <strong>6. Export Settings</strong>
              <p>1080p, 60fps untuk YouTube optimal</p>
            </div>
          </div>
        </div>

        {/* Resource Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            📚 Free Resources untuk Video Editor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Music & Sound Effects:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Epidemic Sound</li>
                <li>• YouTube Audio Library</li>
                <li>• Pixabay Music</li>
              </ul>
            </div>
            <div>
              <strong>Stock Footage:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Pexels Videos</li>
                <li>• Pixabay Videos</li>
                <li>• Coverr</li>
              </ul>
            </div>
            <div>
              <strong>Fonts:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Google Fonts</li>
                <li>• DaFont</li>
                <li>• Font Squirrel</li>
              </ul>
            </div>
            <div>
              <strong>Learning:</strong>
              <ul className="mt-2 space-y-1">
                <li>• YouTube Tutorials</li>
                <li>• Skillshare</li>
                <li>• Udemy Courses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 text-center bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            🚀 More Tools Coming Soon!
          </h3>
          <p className="text-gray-600 mb-4">
            Kami sedang mengembangkan built-in video editor tools yang bisa digunakan langsung di browser.
          </p>
          <p className="text-sm text-gray-500">
            Sementara ini, gunakan external tools yang sudah kami rekomendasikan di atas.
          </p>
        </div>
      </div>
    </div>
  );
}
