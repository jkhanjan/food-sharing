import axios from "axios";
import { BASE_URL } from "./config";
export const authService = {
  register: async (userData) => {
    try {
      let uploadedImageUrl = null;

      if (userData.profilePic) {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/user/generate-presigned-url`,
          {
            fileName: userData.profilePic.name,
            fileType: userData.profilePic.type,
          },
          { withCredentials: true }
        );

        const { uploadUrl, fileUrl } = data;

        await axios.put(uploadUrl, userData.profilePic, {
          headers: {
            "Content-Type": userData.profilePic.type,
          },
        });

        console.log("Image uploaded to S3 successfully");

        uploadedImageUrl = fileUrl;
      }
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/register`,
        {
          fullName: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
          email: userData.email.trim(),
          password: userData.password,
          profileImageUrl: uploadedImageUrl,
        },
        { withCredentials: true }
      );

      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return { success: false, error: message };
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user-profile/me`, {
        withCredentials: true,
      });
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "not able to get the data";
      return { success: false, error: message };
    }
  },

  login: async (userData) => {
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
