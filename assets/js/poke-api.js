
const pokeApi = {}

function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
   
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
   
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url) /* Buscando a lista de pokemons no server */
    .then((response) => response.json()) /* A busca nos da um response, estamos convertendo o response para JSON */
    .then((jsonBody) => jsonBody.results) /* O que interessa são os resultados, que é a lista de pokemons */
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) /*A lista de pokemon é mapeada em uma lista de requisições do detalhe dos pokemons */
    .then((detailRequests) => Promise.all(detailRequests)) /* O promise faz esperar que todas as requisições terminem */
    .then((pokemonsDetails) => pokemonsDetails) /* Quando as requisições terminarem vai vir para a lista de detalhes dos pokemons */
}

