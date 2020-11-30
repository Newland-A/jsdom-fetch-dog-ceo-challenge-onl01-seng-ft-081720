console.log('%c HI', 'color: firebrick')

// document.addEventListener('DOMContentLoaded', () => {
//   fetchImages()
//   fetchBreeds()

//   document.getElementById('breed-dropdown').addEventListener('change', function() {
//     filterBreeds();
//   })
// })

// function fetchImages() {
//   const imgUrl = "https://dog.ceo/api/breeds/image/random/5"
//   fetch(imgUrl)
//   .then(resp => resp.json())
//   .then(json => showImagesToPage(json))
// }

// function showImagesToPage(pics) {
//   const picContainer = document.getElementById('dog-image-container')
//   pics.message.forEach(pic => {
//   const img = document.createElement('img')
//   img.src = pic
//   img.height = "150"
//   img.width = "200"
//   picContainer.appendChild(img)
//   });
// }

// // function fetchBreeds() {
// //   const breedUrl = 'https://dog.ceo/api/breeds/list/all'
// //   fetch(breedUrl)
// //   .then(resp => resp.json())
// //   .then(json => listDogBreeds(json))
// // }

// // function listDogBreeds(breeds) {
// //   const ul = document.getElementById('dog-breeds')
// //   listBreeds = breeds.message
// //   for(let breed in listBreeds) {
// //     const li = document.createElement('li')
// //     ul.appendChild(li)
// //     li.innerText = breed
// //     li.id = 'list-breed-item'
// //     li.addEventListener('click', function(event) {
// //       event.target.style.color = "purple"
// //     })
// //   }
// // }


document.addEventListener('DOMContentLoaded', () => {
  // variable so we only have to fetch information one time
  let allBreeds = []
  // API endpoints
  const imgUrl = "https://dog.ceo/api/breeds/image/random/5"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  // DOM nodes for attaching event listeners
  const imgContainer = document.getElementById('dog-image-container')
  const dogBreedUl = document.getElementById('dog-breeds')
  const breedDropdown = document.getElementById('breed-dropdown')

  function fetchDogImages() {
    // initial fetch returns a promise with a response onject
    fetch(imgUrl)
    .then(function(resp) {
      console.log(resp)
      // .then takes a callback and passes the return value from the previous promise
      if(resp.ok) { // if status < 400 
        return resp.json() //returns parsed json as promise
        // resp.json() returns another promise
        // the only way to get the value is with another .then
      }
    })
    // parsed data from previous .then
    .then(function(dogImgData) {
      dogImgData.message.forEach(pic => {
        // creates an img tag to store the list items in
          const img = document.createElement('img')
          // sets the src to pic
          img.src = pic
          // establishes restrictions on the size of the images
          img.height = "200"
          img.width = "200"
          // finally appends the images to the img container so they can be displayed
          imgContainer.appendChild(img)
          }
        )
      const dogImgString = dogImgData.message.map((imgUrl) => {
        return `<img src="${imgUrl}">`
      })
    })
  }

  fetchDogImages()

  function fetchBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then((breedData) => {
      allBreeds = Object.keys(breedData.message)
      console.log(allBreeds)
      dogBreedUl.innerHTML = createDogList(allBreeds)
    })
  }
  
  fetchBreeds()

  function createDogList(dogBreedArray) {
    // returns string to our map function callback
    const dogLiStringArray = dogBreedArray.map(function(breed) {
      return `<li>${breed}</li>`
    }) //joins back together to prevent commas 
    return dogLiStringArray.join('')
  }

  dogBreedUl.addEventListener('click', function(event) {
    // changes the color of the li item if it is clicked
    event.target.style.color = 'red'
  })
// selects the dropdown by id add listener for change event on 
  breedDropdown.addEventListener('change', function(event) {
    // which option was selected by its .value attribute
    const letterOption = event.target.value
    // sets the json parsed data to be filtered by breed that starts with the option that was selected above
    const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letterOption))
    // then displays the new list by its filter thanks to the createDogList Function that maps and returns the array joined.
    dogBreedUl.innerHTML = createDogList(filteredBreeds)
  })
})