import axios from 'axios';

export const signupFunc = async (name, email, password) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/users/signup`, {
    name,
    email,
    password,
  });
};

export const loginFunc = async (email, password) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/users/login`, {
    email,
    password,
  });
};
