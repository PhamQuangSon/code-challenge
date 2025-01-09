import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://api.eazymock.net/mock/5d789e0e-8346-464a-99a9-3bbc60907aeb/158", // Replace with your API endpoint
  headers: {
    "Content-Type": "application/json",
    // Add other headers as needed, e.g., authorization token
  },
});

export default axiosInstance;
