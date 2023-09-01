import React, { useState } from 'react';
import InputType from './InputType'
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../../../services/Auth';
const Form = ({ formType, submitBtn, formTitle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("doner")
    const [name, setName] = useState("")
    const [organizationName, setOrganizationName] = useState("")
    const [hospitalName, setHospitalName] = useState("");
    const [webside, setWebside] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <>
            <form onSubmit={(e) => {
                if (formType === 'login') return handleLogin(e, email, password, role)
                else if (formType === 'register') return handleRegister(e, name, role, email, password, organizationName, hospitalName, webside, address, phone)
            }}>
                <h1>{formTitle}</h1>
                <hr />

                <div className='d-flex mb-3'>
                    <div className="form-check ms-2">
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id="donerRadio"
                            value={"doner"}
                            onChange={(e) => setRole(e.target.value)}
                            defaultChecked
                        />
                        <label className='form-check-label'>
                            Doner
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id="adminRadio"
                            value={"admin"}
                            onChange={(e) => setRole(e.target.value)}

                        />
                        <label className='form-check-label'>
                            Admin
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id="hospitalRadio"
                            value={"hospital"}
                            onChange={(e) => setRole(e.target.value)}

                        />
                        <label className='form-check-label'>
                            Hosptil
                        </label>
                    </div>
                    <div className="form-check ms-2">
                        <input type='radio'
                            className='form-check-input'
                            name='role'
                            id="organizationRadio"
                            value={"organization"}
                            onChange={(e) => setRole(e.target.value)}

                        />
                        <label className='form-check-label'>
                            Organization
                        </label>
                    </div>
                </div>

                {(() => {
                    // eslint-disable-next-line
                    switch (true) {
                        case formType === 'login': {
                            return (
                                <>
                                    <InputType
                                        labelText={'email'}
                                        labelFor={'forEmail'}
                                        inputType={'email'}
                                        name={'email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Password'}
                                        labelFor={'forPassword'}
                                        inputType={'password'}
                                        name={'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            )
                        }
                        case formType === 'register': {
                            return (
                                <>

                                    {(role === 'admin' || role === 'doner') && (
                                        <InputType
                                            labelText={'Name'}
                                            labelFor={'forName'}
                                            inputType={'text'}
                                            name={"name"}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />)

                                    }
                                    {
                                        (role === 'organization') && (
                                            <InputType
                                                labelText={'Organization Name'}
                                                labelFor={'forOrganizationName'}
                                                inputType={'text'}
                                                name={'organizationName'}
                                                value={organizationName}
                                                onChange={(e) => setOrganizationName(e.target.value)}
                                            />)
                                    }

                                    {
                                        (role === 'hospital') && (
                                            <InputType
                                                labelText={'Hospital Name'}
                                                labelFor={'forHospitalName'}
                                                inputType={'text'}
                                                name={"hospitalName"}
                                                value={hospitalName}
                                                onChange={(e) => setHospitalName(e.target.value)}
                                            />)
                                    }

                                    <InputType
                                        labelText={'email'}
                                        labelFor={'forEmail'}
                                        inputType={'email'}
                                        name={'email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Password'}
                                        labelFor={'forPassword'}
                                        inputType={'password'}
                                        name={'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Website'}
                                        labelFor={'forWebside'}
                                        inputType={'text'}
                                        name={"webside"}
                                        value={webside}
                                        onChange={(e) => setWebside(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Address'}
                                        labelFor={'forAddress'}
                                        inputType={'text'}
                                        name={"address"}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <InputType
                                        labelText={'Phone'}
                                        labelFor={'forPhone'}
                                        inputType={'text'}
                                        name={"phone"}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </>
                            )
                        }
                    }
                })()}


                <div className='d-flex justify-content-between'>
                    {formType === 'login' ? (
                        <p>Not register yet ? Register
                            <Link to='/register'> Here !</Link>
                        </p>
                    ) : (<p> Already User Please
                        <Link to='/login'> Login !</Link>
                    </p>)}
                    <button className='btn btn-primary' type='submit' >
                        {submitBtn}
                    </button>
                </div>
            </form>
        </>
    );
}

export default Form;
