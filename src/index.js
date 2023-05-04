import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const button = document.querySelector('.load-more');
const form=document.querySelector('#search-form');
const gallery=document.querySelector('.gallery');

const per_page=40;
let query = 0;
let page=1;


function createMarkup(images){
  const images=markup
  .map(image=>{
      const {webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      } =image; `<div class="photo-card">
      <a class="photo-link" href="${largeImageURL}>
      <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`}).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}

const simpleLightbox = new SimpleLightbox('.gallery a ', {
  captionsData: 'alt',
  captionDelay: 250,
});


form.addEventListener('submit', onSubmit);

async function onSubmit(e){
  e.preventDefault();
  page=1;
  button.style.display = 'none';
  gallery.innerHTML = '';
  const elements = form.elements;
  query = elements.searchQuery.value;
  const images = await getImages(query, page, per_page);

  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return false;

}

createMarkup(images.hits);
  button.style.display = 'block';
  page = page + 1;
}

button.addEventListener('click', onClick);

async function onClick(e){
  button.style.display = 'none';
  const images=getImages(query, page, per_page);
  createMarkup(images.hits);
  button.style.display = 'block';

  page = page + 1;
  if ((page - 1) * per_page >= images.totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    button.style.display = 'none';
  }
}


async function getImages(query, page, per_page){
    const API_KEY='35973016-00fa5ed31471a0bdacb65a24f';
    
   
        const params=new URLSearchParams({
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal', 
            safesearch: true,
            per_page: per_page,
            page: page,
        })

        const respons=await axios.get(`https://pixabay.com/api/?${params}`);
        
        return respons.data;
    }


