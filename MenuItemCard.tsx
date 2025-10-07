import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../components/types';

type Props = {
  item: MenuItem;
  onRemove: () => void;
};

export default function MenuItemCard({ item, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.course}>({item.course})</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', padding: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  course: { fontStyle: 'italic', color: '#555' },
  rightCol: { alignItems: 'flex-end', justifyContent: 'space-between' },
  price: { fontWeight: 'bold' },
  removeButton: { backgroundColor: '#fee2e2', padding: 4, borderRadius: 6, marginTop: 4 },
  removeText: { color: '#b91c1c' },
});
