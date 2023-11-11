
const background = document.getElementById("modal-background")
const modalContainer = document.getElementById("modal-container")

//
let currentMovie = {}

function backgroundClickHandler (){
    overlay.classList.remove("open") //removo
}
function closeModal(){
    overlay.classList.remove("open"); //remover apos ser add a lista
}

function addCurrentMovieToList(){
    if(isMovieAlreadyOnList(currentMovie.imdbID)) {
         notie.alert({type:'error',  text:"Filme Ja está na Lista"});
         return;
        }
    addToList(currentMovie);              //recursividade function
    updateUI(currentMovie);
    updateLocalStorage();
    closeModal();
}

function createModal(data){
currentMovie = data; // vou robar as info desse modal para adicionar o item a lista

    modalContainer.innerHTML =                       //crie pramin esse moda innerHTML
    `<h2 id="movie-title">${data.Title} - ${data.Year}</h2>
    <section id="modal-body">
        <img
        id="movie-poster"
         src=${data.Poster}
            alt="Poster Do Filme" />
        <div id="movie-info">
            <h3 id="movie-plot">
                ${data.Plot}
            </h3>
            <div id="movie-cast">
                <h4>Elenco</h4>
                <h5>${data.Actors}</h5>
            </div>
            <div id="movie-genere">
                <h4>Genero</h4>
                <h5>${data.Genre}</h5>
            </div>
        </div>
    </section>
    <section id="modal-footer">
        <button id="add-to-list" onclick='{addCurrentMovieToList()}'>Adicionar a lista</button>
    </section>
        `  
}


background.addEventListener("click", backgroundClickHandler) // click background remove