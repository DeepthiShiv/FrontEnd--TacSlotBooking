import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import './AdminPage.css';

const AdminPage = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('10:00');
    const [slots, setSlots] = useState([
        {
            date: '2024-08-20',
            time: '10:00',
            students: 5,
            reviewers: 1
        },
        {
            date: '2024-08-20',
            time: '02:00',
            students: 10,
            reviewers: 1
        },
        {
            date: '2024-08-21',
            time: '11:00',
            students: 8,
            reviewers: 1
        }
    ]);

    const handleDateChange = newDate => setDate(newDate);
    const handleTimeChange = newTime => setTime(newTime);

    const addSlot = () => {
        const newSlot = {
            date: date.toDateString(),
            time,
            students: Math.floor(Math.random() * 10) + 1,
            reviewers: 1
        };
        setSlots([...slots, newSlot]);
    };

    const totalStudents = slots.reduce((acc, slot) => acc + slot.students, 0);
    const totalReviewers = slots.reduce((acc, slot) => acc + slot.reviewers, 0);

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
            </header>
            <div className="admin-container">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li><a href="#dashboard">Dashboard</a></li>
                            <li><a href="#slots">Slots Management</a></li>
                            <li><a href="#reports">Reports</a></li>
                            <li><a href="#settings">Settings</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <div className="dashboard-container">
                        <section className="calendar-time-section">
                            <Calendar onChange={handleDateChange} value={date} />
                            <div className="time-slot-controls">
                                <TimePicker onChange={handleTimeChange} value={time} />
                                <button onClick={addSlot}>Add Slot</button>
                            </div>
                        </section>
                        <section className="statistics-box">
                            <h2>Statistics</h2>
                            <p>Total Students: {totalStudents}</p>
                            <p>Total Reviewers: {totalReviewers}</p>
                        </section>
                    </div>
                    <section className="slots-dashboard" id="slots">
                        <h2>Open Slots</h2>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>No. of Students</th>
                                    <th>No. of Reviewers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot, index) => (
                                    <tr key={index}>
                                        <td>{slot.date}</td>
                                        <td>{slot.time}</td>
                                        <td>{slot.students}</td>
                                        <td>{slot.reviewers}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <section className="reports-section" id="reports">
                        <button className="generate-report-button">Generate Report</button>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
