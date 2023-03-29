// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// SimpleLightbox
// https://simplelightbox.com/
// https://github.com/andreknieriem/simplelightbox?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const parent = document.querySelector('.gallery');

const cards = galleryItems.map(item => { 
  const sample = `
    <li class="gallery__item">
     <a class="gallery__link" href="${item.original}">
        <img class="gallery__image"
          src="${item.preview}" 
          alt="${item.description}" 
          title="${item.description}" />
     </a>
    </li>`;
  return sample;
});

parent.insertAdjacentHTML('afterbegin', cards.join(''));

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
	// Do something…
  gallery.captionDelay = 250;
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // Some usefull information
});