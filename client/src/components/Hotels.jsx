import React, { useState } from "react";
import "./Hotels.css";
import hotel1 from "../assets/exclusiveOfferCardImg1.png";
import hotel2 from "../assets/exclusiveOfferCardImg2.png";
import hotel3 from "../assets/exclusiveOfferCardImg3.png";

const hotelsList = [
  {
    name: "The Orchid Hotel",
    location: "Ashram Road, Ahmedabad",
    image: hotel1,
    stars: 5,
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
    location: "SG Highway, Ahmedabad",
    image: hotel2,
    stars: 4,
    price: 675,
    oldPrice: 900,
    offer: "25% Off!",
    rating: 9.6,
    review: "Excellent",
    reviewCount: 1206,
    lastBooked: "9 hours ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac"],
    coupleFriendly: true,
  },
  {
    name: "Radisson Blu Hotel",
    location: "Electronic City, Ahmedabad",
    image: hotel3,
    stars: 5,
    price: 280,
    oldPrice: 350,
    offer: "20% Off!",
    rating: 7.0,
    review: "Good",
    reviewCount: 420,
    lastBooked: "2 days ago",
    amenities: ["wifi", "pool", "gym", "restaurant", "bar", "parking", "ac", "spa"],
    coupleFriendly: true,
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
          <input className="hotels-search-input" placeholder="Enter City/Hotel" />
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
        <aside className="hotels-filter">
          <div className="filter-section">
            <div className="filter-title">Hotel Name</div>
            <input className="filter-input" placeholder="Search by Hotel Name" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-section">
            <div className="filter-title">Price</div>
            <div className="filter-slider">$125 - $980</div>
          </div>
          <div className="filter-section">
            <div className="filter-title">Property Types</div>
            <div className="filter-checkboxes">
              <label><input type="checkbox" /> Hotel</label>
              <label><input type="checkbox" /> Resort</label>
              <label><input type="checkbox" /> Villa</label>
              <label><input type="checkbox" /> Heritage</label>
              <label><input type="checkbox" /> Motel</label>
              <label><input type="checkbox" /> Guest House</label>
              <label><input type="checkbox" /> Farm House</label>
              <label><input type="checkbox" /> Palace</label>
              <label><input type="checkbox" /> Serviced Apartments</label>
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-title">Star Category</div>
            <div className="filter-checkboxes">
              <label><input type="checkbox" /> 5 Star <span className="star">★★★★★</span></label>
              <label><input type="checkbox" /> 4 Star <span className="star">★★★★</span></label>
              <label><input type="checkbox" /> 3 Star <span className="star">★★★</span></label>
              <label><input type="checkbox" /> 2 Star <span className="star">★★</span></label>
              <label><input type="checkbox" /> 1 Star <span className="star">★</span></label>
            </div>
          </div>
        </aside>
        <section className="hotels-list-section">
          <div className="hotels-list-header">
            <div className="hotels-list-location">Ahmedabad: <b>860 Hotels found</b> <span className="hotels-list-note">Prices inclusive of taxes</span></div>
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
