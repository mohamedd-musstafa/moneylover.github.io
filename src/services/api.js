import axios from "axios";

const api = (requestSource) =>
  axios.create({
    baseURL: "https://msi.center/2359",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    cancelToken: requestSource.token,
  });

export default api;
