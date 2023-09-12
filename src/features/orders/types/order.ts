export type Order = {
   itemId: string, orderId: string, date: string
};

export type FormattedOrder = {
    orderId: string, date: string, itemName: string, amount: string | number;
}

export type OrderItem = {
   itemId: string, itemName: string, amount: number, currency: string;
}

export type Orders = { orders: Order[] }
export type OrderItems = { items: OrderItem[] }
