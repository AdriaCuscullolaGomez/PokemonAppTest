import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios"
import PokemonEntry from "./PokemonEntry.js"
import '../styles/PokemonList.css'

class PokemonList extends Component {

    constructor(props) {

        super(props)

        this.currentPage = this.props.currentPage;

        // calculate number of pages in the list based on the number of pokemons and page entries limit
        this.numberPages = Math.ceil(this.props.numberPokemonEntries / this.props.pokemonPerPage);
        this.updateIndexPokemonOnPage();

        // pokemon to show on the current page
        this.pokemonToShowOnPage = [];

        // current view state
        this.changeView = "pokemon_entries_grid_view";
    };
 
    // handle page movement
    moveNextPage = () => {
        this.currentPage = this.currentPage !== this.numberPages ? this.currentPage + 1 : this.currentPage;
        this.props.onChangeListPage(this.currentPage);
        this.updateIndexPokemonOnPage();
    };
    
    movePreviousPage = () => {
        this.currentPage = this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
        this.props.onChangeListPage(this.currentPage);
        this.updateIndexPokemonOnPage();
    };

    updateIndexPokemonOnPage = () => {
        this.indexLastPokemonOnPage = this.currentPage * this.props.pokemonPerPage;
        this.indexFirstPokemonOnPage = this.indexLastPokemonOnPage - (this.props.pokemonPerPage - 1);
        this.managePokemonEntryCreation();
    }

    managePokemonEntryCreation = async() => {
        
        this.pokemonToShowOnPage = [];
        console.log("Hola: " + toString(this.indexFirstPokemonOnPage) + "and " + toString(this.indexLastPokemonOnPage));
        for(var it = this.indexFirstPokemonOnPage; it <= this.indexLastPokemonOnPage; it++) {
            var specificPokemonDataApiUrl = "https://pokeapi.co/api/v2/pokemon-form/" + it;
            await axios.get(specificPokemonDataApiUrl).then((response) => {
                this.pokemonToShowOnPage.push({
                    number: response.data["id"],
                    name: response.data["name"],
                    image: response.data["sprites"]["front_default"]
                });

                // force component update
                this.forceUpdate();
            }); 
        }
    }

    onChangeView = () => {
        console.log("Current view: " + this.changeView);
        this.changeView = this.changeView == "pokemon_entries_grid_view" ? "pokemon_entries_list_view" : "pokemon_entries_grid_view";
        // force component update
        this.forceUpdate();
    }

    render() {
        return (
            <div className="pagination_wrapper">
                <div className="pagination-change-view">
                    <button className="action-button" onClick={this.onChangeView}> Change view </button>
                </div>
                <div className={this.changeView}>
                    {this.pokemonToShowOnPage.map((pokemonToShow, index) => {
                        return (
                            <PokemonEntry
                                pokedexNumber={pokemonToShow.number}
                                pokemonName={pokemonToShow.name }
                                pokemonImage={pokemonToShow.image}
                                onSelectedDetailedPokemon={this.props.onPokemonSelected}
                            />
                        );
                    })}
                </div>
                <div className="pagination-list">
                    <div className="pagination-buttons-list">
                        <div className="pagination-previous-button">
                            <button className='previous-button pagination_text action-button' onClick={this.movePreviousPage}>
                                Previous
                            </button>
                        </div>
                        <div className="pagination-current-page pagination_text">
                            {this.props.currentPage}
                        </div>
                        <div className="pagination-next-button">
                            <button className="next-button pagination_text action-button" onClick={this.moveNextPage}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// required data property which contain list setup 
PokemonList.propTypes = {
    numberPokemonEntries: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pokemonPerPage: PropTypes.number,
    onChangeListPage: PropTypes.func,
    onPokemonSelected : PropTypes.func
};

export default PokemonList;