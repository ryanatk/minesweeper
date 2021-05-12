import React from 'react';

import Tile from './Tile';

export const Standard = () => <Tile />;
export const Alternate = () => <Tile alternate />;
export const Flag = () => <Tile flag />;
export const AlternateFlag = () => <Tile alternate flag />;
export const Flipped = () => <Tile flipped number={1} />;
export const FlippedAlternate = () => <Tile flipped alternate number={1} />;

const story = {
  title: 'Tile',
  component: Tile,
};

export default story;
