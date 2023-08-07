import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchGalleryPhoto } from "./pixabay-api.js";
import { createMarkup } from "./templates/pixabay-markup.js";

const formEl=document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");
const buttonEl = document.querySelector(".js-load");
const target = document.querySelector(".js-guard");

let currentPage =1;
let searchQuery = "";
let counter = 0;

formEl.addEventListener("submit", onSearch);

let options = {
  root : null,
  rootMargin : "200px",
  treshold: 1.0,
};

let observer = new IntersectionObserver (onLoad, options);

function onLoad(enries, observer){
  let totalHint=0;

  enries.forEach((entry) =>{
    if(entry.isIntersecting){      
      currentPage +=1;

    fetchGalleryPhoto(searchQuery, currentPage)
    .then(data => {   

      totalHint+=data.data.hits.length
      Notiflix.Notify.success(`Hooray! We found more ${totalHint} images for you!`);
     
        galleryEl.insertAdjacentHTML("beforeend", createMarkup(data.data.hits));
        let lighbox = new SimpleLightbox('.gallery a', { captionsData: "alt" ,captionDelay: 250, captionPosition: "bottom"});

        if(totalHint === data.data.totalHint){          
            Notiflix.Report.warning("We're sorry, but you've reached the end of search results");
            observer.unobserve(target);
        }
       
    })

    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));   
    }
    
  })
};

function onSearch(evt){

    evt.preventDefault();
    
    searchQuery = (formEl.elements.searchQuery.value).trim().toLowerCase();

    fetchGalleryPhoto(searchQuery, currentPage)

    .then(data => {     
      console.log(data.data);
        galleryEl.insertAdjacentHTML("beforeend", createMarkup(data.data.hits));
        let lighbox = new SimpleLightbox('.gallery a', { captionsData: "alt" ,captionDelay: 250, captionPosition: "bottom"});

        observer.observe(target);
        
    })

    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));   
    
};


