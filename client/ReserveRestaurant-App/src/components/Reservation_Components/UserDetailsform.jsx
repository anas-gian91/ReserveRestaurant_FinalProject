/*import React from 'react';

const UserDetailsForm = ({ formData, handleChange, onEmailBlur }) => {
    return (
        <>
            <h4 className="mb-4 fw-bold" style={{ color: '#1a1a2e' }}>Your Information</h4>
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
*/
import React from 'react';

const UserDetailsForm = ({ formData, handleChange, onEmailBlur, isLoggedIn = false }) => {
    return (
        <>
            <h4 className="mb-4 fw-bold" style={{ color: '#1a1a2e' }}>
                Your Information
                {isLoggedIn && (
                    <span className="badge bg-success ms-2" style={{ fontSize: '0.6em' }}>
                        Auto-filled
                    </span>
                )}
            </h4>
            
            {[
                { name: 'Fname', label: 'First Name' },
                { name: 'Lname', label: 'Last Name' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'DateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'phone', label: 'Phone' },
                { name: 'gender', label: 'Gender', type: 'select' },
            ].map(({ name, label, type = 'text' }) => (
                <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">
                        {label}
                        <span className="text-danger">*</span>
                        {isLoggedIn && (
                            <span className="ms-2 text-muted" style={{ fontSize: '0.85em' }}>
                                (from your profile)
                            </span>
                        )}
                    </label>

                    {type === 'select' ? (
                        <select
                            className="form-select form-select-lg"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            disabled={isLoggedIn}
                            required
                            style={isLoggedIn ? { backgroundColor: '#f8f9fa' } : {}}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <input
                            type={type}
                            className="form-control form-control-lg"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            onBlur={name === 'email' && !isLoggedIn ? 
                                (e) => onEmailBlur && onEmailBlur(e.target.value) : undefined}
                            disabled={isLoggedIn}
                            required
                            style={isLoggedIn ? { backgroundColor: '#f8f9fa' } : {}}
                            placeholder={!isLoggedIn ? `Enter your ${label.toLowerCase()}` : ''}
                        />
                    )}
                    
                    {name === 'email' && !isLoggedIn && (
                        <small className="text-muted mt-1 d-block">
                            We'll check if you've made reservations with us before
                        </small>
                    )}
                </div>
            ))}
            
            {!isLoggedIn && (
                <div className="alert alert-info border-0 mt-4">
                    <small>
                        <strong>Tip:</strong> Want to save your information for future bookings? 
                        <a href="/register" className="ms-1" style={{ color: '#16c79a', fontWeight: '600' }}>
                            Create an account
                        </a>
                    </small>
                </div>
            )}
        </>
    );
};

export default UserDetailsForm;