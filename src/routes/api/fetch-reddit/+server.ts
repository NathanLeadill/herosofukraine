import fetch from 'node-fetch';

export async function _fetchInitialData() {
  const response = await fetch('https://monstar.pythonanywhere.com/api/test/');
  const data = await response.json();
  return data;
}