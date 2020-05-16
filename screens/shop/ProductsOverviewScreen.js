import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

export default ProductOverviewScreen;
