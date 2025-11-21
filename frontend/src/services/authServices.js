import axios from "axios";
import { BASE_URL } from "./config";
export const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/register`,
        {
          fullName: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
          email: userData.email.trim(),
          password: userData.password,
        },
        { withCredentials: true }
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return { success: false, error: message };
    }
  },

  login: async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/login`,
        {
          email: userData.email.trim(),
          password: userData.password,
        },
        { withCredentials: true }
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "login failed";
      return { success: false, error: message };
    }
  },

  foodPartnerRegister: async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/food-partner/register`,
        {
          name: userData.businessName.trim(),
          contactName: userData.contactName.trim(),
          phone: userData.phone.trim(),
          email: userData.email.trim(),
          password: userData.password,
          address: userData.address.trim(),
        },
        { withCredentials: true }
      );

      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "food partner login failed";
      return { success: false, error: message };
    }
  },

  foodPartnerLogin: async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email: userData.email.trim(),
          password: userData.password,
        },
        { withCredentials: true }
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "food partner login failed";
      return { success: false, error: message };
    }
  },
};
