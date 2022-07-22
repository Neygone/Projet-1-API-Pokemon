import Pokemon from './classes/Pokemon.js';
import Types from './classes/Types.js';

const div = document.querySelector('#target');
const select = document.querySelector('#select');
const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const pkm_sprite = document.querySelector('#pkm-sprite');
const visible_sprite = document.querySelector('#visible-sprite');
const container = document.querySelector('#container');
const validate_btn = document.querySelector('#validate-btn');
const pkm_identity = document.querySelector('#pkm-identity');
const pkm_identity_container = document.querySelector('#pkm-identity-container');
const score_container = document.querySelector('#score-container');
let pkm_number;
let index;
let score = 0;

// Récupère tous les Pokémon.
fetch('https://pokeapi.co/api/v2/pokemon?limit=890')
  .then(response => response.json())
  .then(data => {
      const results = data.results;
      let items = [];
      
      for(let pokemon of results)
      
      {
        items.push(pokemon.name);
      }
    
      results.forEach((pokemon) => {
      
        // Ajouter le nom des Pokémon dans le select.
        const option = document.createElement('option');
        option.innerText = pokemon.name;
        select.appendChild(option);
    });
    
    // Récupération du Pokémon aléatoire.
    btn.addEventListener('click', randomize);
    
    function randomize()
    {
      pkm_sprite.classList.add('display');
      pkm_number = Math.floor(Math.random() * (890 - 1) + 1);
      pkm_sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkm_number}.png`;

      btn.classList.add('hidden');
      validate_btn.classList.add('display');
      validate_btn.addEventListener('click', validate);
    }
    
    function validate()
    {
      index = items[pkm_number - 1];
      
      if(select.value == index || input.value === index)
      {
        score++;
        pkm_identity_container.style.border = "solid 5px lime";
      }
      
      else
      {
        score = 0;
        pkm_identity_container.style.border = "solid 5px red";
      }
      
      let infos;
      let relations;
      
      let pokemon;
      let type;
      
      let resistance_array = [];
      let weakness_array = [];
      
      // Récupère toutes les informations du Pokémon aléatoire.
      fetch(`https://pokeapi.co/api/v2/pokemon/${pkm_number}`)
        .then(type => type.json())
        .then(data_types => {
          
          infos = data_types;
        
          pokemon = new Pokemon(index, infos.height, infos.weight, infos.types[0].type.name);
        
          // Récupère les faiblesses et les résistances du type du Pokémon.
          fetch(`https://pokeapi.co/api/v2/type/${infos.types[0].type.name}`)
            .then(relation => relation.json())
            .then(data_relations => {
            
              relations = data_relations;
              
              for(let weak of relations.damage_relations.double_damage_from)
              {
                weakness_array.push(weak.name);
              }
              
              for(let res of relations.damage_relations.double_damage_to)
              {
                resistance_array.push(res.name);
              }
              
              type = new Types(resistance_array, weakness_array);
              pkm_identity.innerHTML = `${pokemon.identity()} ${type.relations()}`;
              visible_sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${infos.id}.png`;
            });
      });
      
      input.value = "";
      randomize();
      score_container.innerHTML = score;
    }
  })
  .catch(err => {
    console.error(`Erreur lors de la génération des Pokémon : ${err}`);
  })