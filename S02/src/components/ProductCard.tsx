import type { Product } from "../data";

export function ProductCard({ product }: { product: Product }) {
    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <p className="price">{product.price} ₽</p>
            <p className={product.inStock ? "in-stock" : "out-of-stock"}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
            </p>
        </div>
    );
}