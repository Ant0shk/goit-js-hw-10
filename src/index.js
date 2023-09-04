import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_01k6eTBWe3DSoZrxXDXQh4pMdasHvWGgs9koAtzTlmkVmDZKVgkK6CL5KecOGblZ';
import { Notify } from 'notiflix/build/notiflix-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { FetchCat } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const ref = {
  select: document.querySelector('.breed-select'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  catPic: document.querySelector('.cat-info-picture'),
  catDesc: document.querySelector('.cat-info-desc'),
};

const cats = new FetchCat();
ref.select.addEventListener('change', onChangeSelect);
function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      console.log(breed);
      return `<option value='${breed.id}'>${breed.name}</option>`;
    })
    .join('');
  // console.log(ref.select);
  ref.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

(function fethBreedsRender() {
  cats
    .fetchCats()
    .then(breeds => {
      Loading.standard();
      renderSelect(breeds);
      ref.select.addEventListener('change', onChangeSelect);
      Loading.remove();
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
})();

function renderDesc(breed) {
  ref.catPic.style.display = 'block';

  const descript = `<img class="cat-picture" src="${breed[0].url}" alt="123"><h2 class="cat-info-desc-title">${breed[0].breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed[0].breeds[0].description}</p>
  <p class="cat-info-desc-temp"><b>Temperament:</b>${breed[0].breeds[0].temperament}</p>`;
  ref.catPic.innerHTML = descript;
}

function onChangeSelect(e) {
  Loading.standard();
  const breedId = e.target.value;
  cats
    .fetchCatByBreed(breedId)
    .then(breed => {
      ref.catInfo.style.display = 'block';
      renderDesc(breed);
      Notify.success('Found the cat!');
      ref.error.style.display = 'none';
      Loading.remove();
    })
    .catch(error => {
      ref.catInfo.style.display = 'none';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
