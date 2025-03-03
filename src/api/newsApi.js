import { API_KEY, BASE_URL } from './config';

/**
 * Fetch top headlines based on category
 * @param {string} category - News category (business, entertainment, health, science, sports, technology)
 * @param {number} page - Page number for pagination
 * @param {number} pageSize - Number of results per page
 * @returns {Promise} - Promise with news data
 */
export const fetchNewsByCategory = async (category, page = 1, pageSize = 20) => {
  try {
    const url = `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

/**
 * Search for news articles
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @param {number} pageSize - Number of results per page
 * @returns {Promise} - Promise with news data
 */
export const searchNews = async (query, page = 1, pageSize = 20) => {
  try {
    const url = `${BASE_URL}/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to search news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};