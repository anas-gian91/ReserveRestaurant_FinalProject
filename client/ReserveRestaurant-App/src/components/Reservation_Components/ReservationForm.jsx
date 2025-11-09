const ReservationForm = ({ formData, handleChange }) => {
    return (
        <div>
            <h4 className="mb-4 fw-bold" style={{ color: '#1a1a2e' }}>Reservation Details</h4>

            {[
                { name: 'reservationDate', label: 'Date of Reservation', type: 'date' },
                { name: 'reservationTime', label: 'Time of Reservation', type: 'time' },
                { name: 'numberOfPeople', label: 'Number of Guests', type: 'number', min: 1 },
                { name: 'place_category', label: 'Venue', type: 'select', options: ['Terrace', 'Indoor', 'Outdoor', 'Private Room', 'Business Class'] },
                { name: 'noOfTable', label: 'Table', type: 'number', min: 1 },
            ].map(({ name, label, type, options, min }) => (
                <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    {type === 'select' ? (
                        <select
                            className="form-select"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select {label}</option>
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={type}
                            className="form-control"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            required
                            {...(min ? { min } : {})}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReservationForm;

