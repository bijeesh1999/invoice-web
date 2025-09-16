// src/services/customerService.js
import axios from 'axios';

// Define the base URL for your API.
// You should replace this with your actual backend API endpoint.
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/customer`;
/**
 * Creates a new customer.
 * * @param {object} customerData - The data for the new customer.
 * @returns {Promise<object>} - A promise that resolves with the created customer data.
 */
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, customerData);  
    return response.data;
  } catch (error) {
    // You can handle different types of errors here (e.g., network, validation).
    console.error('Error creating customer:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetches all customers from the API.
 * * @returns {Promise<Array<object>>} - A promise that resolves with an array of customer objects.
 */
export const findCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`);
    
    return response;
  } catch (error) {
    console.error('Error fetching customers:', error.response?.data || error.message);
    throw error;
  }
};