import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementBy2 } from './store/slices/counter';

import './App.css'

function App() {


    const { counter } = useSelector(state => state.counter);
    const dispatch = useDispatch();



    return (
        <>
            <h1>count is {counter}</h1>
            <div className="card">

                {/* we put the dispatch command here, in our onClick btn */}
                <button onClick={ () => dispatch( decrement() ) }>
                    Decrement
                </button>

                <button onClick={ () => dispatch( increment() ) }>
                    Increment
                </button>

                <button onClick={ () => dispatch( incrementBy2(2) || 0 ) }>
                    Increment By 2
                </button>

            </div>
        </>
    )
}

export default App
