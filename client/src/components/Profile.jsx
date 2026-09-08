import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import userIcon from "../assets/userIcon.svg";
import { hotelImages } from "../assets/hotelImages";

const tabs = [
  { label: "Reservation", key: "reservation" },
  { label: "Bookings", key: "bookings" },
  { label: "Admin Dashboard", key: "admin", route: "/admin-dashboard" },
  { label: "Profile", key: "profile" },
];

const createDefaultProfileDetails = (email = "") => ({
  firstName: "",
  middleName: "",
  lastName: "",
  nickname: "",
  suffix: "",
  birthday: "",
  gender: "Female",
  mobile: "",
  phoneType: "Mobile",
  email,
  reminders: true,
});

const getBookingsStorageKey = (email = "") => `userBookings:${email.trim().toLowerCase() || "guest"}`;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("reservation");
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const getProfileStorageKey = (email = user?.email) => `profileDetails:${email?.trim().toLowerCase() || "guest"}`;
  const [profileDetails, setProfileDetails] = useState(() => {
    const stored = localStorage.getItem(`profileDetails:${user?.email?.trim().toLowerCase() || "guest"}`);
    return stored ? JSON.parse(stored) : createDefaultProfileDetails(user?.email || "");
  });
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    if (tab.route) navigate(tab.route);
  };

  const handleProfileChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProfileDetails((details) => ({
      ...details,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfileSave = () => {
    localStorage.setItem(getProfileStorageKey(), JSON.stringify(profileDetails));
    setIsProfileEditing(false);
  };

  const handleProfileCancel = () => {
    const stored = localStorage.getItem(getProfileStorageKey());
    if (stored) setProfileDetails(JSON.parse(stored));
    setIsProfileEditing(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem(getProfileStorageKey());
    if (stored) {
      setProfileDetails(JSON.parse(stored));
    } else {
      setProfileDetails(createDefaultProfileDetails(user?.email || ""));
    }
  }, [user?.email]);


// Reservation data state for CRUD
const initialReservations = [
  {
    hotel: "Urbanza Suites",
    checkIn: "2025-07-25",
    checkOut: "2025-07-28",
    status: "Paid",
    guests: 2,
  },
  {
    hotel: "Grand Palace",
    checkIn: "2025-08-01",
    checkOut: "2025-08-05",
    status: "Cart",
    guests: 4,
  },
  {
    hotel: "Lakeview Resort",
    checkIn: "2025-08-10",
    checkOut: "2025-08-12",
    status: "Canceled",
    guests: 3,
  },
];

const [reservations, setReservations] = useState(() => {
  const storedReservations = localStorage.getItem("userReservations");
  return storedReservations
    ? [...initialReservations, ...JSON.parse(storedReservations)]
    : initialReservations;
});
const [editIdx, setEditIdx] = useState(null);
const [editData, setEditData] = useState({});
const [showCreate, setShowCreate] = useState(false);
const [createData, setCreateData] = useState({
  hotel: "Urbanza Suites",
  checkIn: "",
  checkOut: "",
  status: "Paid",
  guests: 1,
});


// Bookings data and rating/description state
const initialBookings = [
  {
    hotel: "Urbanza Suites",
    location: "Delhi",
    checkIn: "2025-06-10",
    checkOut: "2025-06-12",
    guests: 2,
    image: hotelImages["Urbanza Suites"],
    rating: 0,
    description: ""
  },
  {
    hotel: "Grand Palace",
    location: "Mumbai",
    checkIn: "2025-05-15",
    checkOut: "2025-05-18",
    guests: 3,
    image: hotelImages["Grand Palace"],
    rating: 0,
    description: ""
  },
  {
    hotel: "Lakeview Resort",
    location: "Bangalore",
    checkIn: "2025-04-20",
    checkOut: "2025-04-22",
    guests: 1,
    image: hotelImages["Lakeview Resort"],
    rating: 0,
    description: ""
  },
];
const [bookings, setBookings] = useState(() => {
  const stored = localStorage.getItem(getBookingsStorageKey(user?.email || ""));
  return stored ? JSON.parse(stored) : initialBookings;
});
const [editBookingIdx, setEditBookingIdx] = useState(null);
const [editBookingData, setEditBookingData] = useState({ rating: 0, description: "" });

const handleBookingEdit = (idx) => {
  setEditBookingIdx(idx);
  setEditBookingData({
    rating: bookings[idx].rating,
    description: bookings[idx].description || ""
  });
};
const handleBookingRating = (value) => {
  setEditBookingData(data => ({ ...data, rating: value }));
};
const handleBookingDescChange = (e) => {
  setEditBookingData(data => ({ ...data, description: e.target.value }));
};
const handleBookingSave = (idx) => {
  setBookings(bookings => {
    const updated = bookings.map((b, i) => i === idx ? { ...b, ...editBookingData } : b);
    localStorage.setItem(getBookingsStorageKey(user?.email || ""), JSON.stringify(updated));
    return updated;
  });
  setEditBookingIdx(null);
};
// Persist bookings to localStorage on change
useEffect(() => {
  localStorage.setItem(getBookingsStorageKey(user?.email || ""), JSON.stringify(bookings));
}, [bookings, user?.email]);

useEffect(() => {
  const stored = localStorage.getItem(getBookingsStorageKey(user?.email || ""));
  setBookings(stored ? JSON.parse(stored) : initialBookings);
}, [user?.email]);
const handleBookingCancel = () => {
  setEditBookingIdx(null);
};

// CRUD handlers
const handleDelete = (idx) => {
  setReservations(reservations => {
    const updatedReservations = reservations.filter((_, i) => i !== idx);
    localStorage.setItem("userReservations", JSON.stringify(updatedReservations.slice(initialReservations.length)));
    return updatedReservations;
  });
};
const handleEdit = (idx) => {
  setEditIdx(idx);
  setEditData(reservations[idx]);
};
const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditData(data => ({ ...data, [name]: value }));
};
const handleEditSave = (idx) => {
  setReservations(reservations => {
    const updatedReservations = reservations.map((r, i) => i === idx ? editData : r);
    localStorage.setItem("userReservations", JSON.stringify(updatedReservations.slice(initialReservations.length)));
    return updatedReservations;
  });
  setEditIdx(null);
};
const handleEditCancel = () => {
  setEditIdx(null);
};
// Create handlers
const handleCreateChange = (e) => {
  const { name, value } = e.target;
  setCreateData(data => ({ ...data, [name]: value }));
};
const handleCreateSave = () => {
  setReservations(reservations => {
    const updatedReservations = [...reservations, createData];
    localStorage.setItem("userReservations", JSON.stringify(updatedReservations.slice(initialReservations.length)));
    return updatedReservations;
  });
  setShowCreate(false);
  setCreateData({ hotel: "Urbanza Suites", checkIn: "", checkOut: "", status: "Paid", guests: 1 });
};
const handleCreateCancel = () => {
  setShowCreate(false);
  setCreateData({ hotel: "Urbanza Suites", checkIn: "", checkOut: "", status: "Paid", guests: 1 });
};

return (
    <div className="profile-layout">
        <aside className="profile-sidebar">
            <div className="profile-user">
                <div className="profile-avatar-border">
                  <img src={userIcon} alt="user" className="profile-avatar" />
                </div>
                <div className="profile-username">{user?.name || user?.email || "User"}</div>
                <div className="profile-role"></div>
            </div>
            <nav className="profile-nav">
                {tabs.map((tab) => (
                    <div
                        key={tab.key}
                        className={`profile-tab${activeTab === tab.key ? " active" : ""}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.label}
                    </div>
                ))}
            </nav>
            <div className="profile-sidebar-footer">
                <div className="profile-create-teams">
                    <div className="profile-create-icon" aria-label="Create Teams" role="img">👤</div>
                    <div>
                        <div className="profile-create-title">Synergech</div>
                        <div className="profile-create-desc">Your Stay, Just a Click Away!</div>
                    </div>
                </div>
            </div>
        </aside>
      <main className="profile-main">
        {/* Content for each tab can be rendered here */}
        {activeTab === "reservation" && (
          <div className="crud-table-container">
            <div className="crud-table-header-row">
              <h3>Reservations</h3>
              <button className="crud-create-btn" onClick={() => setShowCreate(true)}>+ Create</button>
            </div>
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Guests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {showCreate && (
                  <tr>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={hotelImages[createData.hotel]} alt={createData.hotel} className="hotel-thumb" />
                      <select name="hotel" value={createData.hotel} onChange={handleCreateChange} className="crud-input">
                        <option value="Urbanza Suites">Urbanza Suites</option>
                        <option value="Grand Palace">Grand Palace</option>
                        <option value="Lakeview Resort">Lakeview Resort</option>
                      </select>
                    </td>
                    <td><input name="checkIn" type="date" value={createData.checkIn} onChange={handleCreateChange} className="crud-input" /></td>
                    <td><input name="checkOut" type="date" value={createData.checkOut} onChange={handleCreateChange} className="crud-input" /></td>
                    <td>
                      <select name="status" value={createData.status} onChange={handleCreateChange} className="crud-input">
                        <option value="Paid">Paid</option>
                        <option value="Cart">Cart</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </td>
                    <td><input name="guests" type="number" min="1" value={createData.guests} onChange={handleCreateChange} className="crud-input" /></td>
                    <td>
                      <button className="crud-action-btn crud-edit" onClick={handleCreateSave} title="Save">💾</button>
                      <button className="crud-action-btn crud-delete" onClick={handleCreateCancel} title="Cancel">✖️</button>
                    </td>
                  </tr>
                )}
                {reservations.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={row.image || hotelImages[row.hotel]} alt={row.hotel} className="hotel-thumb" />
                      {row.hotel}
                    </td>
                    {editIdx === idx ? (
                      <>
                        <td><input name="checkIn" value={editData.checkIn} onChange={handleEditChange} className="crud-input" /></td>
                        <td><input name="checkOut" value={editData.checkOut} onChange={handleEditChange} className="crud-input" /></td>
                        <td>
                          <select name="status" value={editData.status} onChange={handleEditChange} className="crud-input">
                            <option value="Paid">Paid</option>
                            <option value="Cart">Cart</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </td>
                        <td><input name="guests" type="number" min="1" value={editData.guests} onChange={handleEditChange} className="crud-input" /></td>
                        <td>
                          <button className="crud-action-btn crud-edit" onClick={() => handleEditSave(idx)} title="Save">💾</button>
                          <button className="crud-action-btn crud-delete" onClick={handleEditCancel} title="Cancel">✖️</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{row.checkIn}</td>
                        <td>{row.checkOut}</td>
                        <td><span className={`crud-status ${row.status.toLowerCase()}`}>{row.status}</span></td>
                        <td>{row.guests}</td>
                        <td>
                          <button className="crud-action-btn crud-edit" onClick={() => handleEdit(idx)} title="Edit">✏️</button>
                          <button className="crud-action-btn crud-delete" onClick={() => handleDelete(idx)} title="Delete">🗑️</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crud-table-footer">{reservations.length} items</div>
          </div>
        )}
        {activeTab === "bookings" && (
          <div className="crud-table-container">
            <div className="crud-table-header-row">
              <h3>Past Bookings</h3>
            </div>
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Location</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guests</th>
                  <th>Rating</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => (
                  <tr key={idx}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <img src={booking.image} alt={booking.hotel} className="hotel-thumb" />
                      {booking.hotel}
                    </td>
                    <td>{booking.location}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.guests}</td>
                    <td>
                      {editBookingIdx === idx ? (
                        <div className="rating-stars">
                          {[1,2,3,4,5].map(star => (
                            <span
                              key={star}
                              className={star <= editBookingData.rating ? "star filled" : "star"}
                              onClick={() => handleBookingRating(star)}
                              style={{ cursor: 'pointer' }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="rating-stars">
                          {[1,2,3,4,5].map(star => (
                            <span
                              key={star}
                              className={star <= booking.rating ? "star filled" : "star"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={{ minWidth: 180 }}>
                      {editBookingIdx === idx ? (
                        <input
                          className="crud-input"
                          name="description"
                          value={editBookingData.description}
                          onChange={handleBookingDescChange}
                          placeholder="Describe your experience..."
                        />
                      ) : (
                        <span>{booking.description || <span style={{ color: '#bdbdbd' }}>No description</span>}</span>
                      )}
                    </td>
                    <td>
                      {editBookingIdx === idx ? (
                        <>
                          <button className="crud-action-btn crud-edit" onClick={() => handleBookingSave(idx)} title="Save">💾</button>
                          <button className="crud-action-btn crud-delete" onClick={handleBookingCancel} title="Cancel">✖️</button>
                        </>
                      ) : (
                        <button className="crud-action-btn crud-edit" onClick={() => handleBookingEdit(idx)} title="Edit">✏️</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crud-table-footer">{bookings.length} items</div>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="client-profile-workspace">
            <section className="client-profile-header">
              <div className="client-profile-identity">
                <div className="client-profile-avatar"><img src={userIcon} alt="Profile" /></div>
                <div>
                  <h2>{profileDetails.firstName || user?.name || "Your profile"} {profileDetails.lastName}</h2>
                  <p>{profileDetails.email || user?.email || "Add your email address"}</p>
                  <span className="client-profile-badge">PERSONAL ACCOUNT</span>
                </div>
              </div>
              {!isProfileEditing ? (
                <button className="profile-edit-btn" type="button" onClick={() => setIsProfileEditing(true)}>Edit profile</button>
              ) : (
                <div className="profile-header-actions">
                  <button className="profile-cancel-btn" type="button" onClick={handleProfileCancel}>Cancel</button>
                  <button className="profile-save-btn" type="button" onClick={handleProfileSave}>Save changes</button>
                </div>
              )}
            </section>

            <div className="client-profile-tabs" role="tablist" aria-label="Profile sections">
              <span className="client-profile-tab active" role="tab" aria-selected="true">Personal details</span>
              <span className="client-profile-tab" role="tab" aria-selected="false">Contact details</span>
              <span className="client-profile-tab" role="tab" aria-selected="false">Preferences</span>
            </div>

            <section className="profile-form-section">
              <div className="profile-section-heading"><div><span>01</span><h3>Personal details</h3></div><p>Keep your identity information up to date.</p></div>
              <div className="profile-form-grid">
                <label>First name<input name="firstName" value={profileDetails.firstName} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="First name" /></label>
                <label>Middle name<input name="middleName" value={profileDetails.middleName} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="Middle name" /></label>
                <label>Last name<input name="lastName" value={profileDetails.lastName} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="Last name" /></label>
                <label>Nickname<input name="nickname" value={profileDetails.nickname} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="Nickname" /></label>
                <label>Suffix<select name="suffix" value={profileDetails.suffix} onChange={handleProfileChange} disabled={!isProfileEditing}><option value="">Select suffix</option><option value="Jr.">Jr.</option><option value="Sr.">Sr.</option><option value="II">II</option></select></label>
                <label>Birthday<input name="birthday" type="date" value={profileDetails.birthday} onChange={handleProfileChange} disabled={!isProfileEditing} /></label>
                <fieldset><legend>Gender</legend><div className="profile-radio-group"><label><input type="radio" name="gender" value="Male" checked={profileDetails.gender === "Male"} onChange={handleProfileChange} disabled={!isProfileEditing} /> Male</label><label><input type="radio" name="gender" value="Female" checked={profileDetails.gender === "Female"} onChange={handleProfileChange} disabled={!isProfileEditing} /> Female</label></div></fieldset>
              </div>
            </section>

            <section className="profile-form-section">
              <div className="profile-section-heading"><div><span>02</span><h3>Contact details</h3></div><p>How we can reach you about your stays.</p></div>
              <div className="profile-form-grid profile-contact-grid">
                <label>Mobile number<input name="mobile" value={profileDetails.mobile} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="Enter mobile number" /></label>
                <label>Phone type<select name="phoneType" value={profileDetails.phoneType} onChange={handleProfileChange} disabled={!isProfileEditing}><option>Mobile</option><option>Work</option><option>Home</option></select></label>
                <label className="profile-email-field">Email address<input name="email" type="email" value={profileDetails.email} onChange={handleProfileChange} disabled={!isProfileEditing} placeholder="Email address" /></label>
              </div>
              <label className="profile-reminder"><input name="reminders" type="checkbox" checked={profileDetails.reminders} onChange={handleProfileChange} disabled={!isProfileEditing} /><span><strong>Send email appointment reminders</strong><small>We will send booking updates and reminders to your email.</small></span></label>
            </section>
          </div>
        )}
      </main>
    </div>
);
};

export default Profile;
