import Image from "next/image";
import Banner from "../Banner";
import styles from "../output.module.css";
import MainLogo from "../img/branding/main-logo.png";
import FailureImage from "../img/failure.svg";

export default function Page() {
  return (
    <div className={styles.page} style={{ height: "100vh" }}>
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
      <div className={styles.checkoutInfoContainer}>
        <div className={styles.checkoutInfo}>
          <Image src={FailureImage} width={150} height={150} alt="failure" />
          <div className={styles.checkoutInfoHeader}>Payment Cancelled</div>
        </div>
      </div>
    </div>
  );
}
