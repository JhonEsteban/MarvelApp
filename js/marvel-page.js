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


const searchHeroe = async (event) => {

  let key = event.key || event.keyCode;

  if (key === 13 || key === 'Enter' && inputSearch.value.length > 0) {

    const { data: { results } } = await searchHeroes(inputSearch.value);
    renderHeroes(results);

    inputSearch.value = '';
  }
}


const renderHeroes = (results) => {

  if (results.length > 1) {

    for (let heroe of results) {
      heroContainer.innerHTML += createHeroTemplate(heroe);
    }

  } else if (results.length === 1) {

    for (let heroe of results) {
      heroContainer.innerHTML = createHeroTemplate(heroe);
    }

  } else {
    heroContainer.innerHTML = `
      <div class="error-container">
        <strong class="error-termino">
        No hay héroes con el termino de busqueda:
        <span class="termino">${inputSearch.value}</span>
      </strong>
        <a href="index.html" class="btn-return">Regresar</a>
      </div>`;
  }

}



export const init = async () => {

  const { data: { results } } = await getHeroes();
  renderHeroes(results);

  inputSearch.addEventListener('keyup', searchHeroe);
}