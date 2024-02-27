import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ShowSchool = () => {

  const [data,setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      setData(res.data)
    })
    .catch(err => console.log(err)) 
  },[])

  console.log(data)



  return (
    <div className='page-container'>

<div className="page-title">
        <h2>Schools List</h2>
        <Link to='/register'>Add School</Link>
      </div>

<div className="card-list">
      {data.map((item,index) => (

          <article className='card' key={item.id}>

<div className='card-header'>
<img src={`http://localhost:8081/images/`+item.image} alt={item.name} />

  </div>
  <div className="card-body">
     <small>{item.city}</small>
		<h2>{item.name}</h2>

    <p>
      {item.address}
    </p>
      <p>{item.email_id}</p>
      <p>{item.contact}</p>
      <p>{item.state}</p>
	</div>



          </article>
       
      
      ))}
</div>
    </div>
  )
}

export default ShowSchool