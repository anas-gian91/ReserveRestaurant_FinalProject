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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
       
    };
 

    // ⬇️ Move this outside of handleSubmit
    const handleEmailBlur = async (email) => {
        try {
            const res = await axios.get(`/guest/guests/email/${email}`); // Adjust route if needed
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
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
            // Authenticated user
            const user = localStorage.getItem('user');
            if (user) {
                reservationData.userId = JSON.parse(user).id;
            }
    
            const response = await axios.post('http://localhost:8020/reserve/reservation/create', {
                reservationData,
                guestData: !reservationData.userId ? guestData : undefined, // only include guestData if not logged in
            });
    
            console.log(response.data);
            alert(response.data.msg);
            navigate('/verification')
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.msg || 'Something went wrong.';
            alert(msg);
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h1 className="mb-4 text-center">Make a Reservation</h1>
                <form onSubmit={handleSubmit}>
                    <UserDetailsForm
                        formData={formData}
                        handleChange={handleChange}
                        onEmailBlur={handleEmailBlur}
                    />
                    <hr />
                    <ReservationForm formData={formData} handleChange={handleChange} />
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationCombined;