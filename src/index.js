import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchGalleryPhoto } from "./pixabay-api.js";

const formEl=document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");

formEl.addEventListener("submit", onSearch);

function onSearch(evt){
    evt.preventDefault();

    const searchQuery = (formEl.elements.searchQuery.value).trim().toLowerCase();

    fetchGalleryPhoto(searchQuery)

    .then(data => {        
        galleryEl.insertAdjacentHTML("beforeend", createMarkup(data.data.hits));
        let lighbox = new SimpleLightbox('.gallery a', { captionsData: "alt" ,captionDelay: 250, captionPosition: "bottom"});
    })

    .catch(err => console.log("Sorry, there are no images matching your search query. Please try again"));   
    
}

function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<li class="gallery__item">   
    <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>${downloads}</b>
      </p>
    </div>   
  
  </li>`).join("");
  
};