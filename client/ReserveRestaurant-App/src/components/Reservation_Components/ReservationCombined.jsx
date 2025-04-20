import UserDetailsForm from "./UserDetailsform";
import ReservationForm from "./ReservationForm";

const CombinedForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/reserve/reservation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Reservation successful!');
                console.log(result);
            } else {
                alert(`Error: ${result.msg}`);
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('Something went wrong while submitting your reservation.');
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h1 className="mb-4 text-center">Make a Reservation</h1>
                <form onSubmit={handleSubmit}>
                    {/* Guest or User Details */}
                    <div className="mb-4">
                        <UserDetailsForm />
                    </div>

                    <hr />

                    {/* Reservation Info */}
                    <div className="mb-4">
                        <ReservationForm />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CombinedForm;
