import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

interface IPost {
  _id: string;
  title: string;
  content: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/posts', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        history.push(ROUTES.SIGN_IN);
      }
    };
    fetchData();
  }, [history]);

  const handleLogoutClick = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    history.push(ROUTES.SIGN_IN);
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Posts;
