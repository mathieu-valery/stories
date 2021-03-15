import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import Card from '../components/Card'


function Home() {
  const base_url = '/api/v1'
  const axios = require('axios');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${base_url}/posts`)
    .then(response => setPosts(response.data))
    .catch(error => console.log("Error while fetching data : " + error));
  }, [])

  return (
    <div className="container">
        <FollowersColumn/>
        <div className='feed'>
          {posts.map(post => (
            <Card post={post} key={post.id}/>
          ))}
        </div>
        <div className='suggested-box'></div>
    </div>
  );
}

export default Home;