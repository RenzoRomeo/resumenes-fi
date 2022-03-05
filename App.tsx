import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NativeBaseProvider, Spinner, Center } from 'native-base';
import { useEffect } from 'react';
import { serverTimestamp } from 'firebase/firestore';

import Home from './src/screens/Home';
import About from './src/screens/About';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Upload from './src/screens/Upload';
import { signOut } from './src/firebase';
import { updateUser } from './src/database';
import useUser from './src/hooks/useUser';
import MyFiles from './src/screens/MyFiles';

const Drawer = createDrawerNavigator();

interface CustomDrawerProps extends DrawerContentComponentProps {
  user?: boolean;
}

const CustomDrawerContent = ({ user, ...props }: CustomDrawerProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user && <DrawerItem label="Sign Out" onPress={signOut} />}
    </DrawerContentScrollView>
  );
};

export default function App() {
  const user = useUser();

  useEffect(() => {
    if (user) {
      updateUser(user.uid, {
        lastSeen: serverTimestamp(),
      });
    }
  }, [user]);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent
              user={user !== null && user !== undefined}
              {...props}
            />
          )}
        >
          {user ? (
            <>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Upload" component={Upload} />
              <Drawer.Screen name="My Files" component={MyFiles} />
              <Drawer.Screen name="About" component={About} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Signup" component={Signup} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
