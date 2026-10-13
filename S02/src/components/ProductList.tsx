import type { Product } from "../data";
import { ProductCard } from "./ProductCard";

export function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="product-list">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}