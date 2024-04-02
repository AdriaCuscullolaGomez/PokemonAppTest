import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PokemonEntry.css'


class PokemonEntry extends Component {

    constructor(props) {
        super(props)

        this.pokedexNumber = this.props.pokedexNumber;
        this.pokemonName = this.props.pokemonName;
        this.pokemonImage = this.props.pokemonImage;

    };

    capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    handleButtonClick = () => {
        this.props.onSelectedDetailedPokemon(this.pokedexNumber);
    }

    render() {
        return (
            <div class="pokemon_entry">
                <img className="pokemon_image" src={this.pokemonImage} />
                <div className="pokemon_info">
                    <a href={"pokemon/" +  this.pokedexNumber}>
                        <button className="info_button" onClick={this.handleButtonClick}>
                            #{this.pokedexNumber} {this.capitalizeFirstLetter(this.pokemonName)} 
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}

// required data property which contain list setup 
PokemonEntry.propTypes = {
    pokedexNumber: PropTypes.number.isRequired,
    pokemonName: PropTypes.string.isRequired,
    pokemonImage: PropTypes.string.isRequired,
    onSelectedDetailedPokemon: PropTypes.func
};

export default PokemonEntry;