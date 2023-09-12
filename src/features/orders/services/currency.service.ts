import axios from "axios";
import {CurrencyRates} from "../types/currency.ts";
import {CURRENCY_API_URL} from "../../../api/constants.ts";

class OrdersService {
   async getCurrencies() {
      return axios.get<CurrencyRates>(`${CURRENCY_API_URL}?base=USD`)
   }
}

export default new OrdersService();
