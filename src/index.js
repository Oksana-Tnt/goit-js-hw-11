import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchGalleryPhoto } from "./pixabay-api.js";
import { createMarkup } from "./templates/pixabay-markup.js";

const formEl=document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");
const spanEl = document.querySelector(".js-span");

const target = document.querySelector(".js-guard");


let currentPage =1;
let searchQuery = "";
let total=0;

formEl.addEventListener("submit", onSearch);
formEl.addEventListener("change", onChange);

function onChange(){
return  searchQuery = formEl.elements.searchQuery.value; 
}

function clearGallery() {
  galleryEl.innerHTML = "";
  total = 0;
  currentPage = 1;
  // spanEl.textContent = "";
}

let options = {
  root : null,
  rootMargin : "200px",
  treshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
lightbox =  new SimpleLightbox('.gallery a', { captionsData: "alt" ,captionDelay: 250, captionPosition: "bottom"});

function onSearch(evt) {   

  evt.preventDefault();

  clearGallery();

  getPhotoGallery();

  lightbox.refresh();

  observer.observe(target);


      
};


function onLoad(enries, observer) { 

   enries.forEach((entry) =>{
    if(entry.isIntersecting){      
     getPhotoGallery();
             
    }

  });
};

function addMarkup(element, markup){
  element.insertAdjacentHTML("beforeend", markup); 

}

function getPhotoGallery(){

  fetchGalleryPhoto(searchQuery, currentPage)

      .then(data => {              
        total += data.data.hits.length;
        currentPage +=1;    
    
      addMarkup(galleryEl, createMarkup(data.data.hits));  
      lightbox.refresh(); 


      if(total === data.data.totalHits){    
      
        observer.unobserve(target);

        Notiflix.Report.warning("We're sorry, but you've reached the end of search results");
        return;
      }
                 
    })
    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));       

};