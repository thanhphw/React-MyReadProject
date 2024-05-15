import React, { createContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    return (
        <SearchContext.Provider value={{}}>
            {children}
        </SearchContext.Provider>
    );
};
