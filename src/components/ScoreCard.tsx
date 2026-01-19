import { useState } from "react";
import type { CardProperties } from "../types/types";

interface ScoreCardProps {
  matches: CardProperties[][];
}

const ScoreCard: React.FC<ScoreCardProps> = ({ matches }) => {
  const [showMatchHistory, setShowMatchHistory] = useState(false);

  const handleShowMatchHistoryClick = () => {
    setShowMatchHistory(!showMatchHistory);
  };

  const textColorFromSuit = (
    suitLabel?: string
  ): "bg-red-600 text-white" | "bg-black text-white" => {
    if (suitLabel === "Hearts" || suitLabel === "Diamonds") {
      return "bg-red-600 text-white";
    } else {
      return "bg-black text-white";
    }
  };

  return (
    <div className="score_card p-1 mb-5 border border-black rounded ">
      <div className="score_card_header flex justify-between items-center">
        <button
          className={`p-0 m-0${
            matches.length === 0
              ? "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75"
              : ""
          }`}
          disabled={matches.length === 0}
          onClick={handleShowMatchHistoryClick}
        >
          {showMatchHistory ? (
            <>Hide match history &#9650;</>
          ) : (
            <>Show match history &#9660;</>
          )}
        </button>
        <p>Matched Pairs: {matches.length}</p>
      </div>

      {showMatchHistory && (
        <>
          <hr className="m-2" />
          {matches.length === 0 && <p>No matches yet.</p>}

          <ol className="list-decimal list-inside">
            {matches.map((pair) => (
              <li key={`${pair[0].id}-${pair[1].id}`}>
                {pair.map((card, i) => (
                  <>
                    <span
                      key={card.id}
                      className={`p-1 ${textColorFromSuit(card.suit?.label)}`}
                    >
                      {card.label}
                    </span>
                    {i < pair.length - 1 ? " and " : ""}
                  </>
                ))}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default ScoreCard;
