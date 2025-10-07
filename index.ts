import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

export type Course = 'Starter' | 'Main' | 'Dessert';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};
