import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './js/api';
import { createMarkup } from './js/markup';

const lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
};

let page = 1;

refs.form.addEventListener(`submit`, onSubmit);
refs.gallery.addEventListener(`click`, evt => evt.preventDefault());

function onSubmit(evt) {
  evt.preventDefault();
  const value = refs.form.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  API.getData(value, page).then(data => {
    page = 1;
    if (data.data.hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${data.data.totalHits} images.`
      );
      createMarkup(data.data.hits, refs.gallery);
      lightbox.refresh();
      observer.observe(refs.gallery.lastElementChild);
    }
  });
}
