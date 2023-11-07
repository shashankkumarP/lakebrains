/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import './App.css'
import axios from "axios"

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({
    name:"",
    temp:""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    
  };

  const handleSearch=()=>{
    console.log(searchQuery)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=840de593b7028de6e424162454790fe5`)
    .then((res)=>{
      let data = res.data;
      setResults({...results,name:data.name,temp:data.main.temp})
      console.log(data);
      setIsModalOpen(true);
    })

  }


  return (

    <div>
      {!isModalOpen? (
      <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e)=>handleChange(e)}
      />
      <i onClick={()=>handleSearch()} className="fa fa-search"></i>
    </div>
    ):(
      <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{results.name}</h2>
            <p>{results.temp}</p>
          </div>
        </div>
      )}
    </div>
    )}
    </div>
    
  )
}

export default App
