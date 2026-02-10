// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UserDetailsForm from './UserDetailsform';
// import ReservationForm from './ReservationForm';

// const ReservationCombined = () => {
//     const [formData, setFormData] = useState({
//         Fname: '',
//         Lname: '',
//         email: '',
//         DateOfBirth: '',
//         phone: '',
//         gender: '',
//         reservationDate: '',
//         reservationTime: '',
//         numberOfPeople: '',
//         place_category: '',
//         noOfTable: '',
//     });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
       
//     };
 

//     // ⬇️ Move this outside of handleSubmit
//     const handleEmailBlur = async (email) => {
//         try {
//             const res = await axios.get(`/guest/guests/email/${email}`); // Adjust route if needed
//             const guest = res.data;

//             setFormData(prev => ({
//                 ...prev,
//                 Fname: guest.Fname || '',
//                 Lname: guest.Lname || '',
//                 DateOfBirth: guest.DateOfBirth || '',
//                 phone: guest.phone || '',
//                 gender: guest.gender || '',
//             }));
//         } catch (error) {
//             console.error('No guest found for this email.',error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const guestData = {
//             Fname: formData.Fname,
//             Lname: formData.Lname,
//             email: formData.email,
//             DateOfBirth: formData.DateOfBirth,
//             phone: formData.phone,
//             gender: formData.gender,
//         };
    
//         const reservationData = {
//             reservationDate: formData.reservationDate,
//             reservationTime: formData.reservationTime,
//             numberOfPeople: formData.numberOfPeople,
//             place_category: formData.place_category,
//             noOfTable: formData.noOfTable,
//         };
    
//         try {
//             // Authenticated user
//             const user = localStorage.getItem('user');
//             if (user) {
//                 reservationData.userId = JSON.parse(user).id;
//             }
    
//             const response = await axios.post(`${import.meta.env.VITE_URL_BASE_API}/reserve/reservation/create`, {
//                 reservationData,
//                 guestData: !reservationData.userId ? guestData : undefined, // only include guestData if not logged in
//             });
    
//             console.log(response.data);
//             alert(response.data.msg);
//             navigate('/verification')
//         } catch (error) {
//             console.error(error);
//             const msg = error.response?.data?.msg || 'Something went wrong.';
//             alert(msg);
//         }
//     };

//     return (
//         <div className="container my-5">
//             <div className="card shadow p-4">
//                 <h1 className="mb-4 text-center">Make a Reservation</h1>
//                 <form onSubmit={handleSubmit}>
//                     <UserDetailsForm
//                         formData={formData}
//                         handleChange={handleChange}
//                         onEmailBlur={handleEmailBlur}
//                     />
//                     <hr />
//                     <ReservationForm formData={formData} handleChange={handleChange} />
//                     <div className="text-center mt-4">
//                         <button type="submit" className="btn btn-primary btn-lg">
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ReservationCombined;
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserDetailsForm from './UserDetailsform';
import ReservationForm from './ReservationForm';

