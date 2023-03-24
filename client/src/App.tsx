import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';

import './App.css'




function App() {

  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
   
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }



 async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
const deck = await createDeck(title)
setDecks([...decks, deck])
setTitle('')
  }

  useEffect(() => { 
    async function fetchDecks() {
      const newDecks = await getDecks() 
      setDecks(newDecks)
   
      
    }
    fetchDecks()
  }, [])




  return (
    <div className="App">

<ul className="decks">
  {decks.map((deck: any) => (
    <li key={deck._id}> 
      <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
    
    
    <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
    </li>
  ))}
        </ul>

<form onSubmit={handleCreateDeck}>
  <label htmlFor="deck-title">Title</label>
  <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button type="submit">Create Deck </button>
</form>
    </div>
  )
}

export default App
