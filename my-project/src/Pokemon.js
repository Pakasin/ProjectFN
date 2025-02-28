import axios from "axios";
import { useEffect, useState } from "react";

export default function Pokemon(){
    const [pokemonName, setPokemonName] = useState();
    const [pokemonUrl, setPokemonUrl] = useState();

    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon/719').then((response)=>{
            console.log(response.data);
            setPokemonName(response.data.name);
            console.log(pokemonName);
            setPokemonUrl(response.data.sprites.front_default);
            console.log(pokemonUrl);
        })
    })

    return(
        <> 
            <h1> Pokemon </h1>
            <h1> {pokemonName} </h1>
            <h1> {pokemonUrl} </h1>
            <img src= {pokemonUrl} height= "500px" width="500px"/>
        </>
    )
}