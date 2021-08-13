import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import _ from 'lodash';
import useLocalStorage from 'use-local-storage-state';

export default function IngredientChecklist() {
  const dispatch = useDispatch();
  const [local, setLocal] = useLocalStorage('inProgressRecipes',
    { meals: {}, cocktails: {} });
  const [ingr, setIngr] = useState([]);
  const recipes = useSelector((state) => state.recipes);
  const { singleFood } = recipes;
  const { type, id } = singleFood;
  const foodType = {
    meals: 'meals',
    drinks: 'cocktails',
  };
  const fd = foodType[type];

  const handleCheckBox = ({ target }) => {
    const { name, checked } = target;
    const newIngr = produce(ingr,
      (draft) => (checked ? _.concat(draft, name) : _.pull(draft, name)));
    setIngr(newIngr);

    const newLocal = produce(local, (draft) => {
      if (checked) {
        draft[fd][id] = _.compact(_.concat(draft[fd][id], [name]));
      } else {
        draft[fd][id] = _.without(draft[fd][id], name);
      }
      return draft;
    });
    setLocal(newLocal);
  };

  useEffect(() => {
    if (local[fd][id]) {
      setIngr(local[fd][id]);
    }
  }, [local, ingr, fd, id]);

  function listIngredients(item) {
    const ingrList = _.filter(item, (value, key) => key.includes('Ingredient') && value);
    const msrList = _.filter(item, (value, key) => key.includes('Measure') && value);
    const combinedList = ingrList.map((el, i) => `${el} - ${msrList[i]}`);

    return combinedList.map((el, i) => {
      const checkstatus = () => ingr && ingr.includes(el);
      const styleObj = { textDecoration: checkstatus() ? 'line-through' : 'none' };
      return (
        <div
          key={ el }
          data-testid={ `${i}-ingredient-step` }
        >
          <label
            htmlFor={ `ingredient${i}` }
            style={ styleObj }
          >
            <input
              id={ `ingredient${i}` }
              type="checkbox"
              name={ el }
              checked={ ingr ? ingr.includes(el) : false }
              onChange={ (e) => handleCheckBox(e) }
              className="mx-3"
            />
            {el}
          </label>
        </div>
      );
    });
  }

  return (
    <div>
      {listIngredients(singleFood)}
    </div>
  );
}