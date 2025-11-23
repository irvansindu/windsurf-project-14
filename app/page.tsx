'use client';

import Link from "next/link";
import { useState } from "react";

// Tool data type
interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
}

// List of tools - easy to add more
const tools: Tool[] = [
  {
    id: "1",
    name: "IvadaMusic – Audio & MP3 Tools",
    description: "Download dan konversi audio MP3 dengan mudah. Tools lengkap untuk kebutuhan audio creator.",
    url: "https://ivadamusic.web.id",
    tags: ["Audio", "MP3", "Download"],
    category: "Audio",
  },
  {
    id: "2",
    name: "Posting Schedule Planner",
    description: "Temukan waktu posting terbaik untuk konten Anda di berbagai platform social media.",
    url: "/tools/posting-schedule",
    tags: ["Schedule", "Planning", "Analytics"],
    category: "Research",
  },
  {
    id: "3",
    name: "Analytics Checker",
    description: "Analisis performa konten Anda dan dapatkan insight untuk meningkatkan engagement.",
    url: "/tools/analytics-checker",
    tags: ["Analytics", "Research", "Data"],
    category: "Research",
  },
  {
    id: "4",
    name: "Monetization Calculator",
    description: "Hitung estimasi pendapatan dari YouTube, Instagram, TikTok berdasarkan views dan followers.",
    url: "/tools/monetization-calculator",
    tags: ["Money", "Analytics", "Calculator"],
    category: "Research",
  },
  {
    id: "5",
    name: "Script Writer",
    description: "Bantu tulis script untuk video atau podcast dengan template yang sudah terbukti.",
    url: "/tools/script-writer",
    tags: ["Writing", "Content", "Script"],
    category: "Writing",
  },
  {
    id: "6",
    name: "Hashtag Generator",
    description: "Temukan hashtag yang tepat untuk meningkatkan reach konten Anda di media sosial.",
    url: "/tools/hashtag-generator",
    tags: ["Social Media", "SEO", "Marketing"],
    category: "Research",
  },
  {
    id: "7",
    name: "Video Editor Tools",
    description: "Koleksi tools online untuk edit video dengan cepat tanpa software berat.",
    url: "/tools/video-editor",
    tags: ["Video", "Editing", "Production"],
    category: "Design",
  },
  {
    id: "8",
    name: "QR Code Generator",
    description: "Buat QR Code custom untuk link social media, website, atau teks apapun. Download gratis!",
    url: "/tools/qr-generator",
    tags: ["QR Code", "Marketing", "Tools"],
    category: "Design",
  },
];

// Get unique categories
const categories = ["All", ...Array.from(new Set(tools.map(tool => tool.category)))];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter tools based on selected category
  const filteredTools = selectedCategory === "All"
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Support Kreator
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Toolbox untuk Content Creator
          </p>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Kumpulan tools berguna dan AI mini-tools untuk membantu kreator konten 
            dalam menghasilkan karya terbaik mereka.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/ai-tools"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Buka AI Tools
            </Link>
            <a
              href="#toolbox"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              Jelajahi Toolbox
            </a>
          </div>
        </div>
      </section>

      {/* Toolbox Section */}
      <section id="toolbox" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Creator Toolbox
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih tools yang Anda butuhkan untuk mempercepat workflow kreatif Anda
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-primary-600 hover:text-primary-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Tool Name */}
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Visit Button */}
                  <a
                    href={tool.url}
                    target={tool.url.startsWith('http') ? '_blank' : '_self'}
                    rel={tool.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Kunjungi →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada tools dalam kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Butuh Tools AI?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Coba AI Tools kami untuk generate caption, content ideas, dan ad titles secara otomatis.
          </p>
          <Link
            href="/ai-tools"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg"
          >
            Coba AI Tools Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
