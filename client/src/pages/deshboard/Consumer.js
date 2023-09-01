import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Layout from '../../components/shared/form/layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Consumer = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth)
    const getDoner = async () => {
        try {
            const { data } = await API.post('/invantory/get-invantory-hospital', {
                filters: {
                    invantoryType: 'out',
                    hospital: user?._id,
                }
            });
            // console.log(data);
            if (data?.success) {
                setData(data?.invantory)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDoner();
    }, [])

    return (
        <Layout>
            <div className='container mt-4'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Invantory Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.bloodGroup}</td>
                                <td>{record.invantoryType}</td>
                                <td>{record.quantity}</td>
                                <td>{record.email}</td>
                                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Consumer;
