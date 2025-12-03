import axios from "axios";
import { BASE_URL } from "./config";

export const foodService = {
  toogleLikes: async (foodId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/food/like`,
        { foodId },
        { withCredentials: true }
      );

      return {
        isLiked: response.data.like,
        likeCount: response.data.likeCount,
      };
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        return;
      }
      throw error;
    }
  },

  getAllFoods: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/food`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        return;
      }
      throw error;
    }
  },

  getSavedFood: async (foodId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/food/save`,
        { foodId },
        { withCredentials: true }
      );
      return {
        isSaved: response.data.save,
        savedCount: response.data.savesCount,
      };
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        return;
      }
      throw error;
    }
  },
};
