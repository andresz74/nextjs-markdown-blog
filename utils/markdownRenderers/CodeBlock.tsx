import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import styles from './CodeBlock.module.css';

// Register languages you will use to avoid missing highlight support (optional but recommended)
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);

const CustomSyntaxHighlighter = SyntaxHighlighter as any;

export interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
    const language = className?.replace('language-', '') || '';

    const codeString = React.Children.toArray(children)
    .map(child =>
        typeof child === 'string'
            ? child
            : React.isValidElement(child)
            ? String(child.props.children)
            : ''
    )
    .join('');

    return (
        <div className={styles.customCode}>
            <CustomSyntaxHighlighter language={language} style={oneDark} PreTag="div">
                {codeString}
            </CustomSyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
