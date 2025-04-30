"use client";
import styles from "./output.module.css";
import Cart from "./img/icons/cart.svg";
import Image from "next/image";

interface BannerProps {
  bannerCategories: { name: string }[];
}
export default function Banner(props: BannerProps) {
  return (
    <div className={styles.bannerCategories}>
      {props.bannerCategories.map((category) => (
        <>
          {category.name === "Shopping Cart" && (
            <Image src={Cart} alt="cart" className={styles.cartIcon} />
          )}
          <div
            key={category.name}
            className={styles.category}
            //   onMouseEnter={mouseEnter}
            //   onMouseLeave={mouseLeave}
          >
            {category.name}
          </div>
        </>
      ))}
    </div>
  );
}
