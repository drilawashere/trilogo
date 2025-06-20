import { 
  portfolioThumbnailPlaceholder, 
  getPlaceholderByType 
} from './placeholderImages';

/**
 * Generate consistent placeholder images for portfolio projects
 * This will be used until the client provides actual project images
 */

// Function to generate a placeholder image URL for each project
const generatePortfolioImage = (projectName, category) => {
  // Select color theme based on project category
  let theme;
  switch (category.toLowerCase()) {
    case 'e-commerce':
      theme = 'primary'; // Blue theme
      break;
    case 'business':
      theme = 'accent';  // Purple theme
      break;
    case 'service':
      theme = 'success'; // Green theme
      break;
    default:
      theme = 'secondary'; // Gray theme
  }
  
  // Create a placeholder with project name
  return portfolioThumbnailPlaceholder(350, 200, projectName, theme);
};

// Generate portfolio images for all projects
const portfolioImages = {

};

// Generate other placeholder images
const placeholderImages = {
 
};

/**
 * Gets the URL for a placeholder image by its filename
 * @param {string} filename - The filename to look up
 * @returns {string} - Data URL for the image
 */
export const getPlaceholderImage = (filename) => {
  // First check portfolio images
  if (portfolioImages[filename]) {
    return portfolioImages[filename];
  }
  
  // Then check other placeholder images
  if (placeholderImages[filename]) {
    return placeholderImages[filename];
  }
  
  // If not found, return a generic placeholder
  return getPlaceholderByType('default', { 
    width: 400, 
    height: 300, 
    text: 'Image Placeholder' 
  });
};

// Export an object that simulates paths to the images
// This allows us to use /assets/images/filename in components
// but actually serves the placeholder data URLs
export const imagePaths = new Proxy({}, {
  get: (_, prop) => {
    const filename = prop.toString();
    // Return the placeholder image data URL
    return getPlaceholderImage(filename);
  }
});

export default {
  getPlaceholderImage,
  imagePaths
};