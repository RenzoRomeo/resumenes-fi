import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Center, Input, Icon, Stack, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const createUser = () => {
    createUserWithEmailAndPassword(email, password);
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
          <Button w="60%" maxW="300px" mt={5} onPress={createUser}>
            Sign Up
          </Button>
        </Center>
      )}
    </View>
  );
};

export default Signup;
