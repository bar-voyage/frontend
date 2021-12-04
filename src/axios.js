// import React from 'react';
import axios from 'axios';

export const axiosBackendInstance = axios.create({
  //   baseURL: 'http://ec2-3-16-213-143.us-east-2.compute.amazonaws.com:3000',
  baseURL: 'http://localhost:3000',
  //   timeout: 1000,
});
