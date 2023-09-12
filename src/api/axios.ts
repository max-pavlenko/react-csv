import axios from "axios";
import {BASE_API_URL} from "./constants.ts";

export const clientApi = axios.create({
   baseURL: BASE_API_URL,
});
