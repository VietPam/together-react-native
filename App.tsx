import { PropsWithChildren } from "react";
import {
  StyleSheet,
  Text, useColorScheme,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from 'store/index';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  

  return (
    <Provider store={store}>
      <MeetingContextComponent>
        <SafeAreaProvider>
          {/* <Navigator /> */}
          <Navigator />
        </SafeAreaProvider>
      </MeetingContextComponent>
    </Provider>
  );
}

export default App;



