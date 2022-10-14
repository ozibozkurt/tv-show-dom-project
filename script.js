//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  document
    .getElementById("searchInput")
    .addEventListener("input", searchEpisode);
}

function makePageForEpisodes(episodeList) {
  const container = document.getElementById("episodes");

  episodeList.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "card";
    const title = document.createElement("h1");
    title.className = "title";
    title.innerText = `${episode.name}- ${episode.season}`;
    card.appendChild(title);

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
  const count = document.getElementById("countDisplay");
  count.innerText = `displaying ${episodeList.length}/${
    getAllEpisodes().length
  } episode`;

  select(episodeList);
}
function searchEpisode() {
  const searchInput = document.getElementById("searchInput").value;
  const allEpisodes = getAllEpisodes();
  const filteredEpisode = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      episode.summary.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const container = document.getElementById("episodes");
  container.innerHTML = "";
  makePageForEpisodes(filteredEpisode);
}

function select(episodes) {
  const shows = document.getElementById("selectShow");
  shows.innerHTML = "";
  episodes.forEach((show) => {
    const option = document.createElement("option");
    option.innerText = show.name;
    option.value = show.id;
    shows.appendChild(option);
  });
}

window.onload = setup;
