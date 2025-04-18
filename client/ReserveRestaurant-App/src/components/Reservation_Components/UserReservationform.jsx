const UserReservationForm = () => {
    return (
        <>
        <div className="reservation-form">
            <h1>User details:</h1>
            <form className="reservation-form">
                <label htmlFor="fname">First Name:</label>
                <input type="text" id="fname" name="fname" placeholder="First Name" required />
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" placeholder="Last Name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
                <button type="submit"> NextPage </button>
            </form>
        </div>
        </>
    );
};
export default UserReservationForm;