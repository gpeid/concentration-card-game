import React, { useState } from 'react';
import "./../css/Card.css";

interface CardProps {
  details: string;
  toggleSelected: boolean;
  matchedCard: boolean;
  selectCardClick: (e: any) => void;
}

const Card: React.FC<CardProps> = ({ details, toggleSelected, matchedCard, selectCardClick }) => {
  return <div onClick={!matchedCard ? selectCardClick : null} className={`card cursor-pointer hover:bg-fuchsia-400 ${toggleSelected ? "selected bg-blue-400" : ""} ${matchedCard && "cursor-not-allowed bg-green-600"}`} > {details.label}</div >;
};

export default Card;