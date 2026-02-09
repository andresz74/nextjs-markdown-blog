import React from 'react';
import styles from './Icon.module.css';

interface IconProps {
	name: string;
	size?: number;
	color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor' }) => {
	return (
		<span className={styles.icon} style={{ fontSize: `${size}px`, color }}>
			<span className={name} />
		</span>
	);
};

export default Icon;
