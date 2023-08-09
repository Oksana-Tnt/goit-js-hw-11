import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchGalleryPhoto, Per_Page} from "./pixabay-api.js";
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
  spanEl.textContent = "";
}

let options = {
  root : null,
  rootMargin : "200px",
  treshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });
   

function onSearch(evt) {   

  evt.preventDefault();

  clearGallery();
 
  observer.observe(target); 

  lightbox.refresh();
     
};


function onLoad(enries, observer) {
 Notiflix.Notify.success(`we're found enouger ${data.data.hits.length} for your`);
  enries.forEach((entry) => {
     
     if (entry.isIntersecting) {  
       
       getPhotoGallery();  
       
       lightbox.refresh(); 
       
    }
  });
};

function getPhotoGallery(){
  
 
  fetchGalleryPhoto(searchQuery, currentPage)

    .then(data => { 
      
      total += data.data.hits.length;
        
      currentPage += 1;    
    
      
      if(currentPage === Math.floor(data.data.totalHits/Per_Page) || (data.data.hits.length < 40)){   
               
        observer.unobserve(target);

        spanEl.textContent = "We're sorry, but you've reached the end of search results";
        
        return;
      }
        
      addMarkup(galleryEl, createMarkup(data.data.hits));       
     
      lightbox.refresh();   
      
    })

    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));       
};

function addMarkup(element, markup) {
  
  element.insertAdjacentHTML("beforeend", markup); 

};