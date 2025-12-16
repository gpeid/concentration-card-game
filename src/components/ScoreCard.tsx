import type { CardProperties } from "../types/types";

interface ScoreCardProps {
  matches: CardProperties[][];
}

const ScoreCard: React.FC<ScoreCardProps> = ({ matches }) => {
  const textColorFromSuit = (suitLabel?: string) => {
    if (suitLabel === "Hearts" || suitLabel === "Diamonds") {
      return "text-red-600";
    } else {
      return "bg-black text-white";
    }
  };

  return (
    <div className="score_card p-1 mb-5 border border-black rounded">
      <h2>Matched Pairs: {matches.length}</h2>
      <ul>
        {matches.map((pair) => (
          <li key={`${pair[0].id}-${pair[1].id}`}>
            {pair.map((card, i) => (
              <span
                key={card.id}
                className={textColorFromSuit(card.suit?.label)}
              >
                {card.label}
                {i < pair.length - 1 ? " and " : ""}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreCard;
