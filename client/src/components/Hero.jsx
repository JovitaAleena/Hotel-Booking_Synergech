import React from "react";
import "./Hero.css";
import heroImage from "../assets/heroImage.png";
import locationIcon from "../assets/locationIcon.svg";
import calenderIcon from "../assets/calenderIcon.svg";
import guestsIcon from "../assets/guestsIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

const Hero = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-label">The Ultimate Hotel Experience</span>
        <h1 className="hero-title">
          Discover Your Perfect<br />Getaway Destination
        </h1>
        <form className="hero-searchbar">
          {/* Destination Dropdown */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={locationIcon} alt="location" height={20} width={20} />
              <label htmlFor="destination">Destination</label>
            </div>
            <select id="destination" className="search-select" defaultValue="">
              <option value="" disabled hidden>Select city</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kochi">Kochi</option>
            </select>
          </div>
          {/* Check in Date */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={calenderIcon} alt="calendar" height={20} width={20} />
              <label htmlFor="checkin">Check in</label>
            </div>
            <input
              id="checkin"
              type="date"
              className="search-input"
              placeholder="dd-mm-yyyy"
            />
          </div>
          {/* Check out Date */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={calenderIcon} alt="calendar" height={20} width={20} />
              <label htmlFor="checkout">Check out</label>
            </div>
            <input
              id="checkout"
              type="date"
              className="search-input"
              placeholder="dd-mm-yyyy"
            />
          </div>
          {/* Guests */}
          <div className="search-field">
            <div className="search-label-row">
              <img src={guestsIcon} alt="guests" height={20} width={20} />
              <label htmlFor="guests">Guests</label>
            </div>
            <input
              id="guests"
              type="number"
              className="search-input"
              min={1}
              placeholder="Number"
            />
          </div>
          {/* Search Button */}
          <button className="search-btn" type="submit">
            <img src={searchIcon} alt="search" height={20} width={20} />
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;