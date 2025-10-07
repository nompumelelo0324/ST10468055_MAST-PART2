import React, { useState } from 'react';
import HomeScreen from './screens/Homescreen';
import AddItemScreen from './screens/AddItemscreen';
import { MenuItem } from './components/types';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [screen, setScreen] = useState<'home' | 'add'>('home');

  const addItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
    setScreen('home');
  };

  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  return screen === 'home' ? (
    <HomeScreen menuItems={menuItems} onAddPress={() => setScreen('add')} onRemove={removeItem} />
  ) : (
    <AddItemScreen onSave={addItem} onCancel={() => setScreen('home')} />
  );
}
