import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedDestination.css";
import starIconFilled from "../assets/starIconFilled.svg";
import locationIcon from "../assets/locationIcon.svg";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";

const featuredRooms = [
  {
    id: 1,
    image: roomImg1,
    bestSeller: true,
    name: "Taj Hotels",
    address: "Haji Ali Darag , Mumbai",
    price: 399,
    rating: 4.5,
  },
  {
    id: 2,
    image: roomImg2,
    bestSeller: false,
    name: "Le Royal Meridien",
    address: "Toopumpodi Street, Kochi",
    price: 299,
    rating: 4.5,
  },
  {
    id: 3,
    image: roomImg3,
    bestSeller: true,
    name: "The Westin",
    address: "Rani Laxmi Nagar , Kolkata",
    price: 249,
    rating: 4.5,
  },
  {
    id: 4,
    image: roomImg4,
    bestSeller: false,
    name: "Lemon Tree Hotels",
    address: "Main Road 123 Street , Chennai",
    price: 199,
    rating: 4.5,
  },
];

const FeaturedDestination = () => {
  const navigate = useNavigate();
  return (
    <section className="featured-section">
      <h2 className="featured-title">Featured Destination</h2>
      <p className="featured-desc">
        Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
      </p>
      <div className="featured-cards">
        {featuredRooms.map((room, idx) => (
          <div className="featured-card" key={room.id}>
            <div className="featured-img-wrap">
              <img src={room.image} alt={room.name} className="featured-img" />
              {room.bestSeller && <span className="featured-badge">Best Seller</span>}
            </div>
            <div className="featured-info">
              <div className="featured-row">
                <span className="featured-hotel-name">{room.name}</span>
                <span className="featured-rating">
                  <img src={starIconFilled} alt="star" /> {room.rating}
                </span>
              </div>
              <div className="featured-row featured-address">
                <img src={locationIcon} alt="location" />
                <span>{room.address}</span>
              </div>
              <div className="featured-row featured-bottom">
                <span className="featured-price">${room.price}<span className="featured-night">/night</span></span>
                <button className="featured-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="featured-footer">
        <button className="featured-view-btn" onClick={() => navigate('/hotels')}>View All Destinations</button>
      </div>
    </section>
  );
};

export default FeaturedDestination;
