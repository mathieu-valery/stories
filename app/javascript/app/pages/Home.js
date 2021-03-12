import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import Card from '../components/Card'


function Home() {
  const base_url = '/api/v1'

  const [posts, setPosts] = useState([]);

  const fetchPosts = async function() {
    const url = `${base_url}/posts`;
    fetch(url)
      .then(response => response.json())
      .then(response => setPosts(response))
      .catch(error => console.log("Error while fetching data : " + error));
  }

  useEffect(() => {
    fetchPosts();
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