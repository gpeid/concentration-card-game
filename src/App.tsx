import type { CardProperties } from "./types/types";
import DeckContainer from "./components/DeckContainer";
import { generateDeck, shuffleDeck } from "./utils";
import { useState } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState<CardProperties[]>([]);

  const root = document.querySelector("#root");

  const handleGenerateDeckClick = () => {
    root?.classList.remove("overflow-hidden");
    setDeck(generateDeck());
    setTimeout(() => {
      root?.classList.add("overflow-hidden");
    }, 1500);
  };

  const handleShuffleDeckClick = () => {
    root?.classList.remove("overflow-hidden");
    const newDeck =
      deck.length > 0 ? shuffleDeck(deck) : shuffleDeck(generateDeck());
    setDeck(newDeck);
    setTimeout(() => {
      root?.classList.add("overflow-hidden");
    }, 1500);
  };

  return (
    <>
      <section className="game_header text-center mb-5">
        <h1>Play Match!</h1>
        <button type="button" onClick={handleGenerateDeckClick}>
          Start Easy Game
        </button>
        <button type="button" onClick={handleShuffleDeckClick}>
          Shuffle Deck
        </button>
      </section>

      <section>
        {deck.length > 0 && <DeckContainer key={deck[0].id} deck={deck} />}
      </section>
    </>
  );
}

export default App;
