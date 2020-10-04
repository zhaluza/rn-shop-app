import React, { useReducer, useCallback } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { formReducer, FORM_INPUT_UPDATE } from './utils/formReducer';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const AuthScreen = () => {
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
  });

  const signUpHandler = () => {
    dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password));
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
          <ScrollView>
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
              <Button title="Sign Up" color={Colors.primary} onPress={signUpHandler} />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Switch to Login" color={Colors.accent} onPress={() => {}} />
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
