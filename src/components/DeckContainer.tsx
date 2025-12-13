import { useState } from "react";
import Card from "./Card";
import "./../css/DeckContainer.css";
import type { CardProperties } from "../types/types";
import ScoreCard from "./ScoreCard";

interface DeckContainerProps {
  deck: CardProperties[];
}

const DeckContainer: React.FC<DeckContainerProps> = ({ deck }) => {
  // Array of all matched pairs
  const [arrayOfSelectedMatches, setArrayOfSelectedMatches] = useState<
    CardProperties[][]
  >([]);
  // array of selected pairs
  const [pairArray, setPairArray] = useState<CardProperties[]>([]);
  const [deckCopy, setDeckCopy] = useState<CardProperties[]>(deck.slice());

  const handleSelectCardClick = (selectedCard: CardProperties): void => {
    const alreadySelected = pairArray.find(
      (card) => card.id === selectedCard.id
    );
    if (pairArray.length < 2 && !alreadySelected) {
      const matchingCardsFound: CardProperties | undefined = pairArray.find(
        (item) => item.rank === selectedCard.rank
      );
      if (matchingCardsFound) {
        const arrayOfMatchedPairs = [...pairArray, selectedCard];
        setArrayOfSelectedMatches([
          ...arrayOfSelectedMatches,
          arrayOfMatchedPairs,
        ]);

        arrayOfMatchedPairs.forEach((item) => {
          const i = deck.findIndex((card) => card.id === item.id);
          deckCopy.splice(i, 1, {
            id: "",
            suit: { label: "", icon: "" },
            rank: "",
            label: "",
          });
        });
        setDeckCopy(deckCopy);
        setPairArray([]);
      } else {
        setPairArray([...pairArray, selectedCard]);
      }
    } else if (pairArray.length === 2) {
      setPairArray([selectedCard]);
    }
  };

  return (
    <div className="game_container">
      <ScoreCard matches={arrayOfSelectedMatches} />
      <div className="deck_container relative grid grid-cols-12">
        <div className="card_container col-span-12 grid grid-cols-13 gap-2">
          {deck.map((card: CardProperties) => (
            <Card
              selectCardClick={() => handleSelectCardClick(card)}
              key={`${card.suit?.label}-${card.rank}`}
              details={card}
              toggleSelected={!!pairArray.find((item) => item.id === card.id)}
              matchedCard={
                deckCopy.findIndex((cardCopy) => cardCopy.id === card.id) === -1
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckContainer;
