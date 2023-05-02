

    let postersArray 

    getPosters()
    
    function getPosters(){
       postersArray = JSON.parse(localStorage.getItem("watchlist"))
        renderHtml(postersArray)
    }
   



function renderHtml(posters) {
                
    let postHtml = ""
    
    posters.forEach((movie, index) => {
        postHtml += 
        `<div class="poster" id="${index}">
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
                    <button id=${index} data-remove="${index}" class="btn"><i class="fa-solid fa-minus"></i> Remove</button>
                </div>
                <p>${movie.Plot}</p>
            </div>
        </div>`
    })
    
    document.getElementById("nn").innerHTML = postHtml
}

document.addEventListener("click", (e)=> {
    if (e.target.dataset.remove) {
        let id = e.target.dataset.remove

        let removedItem = postersArray[id]

        postersArray = postersArray.filter(item => item !== removedItem)


        localStorage.setItem("watchlist", JSON.stringify(postersArray))
        getPosters()
    }
})