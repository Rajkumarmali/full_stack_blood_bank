import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/form/layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Doner = () => {
    const [data, setData] = useState([]);

    const getDoner = async () => {
        try {
            const { data } = await API.get('/invantory/get-doner');
            // console.log(data);
            if (data?.success) {
                setData(data?.doners)
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record, i) => (
                        <tr key={record._id}>
                            <td>{record.name || record.organizationName + "(ORG)"}</td>
                            <td>{record.email}  </td>
                            <td>{record.phone}</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Doner;
