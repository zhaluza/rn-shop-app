export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

const apiKey = 'AIzaSyBr32KBLwIAAcBFOMGe1NgHq2VWyjOmC6k';

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong with signup');
    }
    const resData = await response.json();
    console.log({ resData });
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong with logging in');
    }
    const resData = await response.json();
    console.log({ resData });
    dispatch({ type: LOGIN });
  };
};
