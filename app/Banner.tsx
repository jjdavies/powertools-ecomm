"use client";
import styles from "./output.module.css";
import CartBadge from "./CartBadge";
import { useRouter } from "next/navigation";

export default function Banner(props: { cartBadge?: boolean }) {
  const bannerCategories = [
    { name: "Power Tools" },
    { name: "Hand Tools" },
    { name: "Gardening" },
    { name: "Plumbing" },
    { name: "Electrical" },
    { name: "Shopping Basket" },
  ];
  const router = useRouter();
  const bannerClick = (category: { name: string }) => {
    switch (category.name) {
      case "Power Tools":
        console.log("Power Tools clicked");
        break;
      case "Hand Tools":
        console.log("Hand Tools clicked");
        break;
      case "Gardening":
        console.log("Gardening clicked");
        break;
      case "Plumbing":
        console.log("Plumbing clicked");
        break;
      case "Electrical":
        console.log("Electrical clicked");
        break;
      case "Shopping Basket":
        console.log("Shopping Cart clicked");
        router.push("/cart");
        break;
      default:
        console.log("Unknown category clicked");
    }
  };
  return (
    <div className={styles.bannerCategories}>
      {bannerCategories.map((category) => (
        <div
          className={styles.category}
          key={category.name}
          onClick={() => bannerClick(category)}
        >
          {category.name === "Shopping Basket" && props.cartBadge && (
            <CartBadge />
          )}
          <div>{category.name}</div>
        </div>
      ))}
    </div>
  );
}
