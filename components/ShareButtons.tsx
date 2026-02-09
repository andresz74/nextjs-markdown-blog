'use client'; 
import React from 'react';
import Icon from '@/components/Icon';
import styles from './ShareButtons.module.css';

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={styles.shareContainer}>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-twitter' className={styles.shareIcon} /> Share on Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-facebook' className={styles.shareIcon} /> Share on Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-linkedin' className={styles.shareIcon} /> Share on LinkedIn
      </a>
      <a
        href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name='fa-brands fa-reddit' className={styles.shareIcon} /> Share on Reddit
      </a>
      <button onClick={handleCopy}><Icon name='fa-solid fa-link' className={styles.shareIcon} /> Copy Link</button>
    </div>
  );
};

export default ShareButtons;
