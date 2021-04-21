let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()

  document.addEventListener("submit", function(event){
    newToy(event)
  })

});


function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(function(json){
      makeToyCards(json)
    })
}

function makeToyCards(json){
  for(const key in json){
  let div = document.createElement('div')
  div.className = "card"
  div.setAttribute('id', json[key]['id'])
  let h2 = document.createElement('h2')
  h2.innerText = json[key]['name']
  let img = document.createElement('img')
  img.src = json[key]['image']
  img.style.height = '200px'
  let p = document.createElement('p')
  p.innerText = `${json[key]['likes']} Likes` 
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  document.querySelector('#toy-collection').appendChild(div)
  
  button.addEventListener('click', function(event){ 
    console.log('click')
    increaseLikes(event)
    })
  }
}

function appendToy(){
  let div = document.createElement('div')
  div.className = "card"
  div.setAttribute('id', json[key]['id'])
  let h2 = document.createElement('h2')
  h2.innerText = json[key]['name']
  let img = document.createElement('img')
  img.src = json[key]['image']
  img.style.height = '200px'
  let p = document.createElement('p')
  p.innerText = `${json[key]['likes']} Likes` 
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  document.querySelector('#toy-collection').appendChild(div)
  
  button.addEventListener('click', function(event){ 
    console.log('click')
    increaseLikes(event)
    })
}

function newToy(event){
  event.preventDefault()
  let name = event.target.children[1].value
  let img = event.target.children[3].value
  let formData = {name: name, image: img, likes: 0}
  let configObj = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object){
      appendToy(object)
    })
}

function appendToy(object){
  let div = document.createElement('div')
  div.className = "card"
  div.setAttribute('id', object.id)
  let h2 = document.createElement('h2')
  h2.innerText = object.name
  let img = document.createElement('img')
  img.src = object.image
  img.style.height = '200px'
  let p = document.createElement('p')
  p.innerText = "0 Likes" 
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

  document.querySelector('#toy-collection').appendChild(div)
  
  button.addEventListener('click', function(event){ 
    console.log('click')
    increaseLikes(event)
    })
}

function increaseLikes(event){
  let toy = event.target.parentNode
  let likes = toy.children[2].innerText
  let numOfLikes = parseInt(likes) + 1 
  toy.children[2].innerText = `${numOfLikes} Likes`
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": numOfLikes
}) 
  }

  let id = toy.id

  fetch(`http://localhost:3000/toys/${id}`, configObj)
}