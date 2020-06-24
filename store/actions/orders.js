export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, total) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      'https://rn-shopping-app-af32b.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          total,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: total,
        date: date,
      },
    });
  };
};
