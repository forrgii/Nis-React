import type { RefObject } from "react";

type Props = {
    query: string;
    onQueryChange: (v: string) => void;
    onlyInStock: boolean;
    onOnlyInStockChange: (v: boolean) => void;
    inputRef: RefObject<HTMLInputElement | null>;
    foundCount: number;
};

export function SearchBar({
    query,
    onQueryChange,
    onlyInStock,
    onOnlyInStockChange,
    inputRef,
    foundCount,
}: Props) {
    return (
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                placeholder="Поиск по названию..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => onOnlyInStockChange(e.target.checked)}
                />
                Только в наличии
            </label>
            <span className="found-count">Найдено: {foundCount}</span>
        </div>
    );
}