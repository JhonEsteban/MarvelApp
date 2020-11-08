import { getHeroes, searchHeroes } from "./marvel-provider.js";

const heroContainer = document.getElementById('content');
const inputSearch = document.getElementById('search');


const createHeroTemplate = (heroe) => {

  const image = `${heroe.thumbnail.path}/portrait_uncanny.${heroe.thumbnail.extension}`;

  const template = `
  <div class="card-hero" id="${heroe.id}">

    <div class="card-name-top">
      <h3>${heroe.name}</h3>
    </div>
    
    <div class="hero-img">
      <img src="${image}" class="img" >
    </div>

  </div>`;

  return template;
}


const renderHeroes = (heroes) => {

  for (let heroe of heroes) {
    heroContainer.innerHTML += createHeroTemplate(heroe);
  }
}



const searchHeroe = async (event) => {

  let key = event.key || event.keyCode;

  if (key === 13 || key === 'Enter' && inputSearch.value.length > 0) {

    const { data: { results } } = await searchHeroes(inputSearch.value);
    drawSearchHeroes(results);

    inputSearch.value = '';
  }
}


const drawSearchHeroes = (heroes) => {

  for (let heroe of heroes) {
    heroContainer.innerHTML = createHeroTemplate(heroe);
  }
}

export const init = async () => {

  const { data: { results } } = await getHeroes();
  renderHeroes(results);

  inputSearch.addEventListener('keyup', searchHeroe);
}