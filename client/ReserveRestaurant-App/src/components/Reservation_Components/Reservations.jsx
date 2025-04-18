import UserReservationForm from "../Reservation_Components/UserReservationform";

const ReservationsForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form data submission here
    };

    return (
        <div className="reservations">
            <h1>Reservations</h1>
            <form className="reservation-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="DateofReservation">Date of Reservation:</label>
                    <input type="date" id="DateofReservation" name="DateofReservation" required />
                </div>
                <div>
                    <label htmlFor="TimeofReservation">Time of Reservation:</label>
                    <input type="time" id="TimeofReservation" name="TimeofReservation" required />
                </div>
                <div>
                    <label htmlFor="NumberofGuests">Number of Guests:</label>
                    <input type="number" id="NumberofGuests" name="NumberofGuests" min="1" required />
                </div>
                <div>
                    <label htmlFor="Category">Venue:</label>
                    <select id="Category" name="place_category" required>
                        <option value="Terrace">Terrace</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Private Room">Private Room</option>
                        <option value="Business Class">Business Class</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="noOfTable">Table:</label>
                    <input type="number" id="noOfTable" name="noOfTable" min="1" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReservationsForm;
