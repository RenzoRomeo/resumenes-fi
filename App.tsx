import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import { auth } from './src/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Home from './src/screens/Home';
import About from './src/screens/About';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          {user ? (
            <>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="About" component={About} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Signup" component={Signup} />
              <Drawer.Screen name="Login" component={Login} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
