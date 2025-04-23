import React from 'react';

const UserDetailsForm = ({ formData, handleChange, onEmailBlur }) => {
    return (
        <>
            <h2 className="mb-3">Guest/User Details</h2>
            {[
                { name: 'Fname', label: 'First Name' },
                { name: 'Lname', label: 'Last Name' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'DateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'phone', label: 'Phone' },
                { name: 'gender', label: 'Gender', type: 'select' },
            ].map(({ name, label, type = 'text' }) => (
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
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <input
                            type={type}
                            className="form-control"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            onBlur={name === 'email' ? (e) => onEmailBlur && onEmailBlur(e.target.value) : undefined}
                            required
                        />
                    )}
                </div>
            ))}
        </>
    );
};

export default UserDetailsForm;
