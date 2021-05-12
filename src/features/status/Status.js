import React from 'react';
import { find } from 'lodash';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { LEVELS } from 'const';
import { startGame } from 'features/game/slice';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Status = ({ flags, currentLevel }) => {
  const dispatch = useDispatch();

  return (
    <caption className={cx('status')}>
      <div className={cx('status__content')}>
        <label>Level:</label>
        <select
          defaultValue={currentLevel}
          onChange={(evt) => {
            const newLevel = find(
              LEVELS,
              (lev) => lev.label === evt.target.value,
            );

            dispatch(startGame(newLevel));
          }}
        >
          {Object.values(LEVELS).map((level) => (
            <option value={level.label} key={level.label}>
              {level.label}
            </option>
          ))}
        </select>
      </div>
      <div className={cx('status__content')}>flags: {flags}</div>
    </caption>
  );
};

export default Status;
