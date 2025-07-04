import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { isLoggedIn, loading, refetch, user } = useGlobalContext();
  if (!loading && isLoggedIn) return <Redirect href={'/'} />;
  const handleLogin = async () => {
    console.log(isLoggedIn, loading);
    const res = await login();
    if (res) {
      refetch();
    } else {
      Alert.alert('Error: fauled to login');
    }
  };
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image
          source={images.onboarding}
          className='w-full h-4/6'
          resizeMode='contain'
        />
        <View className='px-10'>
          <Text className='uppercase text-base text-center font-rubik text-black-200'>
            Welcome to Restate
          </Text>
          <Text className='text-3xl font-rubik-medium text-black-300 text-center mt-2'>
            One step closer to {'\n'}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className='w-full rounded-xl bg-white shadow-md shadow-zinc-300 py-4 flex flex-row justify-center gap-4 items-center border border-solid border-primary-300 mt-12'
          >
            <Image
              source={icons.google}
              className='w-6 h-6'
              resizeMode='contain'
            />
            <Text className='font-rubik-semibold'>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
