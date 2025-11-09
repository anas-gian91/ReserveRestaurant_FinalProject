// import React from 'react';

// function About() {
//     return (
//         <div className="container my-5">
//             <div className="card shadow p-4">
//                 <h2 className="mb-4 text-center">About ReserveRestaurant</h2>
//                 <p className="mb-3">
//                     <strong>ReserveRestaurant</strong> is a modern web application designed to simplify the dining experience.
//                     Whether you want to reserve a table, place an order, or manage your reservations, we've got you covered.
//                 </p>
//                 <p className="mb-3">
//                     Built with a user-friendly interface, the app makes it easy to:
//                 </p>
//                 <ul>
//                     <li>Reserve table bookings</li>
//                     <li>Select from available tables in real-time</li>
//                     <li>Browse the menu</li>
//                 </ul>
//                 <p className="mb-3">
//                     The application is fully responsive and works smoothly across all devices, ensuring a seamless experience wherever you are.
//                 </p>
//                 <p className="text-muted fst-italic">
//                     Please note: ReserveRestaurant is currently in its early development stages. If you encounter any bugs or have suggestions,
//                     feel free to reach out to our support team. Your feedback helps us grow!
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default About;
import React from 'react';

function About() {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold" style={{ color: '#1a1a2e' }}>About ReserveRestaurant</h2>
                <p className="text-muted">Revolutionizing the way you dine</p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div style={{ fontSize: '64px' }}>🍽️</div>
                            </div>
                            <p className="lead text-center mb-4">
                                <strong>ReserveRestaurant</strong> is a modern web application designed to simplify your dining experience.
                            </p>
                            <p className="mb-4">
                                Whether you want to reserve a table, browse our menu, or manage your reservations,
                                we provide a seamless platform that puts you in control. No more phone calls,
                                no more uncertainty — just simple, efficient table booking at your fingertips.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div style={{ fontSize: '48px' }}>📅</div>
                        <h5 className="fw-bold mt-3 mb-3">Easy Reservations</h5>
                        <p className="text-muted">
                            Reserve table bookings in just a few clicks. Choose your preferred date, time, and seating.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div style={{ fontSize: '48px' }}>📱</div>
                        <h5 className="fw-bold mt-3 mb-3">Fully Responsive</h5>
                        <p className="text-muted">
                            Works seamlessly across all devices — desktop, tablet, or mobile. Book anywhere, anytime.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 text-center p-4">
                        <div style={{ fontSize: '48px' }}>✅</div>
                        <h5 className="fw-bold mt-3 mb-3">Instant Confirmation</h5>
                        <p className="text-muted">
                            Get immediate email confirmations and manage all your reservations from your profile.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="alert alert-info border-0 shadow-sm" role="alert">
                        <h5 className="alert-heading">Development Notice</h5>
                        <p className="mb-0">
                            ReserveRestaurant is currently in active development. We're constantly improving and adding new features.
                            If you encounter any issues or have suggestions, please reach out through our contact page.
                            Your feedback is invaluable!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
