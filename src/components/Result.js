import React from 'react';
import '../styles/Result.css'
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attemptsNumber, earnPointsNumber, flagResult } from '../helper/helper.js';
/**** Import action ****/
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult.js';
function Result(props) {
    const dispach = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    const totalPoints = queue.length * 10;
    const attempts = attemptsNumber(result);
    const earnPoints = earnPointsNumber(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);
    /** store user result **/
    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achived: flag ? "Passed" : "Failed"
    })
    function onRestart() {
        console.log('Restart');
        dispach(resetAllAction())
        dispach(resetResultAction())
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>
            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{userId}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points :</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts :</span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points :</span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result :</span>
                    <span style={{ color: `${flag ? "green" : "red"}` }} className='bold'>{flag ? 'Passed' : 'Failed'}</span>
                </div>
            </div>
            <div className='start'>
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
            <div className='container'>
                <ResultTable></ResultTable>
            </div>

        </div>
    );
}

export default Result;