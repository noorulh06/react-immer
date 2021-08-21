import './App.css';
import React, { useReducer, useState } from 'react';
import produce from 'immer';

// library has books => books has author and title => author has name
const initialState = {
  books: [
    {
      id: 1,
      title: 'Algebra',
      author: {
        name: 'Mark D. Mojave'
      }
    }
  ]
};

const reducer = produce((draft, action) => {
  switch(action.type) {
    case 'add_book': 
      draft.books.push(action.payload);
      break;
    case 'update_book':
      let book = draft.books.find(b => b.id === action.payload.id);
      book.title = action.payload.title;
      book.author.name = action.payload.author.name;
      break;
    default: break;
  }
});

function App() {
  const [count, setCount] = useState(2);
  const [library, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <table className='content'>
        <thead><th className='content'>Title</th><th className='content'>Author Name</th></thead>
        <tbody>
          {
            library.books.map(book => {
              return (
                <tr key={book.id}>
                  <td className='content'>
                    <input 
                      value={ book.title } 
                      onChange={e => dispatch({ type: 'update_book', payload: {
                        ...book,
                        title: e.target.value
                      }})}
                    />
                  </td>
                  <td className='content'>
                    <input value={ book.author.name } onChange={e => dispatch({ type: 'update_book', payload: {
                        ...book,
                        author: {
                          name: e.target.value
                        }
                      }})}/>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <br/>
      <button onClick={() => {
        setCount(count + 1);
        dispatch({ type: 'add_book', payload: {
          id: count,
          title: '',
          author: {
            name: ''
          }
        }});
      }}>Add</button>
    </div>
  );
}

export default App;
