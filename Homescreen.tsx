
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Course, MenuItem } from '../components/types';
import MenuItemCard from '../components/MenuItemCard';

type HomeScreenProps = {
  menuItems: MenuItem[];
  onAddPress: () => void;
  onRemove: (id: string) => void;
};

const COURSES: Course[] = ['Starter', 'Main', 'Dessert'];

const formatCurrency = (n: number) => `R${n.toFixed(2)}`;

export default function HomeScreen({ menuItems, onAddPress, onRemove }: HomeScreenProps) {
  const totalCount = menuItems.length;
  const averageByCourse = (c: Course) => {
    const items = menuItems.filter(i => i.course === c);
    if (items.length === 0) return 0;
    const sum = items.reduce((s, i) => s + i.price, 0);
    return sum / items.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      <View style={styles.summaryRow}>
        <Text>Total items: {totalCount}</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Average Price by Course</Text>
        {COURSES.map(c => (
          <View key={c} style={styles.statsRow}>
            <Text>{c}</Text>
            <Text>{formatCurrency(averageByCourse(c))}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items yet.</Text>}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onRemove={() => onRemove(item.id)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 10 },
  addButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 6 },
  addButtonText: { color: '#fff' },
  statsBox: { borderWidth: 1, borderColor: '#ccc', margin: 10, padding: 10, borderRadius: 8 },
  statsTitle: { fontWeight: 'bold', marginBottom: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#999' },
});
