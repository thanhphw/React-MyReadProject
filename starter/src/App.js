import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import { SearchProvider } from './SearchProvider';
import * as BooksAPI from './BooksAPI';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  return (
    <SearchProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage existingBooks={books} />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
