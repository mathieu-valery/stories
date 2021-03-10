import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'



function Home() {
  const base_url = '/api/v1'

  const [posts, setPosts] = useState([]);

  const fetchData = async function() {
    const url = `${base_url}/posts`;
    fetch(url)
      .then(response => response.json())
      .then(response => setPosts(response))
      .catch(error => console.log("Error while fetching data : " + error));
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
        <h1>Home</h1>
        <FollowersColumn/>
        <div className='feed'>
          {posts.map(post => (
            <p>{post.caption}</p> //render a card component instead
          ))}
        </div>
        <div className='suggested-box'></div>
    </div>
  );


}

export default Home;