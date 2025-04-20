const ReservationForm = () => {
    return (
        <div className="container my-4">
            <h2 className="mb-4">Reservation Details</h2>

            <div className="mb-3">
                <label htmlFor="reservationDate" className="form-label">Date of Reservation:</label>
                <input type="date" className="form-control" id="reservationDate" name="reservationDate" required />
            </div>

            <div className="mb-3">
                <label htmlFor="reservationTime" className="form-label">Time of Reservation:</label>
                <input type="time" className="form-control" id="reservationTime" name="reservationTime" required />
            </div>

            <div className="mb-3">
                <label htmlFor="numberOfPeople" className="form-label">Number of Guests:</label>
                <input type="number" className="form-control" id="numberOfPeople" name="numberOfPeople" min="1" required />
            </div>

            <div className="mb-3">
                <label htmlFor="place_category" className="form-label">Venue:</label>
                <select className="form-select" id="place_category" name="place_category" required>
                    <option value="">Select venue</option>
                    <option value="Terrace">Terrace</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Business Class">Business Class</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="noOfTable" className="form-label">Table:</label>
                <input type="number" className="form-control" id="noOfTable" name="noOfTable" min="1" required />
            </div>
        </div>
    );
};

export default ReservationForm;
