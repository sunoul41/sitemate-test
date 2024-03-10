import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4000/api/issues';

async function createIssue(title: string, description: string) {
  const response = await axios.post(BASE_URL, { title, description });
  return response.data;
}

async function getIssue(id: string) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

async function updateIssue(id: string, title: string, description: string) {
  const response = await axios.put(`${BASE_URL}/${id}`, { title, description });
  return response.data;
}

async function deleteIssue(id: string) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}

createIssue('Sample Title', 'Sample Description').then(console.log);
