import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/androidstudio.css'; // Importer le thème prédéfini
import '../styles/markdown.css';

const MarkdownPage = ({ filePath }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        console.log('Loaded Markdown content:', text); // Ajoute ce console.log
        setContent(text);
      })
      .catch(error => console.error('Error loading Markdown file:', error));
  }, [filePath]);

  return (
    <div className="markdown-content  pl-32 pr-32 pt-8 pb-8">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
};

export default MarkdownPage;
