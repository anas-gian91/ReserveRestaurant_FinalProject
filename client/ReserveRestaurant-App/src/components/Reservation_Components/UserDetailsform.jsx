const UserDetailsForm = () => {
    return (
        <div className="container my-4">
            <h2 className="mb-4">Guest Details</h2>

            <div className="mb-3">
                <label htmlFor="Fname" className="form-label">First Name:</label>
                <input type="text" className="form-control" id="Fname" name="Fname" placeholder="First Name" required />
            </div>

            <div className="mb-3">
                <label htmlFor="Lname" className="form-label">Last Name:</label>
                <input type="text" className="form-control" id="Lname" name="Lname" placeholder="Last Name" required />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
            </div>

            <div className="mb-3">
                <label htmlFor="DateOfBirth" className="form-label">Date of Birth:</label>
                <input type="date" className="form-control" id="DateOfBirth" name="DateOfBirth" required />
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="text" className="form-control" id="phone" name="phone" placeholder="Phone Number" required />
            </div>

            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender:</label>
                <select className="form-select" id="gender" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
        </div>
    );
};

export default UserDetailsForm;
