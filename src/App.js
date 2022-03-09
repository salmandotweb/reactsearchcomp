import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = data.filter((data) => {
      return data.title.search(value) != -1;
    });
    setFilteredData(result);
  };
  return (
    <div className="App">
      <label htmlFor="search">Search</label>
      <input
        type="search"
        id="search"
        placeholder="Search..."
        onChange={(e) => handleSearch(e)}
      />
      <div className="data">
        {filteredData.map((value, index) => {
          return (
            <div key={value.id} className="wrapper">
              <div className="title">{value.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
