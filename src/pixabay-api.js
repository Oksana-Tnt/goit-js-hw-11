import axios from "axios";

const API_KEY = "38684131-28b4482e9fc4dba2cc1ab34a8";
const BASE_URL = "https://pixabay.com/api/";


async function fetchGalleryPhoto(searchQuery){
    return await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
};

export{fetchGalleryPhoto};