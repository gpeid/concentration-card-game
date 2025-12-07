import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { generateDeck, shuffleDeck } from './utils';
import DeckContainer from './components/DeckContainer';

function App() {
  const [deck, setDeck] = useState([]);
  // const [selectedPair, setSelectedPair] = useState([]);

  const handleGenerateDeckClick = () => {
    setDeck(generateDeck())
  }

  const handleShuffleDeckClick = () => {
    setDeck(shuffleDeck(deck))
  }

  return (
    <>
      <h1>hello</h1>
      {deck?.length > 0 ? <button type="button" onClick={handleShuffleDeckClick}>Shuffle Deck</button> : <button type="button" onClick={handleGenerateDeckClick}>Generate Deck</button>}
      <div>
        {deck.length > 0 && <DeckContainer key={deck[0].id} deck={deck} />}
      </div>
    </>
  )
}

export default App
