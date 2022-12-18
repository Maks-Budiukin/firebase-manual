import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


const galleryEl = document.querySelector('.gallery');

const imageEl = galleryItems.map(({preview, original, description}) => 
    
    `<div><a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a></div>`).join("");

galleryEl.insertAdjacentHTML('beforeend', imageEl);


const lightbox = new SimpleLightbox('.gallery a',{ captionsData: 'alt', captionDelay: 250});