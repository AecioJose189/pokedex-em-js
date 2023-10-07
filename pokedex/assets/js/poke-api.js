
const PokeAPI = {}

function convertPokeApiDetailToPokemon(PokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = PokeDetail.order
    pokemon.name = PokeDetail.name

    const types = PokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = PokeDetail.sprites.other.dream_world.front_default
    return pokemon
}
PokeAPI.getPokemonDetail = function(pokemon){
    return fetch(pokemon.url)
        .then((response)=>response.json())
        .then(convertPokeApiDetailToPokemon)
}

PokeAPI.getPokemons = function(offset = 0, limit = 20){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
