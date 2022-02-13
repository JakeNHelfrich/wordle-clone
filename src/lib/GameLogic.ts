import cloneDeep  from "lodash/cloneDeep";
import zip from "lodash/zip";

export function getCurrentAttempt(state: State): Attempt {
    return state.attempts[state.currentAttempt];
}

export function appendKeyToAttempt(attempt: Attempt, key: string): Attempt {
    const nextLetter = attempt.values.indexOf('');
    const newAttempt = cloneDeep(attempt);
    if (nextLetter === -1) return newAttempt;
    newAttempt.values[nextLetter] = key;

    return newAttempt;
}

export function appendUpdatedAttempt(state: State, attempt: Attempt): State {
    const newState = cloneDeep(state);
    newState.attempts[state.currentAttempt] = attempt;
    return newState;
}

export function removeFromAttempt(attempt: Attempt): Attempt {
    const currentLetter = attempt.values.indexOf('') - 1;
    const newAttempt = cloneDeep(attempt);
    if (currentLetter === -1) return newAttempt;
    newAttempt.values[currentLetter !== -2 ? currentLetter : newAttempt.values.length - 1] = '';
    return newAttempt;

}

export function updateAttemptStatus(attempt: Attempt, status: status[]){
    const newAttempt = cloneDeep(attempt);
    newAttempt.status = status;
    return newAttempt;
}

export function checkword(word: string, answer: string): status[] {
    return zip(word.split(""), answer.split("")).map(([w,a]) => {
        if (w === '' || w === undefined){
            return '-'
        }
        else if (w === a) {
            return 'c'
        } else if (answer.includes(w!)) {
            return 'i'
        } else {
            return 'w'
        }
    })
}

export function nextAttempt(state: State): State {
    const newState = cloneDeep(state);
    newState.currentAttempt = newState.currentAttempt + 1;
    return newState
}

export function complete(status: status[]): boolean {
    return !status.filter((s) => s !== 'c').length
}

export function attemptComplete(attempt: Attempt): boolean {
    return !attempt.values.filter((v) => !v).length;
}