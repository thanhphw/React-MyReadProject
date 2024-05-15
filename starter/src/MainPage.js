import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

const MainPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        BooksAPI.getAll().then((data) => {
            setBooks(data);
        });
    }, []);

    const changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            setBooks(books.map((b) => (b.id === book.id ? book : b)));
        });
    };

    const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf title="Currently Reading" books={currentlyReading} onChangeShelf={changeShelf} />
                <BookShelf title="Want to Read" books={wantToRead} onChangeShelf={changeShelf} />
                <BookShelf title="Read" books={read} onChangeShelf={changeShelf} />
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

export default MainPage;
