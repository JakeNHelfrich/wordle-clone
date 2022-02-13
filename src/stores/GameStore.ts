import { makeAutoObservable } from "mobx";
import zip from 'lodash/zip'
import { submitPuzzleForUser } from "../lib/ApiService";

class GameStore {
    attempts: Attempt[] = [];
    currentInd = 0;
    solution = "";
    ended = false;

    constructor() {
        makeAutoObservable(this);
    }

    get currentAttempt() {
        return this.attempts[this.currentInd];
    }

    set appendKeyToCurrent(key: string) {
        const nextLetter = this.currentAttempt.values.indexOf('');
        if (nextLetter === -1) return;
        this.currentAttempt.values[nextLetter] = key;
    }

    set removeLastKey(dummy: string) {
        const currentLetter = this.currentAttempt.values.indexOf('');
        if (currentLetter <= 0) return;
        this.currentAttempt.values[currentLetter] = '';
    }

    set updateStatus(status: status[]){
        this.currentAttempt.status = status;
    }

    get results(){
        return zip(this.solution.split(''), this.currentAttempt.values)
            .map(([w,a]) => {
                if (w === '' || w === undefined){
                    return '-'
                }
                else if (w === a) {
                    return 'c'
                } else if (this.solution.includes(w!)) {
                    return 'i'
                } else {
                    return 'w'
                }
            })
    }

    nextAttempt() {
        this.currentInd = this.currentInd + 1;
    }

    get complete() {
        return !this.results.filter((r) => r !== 'c').length
    }
    
    get attemptComplete(){
        return this.currentAttempt.values.filter((v) => !v).length;
    }

    processAttempt() {
        if(!this.attemptComplete) return;
        if(this.complete) {
            this.ended = true;
            submitPuzzleForUser(window.localStorage.getItem('user')!, {
                word: this.solution,
                attempts: this.attempts.map((a) => a.values),
                numAttempts: this.currentInd + 1
            })
            this.updateStatus = this.results;
        }
    }
}