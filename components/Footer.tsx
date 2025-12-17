import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
        const currentYear = new Date().getFullYear();
        return (
                <footer className={styles.footer}>
                        <p>&copy; {currentYear} My Blog. All rights reserved.</p>
                </footer>
        );
};

export default Footer;
