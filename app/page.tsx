"use client";
import Image from "next/image";
import styles from "./output.module.css";

import MainLogo from "./img/branding/main-logo.png";
import { useState } from "react";

export default function Home() {
  const bannerCategories = [
    { name: "Cordless Tools" },
    { name: "Corded Tools" },
    { name: "Garden Tools" },
    { name: "Generators" },
    { name: "Accessories" },
  ];

  const [hoverCategory, setHoverCategory] = useState<string>(""); // State to track which category is being hovered over

  const mouseEnter = (e) => {
    setHoverCategory(e.target.innerText);
  };

  const mouseLeave = (e) => {
    console.log(e);
    // if (hoverCategory === e.target.innerText) {
    setHoverCategory("");
    // }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.salesBanner}>!!SALE!!</div>
        <div className={styles.mainBanner}>
          <div className={styles.mainLogoContainer}>
            <Image
              className={styles.mainLogo}
              src={MainLogo}
              width={0}
              height={0}
              alt="company logo"
            />
          </div>
          <div className={styles.bannerCategories}>
            {bannerCategories.map((category) => (
              <div
                key={category.name}
                className={styles.category}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bannerDropDownMenus}>
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
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
