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
            <Route path="/Introduction" element={<MarkdownPage filePath="/markdown/introduction.md" />} />
            <Route path="/callApi" element={<MarkdownPage filePath="/markdown/callApi.md" />} />
            <Route path="/mutations" element={<MarkdownPage filePath="/markdown/mutations.md" />} />

            {/* Les Components */}
            <Route path="/ReactMemo" element={<MarkdownPage filePath="/markdown/Components/ReactMemo.md" />} />
            <Route path="/ReactForwardRef" element={<MarkdownPage filePath="/markdown/Components/ReactForwardRef.md" />} />
            <Route path="/ReactSuspense" element={<MarkdownPage filePath="/markdown/Components/ReactSuspense.md" />} />

             {/* Les Hooks */}
            <Route path="/useReducer" element={<MarkdownPage filePath="/markdown/useReducer.md" />} />
            <Route path="/useMemo" element={<MarkdownPage filePath="/markdown/useMemo.md" />} />
            <Route path="/useCallback" element={<MarkdownPage filePath="/markdown/useCallback.md" />} />
            <Route path="/useMyHooks" element={<MarkdownPage filePath="/markdown/useMyHooks.md" />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
