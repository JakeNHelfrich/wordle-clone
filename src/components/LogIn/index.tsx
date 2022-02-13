import React, { useState } from 'react';
import { submitUser } from '../../lib/ApiService';

import styles from './styles.module.scss';

interface Props {
    setAlreadyLoggedIn: (loggedIn: boolean) => void;
}

const LogIn = ({ setAlreadyLoggedIn }: Props) => {
    const [user, setUser] = useState('')
    const [error, setError] = useState('');

    const onClick = async () => {
        const res = await submitUser(user);
        if (res.success) {
            window.localStorage.setItem('user', user);
            setAlreadyLoggedIn(true);
            setError('');
        } else {
          setError(res.error);
        }
      };

    return (
        <div className={styles.form}>
          <h1>Choose a username:</h1>
          {error && <p className={styles.error}>{error}</p>}
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
          <button onClick={onClick}>GO!</button>
        </div>
    )
}


export default LogIn;