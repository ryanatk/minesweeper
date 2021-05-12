import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { selectFlagsRemaining, selectTiles } from './slice';

import Status from 'features/status/Status';
import Board from 'features/board/Board';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export function Game() {
  const level = useSelector((state) => state.game.level);
  const tiles = useSelector(selectTiles);
  const flagsRemaining = useSelector(selectFlagsRemaining);

  return (
    <table className={cx('game')}>
      <Status currentLevel={level.label} flags={flagsRemaining} />
      <Board level={level} tiles={tiles} />
    </table>
  );
}
