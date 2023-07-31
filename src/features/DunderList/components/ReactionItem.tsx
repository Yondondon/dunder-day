import React, { FC, useEffect, useState } from 'react';
import { useAddReactionMutation } from '../../api/apiSlice';

type Props = {
  name: 'heart' | 'poop';
  quantity: number;
  isDisabled: boolean;
  setIsDisabled: (value: boolean) => void;
  gameName: string;
  onReaction: () => void;
}

export const ReactionItem: FC<Props> = ({ name, quantity, isDisabled, setIsDisabled, gameName, onReaction }) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [addReaction, ] = useAddReactionMutation()

  useEffect(() => {
    const reactions = JSON.parse(localStorage.getItem('reactions') as any);
    if(reactions[gameName] && reactions[gameName].reactionName === name) {
      setIsHighlighted(true)
    }
  })

  const handleClick = () => {
    
    if(!isDisabled) {
      const reactions = JSON.parse(localStorage.getItem('reactions') as any);
      if(reactions) {
        setIsDisabled(true);
        addReaction({ reactionName: name, gameName })
          .unwrap()
          .then((response) => {
            console.log(response)
            reactions[gameName] = { reactionName: name, isReacted: true }
            localStorage.setItem('reactions', JSON.stringify(reactions));
            onReaction()
          })
          .catch((error) => {
            console.log('Ой, щось пішло не так')
          })
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