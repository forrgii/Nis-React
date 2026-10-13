import type { Product } from "../data";
import { ProductCard } from "./ProductCard";

type Props = {
    products: Product[];
    qtyById: Record<number, number>;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
};

export function ProductList({ products, qtyById, onAdd, onRemove }: Props) {
    return (
        <div className="product-list">
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    product={p}
                    qty={qtyById[p.id] ?? 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}