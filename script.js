function setup() {
  let showList = [];
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showList = data;
    })
    .then(() => {
      makePageForEpisodes(showList);
      select(showList);
      selectEpisode();
    });
  search();
}

function makePageForEpisodes(episodeList) {
  document.getElementById(
    "countDisplay"
  ).innerText = `Displaying ${episodeList.length} / ${episodeList.length} episodes`;
  const container = document.getElementById("episodes");
  episodeList.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h1");
    title.className = "title";
    title.innerText = episode.name;
    card.appendChild(title);
    let rate = document.createElement("p");
    rate.innerHTML = `Rating: ${episode.rating.average}`;
    card.appendChild(rate);
    console.log(episodeList);
    let genre = document.createElement("p");
    genre.innerHTML = `Genre(s): ${episode.genres}`;
    card.appendChild(genre);
    console.log(episodeList);
    let status = document.createElement("p");
    status.innerHTML = `Status: ${episode.status}`;
    card.appendChild(status);
    console.log(episodeList);
    let runTime = document.createElement("p");
    runTime.innerHTML = `Runtime: ${episode.runtime}`;
    card.appendChild(runTime);
    console.log(episodeList);
    const image = document.createElement("img");
    image.className = "image";
    image.src = episode.image.medium;
    card.appendChild(image);
    const summary = document.createElement("p");
    summary.className = "summary";
    summary.innerHTML = episode.summary;
    card.appendChild(summary);
    container.appendChild(card);
    
  });
}
function select(shows) {
  let id;
  const select = document.getElementById("showSelect");
  shows.forEach((episode) => {
    const option = document.createElement("option");
    option.innerText = episode.name;
    option.value = episode.id;
    id = episode.id;
    select.appendChild(option);
  });
  select.addEventListener("change", (event) => {
    const selectedEpisode = shows.find(
      (episode) => episode.id == event.target.value
    );
    const container = document.getElementById("episodes");
    container.innerHTML = "";
    makePageForEpisodes([selectedEpisode]);
  });
}
function selectEpisode() {
  let episodeList = [];
  const select = document.getElementById("episodeSelect");
  const selectShow = document.getElementById("showSelect");
  const showId = selectShow.value;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      episodeList = data;
      console.log(data);
      data.forEach((episode) => {
        const option = document.createElement("option");
        option.innerText = episode.name;
        option.value = episode.id;
        select.appendChild(option);
      });
    });
  select.addEventListener("change", (event) => {
    const selectedEpisode = episodeList.find(
      (episode) => episode.id == event.target.value
    );
    const container = document.getElementById("episodes");
    container.innerHTML = "";
    makePageForEpisodes([selectedEpisode]);
  });
}
function search() {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
      const search = document.getElementById("searchInput");
      search.addEventListener("keyup", (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredShows = data.filter((show) => {
          return show.name.toLowerCase().includes(searchValue);
        });
        const container = document.getElementById("episodes");
        container.innerHTML = "";
        makePageForEpisodes(filteredShows);
      });
    });
}

window.onload = setup;














