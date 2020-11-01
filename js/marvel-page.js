import { getHeroes } from "./marvel-provider.js";

const heroContainer = document.getElementById('content');


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






export const init = async () => {

  const { data: { results } } = await getHeroes();
  renderHeroes(results);

  console.log(results);
}