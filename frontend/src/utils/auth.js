export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
  })
  .then((response) => {
    console.log(response)
    try{
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      return res.json()
    })
  } 
