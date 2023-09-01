import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Layout from '../../components/shared/form/layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Organization = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth)
    const getOrg = async () => {
        try {
            if (user?.role === 'doner') {
                const { data } = await API.get('/invantory/get-organization');
                // console.log(data);
                if (data?.success) {
                    setData(data?.organisations)
                }
            }
            if (user?.role === 'hospital') {
                const { data } = await API.get('/invantory/get-organization-for-hospital ');   //get-organization-for-hospital
                // console.log(data);
                if (data?.success) {
                    setData(data?.organisations)
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getOrg();
    }, [user])

    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.organizationName}</td>
                            <td>{record.email}  </td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Organization;
