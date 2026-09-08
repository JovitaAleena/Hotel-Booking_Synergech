import React, { useContext } from "react";
import "./AdminDashboard.css";
import { AuthContext } from "../context/AuthContext.jsx";
import { dashboardDummyData, roomsDummyData } from "../assets/assets.js";

const ADMIN_EMAIL = "jovitajayburt.27it@licet.ac.in";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email?.trim().toLowerCase() === ADMIN_EMAIL;

  if (!isAdmin) {
    return (
      <main className="admin-dashboard-container admin-dashboard-denied">
        <h2>Admin Dashboard</h2>
        <p>This dashboard is available only to the administrator account.</p>
      </main>
    );
  }

  const hotelCount = new Set(roomsDummyData.map((room) => room.hotel.name)).size;
  const listingCount = roomsDummyData.length;
  const bookingCount = dashboardDummyData.bookings.length;
  const availableCount = roomsDummyData.filter((room) => room.isAvailable).length;
  const paidBookingCount = dashboardDummyData.bookings.filter((booking) => booking.isPaid).length;
  const pendingBookingCount = bookingCount - paidBookingCount;
  const guestCount = dashboardDummyData.bookings.reduce((total, booking) => total + booking.guests, 0);
  const averageBookingValue = Math.round(dashboardDummyData.totalRevenue / bookingCount);
  const availabilityRate = Math.round((availableCount / listingCount) * 100);
  const maxChartValue = Math.max(hotelCount, listingCount, bookingCount, 1);
  const chartData = [
    { label: "Hotels", value: hotelCount, color: "#0f766e" },
    { label: "Listings", value: listingCount, color: "#2563eb" },
    { label: "Bookings", value: bookingCount, color: "#d97706" },
  ];
  const roomTypeData = roomsDummyData.reduce((types, room) => {
    types[room.roomType] = (types[room.roomType] || 0) + 1;
    return types;
  }, {});

  return (
    <main className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div>
          <p className="admin-eyebrow">Operations overview</p>
          <h2>Admin Dashboard</h2>
          <p>Monitor hotel inventory, listings, and booking activity.</p>
        </div>
        <span className="admin-account">{ADMIN_EMAIL}</span>
      </div>

      <section className="admin-stat-grid" aria-label="Hotel statistics">
        <article className="admin-stat-card"><span className="admin-stat-label">Hotels</span><strong>{hotelCount}</strong><span className="admin-stat-note">Active property</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Listings</span><strong>{listingCount}</strong><span className="admin-stat-note">{availableCount} available now</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Bookings</span><strong>{bookingCount}</strong><span className="admin-stat-note">Across all listings</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Revenue</span><strong>${dashboardDummyData.totalRevenue}</strong><span className="admin-stat-note">Recorded total</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Guests served</span><strong>{guestCount}</strong><span className="admin-stat-note">Across all bookings</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Paid bookings</span><strong>{paidBookingCount}</strong><span className="admin-stat-note">{pendingBookingCount} pending</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Avg. booking</span><strong>${averageBookingValue}</strong><span className="admin-stat-note">Average revenue</span></article>
        <article className="admin-stat-card"><span className="admin-stat-label">Availability</span><strong>{availabilityRate}%</strong><span className="admin-stat-note">Listing availability</span></article>
      </section>

      <section className="admin-dashboard-panels">
        <article className="admin-panel admin-chart-panel">
          <div className="admin-panel-heading"><div><h3>Hotel and listing activity</h3><p>Current totals from the booking inventory.</p></div><span className="admin-period">Current</span></div>
          <div className="admin-chart" aria-label="Bar chart of hotels, listings, and bookings">
            {chartData.map((item) => (
              <div className="admin-chart-column" key={item.label}>
                <span className="admin-chart-value">{item.value}</span>
                <div className="admin-chart-track"><div className="admin-chart-bar" style={{ height: `${(item.value / maxChartValue) * 100}%`, backgroundColor: item.color }} /></div>
                <span className="admin-chart-label">{item.label}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Listings by hotel</h3><p>Room inventory grouped by property.</p></div></div>
          <div className="admin-listing-list">
            {[...new Set(roomsDummyData.map((room) => room.hotel.name))].map((hotelName) => {
              const hotelListings = roomsDummyData.filter((room) => room.hotel.name === hotelName);
              return <div className="admin-listing-row" key={hotelName}><span>{hotelName}</span><strong>{hotelListings.length} listings</strong></div>;
            })}
          </div>
        </article>
      </section>

      <section className="admin-dashboard-lower-panels">
        <article className="admin-panel">
          <div className="admin-panel-heading"><div><h3>Inventory mix</h3><p>Listing distribution by room type.</p></div></div>
          <div className="admin-mix-list">
            {Object.entries(roomTypeData).map(([roomType, count]) => (
              <div className="admin-mix-row" key={roomType}>
                <div className="admin-mix-label"><span>{roomType}</span><strong>{count} listings</strong></div>
                <div className="admin-progress-track"><div className="admin-progress-bar" style={{ width: `${(count / listingCount) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel admin-status-panel">
          <div className="admin-panel-heading"><div><h3>Booking status</h3><p>Payment completion overview.</p></div></div>
          <div className="admin-status-donut" style={{ "--paid-rate": `${(paidBookingCount / bookingCount) * 100}%` }}>
            <div><strong>{Math.round((paidBookingCount / bookingCount) * 100)}%</strong><span>paid</span></div>
          </div>
          <div className="admin-status-legend"><span><i className="admin-status-dot paid" />Paid <strong>{paidBookingCount}</strong></span><span><i className="admin-status-dot pending" />Pending <strong>{pendingBookingCount}</strong></span></div>
        </article>
      </section>

      <section className="admin-panel admin-bookings-panel">
        <div className="admin-panel-heading"><div><h3>Recent bookings</h3><p>Latest activity across the property.</p></div><span className="admin-period">{bookingCount} total</span></div>
        <div className="admin-bookings-table-wrap">
          <table className="admin-bookings-table">
            <thead><tr><th>Guest</th><th>Room</th><th>Stay</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {dashboardDummyData.bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user.username}</td>
                  <td>{booking.room.roomType}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                  <td>${booking.totalPrice}</td>
                  <td><span className={`admin-booking-status ${booking.isPaid ? "is-paid" : "is-pending"}`}>{booking.isPaid ? "Paid" : "Pending"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
