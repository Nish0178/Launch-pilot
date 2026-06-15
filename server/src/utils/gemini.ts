import dotenv from 'dotenv';

dotenv.config();

export async function callGemini(
  prompt: string,
  temperature: number = 0.7,
  jsonMode: boolean = false
): Promise<any> {
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

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        if (
          response.status === 429 ||
          response.status === 500 ||
          response.status === 502 ||
          response.status === 503 ||
          response.status === 504
        ) {
          if (attempt < MAX_RETRIES) {
            console.log(
              `Gemini temporary error (${response.status}). Retrying ${attempt}/${MAX_RETRIES}...`
            );

            await new Promise(resolve =>
              setTimeout(resolve, attempt * 3000)
            );

            continue;
          }
        }

        throw new Error(
          `Gemini API returned status ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();

      const rawText =
        result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Empty response from Gemini API');
      }

      if (jsonMode) {
        try {
          return JSON.parse(rawText.trim());
        } catch {
          console.error('Failed to parse Gemini JSON output');
          throw new Error('Invalid JSON response from Gemini');
        }
      }

      return rawText.trim();
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw error;
      }

      console.log(
        `Gemini request failed. Retrying ${attempt}/${MAX_RETRIES}...`
      );

      await new Promise(resolve =>
        setTimeout(resolve, attempt * 3000)
      );
    }
  }

  throw new Error('Gemini request failed after multiple retries');
}