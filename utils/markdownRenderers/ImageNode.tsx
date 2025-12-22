'use client';
import Image from 'next/image';
import React from 'react';
import styles from './ImageNode.module.css';

export interface ImageProps {
    alt: string;
    src: string;
}

const isYouTubeUrl = (url: string) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be');
    } catch {
        return false;
    }
};

const getYouTubeEmbedUrl = (url: string) => {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be') {
        // Short url
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    }

    const videoId = parsedUrl.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const StyledImage = ({ src, alt, ...props }: ImageProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const resolvedSrc = src ? `${basePath}${src}` : `${basePath}/default-image.jpg`;

    if (isYouTubeUrl(src)) {
        const embedUrl = getYouTubeEmbedUrl(src);

        return (
            <span className={styles.videoWrapper}>
                <iframe
                    src={embedUrl}
                    title={alt || 'YouTube video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </span>
        );
    }

    return (
        <span data-testid="image-wrapper" className={`${styles.imageWrapper} ${isLoaded ? styles.isLoaded : styles.loading}`}>
            <Image
                className={styles.customImg}
                src={resolvedSrc}
                alt={alt || 'Image'}
                unoptimized
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 800px) 100vw, 800px"
                width={1}
                height={1}
                {...props}
            />
        </span>
    );
};

const ImageNode: React.FC<ImageProps> = ({ alt, src }) => {
    return <StyledImage alt={alt} src={src} />;
};

export default ImageNode;
