import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppLayout = () => {
  const { isLoggedIn, loading } = useGlobalContext();
  if (loading) {
    return (
      <SafeAreaView className='h-full flex items-center justify-center'>
        <ActivityIndicator className='text-primary-300' size='large' />
        <Slot />
      </SafeAreaView>
    );
  }
  if (!isLoggedIn) return <Redirect href={'/sign-in'} />;
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
};

export default AppLayout;
