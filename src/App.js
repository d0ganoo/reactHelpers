import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import MarkdownPage from './components/MarkdownPage';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Menu />
        <div className="flex-1 ml-64 p-30">
          <Routes>
            <Route path="/introduction" element={<MarkdownPage filePath="/markdown/introduction.md" />} />
            <Route path="/useReducer" element={<MarkdownPage filePath="/markdown/useReducer.md" />} />
            <Route path="/useMemo" element={<MarkdownPage filePath="/markdown/useMemo.md" />} />
            <Route path="/useCallback" element={<MarkdownPage filePath="/markdown/useCallback.md" />} />
            <Route path="/useMyHooks" element={<MarkdownPage filePath="/markdown/useMyHooks.md" />} />
            <Route path="/ReactMemo" element={<MarkdownPage filePath="/markdown/ReactMemo.md" />} />
            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
