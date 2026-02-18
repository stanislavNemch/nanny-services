import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import heroImage from "../../assets/hero_img.webp";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

const HomePage = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.leftPanel}>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>
                        Make Life Easier for the Family:
                    </h1>
                    <p className={styles.description}>
                        Find Babysitters Online for All Occasions
                    </p>
                    <Link to="/nannies" className={styles.ctaButton}>
                        Get started
                        <div className={styles.iconWrapper}>
                            <GoArrowUpRight size={20} />
                        </div>
                    </Link>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <img
                    src={heroImage}
                    alt="Nanny with child"
                    className={styles.heroImage}
                />

                <div className={styles.experienceBadge}>
                    <div className={styles.checkIconWrapper}>
                        <FaCheck size={20} />
                    </div>
                    <div className={styles.textWrapper}>
                        <span className={styles.experienceText}>
                            Experienced nannies
                        </span>
                        <div className={styles.experienceCount}>15,000</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
