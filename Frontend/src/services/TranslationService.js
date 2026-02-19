// Translation Service using DeepL API
// Free tier: 500,000 characters/month
// Get your API key at: https://www.deepl.com/pro-api

const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Language codes mapping (our app -> DeepL)
const LANGUAGE_MAP = {
  'fr': 'FR',
  'de': 'DE',
  'ar': 'AR', // DeepL supports Arabic
  'da': 'DA'
};

// Languages that DeepL supports
const SUPPORTED_LANGUAGES = ['fr', 'de', 'da']; // Arabic not fully supported by DeepL free

/**
 * Translate text using DeepL API
 * @param {string} text - Text to translate (Dutch)
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  if (!text || !text.trim()) return text;
  
  // Skip if no API key configured
  if (!DEEPL_API_KEY) {
    console.warn('DeepL API key not configured. Skipping translation.');
    return null;
  }

  // Skip unsupported languages
  if (!SUPPORTED_LANGUAGES.includes(targetLang)) {
    console.log(`Language ${targetLang} not supported by DeepL, skipping.`);
    return null;
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        source_lang: 'NL',
        target_lang: LANGUAGE_MAP[targetLang],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('DeepL API error:', error);
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
  const targetLanguages = ['fr', 'de', 'da']; // Languages to auto-translate

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
 * Check if DeepL API is configured and working
 * @returns {Promise<boolean>}
 */
export const checkTranslationService = async () => {
  if (!DEEPL_API_KEY) return false;
  
  try {
    const result = await translateText('test', 'fr');
    return result !== null;
  } catch {
    return false;
  }
};
