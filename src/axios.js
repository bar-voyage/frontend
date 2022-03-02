// import React from 'react';
import axios from 'axios';

export const axiosBackendInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://ec2-52-15-235-6.us-east-2.compute.amazonaws.com'
  // timeout: 1000,
});
