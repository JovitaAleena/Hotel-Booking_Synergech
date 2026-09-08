import React, { useEffect, useState } from "react";
import "./Hero.css";
import heroImage from "../assets/heroImage.png";
import exclusiveOfferCardImg1 from "../assets/exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "../assets/exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "../assets/exclusiveOfferCardImg3.png";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";
import locationIcon from "../assets/locationIcon.svg";
import calenderIcon from "../assets/calenderIcon.svg";
import guestsIcon from "../assets/guestsIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

const heroImages = [
  heroImage,
  exclusiveOfferCardImg1,
  exclusiveOfferCardImg2,
  exclusiveOfferCardImg3,
  roomImg1,
  roomImg2,
  roomImg3,
  roomImg4,
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const showSlide = (slide) => {
    setCurrentSlide((slide + heroImages.length) % heroImages.length);
  };

  return (
    <div
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        key={currentSlide}
        className="hero-background"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
        aria-hidden="true"
      />
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
      <div className="hero-controls" aria-label="Hero image controls">
        <button
          className="hero-arrow"
          type="button"
          onClick={() => showSlide(currentSlide - 1)}
          aria-label="Previous hero image"
        >
          &#8592;
        </button>
        <div className="hero-dots">
          {heroImages.map((image, index) => (
            <button
              key={image}
              className={`hero-dot ${index === currentSlide ? "is-active" : ""}`}
              type="button"
              onClick={() => showSlide(index)}
              aria-label={`Show hero image ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>
        <button
          className="hero-arrow"
          type="button"
          onClick={() => showSlide(currentSlide + 1)}
          aria-label="Next hero image"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Hero;