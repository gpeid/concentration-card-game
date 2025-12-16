import type { CardProperties } from "./types/types";
import DeckContainer from "./components/DeckContainer";
import { generateDeck, shuffleDeck } from "./utils";
import { useState } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState<CardProperties[]>([]);

  const root = document.querySelector("#root");

  const handleGenerateDeckClick = () => {
    setDeck(generateDeck());
    setTimeout(() => {
      root?.classList.add("overflow-hidden");
    }, 1000);
  };

  const handleShuffleDeckClick = () => {
    root?.classList.remove("overflow-hidden");

    setDeck(shuffleDeck(deck));
    setTimeout(() => {
      root?.classList.add("overflow-hidden");
    }, 1000);
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
