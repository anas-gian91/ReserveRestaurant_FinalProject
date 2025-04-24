import React from 'react';

function About() {
    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">About ReserveRestaurant</h2>
                <p className="mb-3">
                    <strong>ReserveRestaurant</strong> is a modern web application designed to simplify the dining experience.
                    Whether you want to reserve a table, place an order, or manage your reservations, we've got you covered.
                </p>
                <p className="mb-3">
                    Built with a user-friendly interface, the app makes it easy to:
                </p>
                <ul>
                    <li>Reserve table bookings</li>
                    <li>Select from available tables in real-time</li>
                    <li>Browse the menu</li>
                </ul>
                <p className="mb-3">
                    The application is fully responsive and works smoothly across all devices, ensuring a seamless experience wherever you are.
                </p>
                <p className="text-muted fst-italic">
                    Please note: ReserveRestaurant is currently in its early development stages. If you encounter any bugs or have suggestions,
                    feel free to reach out to our support team. Your feedback helps us grow!
                </p>
            </div>
        </div>
    );
}

export default About;
