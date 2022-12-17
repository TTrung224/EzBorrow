import React from 'react';
import './SearchBar.css';
export const SearchBar = () => {
    return(
        <div className='search'>
            <div className='search-bar' id='search-bar'>
                <input type="text" id='search-input' placeholder="Search.."/>
                <button type='button' className='btn-search'><img src='https://cdn-icons-png.flaticon.com/512/3917/3917754.png' height={20} width={20}/></button>
            </div>
        </div>
        
    )
}

export default SearchBar

