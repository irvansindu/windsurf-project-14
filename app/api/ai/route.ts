import { NextRequest, NextResponse } from 'next/server';

// Type definitions
type ToolType = 'caption' | 'idea' | 'ad_title' | 'bio';

interface AIRequest {
  type: ToolType;
  topic: string;
  platform: string;
  tone: string;
  language: string;
}

// Mock AI generation function
// Replace this with real AI API calls (OpenAI, Gemini, etc.)
function generateMockResults(request: AIRequest): string[] {
  const { type, topic, platform, tone, language } = request;
  
  // Different templates based on tool type
  const templates: Record<ToolType, string[]> = {
    caption: [
      `${topic} - ${tone} vibes untuk ${platform}! 🔥`,
      `Ketika ${topic} meets ${tone} energy di ${platform} 💫`,
      `${topic} yang ${tone} banget! Perfect untuk ${platform} 🎯`,
      `Ini dia ${topic} dengan twist ${tone}! ${platform} edition ✨`,
      `${topic}: ${tone} style untuk audience ${platform} kamu 🚀`,
    ],
    idea: [
      `Tutorial ${topic} untuk pemula di ${platform} dengan gaya ${tone}`,
      `Behind the scenes: Proses ${topic} yang ${tone} dan engaging`,
      `Top 5 tips ${topic} yang wajib dicoba (${tone} version)`,
      `${topic} challenge: Konten ${tone} yang bikin viral di ${platform}`,
      `Review honest: ${topic} dengan pendekatan ${tone} yang relatable`,
    ],
    ad_title: [
      `🔥 ${topic} - Penawaran ${tone} yang Nggak Boleh Dilewatkan!`,
      `⚡ Rahasia ${topic} yang ${tone} dan Terbukti Efektif`,
      `💎 ${topic}: ${tone} Solution untuk Masalah Kamu`,
      `🎯 Kenapa ${topic} ini ${tone} banget? Cek Sekarang!`,
      `✨ ${topic} - ${tone} Way untuk Hasil Maksimal`,
    ],
    bio: [
      `👋 ${topic} Enthusiast | Sharing tips ${tone} setiap hari ✨ | Klik link di bawah 👇`,
      `🚀 Helping you with ${topic} | ${tone} Vibes Only ✨ | DM for collab 📩`,
      `✨ All things ${topic} | ${tone} Life | Join our community 👇`,
      `🎓 Belajar ${topic} bareng aku! | Gaya ${tone} & Seru | Follow for more ⚡`,
      `💡 ${topic} Expert | ${tone} approach to life | Business Inquiries 📧`,
    ],
  };

  // Adjust for language
  const results = templates[type];
  
  if (language === 'English') {
    // Simple English translations (in real app, use proper translation)
    return results.map(text => {
      return text
        .replace(/untuk/g, 'for')
        .replace(/yang/g, 'that')
        .replace(/dengan/g, 'with')
        .replace(/banget/g, 'really')
        .replace(/Ketika/g, 'When')
        .replace(/meets/g, 'meets')
        .replace(/Ini dia/g, 'Here is')
        .replace(/Tutorial/g, 'Tutorial')
        .replace(/pemula/g, 'beginners')
        .replace(/gaya/g, 'style');
    });
  }

  return results;
}

// Optional: Real OpenAI integration
async function generateWithOpenAI(request: AIRequest): Promise<string[]> {
  const apiKey = process.env.AI_API_KEY;
  
  if (!apiKey) {
    throw new Error('AI_API_KEY not configured');
  }

  const prompts: Record<ToolType, string> = {
    caption: `Generate 5 engaging social media captions for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Make them creative and attention-grabbing.`,
    idea: `Generate 5 creative content ideas for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Focus on ideas that would engage viewers.`,
    ad_title: `Generate 5 compelling advertising titles/hooks about "${request.topic}" with a ${request.tone} tone in ${request.language}. Make them click-worthy and persuasive.`,
    bio: `Generate 5 professional and engaging social media bios for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Use emojis and make it structured.`,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a creative content writer helping content creators. Return only the list of suggestions, numbered 1-5.',
        },
        {
          role: 'user',
          content: prompts[request.type],
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  const text = data.choices[0]?.message?.content || '';
  
  // Parse numbered list
  const suggestions = text
    .split('\n')
    .filter((line: string) => line.trim().match(/^\d+[.)]/))
    .map((line: string) => line.replace(/^\d+[.)]?\s*/, '').trim())
    .filter((line: string) => line.length > 0);

  return suggestions.slice(0, 5);
}

// Optional: Google Gemini integration
async function generateWithGemini(request: AIRequest): Promise<string[]> {
  const apiKey = process.env.AI_API_KEY;
  
  if (!apiKey) {
    throw new Error('AI_API_KEY not configured');
  }

  const prompts: Record<ToolType, string> = {
    caption: `Generate 5 engaging social media captions for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Make them creative and attention-grabbing. Return only the captions, numbered 1-5.`,
    idea: `Generate 5 creative content ideas for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Focus on ideas that would engage viewers. Return only the ideas, numbered 1-5.`,
    ad_title: `Generate 5 compelling advertising titles/hooks about "${request.topic}" with a ${request.tone} tone in ${request.language}. Make them click-worthy and persuasive. Return only the titles, numbered 1-5.`,
    bio: `Generate 5 professional and engaging social media bios for ${request.platform} about "${request.topic}" with a ${request.tone} tone in ${request.language}. Use emojis and make it structured. Return only the bios, numbered 1-5.`,
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompts[request.type],
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Gemini API request failed');
  }

  const data = await response.json();
  const text = data.candidates[0]?.content?.parts[0]?.text || '';
  
  // Parse numbered list
  const suggestions = text
    .split('\n')
    .filter((line: string) => line.trim().match(/^\d+[.)]/))
    .map((line: string) => line.replace(/^\d+[.)]?\s*/, '').trim())
    .filter((line: string) => line.length > 0);

  return suggestions.slice(0, 5);
}

// Main POST handler
export async function POST(req: NextRequest) {
  try {
    const body: AIRequest = await req.json();

    // Validation
    if (!body.type || !body.topic) {
      return NextResponse.json(
        { error: 'Missing required fields: type and topic' },
        { status: 400 }
      );
    }

    if (!['caption', 'idea', 'ad_title', 'bio'].includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be caption, idea, ad_title, or bio' },
        { status: 400 }
      );
    }

    // Choose AI provider based on environment variable
    // For now, we'll use mock data by default
    let suggestions: string[];

    const aiProvider = process.env.AI_PROVIDER || 'mock';

    try {
      if (aiProvider === 'openai' && process.env.AI_API_KEY) {
        suggestions = await generateWithOpenAI(body);
      } else if (aiProvider === 'gemini' && process.env.AI_API_KEY) {
        suggestions = await generateWithGemini(body);
      } else {
        // Use mock data for development or when no API key is set
        suggestions = generateMockResults(body);
      }
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      // Fallback to mock data if AI provider fails
      suggestions = generateMockResults(body);
    }

    return NextResponse.json({ suggestions }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET handler for testing
export async function GET() {
  return NextResponse.json(
    {
      message: 'AI Tools API',
      usage: 'POST to this endpoint with type, topic, platform, tone, and language',
      types: ['caption', 'idea', 'ad_title'],
    },
    { status: 200 }
  );
}
