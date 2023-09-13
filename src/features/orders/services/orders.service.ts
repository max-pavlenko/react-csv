import {clientApi} from "../../../api/axios.ts";
import {Order, OrderItem, OrderItemsResponse, OrdersResponse} from "../types/order.ts";
import CurrencyService from "./currency.service.ts";
import {FORMATTERS} from "../../../shared/constants/intl.ts";
import {AxiosResponse} from "axios";

class OrdersService {
   ordersInfo: { orders: Order[], orderItems: Record<string, OrderItem> } = {orders: [], orderItems: {}};

   async getAllOrders() {
      return clientApi.get<OrdersResponse>(`/test-task-orders`)
   }

   async getAllItems() {
      return clientApi.get<OrderItemsResponse>(`/test-task-items`)
   }

   async fetchOrders() {
      const queries = [this.getAllOrders(), this.getAllItems()] satisfies Array<Promise<AxiosResponse>>;
      const queryResult = (await Promise.all(queries)).map(result => result?.data) as [OrdersResponse, OrderItemsResponse];
      this.ordersInfo = {
         orders: queryResult[0].orders,
         orderItems: queryResult[1].items.reduce((acc, item) => {
            acc[item.itemId] = item;
            return acc;
         }, {} as typeof this.ordersInfo.orderItems)
      };

      return this.ordersInfo;
   }

   formatOrdersToCsv({orders, orderItems}: typeof this.ordersInfo) {
      let csv = `Order Id,Date,Item Name,Amount,\n`;

      for (const {itemId, orderId, date} of orders) {
         const {currency, amount, itemName = 'N/A'} = orderItems[itemId] ?? {};
         const isConversionPossible = currency && amount && CurrencyService.currencies[currency];
         const denominationInDollars = isConversionPossible ? amount * CurrencyService.currencies[currency] : 'N/A';
         const newDate = date ? FORMATTERS.DATE.format(new Date(date)) : 'N/A';

         csv += `${orderId},${newDate},${itemName},${denominationInDollars},\n`;
      }

      return `data:text/csv;charset=utf-8,${csv}`;
   }
}

export default new OrdersService();
