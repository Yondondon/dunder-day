import React, { FC } from 'react';

type Props = {
  onClick: () => void;
  isLoading: boolean;
}

export const LoadMoreBtn: FC<Props> = ({ onClick, isLoading }) => {
  return (
    <button
      className={`playedlist_loadmore_btn ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={isLoading}
    >
      { isLoading && <img src='images/lina_pes.png' alt='' /> }
      <span>Завантажити ще</span>
    </button>
  )
}