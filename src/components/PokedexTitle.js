import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PokedexTitle.css';
import PokedexImg from "../pokedex_logo.png";

class PokedexTitle extends Component {

    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div className="pokedex_title">
                <div className="podex_image_wrapper">
                    <img className="pokedex_image" src={PokedexImg} />
                </div>
            </div>
        )
    }
}

// required data property which contain list setup 
PokedexTitle.propTypes = {

};

export default PokedexTitle;