/**
 * Utility functions for translating year names between English and French
 */

// Map English year names to French
export const getFrenchYearName = (englishYear) => {
  const translations = {
    'Secondary I': 'Secondaire I',
    'Secondary II': 'Secondaire II',
    'Secondary III': 'Secondaire III',
    'Secondary IV': 'Secondaire IV',
    'Secondary V': 'Secondaire V',
  };
  return translations[englishYear] || englishYear;
};

// Map French year names back to English (for API calls)
export const getEnglishYearName = (frenchYear) => {
  const translations = {
    'Secondaire I': 'Secondary I',
    'Secondaire II': 'Secondary II',
    'Secondaire III': 'Secondary III',
    'Secondaire IV': 'Secondary IV',
    'Secondaire V': 'Secondary V',
  };
  return translations[frenchYear] || frenchYear;
};

// Get all years in French
export const getFrenchYears = () => {
  return ['Secondaire I', 'Secondaire II', 'Secondaire III', 'Secondaire IV', 'Secondaire V'];
};

// Get all years in English
export const getEnglishYears = () => {
  return ['Secondary I', 'Secondary II', 'Secondary III', 'Secondary IV', 'Secondary V'];
};
