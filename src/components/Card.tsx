import { useState } from "react";
import type { CardProperties } from "../types/types";
import "./../css/Card.css";
import { animated, easings, useSpring } from "@react-spring/web";

interface CardProps {
  details: CardProperties;
  toggleSelected: boolean;
  matchedCard: boolean;
  selectCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({
  details,
  toggleSelected,
  matchedCard,
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
      className={`card cursor-pointer p-1 ${details.suit?.label.toLowerCase()} hover:bg-fuchsia-400 
      ${!toggleSelected && !matchedCard ? "bg-white" : ""}
        ${toggleSelected ? "selected bg-blue-400" : ""} ${
        matchedCard ? "cursor-not-allowed bg-green-600" : ""
      }`}
    >
      <div className="flex flex-col items-start text-center leading-tight">
        <span>
          {details.rank !== "10" ? details.rank?.charAt(0) : details.rank}{" "}
          <br />
          {details.suit?.icon}
        </span>
      </div>
      <div className="text-center scale-200">{details.suit?.icon}</div>
      <div className="flex flex-col items-end text-center leading-tight rotate-x-180">
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
