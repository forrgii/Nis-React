import { useState, useMemo, useRef, useEffect, useReducer, useCallback } from "react";
import { products, type Product } from "./data";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ProductList } from "./components/ProductList";
import { cartReducer, initialCart } from "./cartReducer";

export default function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);

    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter((p) => {
            const matchesQuery = p.title.toLowerCase().includes(q);
            const matchesStock = !onlyInStock || p.inStock;
            return matchesQuery && matchesStock;
        });
    }, [query, onlyInStock]);

    const totalCount = useMemo(
        () => cart.items.reduce((sum, i) => sum + i.qty, 0),
        [cart.items]
    );
    const totalPrice = useMemo(
        () => cart.items.reduce((sum, i) => sum + i.qty * i.price, 0),
        [cart.items]
    );

    const qtyById = useMemo(() => {
        const map: Record<number, number> = {};
        for (const item of cart.items) map[item.id] = item.qty;
        return map;
    }, [cart.items]);

    const handleAdd = useCallback((product: Product) => {
        dispatch({ type: "add", product });
    }, []);

    const handleRemove = useCallback((id: number) => {
        dispatch({ type: "remove", id });
    }, []);

    const handleClear = useCallback(() => {
        dispatch({ type: "clear" });
    }, []);

    return (
        <div className="app">
            <Header
                totalCount={totalCount}
                totalPrice={totalPrice}
                onClear={handleClear}
            />
            <SearchBar
                query={query}
                onQueryChange={setQuery}
                onlyInStock={onlyInStock}
                onOnlyInStockChange={setOnlyInStock}
                inputRef={inputRef}
                foundCount={visible.length}
            />
            <ProductList
                products={visible}
                qtyById={qtyById}
                onAdd={handleAdd}
                onRemove={handleRemove}
            />
        </div>
    );
}