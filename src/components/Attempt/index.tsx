import React from 'react';

import Square from '../Square';

import styles from './styles.module.scss';

interface Props {
    values: [string, status][];
}

const Attempt = ({ values }: Props) => {
    return (
        <div className={styles.attempt}>
            {values.map(([value,status],i) => (
                <Square key={`${value}-${i}`} value={value} status={status}/>
            ))}
        </div>
    )
}

export default Attempt;