import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoDataImage from '../assets/no-data-found.png'

const ShowSchool = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">
       {data.length > 0 && <h2>Schools List</h2>}
        <Link to="/register">Add School</Link>
      </div>

     {data.length ? <div className="card-list">
         { data.map((item, index) => (
          <article className="card" key={item.id}>
            <div className="card-header">
              <img
                src={`http://localhost:8081/images/` + item.image}
                alt={item.name}
              />
            </div>
            <div className="card-body">
              <small>{item.city}</small>
              <h2>{item.name}</h2>

              <ul>
              <li>
                {item.contact}
                </li>
                <li>
                {item.email_id}
                </li>
                <li>
                {item.address}
                </li>
                <li>
                {item.state}
                </li>
              </ul>

            </div>
          </article>
        ) ) }
      </div> : <img className="fallback-image" src={NoDataImage} alt="No Data Found"/>}
    </div>
  );
};

export default ShowSchool;
