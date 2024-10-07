import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewerLandingPage.css';
import profile from './profile.jpg';

const availableSlots = [
    { id: 1, date: '2024-08-22', time: '10:00 AM' },
    { id: 2, date: '2024-08-22', time: '02:00 PM' },
    { id: 3, date: '2024-08-23', time: '11:00 AM' }
];

export default function ReviewerLandingPage() {
    const [slots, setSlots] = useState([]);
    const [bookedSlot, setBookedSlot] = useState(null);

    useEffect(() => {
        setSlots(availableSlots);
    }, []);

    const handleBookSlot = (slot) => {
        setBookedSlot(slot);
    };

    return (
        <div className="reviewer-landing-page">
            <aside className="sidebar">
                <div className="logo">TacReview</div>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/">Profile</Link></li>
                        <li><Link to="/">Slots</Link></li>
                        <li><Link to="/">Settings</Link></li>
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                </nav>
            </aside>

            <div className="main-content">
                <header className="header">
                    <div className="user-profile">
                        <span>Hi, Reviewer</span>
                        <img src={profile} alt="Profile" />
                    </div>
                    <h1>Reviewer Slot Booking</h1>
                </header>

                <div className="slots-list">
                    {bookedSlot ? (
                        <div className="confirmation-message">
                            <p>You have booked the slot on {bookedSlot.date} at {bookedSlot.time}</p>
                        </div>
                    ) : (
                        <table className="slots-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot) => (
                                    <tr key={slot.id}>
                                        <td>{slot.date}</td>
                                        <td>{slot.time}</td>
                                        <td>
                                            <button
                                                onClick={() => handleBookSlot(slot)}
                                                disabled={!!bookedSlot} // Disable other booking options once a slot is booked
                                                className="book-button"
                                            >
                                                Book Slot
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

