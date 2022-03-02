import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Center, Stack, Input, Button, Icon } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const login = () => {
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && !user && (
        <Center w="full" alignItems="center" px="10px" mt={10}>
          <Stack w="60%" maxW="300px" space={5}>
            <Input
              placeholder="Email"
              size="lg"
              type="text"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              InputLeftElement={
                <Icon size="6" as={<AntDesign name="mail" />} ml={2} />
              }
            />
            <Input
              placeholder="Password"
              size="lg"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              InputRightElement={
                <Icon
                  size="6"
                  mr={2}
                  as={<Ionicons name={showPass ? 'eye' : 'eye-off'} />}
                  onTouchEnd={() => {
                    setShowPass(!showPass);
                  }}
                />
              }
            />
          </Stack>
          <Button w="60%" maxW="300px" mt={5} onPress={login}>
            Log In
          </Button>
        </Center>
      )}
    </View>
  );
};

export default Login;
