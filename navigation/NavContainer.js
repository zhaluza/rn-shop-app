import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ShopNavigator from './ShopNavigator';

const NavContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((store) => !!store.auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
    }
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};

export default NavContainer;
