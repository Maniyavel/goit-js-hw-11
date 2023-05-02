import axios from 'axios';
import Notiflix from 'notiflix';

const form=document.querySelector('#search-form');
const galleryItems=document.querySelector('.gallery');
const loadButton=document.querySelector('.load-more');
let nameImages = '';
let page=1;

form.addEventListener('submit', onSubmit);

async function getImages(nameImages, page){
    const API_KEY='35973016-00fa5ed31471a0bdacb65a24f';
    
   
        const params=new URLSearchParams({
            key: API_KEY,
            q: nameImages,
            image_type: 'photo',
            orientation: horizontal,
            safesearch: true,
            per_page: per_page,
            page: page,
        })

        const respons=await axios.get(`https://pixabay.com/api/?${params}`);
        return respons;
    }


async function onSubmit(e){
    e.preventDefault();
    if (!evt.target.elements.searchQuery.value) {
        Notiflix.Notify.failure('Please, enter a search query');
      } else {
        addGallerySubmit();
      }
}

function createMarkup(arr){
    return arr
    .map((
        {webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) =>`<div class="photo-card">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      </div>`).join('');
    gallery.insertAdjacentHTML('beforeend', markup);

}
