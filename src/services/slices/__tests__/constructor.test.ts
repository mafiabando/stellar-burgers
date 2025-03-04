import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../constructor-slice';

const initialState = {
  bun: null,
  ingredients: []
};

const mockIngredient = {
  bun: {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 20,
    fat: 10,
    carbohydrates: 40,
    calories: 200,
    price: 100,
    image: 'image1.jpg',
    image_large: 'image_large1.jpg',
    image_mobile: 'image_mobile1.jpg'
  },
  ingredients: [
    {
      _id: '2',
      name: 'Test Ingredient 2',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'image2.jpg',
      image_large: 'image_large2.jpg',
      image_mobile: 'image_mobile2.jpg'
    },
    {
      _id: '3',
      name: 'Test Ingredient 3',
      type: 'sauce',
      proteins: 30,
      fat: 15,
      carbohydrates: 60,
      calories: 300,
      price: 150,
      image: 'image3.jpg',
      image_large: 'image_large3.jpg',
      image_mobile: 'image_mobile3.jpg'
    }
  ]
};

describe('constructorReducer', () => {
  it('should handle addIngredient for buns', () => {
    const action = addIngredient(mockIngredient.bun); // Добавляем булку (type: 'bun')
    const newState = constructorReducer(initialState, action);

    expect(newState.bun).toBeDefined();
    expect(newState.bun?._id).toBe('1');
    expect(newState.bun?.name).toBe('Test Ingredient 1');
  });

  it('should handle addIngredient for other ingredients', () => {
    const action = addIngredient(mockIngredient.ingredients[0]); // Добавляем начинку (type: 'main')
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('2');
    expect(newState.ingredients[0].name).toBe('Test Ingredient 2');
  });

  it('should handle addIngredient for multiple ingredients', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredient.bun)
    ); // Добавляем первый ингредиент
    state = constructorReducer(
      state,
      addIngredient(mockIngredient.ingredients[0])
    ); // Добавляем второй ингредиент

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('2');
    expect(state.bun?._id).toBe('1');
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient.bun, id: 'id1' },
        { ...mockIngredient.ingredients[0], id: 'id2' }
      ]
    };

    const action = removeIngredient({ ...mockIngredient.bun, id: 'id1' }); // Удаляем первый ингредиент
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('id2');
  });

  it('should handle moveIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient.ingredients[0], id: 'id1' },
        { ...mockIngredient.ingredients[1], id: 'id2' }
      ]
    };

    const action = moveIngredient({ index: 1, upwards: true });
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState.ingredients[0].id).toBe('id2');
    expect(newState.ingredients[1].id).toBe('id1');
  });

  it('should handle resetConstructor', () => {
    const stateWithIngredients = {
      bun: { ...mockIngredient.bun, id: 'id1' },
      ingredients: [
        { ...mockIngredient.ingredients[0], id: 'id2' },
        { ...mockIngredient.ingredients[1], id: 'id3' }
      ]
    };

    const action = resetConstructor();
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
