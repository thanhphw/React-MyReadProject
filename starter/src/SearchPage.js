import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from "prop-types";

const SearchPage = ({ existingBooks }) => {
    const [query, setQuery] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (query.trim()) {
            BooksAPI.search(query, 100).then((data) => {
                if (isMounted) {
                    if (data.error) {
                        setSearchedBooks([]);
                        console.error('Search returned no results');
                    } else {
                        const booksWithShelves = data.map((book) => {
                            const existingBook = existingBooks.find((b) => b.id === book.id);
                            book.shelf = existingBook ? existingBook.shelf : 'none';
                            return book;
                        });
                        setSearchedBooks(booksWithShelves);
                    }
                }
            }).catch((error) => {
                console.error('Error during search:', error);
                if (isMounted) {
                    setSearchedBooks([]);
                }
            });
        } else {
            setSearchedBooks([]);
            console.log('Search query is empty');
        }
        return () => {
            isMounted = false;
        };
    }, [query, existingBooks]);

    const changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            setSearchedBooks((prevSearchedBooks) =>
                prevSearchedBooks.map((b) => (b.id === book.id ? book : b))
            );
        }).catch((error) => {
            console.error('Error updating shelf:', error);
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
                        onChange={(e) => setQuery(e.target.value)}
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
