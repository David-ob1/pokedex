const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i= 1; i<= 151;i++ ){
    fetch(URL + i)
     .then(Response=> Response.json())
     .then(data => monstrarPokemon(data))
}


function monstrarPokemon(pokemon){

    let tipos = pokemon.types.map(type => 
        `<p class="${type.type.name} tipo">${type.type.name}</p>`)

    tipos = tipos.join("")   
    let pokemonId = pokemon.id.toString();

    if (pokemonId.length === 1){
        pokemonId = "00" + pokemonId
    }else if (pokemonId.length === 2) {
        pokemonId = "0" + pokemonId
    }


    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `<p class="pokemon-id-back">#${pokemon.id}</p>
    <div class="pokemon-imagen">
      <img
        src="${pokemon.sprites.other["official-artwork"].front_default}"
        alt="${pokemon.name}"
      />
    </div>

    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokemon.id}</p>
        <h2 class="pokemon-nombre">${pokemon.name}</h2>
      </div>

      <div class="pokemon-tipos">
       ${tipos}

      </div>

      <div class="pokemon-stats">
        <p class="stat">${pokemon.height}m</p>
        <p class="stat">${pokemon.weight}kg</p>
      </div>
    </div>
    `;
    listaPokemon.append(div)
}

botonesHeader.forEach(boton =>boton.addEventListener("click",event =>{
const botonId =event.currentTarget.id;

listaPokemon.innerHTML =""

for (let i= 1; i<= 151; i++ ){
    fetch(URL + i)
     .then(Response=> Response.json())
     .then(data =>{

        if(botonId === "ver-todos"){
            monstrarPokemon(data)
        }else{
            const tipos = data.types.map(type => type.type.name)
            if(tipos.some(tipo =>tipo.includes(botonId))){
                monstrarPokemon(data)
            }

        }



     })
}   

}))