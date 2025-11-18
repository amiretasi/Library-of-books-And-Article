import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlesApp from './components/ArticlesApp.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ArticlesApp />
        </React.StrictMode>
    );
}
