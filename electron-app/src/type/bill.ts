export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface BillItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  date: string;
  customerName: string;
  items: BillItem[];
  totalAmount: number;
}

export const availableItems: Item[] = [
  { id: "1", name: "Laptop", price: 40000 },
  { id: "2", name: "Printer", price: 8000 },
  { id: "3", name: "Monitor", price: 12000 },
];