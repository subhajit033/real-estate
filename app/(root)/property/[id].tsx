import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const PropertyDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>PropertyDetails - {id}</Text>
    </View>
  );
};

export default PropertyDetails;
