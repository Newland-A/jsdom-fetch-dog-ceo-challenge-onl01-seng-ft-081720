console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
  
  
  const breedSelect = document.getElementById("breed-dropdown")
  const breedList = document.getElementById('dog-breeds')
  fetchImages()
  
})

function fetchImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => showImagesToPage(json))
}

function showImagesToPage(pics) {
  const picContainer = document.getElementById('dog-image-container')
  pics.message.forEach(pic => {
  const img = document.createElement('img')
  img.src = pic
      picContainer.appendChild(img)
  });
}

fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(resp => resp.json())
}

