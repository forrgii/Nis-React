import type { Product } from "../data";

type Props = {
    product: Product;
    qty: number;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
};

export function ProductCard({ product, qty, onAdd, onRemove }: Props) {
    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <p className="price">{product.price} ₽</p>
            <p className={product.inStock ? "in-stock" : "out-of-stock"}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
            </p>

            {!product.inStock && (
                <button disabled>В корзину</button>
            )}

            {product.inStock && qty === 0 && (
                <button onClick={() => onAdd(product)}>В корзину</button>
            )}

            {product.inStock && qty > 0 && (
            <div className="cart-controls">
                <button onClick={() => onAdd(product)}>В корзине: {qty}</button>
                <button onClick={() => onRemove(product.id)}>Убрать</button>
            </div>
)}
        </div>
    );
}