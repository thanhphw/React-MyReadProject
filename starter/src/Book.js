import React from 'react';
import PropTypes from "prop-types";

const Book = ({ book, onChangeShelf }) => {
    const { title, authors = [], imageLinks, shelf } = book;
    const thumbnail = imageLinks ? imageLinks.thumbnail : '';

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${thumbnail})`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        value={shelf}
                        onChange={(e) => onChangeShelf(book, e.target.value)}
                    >
                        <option value="move" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        imageLinks: PropTypes.object,
        shelf: PropTypes.string
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;
