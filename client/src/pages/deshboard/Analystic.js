import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/form/layout/Header';
import API from '../../services/API';

const Analystic = () => {
    const [data, setData] = useState([]);
    const colors = ["#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0060", "#22A699",]
    const getBloodGroupData = async () => {
        try {
            const { data } = await API.get('/analytics/bloodGroup-data');
            if (data?.success) {
                setData(data?.bloodGroupsData);
                //    console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBloodGroupData();
    }, [])
    return (
        <>
            <Header />
            <div className='d-flex flex-row flex-wrap'>
                {data?.map((record, i) => (
                    <div className="card m-2 p-1" key={i} style={{ width: '18rem', backgroundColor: `${colors[i]}` }}>
                        <div className="card-body" >
                            <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
                            <p className="card-text">
                                Total In : <b>{record.totalIn}</b> ML
                            </p>
                            <p className="card-text">
                                Total Out : <b>{record.totalOut}</b> ML
                            </p>
                        </div>
                        <div className='card-footer'>
                            <p className="card-text text-light bg-dark text-center">
                                Total Available : <b>{record.availabeBlood}</b> ML
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Analystic;
