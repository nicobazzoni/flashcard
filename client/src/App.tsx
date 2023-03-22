import { useEffect, useState } from 'react'

import './App.css'

type TDeck = {
  title: string;
  _id: string; 
}


function App() {

    const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')


 async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
   await fetch('http://localhost:5000/decks', {
     method: 'POST',
     body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
     })
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
    <li key={deck._id}>{deck.title}</li>
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
          <button type="submit">Create Deck</button>
</form>
    </div>
  )
}

export default App
