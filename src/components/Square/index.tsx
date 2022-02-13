import React from 'react';
import cc from 'classcat';

import styles from './styles.module.scss';

interface Props {
    value: string;
    status: status;
}

const Square = ({ value="", status }: Props) => {
    return (
        <div className={cc({[styles.cell]: true, [Square.statusMap[status]]: true, [styles.status]: !!Square.statusMap[status]})}>
            {value}
        </div>
    )
}

Square.statusMap = {
    'i': styles.present,
    'c': styles.correct,
    'w': styles.wrong,
    '-': '',
}

export default Square;