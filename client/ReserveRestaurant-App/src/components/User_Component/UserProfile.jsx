import {useState, useEffect} from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
      let storedUser = null;
      const storedUserRaw = localStorage.getItem('user');
      try { storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;  
                 }catch(e){
                  console.error("Error parsing user data from localStorage:", e);
                  setError("Failed to retrieve user data.");
                  setLoading(false);
                  return;
                }
                 const userId = storedUser?._id || storedUser?.id;
                const token = storedUser?.token;
                if(!userId || !token) {
                  setError( "User not logged in or missing credentials.");
                  setLoading(false);
                  return;
                }
        const fetchUser = async () => {
            try {              
                const res = await axios.get(`http://localhost:8020/user/${userId}`,{
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                setUser(res.data.user || res.data);
            }catch (error){
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data.");
            }finally {
                setLoading(false);
             }
            };
                fetchUser();
    }, []);
    if (loading) return <div className="container mt-4">Loading profile...</div>;  
    if (error) return <div className='container mt-4 text-danger'>{error}</div>;
    if (!user) return <div className='container mt-4'>No user data found.</div>;
     return (

     <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="card-title mb-4">User Profile</h3>
        <div className="row mb-2">
          <div className="col-md-6"><strong>Name:</strong> {user.Fname || '-'} {user.Lname || '-'}</div>
          <div className="col-md-6"><strong>Username:</strong> {user.username || '-'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6"><strong>Email:</strong> {user.email || '-'}</div>
          <div className="col-md-6"><strong>Phone:</strong> {user.phone || '-'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6"><strong>Gender:</strong> {user.gender ||'-'}</div>
          <div className="col-md-6"><strong>Date of Birth:</strong> {user.DateOfBirth ? new Date(user.DateOfBirth).toLocaleDateString():'-'}</div>
        </div>
      </div>
    </div>
     )
    };
export default  UserProfile;