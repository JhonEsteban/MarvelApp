const publicKey = 'bdaabd1f0b1fc9d1ae88285875f5a3cf';
const hash = '7151488404ea3cebd5fe95b07328db79';
const urlBase = 'https://gateway.marvel.com/v1/public';


const getHeroes = async () => {
  try {

    const marvelUrl = `${urlBase}/characters?ts=1&apikey=${publicKey}&hash=${hash}`;

    const resp = await fetch(marvelUrl);

    if (!resp.ok) {
      throw {
        status: resp.status,
        status: resp.statusText
      }
    }

    return await resp.json();

  } catch (error) {
    showError(error);
  }
}



const searchHeroes = async (query) => {
  try {

    const heroe = encodeURIComponent(query).toLowerCase();

    const marvelUrl = `${urlBase}/characters?name=${heroe}&ts=1&apikey=${publicKey}&hash=${hash}`;

    const resp = await fetch(marvelUrl);

    if (!resp.ok) {
      throw {
        status: resp.status,
        status: resp.statusText
      }
    }

    return await resp.json();

  } catch (error) {
    showError(error);
  }
}


const showError = (error) => {
  let message = error.statusTesst || 'No se puedo realizar la petición :-(';

  content.innerHTML = `
  <h2 class="error-text"> Error: ${error.status} - 
  <span class="error">${message}</span> </h2>`;
}



export {
  getHeroes,
  searchHeroes
}