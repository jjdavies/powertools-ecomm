"use client";
import { useState, useEffect } from "react";
import styles from "../output.module.css";
import Product from "../interface/Product";
import CartProduct from "../interface/CartProduct";
import Image from "next/image";

interface CartProps {
  products: Product[];
}
export default function Cart(props: CartProps) {
  const [cartContents, setCartContents] = useState<string | null>(null);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) setCartContents(cart);
  }, []);
  //   const cartContents = window.localStorage.getItem("cart");
  const cartProducts = cartContents
    ? cartContents.split(",").map((productID) => {
        const product = props.products.find(
          (product) => product.product_id === +productID
        );
        return product;
      })
    : [];

  const cartProductsFiltered = cartProducts.filter(
    (product) => product !== undefined // Filter out undefined products
  );
  //deduplicate products
  const cartProductsDeduplicated = cartProductsFiltered.reduce(
    (acc: CartProduct[], product: Product, index) => {
      console.log(index);
      const existingProduct = acc.find(
        (p) => p.product.product_id === product.product_id
      );
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product already exists
      } else {
        acc.push({ id: acc.length + 1, product, quantity: 1 }); // Add new product with quantity 1
      }
      return acc;
    },
    []
  );

  return (
    <div className="cart">
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <h1 className={styles.cartTitle}>Shopping Basket</h1>
            <div className={styles.cartCount}>
              {cartProductsDeduplicated.length} items in basket
            </div>
          </div>
          {cartProductsDeduplicated.map((product: CartProduct) => (
            <div key={product.id} className={styles.cartProduct}>
              <div className={styles.cartProductImageContainer}>
                <Image
                  className={styles.cartProductImage}
                  src={"/products/" + product.product.image_id + ".jpg"}
                  width={200}
                  height={200}
                  alt="product image"
                />
                <div className={styles.cartProductDetails}>
                  <div className={styles.cartProductName}>
                    {product.product.product_name}
                  </div>
                  <div className={styles.cartProductQuantity}>
                    Quantity: {product.quantity}
                  </div>
                </div>
                <div className={styles.cartProductPrice}>
                  £{product.product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartOrderBox}>
          <form action="/api/checkout_sessions" method="POST">
            {/* <button type="submit">Checkout</button> */}

            <div className={styles.orderBoxSubtotal}>
              Subtotal({cartProductsDeduplicated.length} items): £
              {cartProductsDeduplicated
                .reduce((acc, product) => {
                  return acc + +product.product.price * product.quantity;
                }, 0)
                .toFixed(2)}
            </div>
            <div className={styles.orderBoxShippingDetails}>
              + Delivery to UK Mainland address: £4.99
            </div>
            <button
              className={styles.orderBoxCheckoutButton}
              type="submit"
              role="link"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
