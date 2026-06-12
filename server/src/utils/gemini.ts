import dotenv from 'dotenv';

dotenv.config();

export async function callGemini(prompt: string, temperature: number = 0.7, jsonMode: boolean = false): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  const generationConfig: any = {
    temperature,
  };

  if (jsonMode) {
    generationConfig.responseMimeType = 'application/json';
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawText) {
    throw new Error('Empty response from Gemini API');
  }

  if (jsonMode) {
    try {
      return JSON.parse(rawText.trim());
    } catch (e) {
      console.error('Failed to parse Gemini JSON output', rawText);
      throw new Error('Invalid JSON response from Gemini');
    }
  }

  return rawText.trim();
}
