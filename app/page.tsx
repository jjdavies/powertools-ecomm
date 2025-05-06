import Image from "next/image";
import styles from "./output.module.css";

import MainLogo from "./img/branding/main-logo.png";
import Banner from "./Banner";
import Products from "./Products";

import Product from "./interface/Product";

import { getProducts } from "./lib/data";

export default async function Page() {
  const products: Product[] = await getProducts();
  console.log(products);
  // const [hoverCategory, setHoverCategory] = useState<string>(""); // State to track which category is being hovered over
  // const [hamburgerClicked, setHamburgerClicked] = useState(true); // State to track if the hamburger menu is clicked

  const hamburgerClicked = true;

  // const mouseEnter = (e) => {
  //   // setHoverCategory(e.target.innerText);
  // };

  // const mouseLeave = (e) => {
  //   console.log(e);
  //   // if (hoverCategory === e.target.innerText) {
  //   // setHoverCategory("");
  //   // }
  // };

  // const hamburgerClick = () => {
  //   // setHamburgerClicked(!hamburgerClicked);
  // };

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
        <div
          className={styles.hamburgerMenuContainer}
          // onClick={() => hamburgerClick}
        >
          <div
            className={styles.hamburgerMenu}
            style={{ flexDirection: hamburgerClicked ? "row" : "column" }}
          >
            <div
              className={styles.hamburgerLine}
              style={{ transform: `rotate(${hamburgerClicked ? 90 : 0}deg)` }}
            ></div>
            <div
              className={styles.hamburgerLine}
              style={{ transform: `rotate(${hamburgerClicked ? 90 : 0}deg)` }}
            ></div>
            <div
              className={styles.hamburgerLine}
              style={{ transform: `rotate(${hamburgerClicked ? 90 : 0}deg)` }}
            ></div>
          </div>
        </div>
      </div>
      <main className={styles.main}>
        {/* <div className={styles.bannerDropDownMenus}>
          {bannerCategories.map((category, index) => (
            <div
              key={category.name}
              className={styles.bannerDropDown}
              style={{
                display: hoverCategory === category.name ? "block" : "none",
                left: index * (40 / bannerCategories.length) + 10 + "%",
              }}
            ></div>
          ))}
        </div> */}
        <Products products={products} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
