'use client';

import Link from "next/link";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("https://supportkreator.pro");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            ← Kembali ke Toolbox
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📱 QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buat QR Code custom untuk link social media, website, atau teks apapun. Download gratis!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6 h-fit">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                URL atau Teks
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition"
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Warna QR (Depan)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-10 rounded cursor-pointer border border-gray-300"
                  />
                  <span className="text-sm text-gray-500 uppercase">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Warna Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-10 rounded cursor-pointer border border-gray-300"
                  />
                  <span className="text-sm text-gray-500 uppercase">{bgColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ukuran: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">💡 Ide Penggunaan:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Link ke profile Instagram/TikTok</li>
                <li>• Link ke halaman Linktree/Bio</li>
                <li>• Direct message WhatsApp</li>
                <li>• Link download ebook/produk digital</li>
              </ul>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
            <div 
              className="bg-white p-4 rounded-xl shadow-sm mb-6"
              ref={qrRef}
            >
              <QRCodeCanvas
                value={text}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H" // High error correction
                includeMargin={true}
              />
            </div>

            <div className="space-y-4 w-full max-w-xs">
              <p className="text-sm text-gray-500 font-medium break-all">
                Preview: {text.length > 40 ? text.substring(0, 40) + '...' : text}
              </p>
              
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
