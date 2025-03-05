import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './StudentLandingPage.css';
import profile from './profile.jpg';

const availableSlots = [
    { id: 1, date: '2025-03-20', time: '10:00 AM' },
    { id: 2, date: '2025-03-20', time: '02:00 PM' },
    { id: 3, date: '2025-03-21', time: '11:00 AM' }
];

export default function StudentLandingPage() {
    const navigate = useNavigate();
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [confirmation, setConfirmation] = useState('');
    const [showSlots, setShowSlots] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [editUsed, setEditUsed] = useState(false);
    const [bookings, setBookings] = useState([]); // State to store fetched bookings

    // Fetch bookings when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/bookings');
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data); // Update the bookings state with fetched data
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleLogout = () => {
        navigate('/');
    };

    const handleBookClick = () => {
        setShowSlots(true);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBookSlot = async () => {
        if (selectedSlot) {
            try {
                const response = await fetch('http://localhost:8080/api/bookings', {
                    method: 'POST', // Ensure this is a POST request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tacId: 'TAC123', // Replace with the actual TAC ID
                        slotDate: selectedSlot.date,
                        slotTime: selectedSlot.time,
                    }),
                });

                if (response.ok) {
                    await response.json(); // Remove the unused 'data' variable
                    setConfirmation(`You have booked the slot on ${selectedSlot.date} at ${selectedSlot.time}`);
                    setShowSlots(false);
                    setCanEdit(true);

                    // Refresh the bookings list after a new booking
                    const refreshResponse = await fetch('http://localhost:8080/api/bookings');
                    if (refreshResponse.ok) {
                        const refreshData = await refreshResponse.json();
                        setBookings(refreshData);
                    }
                } else {
                    const errorData = await response.json();
                    console.error('Failed to book slot:', errorData);
                    alert(`Error: ${errorData.message || 'Failed to book slot'}`);
                }
            } catch (error) {
                console.error('Error booking slot:', error);
                alert('An error occurred while booking the slot.');
            }
        } else {
            alert('Please select a slot before confirming.');
        }
    };

    const handleEditSlot = () => {
        if (!editUsed) {
            setShowSlots(true);
            setEditUsed(true); // Disable further edits after one use
        }
    };

    return (
        <div className="landing-page">
            <aside className="side">
                <div className="logo">Tac</div>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/">Profile</Link></li>
                        <li><Link to="/">Active Slots</Link></li>
                        <li><Link to="/">Settings</Link></li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </nav>
            </aside>

            <div className="main-content">
                <header className="header">
                    <div className="user-profile">
                        <span>Hi, Deepthi S</span>
                        <img src={profile} alt="Profile" />
                    </div>
                    <h2>Schedule your review</h2>
                </header>

                <div className="active-slots-container">
                    <h2>Active Slots</h2>
                    <table className="slots-table">
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>TAC ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>TAC123</td>
                                <td>
                                    <button className="book-button" onClick={handleBookClick}>
                                        Book Slot
                                    </button>
                                    {canEdit && (
                                        <FaEdit
                                            onClick={handleEditSlot}
                                            className={`edit-icon ${editUsed ? 'disabled' : ''}`}
                                            title={editUsed ? "Edit Disabled" : "Edit Slot"}
                                            style={{ marginLeft: '10px', cursor: editUsed ? 'not-allowed' : 'pointer', color: editUsed ? 'gray' : '#0171d3' }}
                                        />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {showSlots && (
                        <div className="slots-list">
                            <h3>Select a Slot</h3>
                            <table className="slots-table">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableSlots.map((slot) => (
                                        <tr key={slot.id}>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="slot"
                                                    value={slot.id}
                                                    onChange={() => handleSlotSelect(slot)}
                                                />
                                            </td>
                                            <td>{slot.date}</td>
                                            <td>{slot.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="confirm-button" onClick={handleBookSlot}>Confirm Booking</button>
                        </div>
                    )}

                    {confirmation && (
                        <div className="confirmation-message">
                            <p>{confirmation}</p>
                        </div>
                    )}
                </div>

                {/* Display Booked Slots */}
                <div className="booked-slots-container">
                    <h2>Booked Slots</h2>
                    <table className="slots-table">
                        <thead>
                            <tr>
                                <th>TAC ID</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.tacId}</td>
                                    <td>{booking.slotDate}</td>
                                    <td>{booking.slotTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <footer className="footer">
                    <p>&copy; 2024 TacReview. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
}
