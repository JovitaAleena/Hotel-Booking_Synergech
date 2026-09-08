import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hotels.css";
import { AuthContext } from "../context/AuthContext.jsx";
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

const getDateOffset = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const getNightCount = (checkIn, checkOut) => {
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.max(1, Math.round((end - start) / 86400000));
};

const getBookingsStorageKey = (email = "") => `userBookings:${email.trim().toLowerCase() || "guest"}`;

const Hotels = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({ city: "", checkIn: "", checkOut: "", roomsPeople: "" });
  const [activeSearch, setActiveSearch] = useState({ city: "", checkIn: "", checkOut: "", roomsPeople: "" });
  const [searchError, setSearchError] = useState("");
  const [sortBy, setSortBy] = useState("Popularity");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    checkIn: getDateOffset(1),
    checkOut: getDateOffset(2),
    guests: 1,
  });
  const [bookingError, setBookingError] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  // Filtering and sorting logic can be added here
  const openBookingModal = (hotel) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedHotel(hotel);
    setBookingConfirmed(false);
    setBookingError("");
    setOtpStep(false);
    setOtpCode("");
    setSentOtp("");
    setOtpError("");
    const guestMatch = activeSearch.roomsPeople.match(/(\d+) People?/);
    setBookingForm({
      checkIn: activeSearch.checkIn || getDateOffset(1),
      checkOut: activeSearch.checkOut || getDateOffset(2),
      guests: guestMatch ? Number(guestMatch[1]) : 1,
    });
  };

  const closeBookingModal = () => {
    setSelectedHotel(null);
    setBookingConfirmed(false);
    setBookingError("");
    setOtpStep(false);
    setOtpCode("");
    setSentOtp("");
    setOtpError("");
  };

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((form) => ({ ...form, [name]: value }));
  };

  const saveBooking = () => {
    const existingBookings = JSON.parse(localStorage.getItem(getBookingsStorageKey(user.email)) || "[]");
    const booking = {
      _id: `booking-${Date.now()}`,
      hotel: selectedHotel.name,
      location: selectedHotel.location,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      guests: Number(bookingForm.guests),
      image: selectedHotel.image,
      rating: 0,
      description: "",
      totalPrice: selectedHotel.price * getNightCount(bookingForm.checkIn, bookingForm.checkOut),
      status: "Confirmed",
      userEmail: user.email,
    };
    localStorage.setItem(getBookingsStorageKey(user.email), JSON.stringify([...existingBookings, booking]));
    const existingReservations = JSON.parse(localStorage.getItem("userReservations") || "[]");
    localStorage.setItem("userReservations", JSON.stringify([
      ...existingReservations,
      {
        hotel: selectedHotel.name,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        status: "Paid",
        guests: Number(bookingForm.guests),
        image: selectedHotel.image,
      },
    ]));
    setBookingConfirmed(true);
  };

  const confirmBooking = async (event) => {
    event.preventDefault();
    if (bookingForm.checkOut <= bookingForm.checkIn) {
      setBookingError("Check-out must be after check-in.");
      return;
    }

    setIsSendingOtp(true);
    setBookingError("");
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.otp) {
        throw new Error(data.message || "Unable to send OTP.");
      }
      setSentOtp(String(data.otp));
      setOtpStep(true);
    } catch (error) {
      setBookingError(error.message || "Unable to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyBookingOtp = (event) => {
    event.preventDefault();
    if (otpCode.trim() !== sentOtp) {
      setOtpError("That OTP is not correct. Please check your email and try again.");
      return;
    }
    setOtpError("");
    saveBooking();
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((criteria) => ({ ...criteria, [name]: value }));
  };

  const handleHotelSearch = (event) => {
    event.preventDefault();
    if (searchCriteria.checkIn && searchCriteria.checkOut && searchCriteria.checkOut <= searchCriteria.checkIn) {
      setSearchError("Check-out must be after check-in.");
      return;
    }
    setSearchError("");
    setActiveSearch(searchCriteria);
  };

  const matchingHotels = hotelsList.filter((hotel) => (
    !activeSearch.city || hotel.location.toLowerCase().includes(activeSearch.city.toLowerCase())
  ));

  const sortedHotels = [...matchingHotels].sort((firstHotel, secondHotel) => {
    if (sortBy === "Price: Low to High") return firstHotel.price - secondHotel.price;
    if (sortBy === "Price: High to Low") return secondHotel.price - firstHotel.price;
    if (sortBy === "Rating") return secondHotel.rating - firstHotel.rating;
    return secondHotel.reviewCount - firstHotel.reviewCount;
  });
  const bookingNights = selectedHotel ? getNightCount(bookingForm.checkIn, bookingForm.checkOut) : 0;
  const bookingTotal = selectedHotel ? selectedHotel.price * bookingNights : 0;

  return (
    <div className="hotels-page">
      <div className="hotels-navbar">
        <div className="hotels-title">Hotels - List Page</div>
        <div className="hotels-breadcrumb">Home &gt; Hotels &gt; Hotels List Page</div>
        <form className="hotels-searchbar" onSubmit={handleHotelSearch}>
          <select className="hotels-search-input" name="city" value={searchCriteria.city} onChange={handleSearchChange}>
            <option value="" disabled hidden>Select City</option>
            <option value="Chennai">Chennai</option>
            <option value="Kochi">Kochi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <input className="hotels-search-input" name="checkIn" type="date" value={searchCriteria.checkIn} min={getDateOffset(0)} onChange={handleSearchChange} />
          <input className="hotels-search-input" name="checkOut" type="date" value={searchCriteria.checkOut} min={searchCriteria.checkIn || getDateOffset(0)} onChange={handleSearchChange} />
          <select className="hotels-search-input" name="roomsPeople" value={searchCriteria.roomsPeople} onChange={handleSearchChange}>
            <option value="">Rooms / People</option>
            <option>1 Room, 1 Person</option>
            <option>1 Room, 2 People</option>
            <option>2 Rooms, 4 People</option>
          </select>
          <button className="hotels-search-btn" type="submit">Search</button>
          {searchError && <p className="hotels-search-error">{searchError}</p>}
        </form>
      </div>
      <div className="hotels-main">
        <section className="hotels-list-section">
          <div className="hotels-list-header">
            <div className="hotels-list-location"><span className="hotels-list-note">{activeSearch.city ? `${sortedHotels.length} stays in ${activeSearch.city}` : "Prices inclusive of taxes"}</span></div>
            <div className="hotels-list-sort">
              <label>Sort By: </label>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="Popularity">Popularity</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating">Rating</option>
              </select>
            </div>
          </div>
          <div className="hotels-list">
            {sortedHotels.length === 0 && <div className="hotels-empty-state">No hotels found for this city. Try another destination.</div>}
            {sortedHotels.map((hotel) => (
              <div className="hotel-card" key={hotel.name}>
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
                  <button className="hotel-card-bookbtn" onClick={() => openBookingModal(hotel)}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {selectedHotel && (
        <div className="booking-modal-backdrop" role="presentation" onClick={closeBookingModal}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}>
            <button className="booking-modal-close" type="button" onClick={closeBookingModal} aria-label="Close booking dialog">&times;</button>
            {bookingConfirmed ? (
              <div className="booking-confirmation">
                <div className="booking-confirmation-icon">&#10003;</div>
                <p className="booking-modal-eyebrow">Booking confirmed</p>
                <h2 id="booking-title">You are all set!</h2>
                <p>Your stay at <strong>{selectedHotel.name}</strong> has been booked successfully.</p>
                <div className="booking-confirmation-summary"><span>{bookingForm.checkIn} to {bookingForm.checkOut}</span><span>{bookingNights} night{bookingNights === 1 ? "" : "s"}</span><span>{bookingForm.guests} guest{Number(bookingForm.guests) === 1 ? "" : "s"}</span></div>
                <div className="booking-confirmation-total"><span>Total amount</span><strong>${bookingTotal}</strong></div>
                <button className="booking-confirm-btn" type="button" onClick={closeBookingModal}>Done</button>
              </div>
            ) : otpStep ? (
              <>
                <p className="booking-modal-eyebrow">Verify your email</p>
                <h2 id="booking-title">Enter your OTP</h2>
                <p className="booking-modal-subtitle">We sent a 6-digit code to <strong>{user.email}</strong>.</p>
                <form className="booking-form booking-otp-form" onSubmit={verifyBookingOtp}>
                  <label className="booking-guests-field">One-time password<input name="otp" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" value={otpCode} onChange={(event) => { setOtpCode(event.target.value.replace(/\D/g, "")); setOtpError(""); }} placeholder="Enter 6-digit OTP" required /></label>
                  {otpError && <p className="booking-form-error">{otpError}</p>}
                  <button className="booking-confirm-btn" type="submit">Verify &amp; confirm booking</button>
                </form>
              </>
            ) : (
              <>
                <p className="booking-modal-eyebrow">Reserve your stay</p>
                <h2 id="booking-title">Book {selectedHotel.name}</h2>
                <p className="booking-modal-subtitle">{selectedHotel.location} &middot; ${selectedHotel.price} per night</p>
                <form className="booking-form" onSubmit={confirmBooking}>
                  <label>Check in<input name="checkIn" type="date" value={bookingForm.checkIn} min={getDateOffset(0)} onChange={handleBookingChange} required /></label>
                  <label>Check out<input name="checkOut" type="date" value={bookingForm.checkOut} min={bookingForm.checkIn} onChange={handleBookingChange} required /></label>
                  <label className="booking-guests-field">Guests<input name="guests" type="number" min="1" max="12" value={bookingForm.guests} onChange={handleBookingChange} required /></label>
                  {bookingError && <p className="booking-form-error">{bookingError}</p>}
                  <button className="booking-confirm-btn" type="submit" disabled={isSendingOtp}>{isSendingOtp ? "Sending OTP..." : "Send OTP & confirm"}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
