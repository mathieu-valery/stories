import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import Card from '../components/Card'


function Home() {
  const base_url = '/api/v1'

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const fetchPosts = async function() {
    const url = `${base_url}/posts`;
    fetch(url)
      .then(response => response.json())
      .then(response => setPosts(response))
      .catch(error => console.log("Error while fetching data : " + error));
  }

  const fetchComments = async function() {
    const url = `${base_url}/comments`;
    fetch(url)
      .then(response => response.json())
      .then(response => setComments(response))
      .catch(error => console.log("Error while fetching data : " + error));
  }

  const fetchLikes = async function() {
    const url = `${base_url}/likes`;
    fetch(url)
      .then(response => response.json())
      .then(response => setLikes(response))
      .catch(error => console.log("Error while fetching data : " + error));
  }

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchLikes();

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