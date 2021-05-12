import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import {
  addFlag,
  removeFlag,
  flipTile,
  checkIfWon,
  endGame,
} from 'features/game/slice';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Tile = ({ flipped, alternate, number, x, y, isBomb }) => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

  return (
    <div
      className={cx('tile', {
        alternate,
        flag,
        flipped,
      })}
    >
      {flipped ? (
        number || ''
      ) : (
        <button
          className={cx('button')}
          onContextMenu={(evt) => {
            evt.preventDefault();
            setFlag(!flag);
            flag ? dispatch(removeFlag()) : dispatch(addFlag());
          }}
          onClick={() => {
            if (isBomb) {
              dispatch(endGame());
            } else {
              dispatch(flipTile({ x, y }));
              dispatch(checkIfWon());
            }
          }}
        />
      )}
    </div>
  );
};

export default Tile;
