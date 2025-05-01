"use client";
import styles from "./output.module.css";
import Image from "next/image";
import Cart from "./img/icons/cart.svg";
import { useState, useEffect } from "react";

export default function CartBadge() {
  const [cartCount, setCartCount] = useState<number | null>(null);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart && cart.length > 0) {
      const cartArray = cart.split(",");
      setCartCount(cartArray.length);
    } else {
      setCartCount(0);
    }
  }, []);
  return (
    <div className={styles.cartBadgeContainer}>
      <Image
        src={Cart}
        width={30}
        height={30}
        alt="cart"
        className={styles.cartIcon}
      />
      <div className={styles.cartBadge}>
        {cartCount === null ? "" : cartCount}
      </div>
    </div>
  );
}
