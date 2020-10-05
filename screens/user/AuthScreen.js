import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { formReducer, FORM_INPUT_UPDATE } from './utils/formReducer';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidity: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (formState.formIsValid) {
      if (isSignUp) {
        action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
      } else {
        action = authActions.login(formState.inputValues.email, formState.inputValues.password);
      }
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
        props.navigation.navigate('Shop');
      } catch (err) {
        console.log({ err });
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid email address and a password with 5 or more characters',
        [{ text: 'OK' }]
      );
    }
  };

  const inputChangeHandler = useCallback(
    (inputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputType,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#dff9fb', '#c7ecee']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Log In'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Signup'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Log In',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
