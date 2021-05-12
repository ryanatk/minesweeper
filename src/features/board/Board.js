import React from 'react';
import { sortBy, sortedUniq } from 'lodash';
import classNames from 'classnames/bind';

import Tile from 'features/tile/Tile';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Board = ({ level, tiles }) => {
  const rowNumbers = sortedUniq(tiles.map(({ y }) => y));

  return (
    <tbody>
      {rowNumbers.map((rowNum) => (
        <tr key={`row-${rowNum}`}>
          {sortBy(
            tiles.filter(({ y }) => y === rowNum),
            ['x'],
          ).map(({ x, y, isBomb, number, isFlipped }) => (
            <td className={cx('td')} key={`${x}-${y}`}>
              <Tile
                x={x}
                y={y}
                isBomb={isBomb}
                alternate={(x + y) % 2}
                number={number}
                flipped={isFlipped}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Board;
