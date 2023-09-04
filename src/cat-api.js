import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_01k6eTBWe3DSoZrxXDXQh4pMdasHvWGgs9koAtzTlmkVmDZKVgkK6CL5KecOGblZ';
const ALL_CATS_URL = 'https://api.thecatapi.com/v1/breeds';

const ONE_CAT_BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=`;


export class FetchCat {
  // fetchCats() {
  //   return fetch(`${ALL_CATS_URL}?api_key= ${API_KEY}`).then(res => {
  //     if (!res.ok) {
  //       throw new Error(res.status);
  //     }
  //     return res.json();
  //   });
  // }

  fetchCats() {
    return axios.get(ALL_CATS_URL, {}).then(res => res.data);
    
}

  
  // fetchCatByBreed(brirdURLId) {
  //   return fetch(`${ONE_CAT_BASE_URL}/${brirdURLId}?api_key=${API_KEY}`).then(
  //     res => {
  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }
  //       return res.json();
  //     }
  //   );
  // }

  fetchCatByBreed(brirdURLId) {
     return axios.get(ONE_CAT_BASE_URL + brirdURLId, {}).then(res => res.data);
  }
}
