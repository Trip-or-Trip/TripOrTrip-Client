import axios from "axios";

export default axios.create({
  baseURL: "https://dapi.kakao.com/v2/search",
  headers: {
    "Authorization": "KakaoAK 20565b7fedcf1e17b2c03cf8707c548c",
  },
});
