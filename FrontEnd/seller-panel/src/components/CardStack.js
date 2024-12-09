import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import move from "lodash-move";
import "../styles/CardStack.css";

const CARD_DATA = [
  {
    color: "#FF6A43",
    title: "User Registration",
    description: "Once registered, our platform thoroughly assesses each user's profile. This evaluation includes verification",
    
    image: "assets/card1.png", // Replace with actual image URL
  },
  {
    color: "#8D6DD2",
    title: "Profile Assessment",
    description: "Once registered, our platform thoroughly assesses each user's profile. This evaluation includes verification",
    image: "assets/card2.png",
  },
  {
    color: "#052085",
    title: "Property Listing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum, nulla eu tincidunt egestas, turpis dolor finibus nisi, eu tristique sem purus eu felis. Etiam facilisis, mi at facilisis vestibulum, purus ante lacinia est",
    image: "assets/card3.png",
  },
  {
    color: "#144125",
    title: "Marketing and Promotion",
    description: "Nulla ultricies mi at nulla tempus porta. Aenean in aliquet purus, sed scelerisque elit. Donec sed consequat nisi. Integer feugiat blandit aliquam. Morbi velit orci, finibus eget sapien id, sodales luctus ante. ",
    image: "assets/card4.png",
  },
  {
    color: "#00adbc",
    title: "Negotiation and Sales",
    description: "Donec dictum dolor est, sed ultricies felis cursus feugiat. Aliquam consequat aliquet ex sed hendrerit. Donec ut turpis sit amet libero vestibulum dictum.",
    image: "assets/card5.png",
  },
];

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = useState(CARD_DATA);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const cardStackRef = useRef(null); // Ref for card stack wrapper

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Mark visible when in viewport
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the card stack is visible
    );

    if (cardStackRef.current) {
      observer.observe(cardStackRef.current);
    }

    return () => {
      if (cardStackRef.current) {
        observer.unobserve(cardStackRef.current);
      }
    };
  }, []);

  const moveToEnd = (fromIndex) => {
    setCards((prevCards) => move(prevCards, fromIndex, prevCards.length - 1));
  };

  return (
    <div
      ref={cardStackRef}
      className={`card-stack-wrapper ${isVisible ? "visible" : ""}`}
    >
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
