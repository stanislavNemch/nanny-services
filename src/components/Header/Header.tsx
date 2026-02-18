import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal";
import RegistrationForm from "../RegistrationForm";
import LoginForm from "../LoginForm";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

const Header = () => {
    const { currentUser, logOut } = useAuth();
    const loginModal = useModal();
    const registerModal = useModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    // Helper to determine active link class
    const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
        return clsx(
            styles.navLink,
            isActive && styles.navLinkActive,
            isHome && styles.navLinkHome,
        );
    };

    return (
        <>
            <header
                className={clsx(styles.header, { [styles.headerHome]: isHome })}
            >
                <Link
                    to="/"
                    className={clsx(styles.logo, { [styles.logoHome]: isHome })}
                >
                    Nanny.<span>Services</span>
                </Link>

                <button
                    className={clsx(styles.burgerButton, {
                        [styles.burgerButtonHome]: isHome,
                        [styles.burgerOpen]: isMobileMenuOpen,
                    })}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes size={24} />
                    ) : (
                        <FaBars size={24} />
                    )}
                </button>

                <div
                    className={clsx(styles.menuContainer, {
                        [styles.mobileMenuOpen]: isMobileMenuOpen,
                    })}
                >
                    <nav className={styles.nav}>
                        <NavLink
                            to="/"
                            className={buildLinkClass}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/nannies"
                            className={buildLinkClass}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Nannies
                        </NavLink>
                        {currentUser && (
                            <NavLink
                                to="/favorites"
                                className={buildLinkClass}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Favorites
                            </NavLink>
                        )}
                    </nav>

                    <div className={styles.authContainer}>
                        {!currentUser ? (
                            <>
                                <button
                                    className={clsx(styles.loginButton, {
                                        [styles.loginButtonHome]: isHome,
                                    })}
                                    onClick={() => {
                                        loginModal.open();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Log In
                                </button>
                                <button
                                    className={styles.registerButton}
                                    onClick={() => {
                                        registerModal.open();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Registration
                                </button>
                            </>
                        ) : (
                            <div className={styles.userContainer}>
                                <div className={styles.userInfo}>
                                    <div
                                        className={clsx(styles.userAvatar, {
                                            [styles.userAvatarHome]: isHome,
                                        })}
                                    >
                                        <FaUser size={20} />
                                    </div>
                                    <span
                                        className={clsx(styles.userName, {
                                            [styles.userNameHome]: isHome,
                                        })}
                                    >
                                        {currentUser.displayName}
                                    </span>
                                </div>
                                <button
                                    className={clsx(styles.logoutButton, {
                                        [styles.logoutButtonHome]: isHome,
                                    })}
                                    onClick={() => {
                                        logOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <Modal isOpen={loginModal.isOpen} onClose={loginModal.close}>
                <LoginForm onClose={loginModal.close} />
            </Modal>

            <Modal isOpen={registerModal.isOpen} onClose={registerModal.close}>
                <RegistrationForm onClose={registerModal.close} />
            </Modal>
        </>
    );
};

export default Header;
