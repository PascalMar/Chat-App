// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import FireBase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA_n0eG66tB1x-UOSQLN1BByvWEKTjIyMw",
    authDomain: "chat-app-b2e1c.firebaseapp.com",
    projectId: "chat-app-b2e1c",
    storageBucket: "chat-app-b2e1c.appspot.com",
    messagingSenderId: "403118430405",
    appId: "1:403118430405:web:8961106ea03da400d378ac",
    measurementId: "G-CS0T5P04Y9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);





  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db}  {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
