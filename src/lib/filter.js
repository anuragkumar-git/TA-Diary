/**
 * Recursively intercepts and patches specific Gujarati ligatures 
 * ("અં" and "આં") that crash @react-pdf/renderer's fontkit engine.
 * It injects a Zero-Width Non-Joiner (\u200C) to safely break the shaping math.
 */
export const fixGujaratiLigatures = (data) => {
  // Base case: If it's a string, patch the specific bug combinations
  if (typeof data === 'string') {
    return data
      .replace(/અં/g, 'અ\u200Cં')
      .replace(/આં/g, 'આ\u200Cં');
  }
  
  // If it's an array, map over it recursively
  if (Array.isArray(data)) {
    return data.map(fixGujaratiLigatures);
  }
  
  // If it's an object, iterate through its keys recursively
  if (data !== null && typeof data === 'object') {
    const sanitizedData = {};
    for (const key in data) {
      sanitizedData[key] = fixGujaratiLigatures(data[key]);
    }
    return sanitizedData;
  }
  
  // Return numbers, booleans, or nulls as-is
  return data;
};