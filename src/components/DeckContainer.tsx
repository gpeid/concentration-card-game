import React, { useState } from 'react';
import Card from './Card';
import "./../css/DeckContainer.css";

interface DeckContainerProps {
  deck: CardData[];
}

interface CardData {
  id: string;
  suit: string;
  rank: string;
  label: string;
}

const DeckContainer: React.FC<DeckContainerProps> = ({ deck }) => {
  // Array of all matched pairs
  const [arrayOfSelectedMatches, setArrayOfSelectedMatches] = useState([]);
  // array of selected paira
  const [pairArray, setPairArray] = useState([]);
  const [deckCopy, setDeckCopy] = useState(deck.slice())
  console.log('deck', deck)
  console.log(deckCopy)

  const handleSelectCardClick = (selectedCard: CardData): void => {
    const alreadySelected = pairArray.find((card) => card.id === selectedCard.id);
    if (pairArray.length < 2 && !alreadySelected) {
      const matchingCardsFound: object | undefined = pairArray.find(item => item.rank === selectedCard.rank);
      console.log('matching', matchingCardsFound);
      if (matchingCardsFound) {
        const arrayOfMatchedPairs = [...pairArray, selectedCard];
        setArrayOfSelectedMatches([
          ...arrayOfSelectedMatches,
          ...[arrayOfMatchedPairs]
        ]);

        arrayOfMatchedPairs.forEach((item) => {
          const i = deck.findIndex(card => card.id === item.id);
          console.log(i);
          deckCopy.splice(i, 1, {
            id: '',
            suit: '',
            rank: '',
            label: ''
          })
        })
        setDeckCopy(deckCopy);
        setPairArray([])
      } else {
        setPairArray([
          ...pairArray,
          selectedCard
        ])
      }
    } else if (pairArray.length === 2) {
      setPairArray([
        selectedCard
      ])
    }
  }

  return (
    <div className="card_container grid grid-cols-[repeat(12,minmax(0,1fr))_1fr]">
      {deck.map((card: CardData) => (
        <Card selectCardClick={() => handleSelectCardClick(card)} key={`${card.suit}-${card.rank}`} details={card} toggleSelected={pairArray.find(item => item.id === card.id)} matchedCard={deckCopy.findIndex(cardCopy => cardCopy.id === card.id) === -1} />
      ))}
    </div>
  );
};

export default DeckContainer;