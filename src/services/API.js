const KEY = '14467768-9171c4f16b15a9d8391496270';
const API = `https://pixabay.com/api/?key=${KEY}`;

export function fetchGallery(searchQuery, page) {
  return fetch(
    `${API}&q=${searchQuery}&per_page=12&image_type=photo&orientation=horizontal&page=${page}`,
  ).then(response => response.json());
}
