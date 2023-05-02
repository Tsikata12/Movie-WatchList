
let submitQuery = document.getElementById("search")

let localStorageArray = [] 

if(JSON.parse(localStorage.getItem("watchlist"))){
localStorageArray = JSON.parse(localStorage.getItem("watchlist"))
}

let movie = "transit"
let posterArr = []


getMovie()


async function getMovie(){
    const res = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=3b30c321`)
    const data = await res.json()
        
        let imdbIDs = []
        
        
        data.Search.forEach(movie => {
            imdbIDs.push(movie.imdbID)
        })
        
        // console.log(imdbIDs.length)
        getPosters(imdbIDs)
  
}


function getPosters(ids){

    ids.forEach(id => {
        fetchPoster(id)
    })  
       
}

 async function fetchPoster(id){
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=3b30c321`)
    const data = await res.json()
    // console.log(data)
    posterArr.push(data)
    renderHtml(posterArr)
        
    }
    
    
    function renderHtml(posters) {
                
        let postHtml = ""
        
        posters.forEach((movie, index) => {
            postHtml += 
            `<div class="poster">
                <img height="300px" width="200px" src="${movie.Poster}" />
                <div>
                    <div class="poster-info">
                        <h3>${movie.Title}</h3>
                        <i class="fa-solid star fa-2xs fa-star"></i>
                        <p>${movie.imdbRating}</p>
                    </div>
                    <div class="movie-details">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button id=${index} data-add="${index}" class="btn"><i class="fa-solid fa-circle-plus"></i>WatchList</button>
                        <p>${movie.Plot}</p>
                    </div>
                </div>
            </div>`
        })
        
        document.getElementById("nn").innerHTML = postHtml
    }
    

document.addEventListener("click", (event)=> {
    if (event.target.dataset.add){
        
    const index = event.target.dataset.add
    let button = document.getElementById(index)
    button.innerHTML = "Added"
    button.classList.remove("btn")
    button.classList.add("btn-add")
    
    const movieAdded = posterArr[index] 
    
    localStorageArray.push(movieAdded)
    
    localStorage.setItem("watchlist", JSON.stringify(localStorageArray))
    
    }
    

    
})


document.getElementById("submit").addEventListener("click", (e)=> {
    e.preventDefault()

    movie = submitQuery.value.split(" ").join("+")
    posterArr = []
    document.getElementById("nn").innerHTML = ""
    
    getMovie()

    submitQuery.value = ""

})







