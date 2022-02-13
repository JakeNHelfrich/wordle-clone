import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next'

import LogIn from '../components/LogIn';
import Grid from '../components/Grid';
import { getPuzzleForUser } from '../lib/ApiService';

import styles from './styles.module.scss';


const Home: NextPage = () => {
    const [user, setUser] = useState('');
    const [puzzle, setPuzzle] = useState('');
    const [alreadyLogin, setAlreadyLogin] = useState(false);
    const [finised, setFinished] = useState(false);
    
    useEffect(() => {
      const user = window.localStorage.getItem('user');
      if (!!user) {
        setAlreadyLogin(true);
        setUser(user);
        getPuzzleForUser(user).then((res) => setPuzzle(res.word));
      }
    }, []);
    
    return (
    <div className={styles.app}>
      {alreadyLogin ? (
        <>
          <Grid word={puzzle} setFinished={setFinished}/>
        </>
      ) : (
        <LogIn setAlreadyLoggedIn={setAlreadyLogin} />
      )}
    </div>
  )
}

export default Home
