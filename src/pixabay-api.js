import axios from "axios";

const API_KEY = "38684131-28b4482e9fc4dba2cc1ab34a8";
const BASE_URL = "https://pixabay.com/api/";
const Per_Page = 40;

async function fetchGalleryPhoto(searchQuery, page=1){
    const param = new URLSearchParams({
        key : API_KEY,
        q : searchQuery,
        image_type : "photo",
        orientation : "horizontal",
        safesearch : true,
        per_page: Per_Page,
        page : page,
    });

    return await axios.get(`${BASE_URL}?${param}`);
};

export{fetchGalleryPhoto, Per_Page};