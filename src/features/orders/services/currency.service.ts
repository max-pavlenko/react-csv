import axios from "axios";
import {Currencies, CurrencyRates} from "../types/currency.ts";
import {CURRENCY_API_URL} from "../../../api/constants.ts";

class OrdersService {
   currencies: Currencies = {};

   async getCurrencies() {
      this.currencies = (await axios.get<CurrencyRates>(`${CURRENCY_API_URL}?base=USD`)).data.rates;
      return this.currencies;
   }
}

export default new OrdersService();
