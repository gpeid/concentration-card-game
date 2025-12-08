import "./App.css";

import type { CardProperties } from './types/types';
import DeckContainer from './components/DeckContainer';
import { generateDeck, shuffleDeck } from './utils';
import { useState } from 'react'

function App() {
  const [deck, setDeck] = useState<CardProperties[]>([]);

  const handleGenerateDeckClick = () => {
    setDeck(generateDeck());
  }

  const handleShuffleDeckClick = () => {
    setDeck(shuffleDeck(deck));
  }

  return (
    <>
      <h1>hello</h1>
      {deck?.length > 0 ? (
        <button type="button" onClick={handleShuffleDeckClick}>
          Shuffle Deck
        </button>
      ) : (
        <button type="button" onClick={handleGenerateDeckClick}>
          Generate Deck
        </button>
      )}
      <div>
        {deck.length > 0 && <DeckContainer key={deck[0].id} deck={deck} />}
      </div>
    </>
  );
}

export default App
