import axios from 'axios';

async function getData(data, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31263491-2b7279f8f7be1b28a60fa7e7e';

  const apiData = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return apiData;
}

export default { getData };
