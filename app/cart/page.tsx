import styles from "../output.module.css";
import Image from "next/image";
import MainLogo from "../img/branding/main-logo.png";
import Banner from "../Banner";
import Product from "../interface/Product";

import Cart from "./Cart";

import { getProducts } from "../lib/data";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <div className={styles.page}>
      <div className={styles.salesBanner}>!!SALE!!</div>
      <div className={styles.mainBanner}>
        {/* <div className={styles.mainLogoContainer}> */}
        <Image
          className={styles.mainLogo}
          src={MainLogo}
          width={0}
          height={0}
          alt="company logo"
        />
        {/* </div> */}
        <Banner />
      </div>
      {/* <main className={styles.main}> */}
      <Cart products={products} />
      {/* </main> */}
    </div>
  );
}
