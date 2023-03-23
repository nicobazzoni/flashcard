import { useEffect, useState } from 'react'

import './App.css'

type TDeck = {
  title: string;
  _id: string; 
}


function App() {

  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  async function handleDeleteDeck(deckId: string) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE',
   })
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }



 async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
  const response = await fetch('http://localhost:5000/decks', {
     method: 'POST',
     body: JSON.stringify({
        title,
      }), 
      headers: {
        'Content-Type': 'application/json',
      },
     })
     const deck = await response.json()
      setDecks([...decks, deck])
     setTitle(" ")
  }

  useEffect(() => { 
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks')
      const data = await response.json()
      setDecks(data)
    }
    fetchDecks()
  }, [])




  return (
    <div className="App">

<ul className="decks">
  {decks.map((deck: any) => (
    <li key={deck._id}> 
      <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
    
    {deck.title}</li>
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
