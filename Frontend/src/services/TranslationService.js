// Translation Service using DeepL API via backend proxy
// Free tier: 500,000 characters/month
// Get your API key at: https://www.deepl.com/pro-api

// Backend API URL (proxy to avoid CORS)
const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://laasara-backend-8a70df67d523.herokuapp.com'
  : 'http://localhost:4242';

// Language codes mapping (our app -> DeepL)
const LANGUAGE_MAP = {
  'fr': 'FR',
  'de': 'DE',
  'ar': 'AR', // DeepL supports Arabic
  'da': 'DA',
  'es': 'ES'
};

// Languages that DeepL supports
const SUPPORTED_LANGUAGES = ['fr', 'de', 'da', 'es']; // Arabic not fully supported by DeepL free

/**
 * Translate text using DeepL API via backend proxy
 * @param {string} text - Text to translate (Dutch)
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  if (!text || !text.trim()) return text;

  // Skip unsupported languages
  if (!SUPPORTED_LANGUAGES.includes(targetLang)) {
    console.log(`Language ${targetLang} not supported by DeepL, skipping.`);
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/api/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        source_lang: 'NL',
        target_lang: LANGUAGE_MAP[targetLang],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Translation API error:', error);
      return null;
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
};

/**
 * Translate project content to all supported languages
 * @param {Object} project - Project with title and description
 * @returns {Promise<Array>} Array of translation objects
 */
export const translateProject = async (project) => {
  const translations = [];
  const targetLanguages = ['fr', 'de', 'da', 'es']; // Languages to auto-translate

  for (const lang of targetLanguages) {
    try {
      const [translatedTitle, translatedDescription] = await Promise.all([
        translateText(project.title, lang),
        translateText(project.description, lang),
      ]);

      // Only add if we got at least the title translated
      if (translatedTitle) {
        translations.push({
          project_id: project.id,
          language_code: lang,
          title: translatedTitle,
          description: translatedDescription || project.description,
        });
      }
    } catch (error) {
      console.error(`Failed to translate to ${lang}:`, error);
    }
  }

  return translations;
};

/**
 * Check if translation service is configured and working
 * @returns {Promise<boolean>}
 */
export const checkTranslationService = async () => {
  try {
    const result = await translateText('test', 'fr');
    return result !== null;
  } catch {
    return false;
  }
};
