const api_key = "api_key=c1d2f746ec7d37f986eb3f6bd20e27fe";
const base_url = "https://api.themoviedb.org/3";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const row = document.querySelector(".row");
const img_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + "/search/movie?" + api_key;
const form = document.getElementById("form");
const search = document.getElementById("search");
const submit = document.getElementById("submit");

const showmovies = (data) => {
  data.map((cur, index) => {
    const { title, overview, poster_path, vote_average } = cur;
    const htmldata = `<div class="col-12 col-md-6 col-lg-6 col-xl-4">
    <div class="container">
      
     <img src="${img_url + poster_path}" alt="image" />
      <div class="info">
        <h2>${title}</h2>
        <p>
         ${overview}
        </p>

      </div>
    </div>
  </div>`;

    row.insertAdjacentHTML("afterbegin", htmldata);
  });
};

const getmovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showmovies(data.results);
};

getmovies(api_url);

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const searchedItem = search.value;

  if (searchedItem) {
    getmovies(search_url + "&query=" + searchedItem);
  } else {
    getmovies(api_url);
  }
});
