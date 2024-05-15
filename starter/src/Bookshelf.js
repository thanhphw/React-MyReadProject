import React from 'react';
import Book from './Book';
import PropTypes from "prop-types";

const BookShelf = ({ title, books, onChangeShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={onChangeShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
