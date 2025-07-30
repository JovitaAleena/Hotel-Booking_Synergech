import React from "react";
import "./Experiences.css";
import userIcon from "../assets/userIcon.svg";
import infographicsIcon from "../assets/badgeIcon.svg";

const reviews = [
  {
    name: "Raj Sharma",
    image: userIcon,
    rating: 4,
    text: "With Synergech, I do not just book a hotel, I book an experience. The level of personalization and the ease of booking all combine to create a travel experience that feels effortless and premium."
  },
  {
    name: "Liam Johnson",
    image: userIcon,
    rating: 5,
    text: "Synergech truly redefines hotel booking every recommendation feels handpicked just for me.It is like they understand my travel style better than I do!"
  },
  {
    name: "Sophia Lee",
    image: userIcon,
    rating: 4,
    text: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that Synergech provides. Their curated selection of hotels is unmatched."
  },
  {
    name: "David Kim",
    image: userIcon,
    rating: 5,
    text: "Synergech made my business trip stress-free. The booking process was seamless and the hotel recommendations were spot on. Highly recommended!"
  },
  {
    name: "Priya Sharma",
    image: userIcon,
    rating: 3,
    text: "I loved the attention to detail and the friendly support team. Synergech helped me find the perfect hotel for my family vacation."
  },
  {
    name: "Alex Turner",
    image: userIcon,
    rating: 5,
    text: "Good experience overall. The site is easy to use and the hotel options are great. Will use Synergech again for my next trip."
  },
  {
    name: "Fatima Noor",
    image: userIcon,
    rating: 4,
    text: "Synergech exceeded my expectations! The curated hotels were luxurious and the booking process was quick and simple."
  },
];

const Experiences = () => (
  <div className="experiences-page">
    <div className="hyperspeed-bg">
      {[...Array(40)].map((_, i) => (
        <div key={i} className="hyperspeed-line" style={{ left: `${(i * 2.5) % 100}vw`, animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
    <h2 className="experiences-title">What Our Guests Say</h2>
    <p className="experiences-subtitle">
      Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.
    </p>
    <div className="experiences-reviews">
      {reviews.map((review, idx) => (
        <div className="experiences-card" key={idx}>
          <div className="experiences-card-header">
            <img src={review.image} alt={review.name} className="experiences-avatar" />
            <span className="experiences-name">{review.name}</span>
            <img src={infographicsIcon} alt="infographics" className="experiences-infographics" />
          </div>
          <div className="experiences-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
            ))}
          </div>
          <div className="experiences-text">{review.text}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Experiences;
