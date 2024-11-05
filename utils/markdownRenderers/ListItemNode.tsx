'use client';
import React from 'react';
import styles from './ListItemNode.module.css'

export interface ListItemNodeProps {
	children: React.ReactNode;
}

const ListItemNode: React.FC<ListItemNodeProps> = ({ children }) => {
	return <li className={`${styles.list} ${styles.firstChild}`}>{children}</li>;
};

export default ListItemNode;
