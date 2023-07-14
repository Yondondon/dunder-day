import React, { FC, useEffect, useState } from 'react';
import { useAddReactionMutation } from '../../api/apiSlice';

type Props = {
  name: 'heart' | 'poop';
  quantity: number;
  isDisabled: boolean;
  setIsDisabled: (value: boolean) => void;
  appID: string;
}

export const ReactionItem: FC<Props> = ({ name, quantity, isDisabled, setIsDisabled, appID }) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [addReaction, ] = useAddReactionMutation()

  useEffect(() => {
    let reactionName = localStorage.getItem('reaction');
    if(reactionName === name) {
      setIsHighlighted(true);
    }
  })

  const handleClick = () => {
    if(!isDisabled) {
      const reactions = JSON.parse(localStorage.getItem('reactions') as any);
      if(reactions) {
        setIsDisabled(true);
        addReaction({ reactionName: name, appID });
        reactions[appID] =  { reactionName: name, isReacted: true }
        localStorage.setItem('reactions', JSON.stringify(reactions));
      }
    }
  }

  return (
    <button
      className={`reaction_item ${isHighlighted ? 'highlighted' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <img src={`images/${name}.png`} alt='' />
      <span>{quantity}</span>
    </button>
  )
}