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
let total=0;

formEl.addEventListener("submit", onSearch);
formEl.addEventListener("change", onChange);

function onChange(){
return  searchQuery = formEl.elements.searchQuery.value;
 
}

function createNewGallery() {
  galleryEl.innerHTML = "";
  total = 0;
  currentPage = 1;
}

let options = {
  root : null,
  rootMargin : "200px",
  treshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onSearch(evt) {   
  evt.preventDefault();
  createNewGallery();
   
      fetchGalleryPhoto(searchQuery, currentPage)

      .then(data => {  
            
      console.log(data.data);
      galleryEl.insertAdjacentHTML("beforeend", createMarkup(data.data.hits));      
     
      createSimpleLightbox();
      observer.observe(target);
        
    })

    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));   
    
  
};



function onLoad(enries, observer) {
     

  enries.forEach((entry) =>{
    if(entry.isIntersecting){      
      currentPage +=1;

    fetchGalleryPhoto(searchQuery, currentPage)
    .then(data => {   

      total += data.data.hits.length;
      Notiflix.Notify.success(`Hooray! We found more ${total} images for you!`);
      
      galleryEl.insertAdjacentHTML("beforeend", createMarkup(data.data.hits));
       
      createSimpleLightbox();

      const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();

      window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
});


        if(total === data.data.totalHits){          
            Notiflix.Report.warning("We're sorry, but you've reached the end of search results");
            observer.unobserve(target);
        }
        console.log(data.data);
    })

    .catch(err => Notiflix.Report.failure('Error', 'Sorry, there are no images matching your search query. Please try again', 'Ok'));   
    }
    
  })
};

function createSimpleLightbox() {
  let lighbox = new SimpleLightbox('.gallery a', { captionsData: "alt" ,captionDelay: 250, captionPosition: "bottom"});
  lighbox.refresh();
}
