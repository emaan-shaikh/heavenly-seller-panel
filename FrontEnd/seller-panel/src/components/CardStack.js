import React, { useState } from "react";
import { motion } from "framer-motion";
import move from "lodash-move";
import "../styles/CardStack.css";

const CARD_DATA = [
  {
    color: "#FF6A43",
    title: "Card 1",
    description: "Description for card 1",
    image: "assets/card1.png", // Replace with actual image URL
  },
  {
    color: "#8D6DD2",
    title: "Card 2",
    description: "Description for card 2",
    image: "assets/card2.png",
  },
  {
    color: "#052085",
    title: "Card 3",
    description: "Description for card 3",
    image: "assets/card3.png",
  },
  {
    color: "#144125",
    title: "Card 4",
    description: "Description for card 4",
    image: "assets/card4.png",
  },
  {
    color: "#00adbc",
    title: "Card 5",
    description: "Description for card 5",
    image: "assets/card5.png",
  },
];

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = useState(CARD_DATA);

  const moveToEnd = (fromIndex) => {
    setCards((prevCards) => move(prevCards, fromIndex, prevCards.length - 1));
  };

  return (
    <div className="card-stack-wrapper">
      <ul className="card-stack">
        {cards.map((card, index) => {
          const isDraggable = index === 0; // Only the top card is draggable

          return (
            <motion.li
              key={card.color}
              className="card"
              style={{
                backgroundColor: card.color,
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
              }}
              drag={isDraggable ? "y" : false} // Only allow the top card to be draggable
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDragEnd={() => moveToEnd(index)} // Move the current card to the end on drag
            >
              <div className="card-content">
                {/* Text Section */}
                <div className="card-text">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-description">{card.description}</p>
                </div>
                {/* Image Section */}
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardStack;
