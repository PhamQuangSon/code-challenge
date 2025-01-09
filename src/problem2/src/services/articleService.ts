import { GET_ARTICLES } from "@/store/statics";
import axiosInstance from "@/utils/axiosInstance";

export const fetchArticles = async () => {
  try {
    const response = await axiosInstance.get(GET_ARTICLES);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const fetchArticle = async (articleId: string) => {
  try {
    const response = await axiosInstance.get(`${GET_ARTICLES}/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const fetchSearchResults = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `${GET_ARTICLES}/search?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    // throw error;
  }
};
