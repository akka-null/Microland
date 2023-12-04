// Login.js
import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Link } from 'react-router-dom';


const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mock API request for user authentication
      const response = await axios.post('https://api.example.com/login', formData);

      // Handle success (you might want to redirect the user or show a success message)
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your username and password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleSubmit}>
        <FormLabel>Username:</FormLabel>
        <FormInput
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <FormLabel>Password:</FormLabel>
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
        <Link to={'/register'}>
            if you dont have account
        </Link>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Login;

