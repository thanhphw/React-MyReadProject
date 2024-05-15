import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from "prop-types";

const SearchPage = ({ existingBooks }) => {
    const [query, setQuery] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const updateQuery = (query) => {
        setQuery(query);
        if (query) {
            BooksAPI.search(query, 100).then((data) => {
                if (data.error) {
                    setSearchedBooks([]);
                    console.log('error data')
                } else {
                    setSearchedBooks(data.map((book) => {
                        const existingBook = existingBooks.find((b) => b.id === book.id);
                        if (existingBook) {
                            book.shelf = existingBook.shelf;
                        } else {
                            book.shelf = 'none';
                        }
                        return book;
                    }));
                }
            });
        } else {
            setSearchedBooks([]);
            console.log('none input data')
        }
    };

    const changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            setSearchedBooks(searchedBooks.map((b) => (b.id === book.id ? book : b)));
        });
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchedBooks.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={changeShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

SearchPage.propTypes = {
    existingBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchPage;
