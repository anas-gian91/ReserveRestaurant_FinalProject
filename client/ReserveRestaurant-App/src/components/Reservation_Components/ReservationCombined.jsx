import React, { useState } from 'react';
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
        let url = null; // Initialize userId here
        let userId = null; // Initialize userId here

        const guestData = {
            Fname: formData.Fname,
            Lname: formData.Lname,
            email: formData.email,
            DateOfBirth: formData.DateOfBirth,
            phone: formData.phone,
            gender: formData.gender,
        };

   ;

        try {
            if(localStorage.getItem('user')){
                userId = JSON.parse(localStorage.getItem('user')).id;
                const reservationData = {
                    reservationDate: formData.reservationDate,
                    reservationTime: formData.reservationTime,
                    numberOfPeople: formData.numberOfPeople,
                    place_category: formData.place_category,
                    noOfTable: formData.noOfTable,
                    userId: userId,
                
                }
              
                 url = `http://localhost:8020/reserve/reservation/create`
                 let response = await axios.post(url,{reservationData})
                 console.log(response.data)
                   alert(response.data.msg)

            }else{
                const guestResponse = await axios.post('http://localhost:8020/guest/guests', guestData);
                const guestId = guestResponse.data._id;
                
            
               let reservationData = {
                    reservationDate: formData.reservationDate,
                    reservationTime: formData.reservationTime,
                    numberOfPeople: formData.numberOfPeople,
                    place_category: formData.place_category,
                    noOfTable: formData.noOfTable,
                    guestId: guestId,
                    
                }
                url = `http://localhost:8020/reserve/reservation/create`;
                let  response = await axios.post(url,{reservationData,guestData})
                console.log(response.data)
                alert(response.data.msg)
                // Handle the response as needed
            }
    
        
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