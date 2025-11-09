import {useState, useEffect} from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
      const fetchUser = async () =>{
      try{
      const token = localStorage.getItem('token');
      const storedUserRaw = localStorage.getItem('user');
      if(!token || !storedUserRaw){
        setError("User not logged in or missing credentials.");
        setLoading(false);
        return;
      }
      let storedUser;
      try{
      storedUser = JSON.parse(storedUserRaw);  
                 }catch(e){
                  console.error("Error parsing user data from localStorage:", e);
                  setError("Failed to retrieve user data.");
                  setLoading(false);
                  return;
                }
                 const userId = storedUser?._id || storedUser?.id;
                 if(!userId){
                  setError("User ID not found. Invalid user data.");
                  setLoading(false);
                  return;
                 }             
                const res = await axios.get(`${import.meta.env.VITE_URL_BASE_API}/user/${userId}`,{
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
    const getRoleDisplay = (role) => {
        switch(role?.toLowerCase()){
          case 'admin':
            return 'text-primary fw-bold';
          case 'user':
            return 'text-success fw-bold';
          default:
            return 'text-muted';
        }
    };
    const getStatusDisplay = (status) =>{
      switch(status?.toLowerCase()){
        case 'approved':
          return 'text-success fw-bold';
        case 'rejected':
          return 'text-danger fw-bold';
        case 'pending':
          return 'text-warning fw-bold';
        default:
          return 'text-muted';
      }
    };
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
        <div className="row mb-2">
          <div className="col-md-6"><strong>Role:</strong> 
          <span className= {getRoleDisplay(user.role)}>{user.role||'-'}</span>
          </div>
          <div className="col-md-6"><strong>Status:</strong>
          <span className= {getStatusDisplay(user.status)}> {user.status||'-'}</span>
          </div>
        </div>
      </div>
    </div>
     )
    };
export default  UserProfile;