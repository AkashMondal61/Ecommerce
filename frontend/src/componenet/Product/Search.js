import React, { Fragment, useState  } from "react";
import { useNavigate } from 'react-router-dom';
import "./Search.css"
const Search=()=>{
    const [keyword, setKeyword] = useState("");
    let navigate=useNavigate();
    const searchSubmitHandler = (e) => {
        console.log(keyword);
      e.preventDefault();
      navigate(keyword.trim() ? `/${keyword}` : "/products");
      }
  
    return (
        <Fragment>
          <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
         <input type="submit" value="Search" />
      </form>
        </Fragment>
    )
}
export default Search;