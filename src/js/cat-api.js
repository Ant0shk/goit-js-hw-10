import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_01k6eTBWe3DSoZrxXDXQh4pMdasHvWGgs9koAtzTlmkVmDZKVgkK6CL5KecOGblZ';
axios.defaults.baseURL = `https://api.thecatapi.com/v1`;
const ALL_CATS_URL = '/breeds';
const ONE_CAT_BASE_URL = `/images/search?breed_ids=`;

export class FetchCat {
  fetchCats() {
    return axios.get(ALL_CATS_URL, {}).then(res => res.data);
  }

  fetchCatByBreed(brirdURLId) {
    return axios.get(ONE_CAT_BASE_URL + brirdURLId, {}).then(res => res.data);
  }
}
