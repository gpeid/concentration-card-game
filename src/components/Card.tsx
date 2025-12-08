import type { CardProperties } from "../types/types";
import "./../css/Card.css";


interface CardProps {
  details: CardProperties;
  toggleSelected: boolean;
  matchedCard: boolean;
  selectCardClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card: React.FC<CardProps> = ({ details, toggleSelected, matchedCard, selectCardClick }) => {
  return (
    <button
      type='button'
      onClick={!matchedCard ? selectCardClick : undefined}
      className={`card cursor-pointer hover:bg-fuchsia-400 ${toggleSelected ? "selected bg-blue-400" : ""} ${matchedCard && "cursor-not-allowed bg-green-600"}`}
    >
      {details.label}
    </button>
  );
};

export default Card;