const ReservationCombined = () => {
    const [formData, setFormData] = useState({
        Fname: '',
        Lname: '',
        email: '',
        DateOfBirth: '',
        phone: '',
        gender: '',
        reservationDate: '',
        reservationTime: '',
        numberOfPeople: '',
        place_category: '',
        noOfTable: '',
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
       
    };
 

    // ⬇️ Move this outside of handleSubmit
    const handleEmailBlur = async (email) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_BASE_API}/api/guest/guests/email/${email}`); // Adjust route if needed
            const guest = res.data;

            setFormData(prev => ({
                ...prev,
                Fname: guest.Fname || '',
                Lname: guest.Lname || '',
                DateOfBirth: guest.DateOfBirth || '',
                phone: guest.phone || '',
                gender: guest.gender || '',
            }));
        } catch (error) {
            console.error('No guest found for this email.',error);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            const requiredFields = ['Fname', 'Lname', 'email', 'DateOfBirth', 'phone', 'gender'];
            const hasAllFields = requiredFields.every(field => formData[field]);
            if (hasAllFields) {
                setStep(2);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const guestData = {
            Fname: formData.Fname,
            Lname: formData.Lname,
            email: formData.email,
            DateOfBirth: formData.DateOfBirth,
            phone: formData.phone,
            gender: formData.gender,
        };

        const reservationData = {
            reservationDate: formData.reservationDate,
            reservationTime: formData.reservationTime,
            numberOfPeople: formData.numberOfPeople,
            place_category: formData.place_category,
            noOfTable: formData.noOfTable,
        };

        try {
            const user = localStorage.getItem('user');
            if (user) {
                reservationData.userId = JSON.parse(user).id;
            }

            const response = await axios.post( `${import.meta.env.VITE_URL_BASE_API}/api/reserve/reservation/create`, {
                reservationData,
                guestData: !reservationData.userId ? guestData : undefined,
            });

            console.log(response.data);
            navigate('/verification');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.msg || 'Something went wrong.';
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header text-center py-4" style={{ backgroundColor: '#16c79a', color: '#fff' }}>
                            <h2 className="mb-0 fw-bold">Book Your Table</h2>
                            <p className="mb-0 mt-2 opacity-75">Complete the form to reserve your spot</p>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <div className="progress mb-4" style={{ height: '8px' }}>
                                <div
                                    className="progress-bar"
                                    style={{ width: step === 1 ? '50%' : '100%', backgroundColor: '#16c79a' }}
                                ></div>
                            </div>
                            <div className="text-center mb-4">
                                <span className="badge bg-light text-dark px-3 py-2">
                                    Step {step} of 2
                                </span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <>
                                        <UserDetailsForm
                                            formData={formData}
                                            handleChange={handleChange}
                                            onEmailBlur={handleEmailBlur}
                                        />
                                        <div className="d-flex justify-content-end mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-lg px-5 rounded-pill"
                                                style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ReservationForm formData={formData} handleChange={handleChange} />
                                        <div className="d-flex justify-content-between mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-lg px-5 rounded-pill"
                                                onClick={() => setStep(1)}
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-lg px-5 rounded-pill"
                                                style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Confirm Reservation'
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationCombined;*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserDetailsForm from './UserDetailsform';
import ReservationForm from './ReservationForm';

const ReservationCombined = () => {
    const [formData, setFormData] = useState({
        Fname: '',
        Lname: '',
        email: '',
        DateOfBirth: '',
        phone: '',
        gender: '',
        reservationDate: '',
        reservationTime: '',
        numberOfPeople: '',
        place_category: '',
        noOfTable: '',
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDataLoading, setUserDataLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in and autofill their data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUserRaw = localStorage.getItem('user');
                
                if (token && storedUserRaw) {
                    setIsLoggedIn(true);
                    const storedUser = JSON.parse(storedUserRaw);
                    const userId = storedUser._id || storedUser.id;
                    
                    if (userId) {
                        // Fetch full user data from the backend
                        const response = await axios.get(
                            `${import.meta.env.VITE_URL_BASE_API}/api/user/${userId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        
                        const userData = response.data.user || response.data;
                        
                        // Autofill user data
                        setFormData(prev => ({
                            ...prev,
                            Fname: userData.Fname || '',
                            Lname: userData.Lname || '',
                            email: userData.email || '',
                            DateOfBirth: userData.DateOfBirth ? 
                                new Date(userData.DateOfBirth).toISOString().split('T')[0] : '',
                            phone: userData.phone || '',
                            gender: userData.gender || '',
                        }));
                        setIsLoggedIn(true);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                setIsLoggedIn(false);
            } finally {
                setUserDataLoading(false);
            }
        };

        loadUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // For guest users - check if email exists and autofill
    const handleEmailBlur = async (email) => {
        // Only check for existing guest if user is not logged in
        if (isLoggedIn || !email) return;
        
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_URL_BASE_API}/api/guest/guests/email/${email}`
            );
            const guest = res.data;

            setFormData(prev => ({
                ...prev,
                Fname: guest.Fname || '',
                Lname: guest.Lname || '',
                DateOfBirth: guest.DateOfBirth ? 
                    new Date(guest.DateOfBirth).toISOString().split('T')[0] : '',
                phone: guest.phone || '',
                gender: guest.gender || '',
            }));
        } catch (error) {
            console.log('No guest found for this email - new guest will be created',error);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            const requiredFields = ['Fname', 'Lname', 'email', 'DateOfBirth', 'phone', 'gender'];
            const hasAllFields = requiredFields.every(field => formData[field]);
            if (hasAllFields) {
                setStep(2);
            } else {
                alert('Please fill in all required fields');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const guestData = {
            Fname: formData.Fname,
            Lname: formData.Lname,
            email: formData.email,
            DateOfBirth: formData.DateOfBirth,
            phone: formData.phone,
            gender: formData.gender,
        };

        const reservationData = {
            reservationDate: formData.reservationDate,
            reservationTime: formData.reservationTime,
            numberOfPeople: formData.numberOfPeople,
            place_category: formData.place_category,
            noOfTable: formData.noOfTable,
        };

        try {
            const user = localStorage.getItem('user');
            if (user) {
                reservationData.userId = JSON.parse(user).id;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_URL_BASE_API}/reserve/reservation/create`,
                {
                    reservationData,
                    guestData: !reservationData.userId ? guestData : undefined,
                }
            );

            console.log(response.data);
            navigate('/verification');
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.msg || 'Something went wrong.';
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    if (userDataLoading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border" style={{ color: '#16c79a' }}></div>
                <p className="mt-3">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header text-center py-4" style={{ backgroundColor: '#16c79a', color: '#fff' }}>
                            <h2 className="mb-0 fw-bold">Book Your Table</h2>
                            <p className="mb-0 mt-2 opacity-75">
                                {isLoggedIn 
                                    ? 'Your information has been prefilled' 
                                    : 'Complete the form to reserve your spot'}
                            </p>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            {/* User Status Indicator */}
                            <div className="alert alert-info border-0 mb-4">
                                <div className="d-flex align-items-center">
                                    <span style={{ fontSize: '24px' }} className="me-2">
                                        {isLoggedIn ? '👤' : '👥'}
                                    </span>
                                    <div>
                                        <strong>
                                            {isLoggedIn 
                                                ? 'Booking as registered user' 
                                                : 'Booking as guest'}
                                        </strong>
                                        <small className="d-block text-muted">
                                            {isLoggedIn 
                                                ? 'Your profile information is already filled in' 
                                                : 'Enter your email - we\'ll check if you\'ve booked with us before'}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="progress mb-4" style={{ height: '8px' }}>
                                <div
                                    className="progress-bar"
                                    style={{ 
                                        width: step === 1 ? '50%' : '100%', 
                                        backgroundColor: '#16c79a' 
                                    }}
                                ></div>
                            </div>
                            
                            <div className="text-center mb-4">
                                <span className="badge bg-light text-dark px-3 py-2">
                                    Step {step} of 2
                                </span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {step === 1 ? (
                                    <>
                                        <UserDetailsForm
                                            formData={formData}
                                            handleChange={handleChange}
                                            onEmailBlur={handleEmailBlur}
                                            isLoggedIn={isLoggedIn}
                                        />
                                        <div className="d-flex justify-content-end mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-lg px-5 rounded-pill"
                                                style={{ 
                                                    backgroundColor: '#16c79a', 
                                                    color: '#fff', 
                                                    fontWeight: '600' 
                                                }}
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ReservationForm 
                                            formData={formData} 
                                            handleChange={handleChange} 
                                        />
                                        <div className="d-flex justify-content-between mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-lg px-5 rounded-pill"
                                                onClick={() => setStep(1)}
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-lg px-5 rounded-pill"
                                                style={{ 
                                                    backgroundColor: '#16c79a', 
                                                    color: '#fff', 
                                                    fontWeight: '600' 
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Confirm Reservation'
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationCombined;