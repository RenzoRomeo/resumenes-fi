import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import { auth } from './src/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Home from './src/screens/Home';
import About from './src/screens/About';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import { signOut } from './src/firebase';

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
  const [user, loading, error] = useAuthState(auth);

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
