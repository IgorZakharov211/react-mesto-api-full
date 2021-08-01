export const BASE_URL = 'https://mesto.api.zakharovigor.ru';

const _checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = (jwt) =>{
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then((res) => _checkRes(res))
}

export const patchMyInfo = (name, about, jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((res) => _checkRes(res))
}

export const patchMyAvatar = (avatar, jwt) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then((res) => _checkRes(res))
}

export const postCard = (title, url, jwt) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      name: title,
      link: url
    })
  })
  .then((res) => _checkRes(res))
}

export const deleteCard = (id, jwt) => {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then((res) => _checkRes(res))
}

export const putLike = (id, jwt) => {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then((res) => _checkRes(res))
}

export const deleteLike = (id, jwt) => {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then((res) => _checkRes(res))
}

