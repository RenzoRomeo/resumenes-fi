import { View } from 'react-native';
import { useState } from 'react';
import { signUp } from '../firebase';
import { Center, Input, Icon, Stack, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);

  const createUser = () => {
    signUp(email, password, { email, name, lastName });
  };

  return (
    <View>
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
            placeholder="Name"
            size="lg"
            type="text"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Input
            placeholder="Last Name"
            size="lg"
            type="text"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
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
                onPress={() => {
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
    </View>
  );
};

export default Signup;
