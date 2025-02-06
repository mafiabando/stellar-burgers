import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { moveIngredient, removeIngredient } from '../../services/slices/constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch()

    const handleMoveDown = () => {
      if (index > 0) dispatch(moveIngredient({index, upwards: true}))
    };

    const handleMoveUp = () => {
      if (index < totalItems - 1) dispatch(moveIngredient({index, upwards: false}))
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient._id))
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
