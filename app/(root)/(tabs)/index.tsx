import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className='text-red-500 text-xl mb-4'>yoyo</Text>
      <Link href='/sign-in'>Sign In</Link>
      <Link href='/explore'>Explore</Link>
      {/* <Link href='/sign-in'>Sign In</Link> */}
      <Link
        href={{
          pathname: '/property/[id]',
          params: { id: 'new' },
        }}
      >
        Property
      </Link>
    </View>
  );
}
