import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/form/layout/Layout';
import moment from 'moment';
import API from '../../services/API';

const OrgList = () => {
    const [data, setData] = useState([]);

    const getDoner = async () => {
        try {
            const { data } = await API.get('/admin/org-list');
            // console.log(data);
            if (data?.success) {
                setData(data?.orgData)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDoner();
    }, [])
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt('Are You Sure Want to Delete This Doner', "Sure");
            if (!answer) return;
            const { data } = await API.delete(`/admin/delet-doner/${id}`);
            alert(data?.message);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record, i) => (
                        <tr key={record._id}>
                            <td>{record.organizationName}</td>
                            <td>{record.email}  </td>
                            <td>{record.phone}</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                            <td><button className='btn btn-danger' onClick={() => handleDelete(record._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default OrgList;
