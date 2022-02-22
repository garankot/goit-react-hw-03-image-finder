import axios from 'axios';

const key = '24575119-5e4efe416bc752fe5d4bb361b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const pixabayApi = async ({ searchQuery = '', currentPage = 1 }) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=${'200'}`
  );
  return response.data.hits;
};

export default pixabayApi;
