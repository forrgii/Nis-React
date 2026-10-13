import { useState, useMemo, useRef, useEffect } from "react";
import { products } from "./data";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ProductList } from "./components/ProductList";

export default function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);

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

    return (
        <div className="app">
            <Header />
            <SearchBar
                query={query}
                onQueryChange={setQuery}
                onlyInStock={onlyInStock}
                onOnlyInStockChange={setOnlyInStock}
                inputRef={inputRef}
                foundCount={visible.length}
            />
            <ProductList products={visible} />
        </div>
    );
}