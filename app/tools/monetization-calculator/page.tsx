'use client';

import Link from "next/link";
import { useState } from "react";

export default function MonetizationCalculatorPage() {
  const [platform, setPlatform] = useState('YouTube');
  const [views, setViews] = useState('');
  const [subscribers, setSubscribers] = useState('');
  const [niche, setNiche] = useState('general');
  const [country, setCountry] = useState('Indonesia');

  const platforms = ['YouTube', 'Instagram', 'TikTok', 'Blog/Website'];
  const niches = [
    { value: 'general', label: 'General/Umum', cpmMultiplier: 1 },
    { value: 'tech', label: 'Technology/Gadget', cpmMultiplier: 1.5 },
    { value: 'gaming', label: 'Gaming', cpmMultiplier: 1.3 },
    { value: 'education', label: 'Educational', cpmMultiplier: 1.4 },
    { value: 'finance', label: 'Finance/Business', cpmMultiplier: 2 },
    { value: 'lifestyle', label: 'Lifestyle/Vlog', cpmMultiplier: 0.9 },
    { value: 'food', label: 'Food/Kuliner', cpmMultiplier: 0.8 },
    { value: 'beauty', label: 'Beauty/Fashion', cpmMultiplier: 1.1 },
    { value: 'health', label: 'Health/Fitness', cpmMultiplier: 1.3 },
    { value: 'entertainment', label: 'Entertainment', cpmMultiplier: 0.9 },
  ];

  const countries = [
    { value: 'Indonesia', cpmBase: 1.5 },
    { value: 'USA', cpmBase: 8 },
    { value: 'UK', cpmBase: 6 },
    { value: 'India', cpmBase: 0.8 },
    { value: 'Malaysia', cpmBase: 2 },
    { value: 'Singapore', cpmBase: 5 },
    { value: 'Philippines', cpmBase: 1.2 },
  ];

  const calculateYouTube = () => {
    const monthlyViews = parseInt(views) || 0;
    const countryData = countries.find(c => c.value === country) || countries[0];
    const nicheData = niches.find(n => n.value === niche) || niches[0];
    
    // CPM calculation
    const baseCPM = countryData.cpmBase;
    const adjustedCPM = baseCPM * nicheData.cpmMultiplier;
    
    // RPM is typically 55% of CPM (YouTube takes 45%)
    const rpm = adjustedCPM * 0.55;
    
    // Monthly earnings
    const monthlyEarnings = (monthlyViews / 1000) * rpm;
    const yearlyEarnings = monthlyEarnings * 12;
    
    return {
      cpm: adjustedCPM.toFixed(2),
      rpm: rpm.toFixed(2),
      monthly: monthlyEarnings.toFixed(0),
      yearly: yearlyEarnings.toFixed(0),
      perVideo: (monthlyEarnings / 4).toFixed(0), // Assuming 4 videos per month
    };
  };

  const calculateInstagram = () => {
    const followerCount = parseInt(subscribers) || 0;
    const engagementRate = 0.03; // 3% average engagement
    
    // Sponsored post rates (per post)
    let ratePerPost = 0;
    if (followerCount < 10000) {
      ratePerPost = followerCount * 0.01; // $0.01 per follower
    } else if (followerCount < 50000) {
      ratePerPost = followerCount * 0.05;
    } else if (followerCount < 100000) {
      ratePerPost = followerCount * 0.1;
    } else {
      ratePerPost = followerCount * 0.15;
    }
    
    // Convert to IDR (assume $1 = Rp 15,000 for Indonesia)
    const exchangeRate = country === 'Indonesia' ? 15000 : 1;
    ratePerPost = ratePerPost * exchangeRate;
    
    const monthlyPosts = 4; // 4 sponsored posts per month
    const monthly = ratePerPost * monthlyPosts;
    
    return {
      perPost: ratePerPost.toFixed(0),
      monthly: monthly.toFixed(0),
      yearly: (monthly * 12).toFixed(0),
      engagementRate: (engagementRate * 100).toFixed(1),
    };
  };

  const calculateTikTok = () => {
    const monthlyViews = parseInt(views) || 0;
    
    // TikTok Creator Fund (very low)
    const cpmTikTok = 0.02; // $0.02 per 1000 views
    const fundEarnings = (monthlyViews / 1000) * cpmTikTok;
    
    // Brand deals (main income source)
    const followerCount = parseInt(subscribers) || 0;
    let brandDealRate = 0;
    
    if (followerCount < 10000) {
      brandDealRate = 50000; // Rp 50k per post
    } else if (followerCount < 50000) {
      brandDealRate = 200000;
    } else if (followerCount < 100000) {
      brandDealRate = 500000;
    } else if (followerCount < 500000) {
      brandDealRate = 2000000;
    } else {
      brandDealRate = 5000000;
    }
    
    const monthlyBrandDeals = 2; // 2 brand deals per month
    const brandIncome = brandDealRate * monthlyBrandDeals;
    
    const totalMonthly = fundEarnings * 15000 + brandIncome; // Convert fund to IDR
    
    return {
      creatorFund: (fundEarnings * 15000).toFixed(0),
      brandDeals: brandIncome.toFixed(0),
      monthly: totalMonthly.toFixed(0),
      yearly: (totalMonthly * 12).toFixed(0),
    };
  };

  const calculateBlog = () => {
    const monthlyViews = parseInt(views) || 0;
    
    // AdSense RPM
    const countryData = countries.find(c => c.value === country) || countries[0];
    const nicheData = niches.find(n => n.value === niche) || niches[0];
    
    const baseRPM = countryData.cpmBase * 0.7; // AdSense typically lower than YouTube
    const adjustedRPM = baseRPM * nicheData.cpmMultiplier;
    
    // Affiliate income (estimated)
    const affiliatePerView = 0.001; // $0.001 per view average
    const affiliateIncome = monthlyViews * affiliatePerView;
    
    const adsenseIncome = (monthlyViews / 1000) * adjustedRPM;
    const totalMonthly = (adsenseIncome + affiliateIncome) * 15000; // To IDR
    
    return {
      rpm: adjustedRPM.toFixed(2),
      adsense: (adsenseIncome * 15000).toFixed(0),
      affiliate: (affiliateIncome * 15000).toFixed(0),
      monthly: totalMonthly.toFixed(0),
      yearly: (totalMonthly * 12).toFixed(0),
    };
  };

  const results = platform === 'YouTube' 
    ? calculateYouTube()
    : platform === 'Instagram'
    ? calculateInstagram()
    : platform === 'TikTok'
    ? calculateTikTok()
    : calculateBlog();

  const formatCurrency = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num)) return 'Rp 0';
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const formatUSD = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '$0';
    return '$' + num.toFixed(2);
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
            💰 Monetization Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Estimate pendapatan dari berbagai platform berdasarkan views, followers, dan niche Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Calculator Settings</h2>
              
              {/* Platform */}
              <div className="mb-4">
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
              {(platform === 'YouTube' || platform === 'TikTok' || platform === 'Blog/Website') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Views
                  </label>
                  <input
                    type="number"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="100000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              )}

              {/* Subscribers/Followers */}
              {(platform === 'Instagram' || platform === 'TikTok') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {platform === 'Instagram' ? 'Followers' : 'Followers'}
                  </label>
                  <input
                    type="number"
                    value={subscribers}
                    onChange={(e) => setSubscribers(e.target.value)}
                    placeholder="10000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              )}

              {/* Niche */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niche/Category
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                >
                  {niches.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Audience
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                >
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>{c.value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {/* Main Earnings Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 mb-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Estimated Earnings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm opacity-90 mb-1">Monthly Income</div>
                  <div className="text-4xl font-bold">
                    {formatCurrency((results as any).monthly || '0')}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-90 mb-1">Yearly Income</div>
                  <div className="text-4xl font-bold">
                    {formatCurrency((results as any).yearly || '0')}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Breakdown</h3>
              
              {platform === 'YouTube' && 'cpm' in results && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">CPM (Cost per 1000 views)</span>
                    <span className="text-xl font-bold text-blue-600">{formatUSD(results.cpm)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">RPM (Revenue per 1000 views)</span>
                    <span className="text-xl font-bold text-green-600">{formatUSD(results.rpm)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Estimated per Video</span>
                    <span className="text-xl font-bold text-purple-600">{formatCurrency(results.perVideo)}</span>
                  </div>
                </div>
              )}

              {platform === 'Instagram' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
                    <span className="font-medium text-gray-700">Rate per Sponsored Post</span>
                    <span className="text-xl font-bold text-pink-600">{formatCurrency((results as any).perPost)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Engagement Rate (Est.)</span>
                    <span className="text-xl font-bold text-purple-600">{(results as any).engagementRate}%</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">
                    💡 Assuming 4 sponsored posts per month. Actual rates vary based on engagement and niche.
                  </div>
                </div>
              )}

              {platform === 'TikTok' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-700">Creator Fund (Monthly)</span>
                    <span className="text-xl font-bold text-red-600">{formatCurrency((results as any).creatorFund)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Brand Deals (Est.)</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency((results as any).brandDeals)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">
                    💡 TikTok Creator Fund pays very little. Brand deals are the main income source!
                  </div>
                </div>
              )}

              {platform === 'Blog/Website' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">RPM (Revenue per 1000)</span>
                    <span className="text-xl font-bold text-blue-600">{formatUSD((results as any).rpm)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">AdSense Earnings</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency((results as any).adsense)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Affiliate Income (Est.)</span>
                    <span className="text-xl font-bold text-purple-600">{formatCurrency((results as any).affiliate)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">
                💡 Tips Maksimalkan Earning
              </h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <p><strong>Diversify Income:</strong> Jangan hanya mengandalkan ads, explore sponsorship, affiliate, dan merchandise</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <p><strong>High CPM Niches:</strong> Finance, Tech, Business punya CPM lebih tinggi</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <p><strong>Target International:</strong> Audience dari USA/UK punya CPM lebih tinggi</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <p><strong>Engagement &gt; Followers:</strong> High engagement lebih valuable untuk brand deals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> Semua estimasi di atas berdasarkan industry averages dan data publik. 
            Actual earnings bisa berbeda tergantung banyak faktor seperti engagement rate, audience demographics, 
            seasonality, dan strategy monetisasi Anda. Tool ini hanya untuk estimasi kasar.
          </p>
        </div>
      </div>
    </div>
  );
}
