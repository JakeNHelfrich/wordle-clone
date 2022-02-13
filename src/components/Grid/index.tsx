import React, { useEffect, useReducer, useState } from 'react';
import range from 'lodash/range';
import zip from 'lodash/zip';
import cloneDeep from 'lodash/cloneDeep';
import { getCurrentAttempt, appendKeyToAttempt, appendUpdatedAttempt, removeFromAttempt, checkword, updateAttemptStatus, nextAttempt, complete, attemptComplete } from '../../lib/GameLogic';
import { submitPuzzleForUser } from '../../lib/ApiService';
import Attempt from '../Attempt';

import styles from './styles.module.scss';

interface Props {
    word: string;
    setFinished: (finished: boolean) => void;
}

interface Action {
    action: string;
    content?: string;
}

const Grid = ({ word: starterWord }: Props) => {
    const [processing, setProcessing] = useState(false);
    const [state, dispatch] = useReducer(Grid.reducer, Grid.initialState(starterWord));
    
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(!processing){
                setProcessing(true);
                dispatch({action: e.key.toLowerCase()});
                setProcessing(false);
            }
        });
    }, []);

    useEffect(() => {
        dispatch({action: "newWord", content: starterWord});
    }, [starterWord]);

    return (
        <div className={styles.grid}>
            {state.attempts.map((a,i) => <Attempt key={`${a.values.join('')}-${i}`} values={zip(a.values, a.status) as [string,status][]}/>)}
        </div>
    )
};

Grid.numAttempts = 6;
Grid.initialState = (solution: string) => ({
    currentAttempt: 0,
    attempts: range(Grid.numAttempts).map(() => ({values: ['', '', '', '', ''], status: ['-', '-', '-', '-', '-'] as status[]})),
    solution,
    ended: false,
});
Grid.reducer = (state: State, action: Action) => { 
    if (state.ended) return state;
    if (state.currentAttempt >= Grid.numAttempts) return state;
    let newState = cloneDeep(state);
    
    if (action.action === "newWord") {
        newState.solution = action.content!;
        return newState;
    }
    
    let attempt = getCurrentAttempt(state);
    let submitted = false;
    switch(action.action) {
        case 'backspace':
            attempt = removeFromAttempt(attempt);
            break;
        case 'enter':
            if (!attemptComplete(attempt)) return state;
            attempt = getCurrentAttempt(state);
            const result = checkword(attempt.values.join(''), state.solution);
            if (complete(result)) {
                newState.ended = true;
                
                submitPuzzleForUser(window.localStorage.getItem('user')!, {
                    word: state.solution,
                    numAttempts: state.currentAttempt + 1,
                    attempts: state.attempts.map((a) => a.values),
                });
            }
            attempt = updateAttemptStatus(attempt, result);
            submitted = true;
            break;
        case action.action.match(/^[a-zA-z]$/)?.input:
            attempt = appendKeyToAttempt(attempt, action.action);
            break;
    };

    newState = appendUpdatedAttempt(newState, attempt);; 
    if (submitted) {
        newState = nextAttempt(newState);
    }
    return newState
}

export default Grid;