import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { formReducer, FORM_INPUT_UPDATE } from './utils/formReducer';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editedProduct ? editedProduct.name : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      name: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'OK' }]);
      console.log(error);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    // cancel submit if the product name isn't valid
    if (!formState.formIsValid) {
      Alert.alert('Invalid input', 'Please enter all required info', [{ text: 'OK' }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    // if we're editing an existing product
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.name,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        // if we're adding a new product
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.name,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="name"
            label="Product Name"
            errorText="Please enter a valid name."
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.name : ''}
            initialValidity={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid URL."
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValidity={!!editedProduct}
            required
          />

          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price."
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description."
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValidity={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunc = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFunc}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
