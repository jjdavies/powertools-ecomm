"use client";
import Product from "./interface/Product";
interface ProductsProps {
  products: Product[];
}

import { useState } from "react";

import styles from "./output.module.css";
import ProductCard from "./ProductCard";

export default function Products(props: ProductsProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const addedToCart = () => {
    setCartCount(cartCount + 1);
  };
  return (
    <div className={styles.productsContainer} data-cart-count={cartCount}>
      {props.products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          addedToCart={addedToCart}
        />
      ))}
    </div>
  );
}
