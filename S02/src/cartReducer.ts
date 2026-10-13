import type { Product } from "./data";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    qty: number;
};

export type CartState = {
    items: CartItem[];
};

export type CartAction =
    | { type: "add"; product: Product }
    | { type: "remove"; id: number }
    | { type: "clear" };

export const initialCart: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "add": {
            const existing = state.items.find((i) => i.id === action.product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                };
            }
            return {
                items: [
                    ...state.items,
                    {
                        id: action.product.id,
                        title: action.product.title,
                        price: action.product.price,
                        qty: 1,
                    },
                ],
            };
        }
        case "remove":
            return {
                items: state.items.filter((i) => i.id !== action.id),
            };
        case "clear":
            return initialCart;
        default:
            return state;
    }
}