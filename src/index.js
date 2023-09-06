import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_01k6eTBWe3DSoZrxXDXQh4pMdasHvWGgs9koAtzTlmkVmDZKVgkK6CL5KecOGblZ';
import { Notify } from 'notiflix/build/notiflix-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { FetchCat } from './js/cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const ref = {
  select: document.querySelector('.breed-select'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  catPic: document.querySelector('.cat-info-picture'),
  catDesc: document.querySelector('.cat-info-desc'),
};

Loading.standard();
ref.catInfo.style.display = 'none';

const cats = new FetchCat();
ref.select.addEventListener('change', onChangeSelect);
function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      console.log(breed);
      return `<option value='${breed.id}'>${breed.name}</option>`;
    })
    .join('');
  ref.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

(function fethBreedsRender() {
  ref.catInfo.style.display = 'none';
  Loading.standard();
  cats
    .fetchCats()
    .then(breeds => {
      renderSelect(breeds);
      ref.select.addEventListener('change', onChangeSelect);
      Loading.remove();
      ref.select.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
      Notify.failure(
        'First Request. Oops! Something went wrong! Try reloading the page!'
      );
      Loading.remove();
      ref.select.classList.add('is-hidden');
    });
})();

function renderDesc(breed) {
  ref.catPic.style.display = 'block';
  const descript = `<img class="cat-picture" src="${breed[0].url}" alt="123"><h2 class="cat-info-desc-title">${breed[0].breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed[0].breeds[0].description}</p>
  <p class="cat-info-desc-temp"><b>Temperament:</b>${breed[0].breeds[0].temperament}</p>`;
  ref.catPic.innerHTML = descript;
  ref.catInfo.style.display = 'block';
}

function onChangeSelect(e) {
  Loading.standard();
  const breedId = e.target.value;
  ref.catInfo.style.display = 'none';
  cats
    .fetchCatByBreed(breedId)
    .then(breed => {
      renderDesc(breed);
      Notify.success('Found the cat!');
      Loading.remove();
    })
    .catch(error => {
      ref.catInfo.style.display = 'none';
      Notify.failure(
        'One Cat. Oops! Something went wrong! Try reloading the page!'
      );
      Loading.remove();
    });
}
