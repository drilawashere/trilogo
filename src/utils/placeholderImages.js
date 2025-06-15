/**
 * Utility functions for creating placeholder images
 * This allows us to generate colored rectangles and patterns as image placeholders
 * until the client provides actual images
 */

// Predefined color themes
const colorThemes = {
  primary: ['#3182ce', '#4299e1', '#63b3ed', '#90cdf4'],  // Blue theme
  secondary: ['#718096', '#a0aec0', '#cbd5e0', '#e2e8f0'], // Gray theme
  accent: ['#805ad5', '#9f7aea', '#b794f4', '#d6bcfa'],    // Purple theme
  success: ['#38a169', '#48bb78', '#68d391', '#9ae6b4'],   // Green theme
  warning: ['#d69e2e', '#ecc94b', '#f6e05e', '#faf089'],   // Yellow theme
};

/**
 * Generates a base64 encoded SVG placeholder with the given dimensions,
 * background color, and optional content
 * 
 * @param {number} width - Width of the placeholder image
 * @param {number} height - Height of the placeholder image
 * @param {string} bgColor - Background color (HEX or named color)
 * @param {string} content - Optional SVG content to include
 * @returns {string} - Data URL for the SVG image
 */
export const generateSVGPlaceholder = (width, height, bgColor, content = '') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    ${content}
  </svg>`;
  
  // Convert SVG to base64
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Creates a placeholder for hero images with diagonal stripes pattern
 * 
 * @param {number} width - Width of the hero image
 * @param {number} height - Height of the hero image
 * @param {string} theme - Color theme to use from predefined themes
 * @returns {string} - Data URL for the SVG image
 */
export const heroImagePlaceholder = (width = 600, height = 400, theme = 'primary') => {
  const colors = colorThemes[theme] || colorThemes.primary;
  const stripeContent = `
    <defs>
      <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
        <rect width="20" height="40" fill="${colors[0]}" x="0" y="0"></rect>
        <rect width="20" height="40" fill="${colors[1]}" x="20" y="0"></rect>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#diagonalStripes)"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Hero Image</text>
  `;
  
  return generateSVGPlaceholder(width, height, colors[0], stripeContent);
};

/**
 * Creates a placeholder for mission/about section with a circular pattern
 * 
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} theme - Color theme to use from predefined themes
 * @returns {string} - Data URL for the SVG image
 */
export const missionImagePlaceholder = (width = 500, height = 400, theme = 'success') => {
  const colors = colorThemes[theme] || colorThemes.success;
  const circleContent = `
    <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/3}" fill="${colors[1]}" />
    <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/5}" fill="${colors[0]}" />
    <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Mission</text>
  `;
  
  return generateSVGPlaceholder(width, height, colors[3], circleContent);
};

/**
 * Creates a placeholder for expertise section with a grid pattern
 * 
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} theme - Color theme to use from predefined themes
 * @returns {string} - Data URL for the SVG image
 */
export const expertiseImagePlaceholder = (width = 500, height = 400, theme = 'accent') => {
  const colors = colorThemes[theme] || colorThemes.accent;
  const gridContent = `
    <defs>
      <pattern id="grid" patternUnits="userSpaceOnUse" width="50" height="50">
        <rect width="50" height="50" fill="${colors[3]}"/>
        <rect width="25" height="25" fill="${colors[2]}"/>
        <rect width="25" height="25" fill="${colors[1]}" x="25" y="25"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Expertise</text>
  `;
  
  return generateSVGPlaceholder(width, height, colors[0], gridContent);
};

/**
 * Creates a placeholder for Telegram integration illustration with message bubbles
 * 
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @returns {string} - Data URL for the SVG image
 */
export const telegramImagePlaceholder = (width = 500, height = 400) => {
  // Telegram brand color
  const telegramBlue = '#0088cc';
  const bubbleContent = `
    <rect x="${width*0.1}" y="${height*0.25}" width="${width*0.6}" height="${height*0.15}" rx="10" fill="#e2e8f0"/>
    <rect x="${width*0.2}" y="${height*0.45}" width="${width*0.6}" height="${height*0.15}" rx="10" fill="#e2e8f0"/>
    <circle cx="${width*0.8}" cy="${height*0.7}" r="40" fill="${telegramBlue}"/>
    <path d="M${width*0.8-20},${height*0.7+10} L${width*0.8-10},${height*0.7+20} L${width*0.8+15},${height*0.7-15}" stroke="white" stroke-width="3" fill="none"/>
    <text x="50%" y="${height*0.15}" font-family="Arial" font-size="18" fill="#333" text-anchor="middle">Telegram Integration</text>
  `;
  
  return generateSVGPlaceholder(width, height, '#ffffff', bubbleContent);
};

/**
 * Creates a colored placeholder for project thumbnails with text
 * 
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} text - Text to display in the center of the image
 * @param {string} theme - Color theme to use from predefined themes
 * @returns {string} - Data URL for the SVG image
 */
export const portfolioThumbnailPlaceholder = (width = 350, height = 200, text = 'Project', theme = 'primary') => {
  const colors = colorThemes[theme] || colorThemes.primary;
  const textContent = `
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${text}</text>
  `;
  
  return generateSVGPlaceholder(width, height, colors[0], textContent);
};

/**
 * Creates a placeholder for team member photos
 * 
 * @param {number} size - Width and height of the square image
 * @returns {string} - Data URL for the SVG image
 */
export const teamMemberPlaceholder = (size = 200) => {
  const personContent = `
    <circle cx="${size/2}" cy="${size/3}" r="${size/6}" fill="#a0aec0"/>
    <rect x="${size/3}" y="${size/2}" width="${size/3}" height="${size/2}" rx="${size/10}" fill="#a0aec0"/>
    <text x="50%" y="85%" font-family="Arial" font-size="${size/10}" fill="#4a5568" text-anchor="middle">Team Member</text>
  `;
  
  return generateSVGPlaceholder(size, size, '#e2e8f0', personContent);
};

/**
 * Returns the appropriate placeholder function based on image type
 * 
 * @param {string} type - Type of placeholder needed (hero, mission, expertise, telegram, portfolio, team)
 * @param {Object} options - Options for generating the placeholder
 * @returns {string} - Data URL for the SVG image
 */
export const getPlaceholderByType = (type, options = {}) => {
  const { width, height, theme, text } = options;
  
  switch (type) {
    case 'hero':
      return heroImagePlaceholder(width, height, theme);
    case 'mission':
      return missionImagePlaceholder(width, height, theme);
    case 'expertise':
      return expertiseImagePlaceholder(width, height, theme);
    case 'telegram':
      return telegramImagePlaceholder(width, height);
    case 'portfolio':
      return portfolioThumbnailPlaceholder(width, height, text, theme);
    case 'team':
      return teamMemberPlaceholder(width || height);
    default:
      // Generic placeholder with text
      return generateSVGPlaceholder(
        width || 400, 
        height || 300, 
        '#718096', 
        `<text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${text || 'Image Placeholder'}</text>`
      );
  }
};

export default {
  heroImagePlaceholder,
  missionImagePlaceholder,
  expertiseImagePlaceholder,
  telegramImagePlaceholder,
  portfolioThumbnailPlaceholder,
  teamMemberPlaceholder,
  getPlaceholderByType
};