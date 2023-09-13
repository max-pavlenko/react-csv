export type Order = {
   itemId: string, orderId: string, date: string
};

export type OrderItem = {
   itemId: string, itemName: string, amount: number, currency: string;
}

export type OrdersResponse = { orders: Order[] }
export type OrderItemsResponse = { items: OrderItem[] }
