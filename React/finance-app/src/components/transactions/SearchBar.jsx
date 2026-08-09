import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";


const SearchBar = ({
    searchTerm,
    setSearchTerm
}) => {


    return (

        <div className="search-container">


            <span className="search-icon">
    <FaSearch />
</span>
            


            <input

                type="text"

                placeholder="Search transactions..."

                value={searchTerm}

                onChange={(e)=>setSearchTerm(e.target.value)}

            />


        </div>

    );

};


export default SearchBar;