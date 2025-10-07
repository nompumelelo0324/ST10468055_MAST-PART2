import React, { useState } from 'react';
import { 
  SafeAreaView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert 
} from 'react-native';
import { Course, MenuItem } from '../components/types';

type AddItemScreenProps = {
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
};

const COURSES: Course[] = ['Starter', 'Main', 'Dessert'];

export default function AddItemScreen({ onSave, onCancel }: AddItemScreenProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Validation', 'Please enter a dish name');
    if (!description.trim()) return Alert.alert('Validation', 'Please enter a description');
    const parsed = parseFloat(price);
    if (isNaN(parsed) || parsed <= 0) return Alert.alert('Validation', 'Please enter a valid price');

    onSave({
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsed,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Add New Menu Item</Text>

          <TextInput
            placeholder="Dish name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          <Text style={styles.label}>Select Course:</Text>
          <View style={styles.courseRow}>
            {COURSES.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.courseButton, course === c && styles.courseButtonSelected]}
                onPress={() => setCourse(c)}
              >
                <Text style={course === c ? styles.courseTextSelected : styles.courseText}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Price (R)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  label: { fontWeight: 'bold', marginBottom: 6 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  courseButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  courseButtonSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  courseText: { color: '#333' },
  courseTextSelected: { color: '#fff' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 6, marginHorizontal: 5 },
  cancel: { backgroundColor: '#aaa' },
  save: { backgroundColor: '#007AFF' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
