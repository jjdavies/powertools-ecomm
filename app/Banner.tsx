"use client";
import styles from "./output.module.css";
import CartBadge from "./CartBadge";

interface BannerProps {
  bannerCategories: { name: string }[];
}
export default function Banner(props: BannerProps) {
  return (
    <div className={styles.bannerCategories}>
      {props.bannerCategories.map((category) => (
        <div className={styles.category} key={category.name}>
          {category.name === "Shopping Cart" && <CartBadge />}
          <div>{category.name}</div>
        </div>
      ))}
    </div>
  );
}
