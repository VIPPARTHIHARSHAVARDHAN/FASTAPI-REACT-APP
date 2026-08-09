import React from "react";
import "./Filter.css";

import {
    FaList,
    FaArrowTrendUp,
    FaArrowTrendDown
} from "react-icons/fa6";


const Filter = ({
    filterType,
    setFilterType
}) => {


    const filters = [

        {
            name: "All",
            icon: <FaList />
        },

        {
            name: "Income",
            icon: <FaArrowTrendUp />
        },

        {
            name: "Expense",
            icon: <FaArrowTrendDown />
        }

    ];



    return (

        <div className="filter-container">


            {
                filters.map((filter)=>(


                    <button

                        key={filter.name}

                        className={
                            filterType === filter.name
                            ? "filter-btn active"
                            : "filter-btn"
                        }


                        onClick={() =>
                            setFilterType(filter.name)
                        }

                    >


                        <span className="filter-icon">

                            {filter.icon}

                        </span>


                        {filter.name}


                    </button>


                ))
            }


        </div>

    );

};


export default Filter;