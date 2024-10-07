import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './StudentLandingPage.css';
import profile from './profile.jpg';

const availableSlots = [
    { id: 1, date: '2024-08-20', time: '10:00 AM' },
    { id: 2, date: '2024-08-20', time: '02:00 PM' },
    { id: 3, date: '2024-08-21', time: '11:00 AM' }
];

export default function StudentLandingPage() {
    const navigate = useNavigate();
    const [slots, setSlots] = useState(availableSlots);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [confirmation, setConfirmation] = useState('');
    const [showSlots, setShowSlots] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [editUsed, setEditUsed] = useState(false); 

    const handleLogout = () => {
        navigate('/');
    };

    const handleBookClick = () => {
        setShowSlots(true);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBookSlot = () => {
        if (selectedSlot) {
            setConfirmation(`You have booked the slot on ${selectedSlot.date} at ${selectedSlot.time}`);
            setShowSlots(false);
            setCanEdit(true); // Enable edit option after booking
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
                        <li><Link to="/student-login" onClick={handleLogout}>Logout</Link></li>
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
                                    {slots.map((slot) => (
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

                <footer className="footer">
                    <p>&copy; 2024 TacReview. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
}


