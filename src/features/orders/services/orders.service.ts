import {clientApi} from "../../../api/axios.ts";
import {FormattedOrder, Order, OrderItem, OrderItems, Orders} from "../types/order.ts";
import CurrencyService from "./currency.service.ts";
import {isNonNullishArray} from "../../../shared/types/guards.ts";
import {FORMATTERS} from "../../../shared/constants/intl.ts";
import {CurrencyRates} from "../types/currency.ts";
import {AxiosResponse} from "axios";

class OrdersService {
   ordersInfo: [Orders, OrderItems, CurrencyRates] | undefined[] = [];

   async getAllOrders() {
      return clientApi.get<Orders>(`/test-task-orders`)
   }

   async getAllItems() {
      return clientApi.get<OrderItems>(`/test-task-items`)
   }

   async fetchOrders() {
      const queries = [this.getAllOrders, this.getAllItems, CurrencyService.getCurrencies] satisfies Array<() => Promise<AxiosResponse>>;
      const queryResult = (await Promise.all(queries.map((queryFn) => queryFn()))).map(result => result?.data) as [Orders, OrderItems, CurrencyRates];
      this.ordersInfo = queryResult;

      return queryResult;
   }

   formatOrdersToCsvArray(ordersQuery: NonNullable<typeof this.ordersInfo>): FormattedOrder[] {
      if (isNonNullishArray(ordersQuery)) {
         const [{orders}, {items}, {rates}] = ordersQuery;
         const HEADER: FormattedOrder = {orderId: 'Order Id', date: 'Date', itemName: 'Item Name', amount: 'Amount'};

         return [
            HEADER,
            ...orders.map(({itemId, orderId, date}: Order) => {
               const {currency, amount, itemName = 'N/A'} = items.find((item: OrderItem) => item.itemId === itemId) ?? {};
               const denominationInDollars = currency && amount ? amount * rates[currency] : 'N/A';
               const newDate = date ? FORMATTERS.DATE.format(new Date(date)) : 'N/A';

               return {
                  orderId,
                  date: newDate,
                  itemName,
                  amount: denominationInDollars,
               }
            })];
      }

      return [];
   }
}

export default new OrdersService();
