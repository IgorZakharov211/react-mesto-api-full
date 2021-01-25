const jwt = localStorage.getItem('token');

const apiOptions = {
  baseUrl: 'http://igorzakharov.mestoapi.students.nomoredomains.rocks',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`,
  }
}

export default apiOptions;

