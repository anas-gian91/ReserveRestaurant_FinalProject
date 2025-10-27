import {useState, useEffect} from 'react';
import axios from 'axios';

const ReservationsList = () => {
 const    [reservations, setReservations] = useState([]);
 const  [error,setError] = useState(null);
 const  [Loading, setLoading] = useState(true);
 useEffect(()=> {
    const fetchReservations = async () =>{
    try{
        const token = localStorage.getItem('token');
        const storedUserRaw = localStorage.getItem('user');
        if(!token || !storedUserRaw){
            setError("User not logged in or missing credentials.");
            setLoading(false);
            return;
        }
        const storedUser = JSON.parse(storedUserRaw);
        const userId = storedUser._id || storedUser.id;
        if(!userId){
            setError("User ID not found.");
            setLoading(false);
            return;
        }
        const response = await axios.get(`http://localhost:8020/reserve/reservations/user/${userId}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setReservations(response.data);
    }catch(error){
        console.error("Error fetching reservations:", error);
        setError(error.response?.data?.msg||"Failed to fetch reservations.");

    }finally{
        setLoading(false);
    }
};
fetchReservations();
},[]);
if(Loading) return (<div className="container my-5">
    <div className="spinner-border text-primary" role="status">
      <p>Loading reservations...</p>
      </div>
    </div>);
if(error) return (<div className="container my-5">
    <div className = "alert alert-danger text-center">{error}</div>
        </div>);
return (
<div className ="container my-5">
    <h2 className="text-center mb-4">My Reservations</h2>
    {/*Check if there are no reservations*/}
    {reservations.length === 0 ? (
        <div className= "alert alert-info text-center">
            You have no reservations.
            </div>
    ):(
        <div className="list-group">
            {reservations.map((r) => (
            <div key ={r._id} className ="list-group-item list-group-item-action mb-3 shadow-sm rounded">
                <div className ="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-1">
                            {new Date(r.reservationDate).toLocaleDateString()}  —{" "} {r.reservationTime}
                        </h5>
                        <p className ="mb-1">
                            <strong>Guests:</strong> {r.numberOfPeople} <br />
                            <strong>Table:</strong> {r.noOfTable} <br />
                            <strong>Category:</strong> {r.place_category}
                        </p>
                    </div>
                    <div>
                        <span className = {`badge fs-6 ${
                            r.status === "confirmed" ? "bg-success" 
                            : r.status === "pending" ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}>
                            {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )}
    </div>
);
};
export default ReservationsList;