import { useState } from 'react';
import { useGetTodosQuery, useGetTodoQuery } from './store/apis/todosApi';


export const TodoApp = () => {


    // we set :todos, after desestructuration on order to rename data variable
    // const { data:todos=[], isLoading } = useGetTodosQuery();

    const [todoId, setTodoId] = useState(1);
    // this one is for only one todo
    const { data:todo, isLoading } = useGetTodoQuery( todoId );

    const nextTodo = () => {
        setTodoId( todoId + 1 );
    }
    const prevTodo = () => {
        if( todoId === 1 ) return;
        setTodoId( todoId - 1 );
    }

    




    return (
        <>
            <h1>Todos - RTK query</h1>
            <hr/>
            <h4>isLoading {isLoading?'True':'False'}</h4>
            
            <pre>
                {JSON.stringify( todo )}
            </pre>

            <button onClick={ prevTodo } >
                Prev Todo
            </button>

            <button onClick={ nextTodo }>
                Next Todo
            </button>


            {/* <ul>
                { 
                    todos.map(todo => (
                        <li key={todo.id}>

                            <strong>
                                {
                                    todo.completed ? 'DONE ' : 'PENDING '
                                }
                            </strong>

                            { todo.title }
                        </li>
                    ))
                }
            </ul> */}


        </>
    )
}
