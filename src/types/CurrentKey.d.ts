type status = '-' | 'c' | 'w' | 'i';

interface Attempt {
    values: string[];
    status: status[];
}

interface State {
    currentAttempt: number;
    attempts: Attempt[];
    solution: string;
    ended: boolean;
}

interface Submission {
    word: string;
    attempts: string[][];
    numAttempts: number;
}