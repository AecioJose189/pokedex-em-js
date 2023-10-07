const pokemonList = document.getElementById('pokemonList')

function ConvertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>` ).join('')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name}">
                </div>
            </li>
        `
}

PokeAPI.getPokemons().then((pokemons = []) =>{
    pokemonList.innerHTML += pokemons.map(ConvertPokemonToLi).join('')

})