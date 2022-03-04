const searchBox = document.querySelector(".search")
const content = document.querySelector(".container .grid .row")
const searchIcon = document.querySelector(".search__icon")
const resultContent = document.querySelector(".result")
const resultValue = document.querySelector(".result span")

const baseUrl = "https://api.themoviedb.org/3/"
const apiKey = "api_key=d446dfce025a6b8b811140d296404e39"
const imgApi = "https://image.tmdb.org/t/p/"
const searchURL = baseUrl + "search/movie?" + apiKey


function findMovie(){
    window.addEventListener("keydown",event => {
        if (event.keyCode == 13){
            getMovie(searchBox.value)
            resultContent.classList.add("display")
            resultValue.innerHTML = searchBox.value
        }
    })
}
function getMovie(movie){
   const movieData = `${searchURL}&query=${movie}`
   fetch(movieData)
   .then(response => {return response.json()})
   .then(disPlayMovie)
}

function disPlayMovie(movies){
   const htmls = movies.results.map(movie => {
       return `
       <div class="col l-3 m-6 c-6">
    
       <div class='img__box'>
       <img src="${imgApi}w200${movie.poster_path}">    
       </div>
       <div class="movieBox">
       <p class="title">${movie.original_title}
       </p>
       </div>
     
       </div>
    
       `
   })
   const html = htmls.join('')
   content.innerHTML = html
   
}


function getsearchIcon(){
    searchIcon.addEventListener("click",() => {
        getMovie(searchBox.value)
        resultValue.innerHTML = searchBox.value
        resultContent.classList.add("display")
    })
}

function darkLightMode(){
   $(".darkLightMode .dark").click(() => {
       $("body").css({
         background:"#121212",
          color:"#fff"
       })
       $(".header").css({
           background:"#121212",
           color:"#fff"
       })
       $(".darkLightMode .light").addClass("display")
       $(".darkLightMode .dark").addClass("hide")
   })
   $(".darkLightMode .light").click(() => {
    $("body").css({
      background:"#fff",
       color:"#000"
    })
    $(".header").css({
        background:"#fff",
        color:"#000"
    })
    $(".darkLightMode .light").removeClass("display")
    $(".darkLightMode .dark").removeClass("hide")
})
}
darkLightMode()
getsearchIcon()
findMovie()
