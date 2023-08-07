function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="gallery">
    
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

  </div>`).join("");
  
};

export {createMarkup};