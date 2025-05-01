"use client";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  product: {
    product_name: string;
    category_id: number;
    product_id: number;
    price: number;
    image_id: string;
  };
}
import styles from "./output.module.css";
import Image from "next/image";
// import BlankImage from "./img/blank.jpg";

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const router = useRouter();

  const addToCart = (productId: number) => {
    console.log(productId);
    const sessionID = localStorage.getItem("sessionID");
    if (!sessionID) {
      // proceed as guest
      const cart = localStorage.getItem("cart");

      if (cart) {
        localStorage.setItem("cart", [cart, productId].toString());
        return router.push("#cart");
      }
      localStorage.setItem("cart", [productId].toString());
      router.push("/cart");
      return;
    }
    // proceed as logged in user
  };

  return (
    <div key={product.product_id} className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <Image
          className={styles.productImage}
          src={"/products/" + product.image_id + ".jpg"}
          width={200}
          height={200}
          alt="product image"
        />
      </div>
      <div className={styles.productName}>{product.product_name}</div>
      <div className={styles.productPrice}>£{product.price}</div>
      <div
        className={styles.productAddToCart}
        onClick={() => addToCart(product.product_id)}
      >
        Add to Cart
      </div>
      {/* <div className={styles.productAddToWishlist}>Add to Wishlist</div> */}
    </div>
  );
}
