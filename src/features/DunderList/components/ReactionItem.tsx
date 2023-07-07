import React, { FC, useState } from 'react';

type Props = {
  name: string;
  quantity: string;
}

export const ReactionItem: FC<Props> = ({name, quantity}) => {
  //тимчасово для наглядності
  const [isActive, setIsActive] = useState<boolean>(false);
  const [qnt, setQnt] = useState<number>(Number(quantity));

  const handleClick = () => {
    isActive ? setQnt(qnt - 1) : setQnt(qnt + 1);
    setIsActive(!isActive);
  }
  //кінець тимчасового блоку

  return (
    <div className={`reaction_item_wrap ${isActive ? 'active' : ''}`} onClick={handleClick}>
      <img src={`images/${name}.png`} alt='' />
      <span>{qnt}</span>
    </div>
  )
}