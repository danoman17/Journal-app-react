import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from './store/slices/pokemon/thunks';

export const PokemonApp = () => {

    useEffect(() => {
        dispatch( getPokemons() );
    }, []);

    // we declare our pokemons' variables we're using in order to call the slices
    const { isLoading, pokemons = [], page } = useSelector(state => state.pokemons);
    const dispatch = useDispatch();


    return (
        <>
            <h1>PokemonApp</h1>
            <hr />

            <span> Loading: { isLoading?'True':'False' } </span>

            <ul>

                {
                    pokemons.map(({name})=>(
                        <li key={name.key}>
                            {name}
                        </li>
                    ))
                }
                
            </ul>

            <button 
                disabled={isLoading?true:false} 
                onClick={ () => { dispatch( getPokemons(page) ) } }
            > 
                Next
            </button>
        </>
    )
}
