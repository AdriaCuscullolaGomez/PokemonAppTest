import React, { Component } from 'react';
import '../styles/PokemonDetail.css'
import axios from "axios"


class PokemonDetail extends Component {

    constructor(props) {
        super(props)
        
        const queryParameters = window.location.pathname.split("/");
        this.pokemonIndex = queryParameters[2];

        this.pokemonDetails = ({
            number: 0,
            name: "None",
            image: undefined,
            back_image: undefined,
            shiny_image: undefined,
            shiny_back_image: undefined,
            types: []
        });

        this.managePokemonEntryCreation();
    };

    managePokemonEntryCreation = async() => {
        
        var specificPokemonDataApiUrl = "https://pokeapi.co/api/v2/pokemon-form/" + this.pokemonIndex;
        await axios.get(specificPokemonDataApiUrl).then((response) => {
            this.pokemonDetails = ({
                number: response.data["id"],
                name: response.data["name"],
                image: response.data["sprites"]["front_default"],
                back_image: response.data["sprites"]["back_default"],
                shiny_image: response.data["sprites"]["front_shiny"],
                shiny_back_image: response.data["sprites"]["back_shiny"],
                types: response.data["types"]
            });

            // force component update
            this.forceUpdate();
        }); 



    }

    capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    render() {
        return (
            <div className="pokemon_details">
                <div className="pokemon_detail_image_wrapper">
                    {
                        <img className="pokemon_detail_image" src={
                            this.pokemonDetails["image"]
                        }/>
                    }
                </div>
                <div className="pokemon_details_info">
                    <div className="back_to_pokedex_wrapper">
                        <a href="/">
                            <button className="back_to_pokedex" onClick={this.onBackToPokedex}> Back </button>
                        </a>
                    </div>
                    <div className="pokemon_data_wrapper">
                        <p className="pokemon_data" id={"pokemon_"+this.pokemonDetails["number"]} > #{this.pokemonDetails["number"]} {this.capitalizeFirstLetter(this.pokemonDetails["name"])} </p>
                    </div>
                    <div className="pokemon_data_wrapper">
                        {this.pokemonDetails["types"].map((pokemonTypes, indexType) => {
                            return (
                                <p className="pokemon_data"> {this.capitalizeFirstLetter(pokemonTypes.type.name)} </p>
                            );
                        })}
                    </div>
                    <div className='other_pokemon_images'>
                        <div className="pokemon_detail_image_wrapper pokemon_detail_other_image_wrapper">
                            <img className="pokemon_other_image" src={this.pokemonDetails["back_image"]}/>
                        </div>
                        <div className="pokemon_detail_image_wrapper pokemon_detail_other_image_wrapper">
                            <img className="pokemon_other_image" src={this.pokemonDetails["shiny_image"]}/>
                        </div>
                        <div className="pokemon_detail_image_wrapper pokemon_detail_other_image_wrapper">
                            <img className="pokemon_other_image" src={this.pokemonDetails["shiny_back_image"]}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PokemonDetail;