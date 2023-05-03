import axios from 'axios';
import Notiflix from 'notiflix';


const form=document.querySelector('#search-form');
const gallery=document.querySelector('.gallery');
const loadButton=document.querySelector('.load-more');
let nameImages = '';
let page=1;
const per_page = 40;

form.addEventListener('submit', onSubmit);
loadButton.addEventListener('click', onClick)
async function getImages(nameImages, page){
    const API_KEY='35973016-00fa5ed31471a0bdacb65a24f';
    
   
        const params=new URLSearchParams({
            key: API_KEY,
            q: nameImages,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: per_page,
            page: page,
        })

        const respons=await axios.get(`https://pixabay.com/api/?${params}`);
        return respons;
    }


async function onSubmit(e){
    e.preventDefault();
    const searchQuery=e.target.searchQuery.value.trim();
    page=1;
    gallery.innerHTML='';
    
    if (!searchQuery){
      return;
    }

    const data=await getImages();
    
  
    
    if(data.hits.length===0){
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }else{createMarkup(arr);
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
}
     
async function onClick(){
  page+=1;
const data=await getImages();
if(!data)return;

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

    if(data.hits.length<40){
      loadButton.style.display="none";
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }else {loadButton.style.display="block";}
}
