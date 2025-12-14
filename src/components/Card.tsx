import { useState } from "react";
import type { CardProperties } from "../types/types";
import "./../css/Card.css";
import { animated, easings, useSpring } from "@react-spring/web";

interface CardProps {
  details: CardProperties;
  toggleSelected: boolean;
  matchedCard: boolean;
  pairedCard: boolean;
  selectCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({
  details,
  toggleSelected,
  matchedCard,
  pairedCard,
  selectCardClick,
}) => {
  const [randomNumber] = useState<{
    x: number;
    y: number;
    z: number;
    positiveOrNegative: () => number;
  }>(() => {
    return {
      y: Math.random(),
      x: Math.random(),
      z: Math.random(),
      positiveOrNegative: () => (Math.random() < 0.5 ? -1 : 1),
    };
  });

  const from = {
    x: randomNumber.positiveOrNegative() * Math.floor(randomNumber.x * 1600),
    y: randomNumber.positiveOrNegative() * Math.floor(randomNumber.y * 1600),
    rotation:
      randomNumber.positiveOrNegative() * Math.floor(randomNumber.z * 1080),
    scale: 1.5,
  };

  const to = {
    x: 0,
    rotation: 0,
    scale: 1,
    y: 0,
  };

  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  // const trans = (r: number, s: number) =>
  //   `perspective(1500px) rotateX(30deg) rotateY(${
  //     r / 10
  //   }deg) rotateZ(${r}deg) scale(${s})`;

  const springs = useSpring({
    config: {
      tension: Math.floor(randomNumber.y * 100) + 100,
      friction: 20,
      easing: easings.easeInBack,
    },
    from: from,
    to: to,
  });

  // const [props, api] = useSprings(cards.length, (i) => ({
  //   ...to(i),
  //   from: from(i),
  // }));
  return (
    <animated.div
      style={{
        ...springs,
        // transform: springs.rotation.to((r) => `rotate(${r}deg)`),
        transform: springs.x
          // .to([0, 1], [0, 360]) // Map the range 0-1 to 0-360 degrees
          .to((value) => `rotateZ(${value}deg)`), // Apply the CSS transform
      }}
      onClick={!matchedCard ? selectCardClick : undefined}
      className={`card cursor-pointer p-1 flex flex-col justify-between ${details.suit?.label.toLowerCase()} hover:bg-fuchsia-300 
        ${toggleSelected && pairedCard ? "selected bg-red-300" : ""}
      ${!toggleSelected && !matchedCard ? "bg-white" : ""}
        ${toggleSelected ? "selected bg-blue-300" : ""}
         ${matchedCard ? "cursor-not-allowed bg-green-300" : ""}`}
    >
      <div className="flex flex-col items-start text-center leading-tight">
        <span>
          {details.rank !== "10" ? details.rank?.charAt(0) : details.rank}{" "}
          <br />
          {details.suit?.icon}
        </span>
      </div>
      <div className="text-center text-3xl">{details.suit?.icon}</div>
      <div className="flex flex-col items-start text-center leading-tight rotate-x-180 rotate-y-180">
        <span>
          {details.rank !== "10" ? details.rank?.charAt(0) : details.rank}{" "}
          <br />
          {details.suit?.icon}
        </span>
      </div>
    </animated.div>
  );
};

export default Card;
