import React from 'react';

const Input = ({ labelText, labelFor, inputType, name, value, onChange }) => {
    return (
        <>
            <div className="mb-1">
                <label htmlFor={labelFor} className="form-label">
                    {labelText}
                </label>

                <input type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control"
                />
            </div>
        </>
    );
}

export default Input;
