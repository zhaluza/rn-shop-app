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
      const errorResponseData = await response.json();
      let errorMessage = errorResponseData.error.message;
      if (errorMessage === 'EMAIL_EXISTS') {
        errorMessage = 'This email already exists';
      } else if (errorMessage === 'OPERATION_NOT_ALLOWED') {
        errorMessage = 'Password sign-in is disabled';
      } else if (errorMessage === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errorMessage =
          "We've blocked all requests from this device due to unusual activity. Please try again later";
      }
      throw new Error(errorMessage);
    } else {
      const resData = await response.json();
      console.log({ resData });
      dispatch({ type: SIGNUP });
    }
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
      const errorResponseData = await response.json();
      let errorMessage = errorResponseData.error.message;
      if (errorMessage === 'EMAIL_NOT_FOUND') {
        errorMessage = 'This email could not be found';
      } else if (errorMessage === 'INVALID_PASSWORD') {
        errorMessage = 'This password is not valid';
      }
      throw new Error(errorMessage);
    } else {
      const resData = await response.json();
      console.log({ resData });
      dispatch({ type: LOGIN });
    }
  };
};
