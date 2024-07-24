import React, { useState, useEffect } from 'react';
import SingleTodo from '../components/atoms/SingleTodo';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

const BASE_API_URL = 'http://127.0.0.1:8000';

const Todos = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');

    if (!token) {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        if (!token) {
          navigate('/');
          return;
        }
        const response = await axios.get(`${BASE_API_URL}/api/user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchLoggedUser();
  }, [navigate]);

  const handleLogout = ()=> {
      localStorage.removeItem('accesstoken')
      navigate('/')
      return;
  }

  return (
    <div>
      <h1>Todos</h1>
      {userData && <p>Welcome, {userData.username}!</p>}
      <SingleTodo />
      <Link to={'/add'}>Add Todo</Link>
      <Button variant="contained">Contained</Button>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Todos;
