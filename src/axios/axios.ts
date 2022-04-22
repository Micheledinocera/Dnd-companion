import axios from "axios";
import RestLabels from "./RestLabels";

const instance = axios.create({
  baseURL:
    // process.env.MODE === "production"
    //   ? RestLabels.BASE_URL
    //   : RestLabels.BASE_URL_DEV,
    RestLabels.BASE_URL,
});

export default instance;
