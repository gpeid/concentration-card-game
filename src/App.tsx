import "./App.css";

import type { CardProperties } from "./types/types";
import DeckContainer from "./components/DeckContainer";
import { generateDeck, shuffleDeck } from "./utils";
import { useState } from "react";

function App() {
  const [deck, setDeck] = useState<CardProperties[]>([]);

  const handleGenerateDeckClick = () => {
    setDeck(generateDeck());
  };

  const handleShuffleDeckClick = () => {
    setDeck(shuffleDeck(deck));
  };

  return (
    <>
      <section className="game_header text-center mb-5">
        <h1>Play Match!</h1>
        {deck?.length > 0 ? (
          <button type="button" onClick={handleShuffleDeckClick}>
            Shuffle Deck
          </button>
        ) : (
          <button type="button" onClick={handleGenerateDeckClick}>
            Generate Deck
          </button>
        )}
      </section>

      <section>
        {deck.length > 0 && <DeckContainer key={deck[0].id} deck={deck} />}
      </section>
    </>
  );
}

export default App;
