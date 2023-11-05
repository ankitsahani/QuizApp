import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper.js';

function ResultTable(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log(`${process.env.REACT_APP_SERVER_HOSTNAME}/results`);
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/results`, (res) => {
            setData(res);
        })
        console.log(data);
    },[]);
    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Username</td>
                        <td>Attempts</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {!data ?? <div>No Data Found </div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achived || ""}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;