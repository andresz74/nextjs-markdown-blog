import React from 'react';
import styles from './Icon.module.css';

interface IconProps {
	name: string;
	size?: number;
	color?: string;
	className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size, color, className }) => {
	const inlineStyle: React.CSSProperties = {
		...(typeof size === 'number' ? { fontSize: `${size}px` } : {}),
		...(color ? { color } : {}),
	};

	return (
		<span className={`${styles.icon}${className ? ` ${className}` : ''}`} style={inlineStyle}>
			<span className={name} />
		</span>
	);
};

export default Icon;
