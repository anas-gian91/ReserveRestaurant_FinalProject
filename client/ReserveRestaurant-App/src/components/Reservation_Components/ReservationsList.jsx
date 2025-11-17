// import {useState, useEffect} from 'react';
// import axios from 'axios';

// const ReservationsList = () => {
//  const    [reservations, setReservations] = useState([]);
//  const  [error,setError] = useState(null);
//  const  [Loading, setLoading] = useState(true);
//  useEffect(()=> {
//     const fetchReservations = async () =>{
//     try{
//         const token = localStorage.getItem('token');
//         const storedUserRaw = localStorage.getItem('user');
//         if(!token || !storedUserRaw){
//             setError("User not logged in or missing credentials.");
//             setLoading(false);
//             return;
//         }
//         const storedUser = JSON.parse(storedUserRaw);
//         const userId = storedUser._id || storedUser.id;
//         if(!userId){
//             setError("User ID not found.");
//             setLoading(false);
//             return;
//         }
// const response = await axios.get(
//   `${import.meta.env.VITE_URL_BASE_API}/reserve/reservations/user/${userId}`,
//             {
//                 headers:{
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//         setReservations(response.data);
//     }catch(error){
//         console.error("Error fetching reservations:", error);
//         setError(error.response?.data?.msg||"Failed to fetch reservations.");

//     }finally{
//         setLoading(false);
//     }
// };
// fetchReservations();
// },[]);
// if(Loading) return (<div className="container my-5">
//     <div className="spinner-border text-primary" role="status">
//       <p>Loading reservations...</p>
//       </div>
//     </div>);
// if(error) return (<div className="container my-5">
//     <div className = "alert alert-danger text-center">{error}</div>
//         </div>);
// return (
// <div className ="container my-5">
//     <h2 className="text-center mb-4">My Reservations</h2>
//     {/*Check if there are no reservations*/}
//     {reservations.length === 0 ? (
//         <div className= "alert alert-info text-center">
//             You have no reservations.
//             </div>
//     ):(
//         <div className="list-group">
//             {reservations.map((r) => (
//             <div key ={r._id} className ="list-group-item list-group-item-action mb-3 shadow-sm rounded">
//                 <div className ="d-flex justify-content-between align-items-center">
//                     <div>
//                         <h5 className="mb-1">
//                             {new Date(r.reservationDate).toLocaleDateString()}  —{" "} {r.reservationTime}
//                         </h5>
//                         <p className ="mb-1">
//                             <strong>Guests:</strong> {r.numberOfPeople} <br />
//                             <strong>Table:</strong> {r.noOfTable} <br />
//                             <strong>Category:</strong> {r.place_category}
//                         </p>
//                     </div>
//                     <div>
//                         <span className = {`badge fs-6 ${
//                             r.status === "confirmed" ? "bg-success" 
//                             : r.status === "pending" ? "bg-warning text-dark"
//                             : "bg-danger"
//                         }`}>
//                             {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
//     )}
//     </div>
// );
// };
// export default ReservationsList;

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
        const response = await axios.get(`${import.meta.env.VITE_URL_BASE_API}/api/reserve/reservations/user/${userId}`,
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
if(Loading) return (
    <div className="container my-5 text-center">
        <div className="spinner-border" style={{ color: '#16c79a' }}></div>
        <p className="mt-3">Loading reservations...</p>
    </div>
);
if(error) return (
    <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
    </div>
);
return (
<div className="container my-5">
    <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: '#1a1a2e' }}>My Reservations</h2>
        <p className="text-muted">View and manage your upcoming reservations</p>
    </div>
    {reservations.length === 0 ? (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card border-0 shadow-sm text-center p-5">
                    <div style={{ fontSize: '64px' }}>📅</div>
                    <h4 className="mt-3 mb-2">No Reservations Yet</h4>
                    <p className="text-muted mb-4">You haven't made any reservations. Start by booking a table!</p>
                    <a href="/reservation" className="btn btn-lg rounded-pill px-5" style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}>
                        Book a Table
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="row g-4">
            {reservations.map((r) => (
            <div key={r._id} className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>
                                    {new Date(r.reservationDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </h5>
                                <p className="text-muted mb-0">{r.reservationTime}</p>
                            </div>
                            <span className={`badge px-3 py-2 ${
                                r.status === "confirmed" ? "bg-success"
                                : r.status === "pending" ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}>
                                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                            </span>
                        </div>
                        <hr />
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="p-2 bg-light rounded">
                                    <small className="text-muted d-block">Guests</small>
                                    <strong>{r.numberOfPeople}</strong>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="p-2 bg-light rounded">
                                    <small className="text-muted d-block">Table</small>
                                    <strong>#{r.noOfTable}</strong>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="p-2 bg-light rounded">
                                    <small className="text-muted d-block">Location</small>
                                    <strong>{r.place_category}</strong>
                                </div>
                            </div>
                        </div>
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