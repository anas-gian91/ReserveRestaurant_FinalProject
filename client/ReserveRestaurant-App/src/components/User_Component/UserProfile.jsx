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
    if (loading) return (
        <div className="container my-5 text-center">
            <div className="spinner-border" style={{ color: '#16c79a' }}></div>
            <p className="mt-3">Loading profile...</p>
        </div>
    );
    if (error) return (
        <div className='container my-5'>
            <div className="alert alert-danger text-center">{error}</div>
        </div>
    );
    if (!user) return (
        <div className='container my-5'>
            <div className="alert alert-info text-center">No user data found.</div>
        </div>
    );
     return (
     <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header text-center py-4" style={{ backgroundColor: '#16c79a', color: '#fff' }}>
              <h3 className="mb-0 fw-bold">My Profile</h3>
            </div>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3" style={{ fontSize: '80px' }}>👤</div>
                <h4 className="fw-bold" style={{ color: '#1a1a2e' }}>
                  {user.Fname || '-'} {user.Lname || '-'}
                </h4>
                <span className={`badge px-3 py-2 ${getStatusDisplay(user.status)}`}>
                  {user.status || '-'}
                </span>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Username</small>
                    <strong>{user.username || '-'}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Email</small>
                    <strong>{user.email || '-'}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Phone</small>
                    <strong>{user.phone || '-'}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Gender</small>
                    <strong>{user.gender || '-'}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Date of Birth</small>
                    <strong>{user.DateOfBirth ? new Date(user.DateOfBirth).toLocaleDateString() : '-'}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Role</small>
                    <strong className={getRoleDisplay(user.role)}>{user.role || '-'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     )
    };
export default  UserProfile;