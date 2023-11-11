const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

//let movieList = [];
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searcButtonEventClick() {
  try {
    let url = `http://www.omdbapi.com/?apikey=f46ed398&t=${movieNameParameterGenerator()}&y=${movieNameParameterGenerator()}`; // parametro api (&t - &y)

    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    if (data.Error) {
      throw new Error("Filme Não Encontrado"); // tratamento error
    }

    createModal(data); // chamada da funcao do modal dinamic
    overlay.classList.add("open"); // chamada
  } catch (error) {
    notie.alert({ type: "error", text: error.message }); // bibliotec notie.js meseger alerts imports
  }
}
function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome Do filme Deve Ser Informado"); // tratamento de erro para input camp name
  }
  return movieName.value.split(" ").join("+");
}
function movieYearParametererGenerator() {
  if ((movieYear.volue = "")) {
    // tratamento de erro para input camp year
    return "";
  }
  if (movieYear.volue.length !== 4 || Number.isNaN(Number(movieYear.volue))) {
    throw new Error("Ano do filme Invalido.");
  }
  return `&y=${movieYear.value}`;
}
function addToList(movieObject) {
  movieList.push(movieObject); // metodo push de array
}

function isMovieAlreadyOnList(id) {
  //no repieter movie list
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie)); // metodo array find achar
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
    <img src="${movieObject.Poster}"
     alt="Poster do ${movieObject.Title}.">
    <button class="remove-button" onclick="{removeFilmFromLis('${movieObject.imdbID}')}">
    <i class="bi bi-trash"></i>Remover</button>
</article>`;
}

function removeFilmFromLis(id) {
    notie.confirm({
      text: "Deseja Remover O filme Da lista",
       submitText:"SIM",
        cancelText:"NÃO"
        , submitCallback: function removeMovie(){

            movieList = movieList.filter((movie) => movie.imdbID !== id);
            document.getElementById(`movie-card-${id}`).remove();
            updateLocalStorage();

        }
      
    })
}

function updateLocalStorage() {
  localStorage.setItem("moviesList", JSON.stringify(movieList));
  
} // TRATAMENTO PARA SALVAMENTO DE ITEM COM LOCALSTORAGE COM BIBLIOTECA JSON +
// CONVERSAO DE ITEM PARA STRIG

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}
searchButton.addEventListener("click", searcButtonEventClick);
