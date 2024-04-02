import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import axios from "axios"
import PokemonList from "./components/PokemonList.js"
import PokemonDetail from "./components/PokemonDetail.js"
import PokedexTitle from "./components/PokedexTitle.js"
import { Route, Routes, Navigate} from "react-router-dom";

function App() {

  // get Kanto pokemon data from an API
  const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const [kantoPokemonNumEntries, setKantoPokemonNumEntries] = useState(0);
  const [currentPageOnList, setCurrentPageOnList] = useState(1);
  const [desiredPokemonPerPage, setDesiredPokemonPerPage] = useState(15);
  const [stateCurrentDetailedPokemon, setStateCurrentDetailedPokemon] = useState(1);

  const fetchKantoPokemonData = () => {
    return axios.get(pokemonApiUrl).then((response) => {
      var kantoPokemonData = response.data["results"];
      setKantoPokemonNumEntries(kantoPokemonData.length)
      console.log("New pokemon data: " + kantoPokemonData);
    }); 
  }

  useEffect(() => {
    fetchKantoPokemonData();
  }, []);

  return (
      
      <div className="App">
        <div>
          <PokedexTitle />
        </div>
        <Routes>
          <Route path='/' element={
            <PokemonList
              numberPokemonEntries={kantoPokemonNumEntries}
              currentPage={currentPageOnList}
              pokemonPerPage={desiredPokemonPerPage}
              onChangeListPage={setCurrentPageOnList}
              onPokemonSelected={setStateCurrentDetailedPokemon}
            />
          } />
          <Route path={'pokemon/:id'} element={
            <PokemonDetail />
          } />
        </Routes>
      </div>    
  );
}

export default App;
