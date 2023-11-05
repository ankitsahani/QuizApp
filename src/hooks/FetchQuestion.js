import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper.js";

/**redux actions**/
import * as Action from "../redux/question_reducer.js"
/*** This is fetch question hook to fetch api data and set value to store ***/
export const useFetchQuestion = () => {

    const dispach = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));
        /***async function to fetch backend data***/
        (async () => {
            try {
                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/questions`, (data) => data);
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }))
                    setGetData(prev => ({ ...prev, apiData: questions }))
                    /**dispach an action**/
                    dispach(Action.startExamAction({ questions, answers }))
                } else {
                    throw new Error("No question is available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }))
                setGetData(prev => ({ ...prev, serverError: error }))
            }
        })();
    }, [dispach]);

    return [getData, setGetData];
}

/*** Move Next action dispatch function ***/
export const MoveNextAction = () => async (dispach) => {
    try {
        dispach(Action.moveNextAction());
    } catch (error) {
        console.log(error);
    }
}
/*** Move Prev action dispatch function ***/
export const MovePrevAction = () => async (dispach) => {
    try {
        dispach(Action.movePrevAction());
    } catch (error) {
        console.log(error);
    }
}