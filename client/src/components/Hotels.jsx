import React, { useState } from "react";
import "./Hotels.css";
import hotel1 from "../assets/exclusiveOfferCardImg1.png";
import hotel2 from "../assets/exclusiveOfferCardImg2.png";
import hotel3 from "../assets/exclusiveOfferCardImg3.png";
import room1 from "../assets/roomImg1.png";
import room2 from "../assets/roomImg2.png";
import room3 from "../assets/roomImg3.png";

const hotelsList = [
  {
    name: "The Orchid Hotel",
    location: "Ashram Road, Chennai",
    image: hotel1,
    stars: 4,
    price: 210,
    oldPrice: 250,
    offer: "16% Off!",
    rating: 8.2,
    review: "Excellent",
    reviewCount: 245,
    lastBooked: "18 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: true,
  },
  {
    name: "Whistling Meadows Resort",
    location: "SG Highway, Mumbai",
    image: hotel2,
    stars: 3,
    price: 675,
    oldPrice: 900,
    offer: "25% Off!",
    rating: 9.6,
    review: "Good",
    reviewCount: 1206,
    lastBooked: "9 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac"],
    coupleFriendly: false,
  },
  {
    name: "Radisson Blu Hotel",
    location: "Electronic City, Kochi",
    image: hotel3,
    stars: 5,
    price: 280,
    oldPrice: 350,
    offer: "20% Off!",
    rating: 7.0,
    review: "Amazing Experience",
    reviewCount: 420,
    lastBooked: "2 days ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: true,
  },
  {
    name: "Lotus Heritage Palace",
    location: "Heritage Road, Chennai",
    image: room1,
    stars: 4,
    price: 350,
    oldPrice: 400,
    offer: "12% Off!",
    rating: 8.8,
    review: "Excellent",
    reviewCount: 320,
    lastBooked: "1 day ago",
    amenities: ["wifi", "pool", "restaurant", "parking", "ac"],
    coupleFriendly: false,
  },
  {
    name: "Sunset Villa",
    location: "Lakeview Road, Kolkata",
    image: room2,
    stars: 2,
    price: 180,
    oldPrice: 220,
    offer: "18% Off!",
    rating: 7.9,
    review: "Not Bad",
    reviewCount: 210,
    lastBooked: "3 hours ago",
    amenities: ["wifi", "pool", "restaurant", "bar", "parking"],
    coupleFriendly: false,
  },
  {
    name: "City Lights Hotel",
    location: "Downtown, Hyderabad",
    image: room3,
    stars: 3,
    price: 120,
    oldPrice: 150,
    offer: "10% Off!",
    rating: 6.5,
    review: "Average",
    reviewCount: 110,
    lastBooked: "5 hours ago",
    amenities: ["wifi", "restaurant", "parking", "ac"],
    coupleFriendly: false,
  },
];

const Hotels = () => {
  const [search, setSearch] = useState("");
  // Filtering and sorting logic can be added here
  return (
    <div className="hotels-page">
      <div className="hotels-navbar">
        <div className="hotels-title">Hotels - List Page</div>
        <div className="hotels-breadcrumb">Home &gt; Hotels &gt; Hotels List Page</div>
        <form className="hotels-searchbar" onSubmit={e => e.preventDefault()}>
          <select className="hotels-search-input" defaultValue="">
            <option value="" disabled hidden>Select City</option>
            <option value="Chennai">Chennai</option>
            <option value="Kochi">Kochi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <input className="hotels-search-input" type="date" placeholder="Check In" />
          <input className="hotels-search-input" type="date" placeholder="Check Out" />
          <select className="hotels-search-input">
            <option>Rooms / People</option>
            <option>1 Room, 1 Person</option>
            <option>1 Room, 2 People</option>
            <option>2 Rooms, 4 People</option>
          </select>
          <button className="hotels-search-btn">Search</button>
        </form>
      </div>
      <div className="hotels-main">
        <section className="hotels-list-section">
          <div className="hotels-list-header">
            <div className="hotels-list-location"> <span className="hotels-list-note">Prices inclusive of taxes</span></div>
            <div className="hotels-list-sort">
              <label>Sort By: </label>
              <select>
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          <div className="hotels-list">
            {hotelsList.map((hotel, idx) => (
              <div className="hotel-card" key={idx}>
                <div className="hotel-card-img">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="hotel-offer">{hotel.offer}</div>
                </div>
                <div className="hotel-card-info">
                  <div className="hotel-card-title-row">
                    <div className="hotel-card-title">{hotel.name}</div>
                    <div className="hotel-card-stars">{'★'.repeat(hotel.stars)}</div>
                  </div>
                  <div className="hotel-card-location">{hotel.location}</div>
                  <div className="hotel-card-amenities">
                    <span title="WiFi">📶</span>
                    <span title="Pool">🏊</span>
                    <span title="Gym">🏋️</span>
                    <span title="Restaurant">🍽️</span>
                    <span title="Bar">🍸</span>
                    <span title="Parking">🅿️</span>
                    <span title="AC">❄️</span>
                    <span title="Spa">💆</span>
                    {hotel.coupleFriendly && <span className="hotel-couple">Couple Friendly</span>}
                  </div>
                  <div className="hotel-card-rating-row">
                    <span className="hotel-rating-badge">{hotel.rating}</span>
                    <span className="hotel-rating-label">{hotel.review}</span>
                    <span className="hotel-rating-count">({hotel.reviewCount} reviews)</span>
                  </div>
                  <div className="hotel-card-lastbooked">Last Booked - {hotel.lastBooked}</div>
                </div>
                <div className="hotel-card-price">
                  <div className="hotel-card-offer">{hotel.offer}</div>
                  <div className="hotel-card-oldprice">${hotel.oldPrice}</div>
                  <div className="hotel-card-newprice">${hotel.price}</div>
                  <div className="hotel-card-pernight">1 Room/Night</div>
                  <button className="hotel-card-bookbtn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hotels;
