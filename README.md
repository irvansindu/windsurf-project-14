# Support Kreator – Creator Toolbox

A modern web application for content creators featuring a curated toolbox of useful external tools and AI-powered mini-tools for generating captions, content ideas, and ad titles.

## 🚀 Features

- **Creator Toolbox**: Curated list of useful tools with filtering by category
- **Creator Tools**:
  - 📅 **Posting Schedule Planner** - Find best times to post on social media platforms
  - 💰 **Monetization Calculator** - Estimate earnings from YouTube, Instagram, TikTok
  - 📝 **Script Writer** - Write scripts for video, podcast, and livestream
  - #️⃣ **Hashtag Generator** - Generate trending hashtags for social media
  - 📊 **Analytics Checker** - Analyze content performance and get insights
  - 🎬 **Video Editor Tools** - Collection of video editing resources
  - 📱 **QR Code Generator** - Generate custom QR codes for your links
- **AI Mini-Tools**:
  - Caption Generator
  - Content Idea Generator
  - Ad Title / Hook Generator
- Modern, responsive design with Tailwind CSS
- Server-side API routes for AI generation
- Easy integration with OpenAI or Google Gemini

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI / Google Gemini (configurable)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   
   Create a `.env` file in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
   
   Edit `.env` and add your API key:
   ```env
   # For OpenAI:
   AI_API_KEY=your-openai-api-key-here
   AI_PROVIDER=openai
   
   # OR for Google Gemini:
   # AI_API_KEY=your-gemini-api-key-here
   # AI_PROVIDER=gemini
   
   # OR leave empty to use mock data during development
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### AI Provider Setup

The app supports multiple AI providers:

#### Option 1: Mock Data (Default)
No configuration needed. The app will use sample generated data for testing.

#### Option 2: OpenAI
1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Set in `.env`:
   ```env
   AI_API_KEY=sk-...
   AI_PROVIDER=openai
   ```

#### Option 3: Google Gemini
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set in `.env`:
   ```env
   AI_API_KEY=your-gemini-key
   AI_PROVIDER=gemini
   ```

### Adding More Tools

To add more tools to the toolbox, edit `app/page.tsx`:

```typescript
const tools: Tool[] = [
  // ... existing tools
  {
    id: "7",
    name: "Your New Tool",
    description: "Description of your tool",
    url: "https://yourtool.com",
    tags: ["Tag1", "Tag2"],
    category: "Design", // Audio, Design, Research, Writing
  },
];
```

## 📁 Project Structure

```text
windsurf-project-14/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # AI mini-tools API endpoint
│   ├── ai-tools/
│   │   └── page.tsx              # AI mini-tools page
│   ├── tools/                    # Internal creator tools
│   │   ├── posting-schedule/
│   │   │   └── page.tsx          # Posting Schedule Planner
│   │   ├── monetization-calculator/
│   │   │   └── page.tsx          # Monetization Calculator
│   │   ├── script-writer/
│   │   │   └── page.tsx          # Script Writer
│   │   ├── hashtag-generator/
│   │   │   └── page.tsx          # Hashtag Generator
│   │   ├── analytics-checker/
│   │   │   └── page.tsx          # Analytics Checker
│   │   ├── video-editor/
│   │   │   └── page.tsx          # Video Editor Tools
│   │   └── qr-generator/
│   │       └── page.tsx          # QR Code Generator
│   ├── layout.tsx                # Root layout with navbar & footer
│   ├── page.tsx                  # Home page (toolbox)
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize colors
    900: '#0c4a6e',
  },
}
```

### Layout
- **Navbar**: Edit `app/layout.tsx`
- **Footer**: Edit `app/layout.tsx`
- **Home Page**: Edit `app/page.tsx`
- **AI Tools Page**: Edit `app/ai-tools/page.tsx`

## 🚢 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com/)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

## 📝 API Documentation

### POST /api/ai

Generate AI content (captions, ideas, or ad titles).

**Request Body:**
```json
{
  "type": "caption",        // "caption" | "idea" | "ad_title"
  "topic": "jualan baju muslim",
  "platform": "Instagram",
  "tone": "Santai",
  "language": "Bahasa Indonesia"
}
```

**Response:**
```json
{
  "suggestions": [
    "Caption 1...",
    "Caption 2...",
    "Caption 3...",
    "Caption 4...",
    "Caption 5..."
  ]
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## 🤝 Contributing

Feel free to customize this project for your needs:

1. Add more tools to the toolbox
2. Enhance AI prompts in `app/api/ai/route.ts`
3. Add more AI tool types
4. Improve UI/UX design
5. Add authentication for premium features

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Built with ❤️ for content creators everywhere.

Special thanks to:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google.dev/)

---

**SupportKreator.pro** – Dibuat untuk membantu para kreator.
