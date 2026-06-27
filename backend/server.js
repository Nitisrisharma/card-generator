import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

const themePrompts = {
    republic: 'Indian Republic day celebrations, subtle tricolor smoke in the sky, minimalist background, 8k',
    independence: 'Red Fort in Delhi with an Indian flag, soft cinematic lighting, bokeh background',
    gandhi: 'Artistic watercolor painting profile silhouette of Mahatma Gandhi, warm elegant tones',
    diwali: 'Close-up shot of multiple beautiful glowing clay diyas, golden light sparkles',
    holi: 'Vibrant organic holi colors exploding mid-air, dynamic motion blur',
    eid: 'Elegant golden crescent moon and a magnificent mosque silhouette at beautiful twilight',
    christmas: 'Cozy aesthetic decorated Christmas tree corner, warm bokeh fairy lights',
    birthday: 'Minimalist luxury birthday background, golden balloons, soft confetti',
    invitation: 'Premium luxury dark royal card background with intricate golden patterns'
};

// 1. ENDPOINT FOR GENERATING AI BACKGROUND IMAGES
app.get('/api/generate-bg', (req, res) => {
    const festival = req.query.festival;
    if (!themePrompts[festival]) {
        return res.status(400).json({ error: 'Festival not found' });
    }

    const promptText = themePrompts[festival];
    const randomSeed = Math.floor(Math.random() * 100000);
    const encodedPrompt = encodeURIComponent(promptText);
    
    // Using Pollinations for instant front-end rendering
    const aiImageUrl = `https://image.pollinations.ai/p/${encodedPrompt}?width=1280&height=1280&seed=${randomSeed}&nologo=true`;

    res.json({ imageUrl: aiImageUrl });
});

// 2. NEW ENDPOINT: GENERATE FESTIVE TEXT USING GEMINI
app.get('/api/generate-text', async (req, res) => {
    const festival = req.query.festival;
    
    if (!festival) {
        return res.status(400).json({ error: 'Festival parameter is required' });
    }

    try {
        // Engineering the prompt for a premium card feel
        const userPrompt = `Write a short, heartfelt, and elegant greeting message for a greeting card celebrating ${festival}. It should be maximum 2-3 lines long, professional yet warm, and ready to print. Do not include any subject lines, quotes, or placeholders. Just return the clean text message.`;

        // Calling the Gemini 2.5 Flash model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
        });

        const generatedText = response.text.trim();
        res.json({ text: generatedText });

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: 'Failed to generate text via Gemini API' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});