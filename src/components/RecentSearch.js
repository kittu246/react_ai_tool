import React from "react";
import { MdDelete } from "react-icons/md";


const RecentSearch =({setSearchHistory,searchHistory,setOldSearch})=>{

     const handleDeleteHistory = () => {
        localStorage.clear();
        setSearchHistory([]);
      };

    return (
        <>
        <div className="col-span-1 bg-zinc-600 overflow-y-auto h-full ">
                <h2 className="text-xl text-white text-center mt-2 flex justify-around gap-2 items-center">
                  <span> Recent History</span>
                  <MdDelete onClick={handleDeleteHistory} />
                </h2>
        
                <ul className="mt-2 px-4 ">
                  {searchHistory &&
                    searchHistory.map((item) => (
                      <li
                        onClick={() => setOldSearch(item)}
                        className="mt-1 cursor-pointer  px-2 overflow-auto truncate hover:text-zinc-100 text-sm text-zinc-300 "
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
        </>
    )

}

export default RecentSearch;