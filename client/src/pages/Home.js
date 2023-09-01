import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import moment from 'moment'
import Layout from '../components/shared/form/layout/Layout';
import Modal from '../components/shared/modal/Modal';
import API from '../services/API';
import { useNavigate } from 'react-router-dom';




const Home = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const getBloodRecord = async () => {
        try {
            const { data } = await API.get('/invantory/get-invantory')
            if (data?.success) {
                setData(data?.invantory)
                //  console.log(data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getBloodRecord();
    }, [])

    return (
        <Layout>
            <>
                {user?.role === 'admin' && navigate('/admin')}
                <div className='container'>
                    <h4
                        className='ms-4'
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus text-success py-4"></i>
                        Add Invantory
                    </h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Blood Group</th>
                                <th scope="col">Invantory Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Doner Email</th>
                                <th scope="col">Time & Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.bloodGroup}</td>
                                    <td>{record.invantoryType}</td>
                                    <td>{record.quantity} ML </td>
                                    <td>{record.email}</td>
                                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal />
                </div>
            </>
        </Layout>
    );
}

export default Home;
