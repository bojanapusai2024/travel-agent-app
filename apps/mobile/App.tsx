import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './src/navigation';

/**
 * Main application component
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
