/**
 * Resizes an image to fit within specified dimensions while maintaining aspect ratio
 * @param {string} src - Image source URL or path
 * @param {number} width - Target width in pixels
 * @param {number} height - Target height in pixels
 * @returns {string} - Processed image URL or path
 */
export const getResizedImage = (src, width = 400, height = 400) => {
  if (!src) return '';
  
  // If it's a local image (starts with /)
  if (src.startsWith('/')) {
    // In Next.js, you can use the built-in Image component's src prop directly
    // For local images, make sure they're in the public folder
    return src;
  }
  
  // If it's a URL (http/https)
  if (src.startsWith('http')) {
    // If using an image CDN that supports resizing (like Cloudinary, Imgix, etc.)
    // Example for Cloudinary:
    // return src.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
    
    // For demo purposes, we'll just return the original URL
    // In production, you'd want to use a proper image CDN
    return src;
  }
  
  return src;
};

/**
 * Converts a file to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string of the file
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validates if the file is an image
 * @param {File} file - The file to validate
 * @returns {boolean} - True if the file is an image
 */
export const isImageFile = (file) => {
  return file && file.type.startsWith('image/');
};
