"use client";
import { useState, useEffect } from "react";
import styles from "./output.module.css";
import Image from "next/image";
import Cart from "./img/icons/cart.svg";
import { useSearchParams } from "next/navigation";

export default function CartBadge() {
  const [cart, setCart] = useState<string[] | null>(null);
  useEffect(() => {
    const cartCount = localStorage.getItem("cart");
    if (cartCount) setCart(cartCount.split(","));
  }, []);
  const router = useSearchParams();
  let cartCount: number = 0;
  const paramsCartCount = router.get("cartcount");
  if (paramsCartCount) {
    cartCount = +paramsCartCount;
  }
  if (paramsCartCount === null || cartCount === undefined) {
    //try local storage
    // const cart = window.localStorage.getItem("cart");
    if (cart && cart.length > 0) {
      const cartArray = cart;
      cartCount = cartArray.filter(
        (item, index, arr) => arr.indexOf(item) === index
      ).length;
    }
  }

  //   const [cartCount, setCartCount] = useState<number | null>(null);
  //   useEffect(() => {
  //     const cart = localStorage.getItem("cart");
  //     if (cart && cart.length > 0) {
  //       const cartArray = cart.split(",");
  //       setCartCount(cartArray.length);
  //     } else {
  //       setCartCount(0);
  //     }
  //   }, []);
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
