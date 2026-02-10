'use client'; 
import React from 'react';
import Icon from '@/components/Icon';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
	title: string;
	url: string;
	variant?: 'default' | 'menu';
}

const ShareButtons = ({ title, url, variant = 'default' }: ShareButtonsProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const isMenu = variant === 'menu';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={`${styles.shareContainer}${isMenu ? ` ${styles.menuContainer}` : ''}`}>
      <a
        className={styles.shareAction}
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-twitter' className={styles.shareIcon} /> Share on Twitter
      </a>
      <a
        className={styles.shareAction}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-facebook' className={styles.shareIcon} /> Share on Facebook
      </a>
      <a
        className={styles.shareAction}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-linkedin' className={styles.shareIcon} /> Share on LinkedIn
      </a>
      <a
        className={styles.shareAction}
        href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-reddit' className={styles.shareIcon} /> Share on Reddit
      </a>
      <button className={styles.shareAction} onClick={handleCopy}><Icon name='fa-solid fa-link' className={styles.shareIcon} /> Copy Link</button>
    </div>
  );
};

export default ShareButtons;
