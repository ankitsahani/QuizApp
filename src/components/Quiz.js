import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import { MoveNextAction, MovePrevAction } from '../hooks/FetchQuestion';
import { PushAnswer } from "../hooks/setResult";
import {Navigate} from 'react-router-dom';
/**redux store import**/
import { useSelector, useDispatch } from 'react-redux';

function Quiz() {
    const [checked, setChecked] = useState(undefined);
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispach = useDispatch();
    useEffect(() => {
        console.log(result)
    })
    /*** Next button event handler***/
    function onNext() {
        if (trace < queue.length) {
            /*Update the trace value by 1*/
            dispach(MoveNextAction());
            if (result.length <= trace) {
                dispach(PushAnswer(checked));
            }
            /*** reset the value of the checked variable ***/
            setChecked(undefined);
        }
    }
    /*** Previous button event handler***/
    function onPrev() {
        if (trace > 0) {
            /*Update the trace value by -1*/
            dispach(MovePrevAction());
        }
    }
    /****To get the value of radio button****/
    function onChecked(check) {
        setChecked(check);
    }
    /*** finish exam ***/
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>;
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            {/** Display Components **/}
            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace>0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>

        </div>
    );
}

export default Quiz;