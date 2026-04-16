import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../services/auth.service';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const { login } = useAuth();

  const handleSelectRole = (role: string) => {
    const fakeUser: User = {
      id: role + '_demo_123',
      email: `${role}@demo.com`,
      username: `${role.charAt(0).toUpperCase() + role.slice(1)} Demo`,
      role: role as 'user' | 'admin' | 'vendor',
      points: 10000,
      balance: 500000,
    };
    login(fakeUser);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SMart UI Explorer</Text>
        <Text style={styles.subtitle}>Select a role to view its corresponding interface without connecting to backend.</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#007AFF' }]} 
            onPress={() => handleSelectRole('user')}
          >
            <Text style={styles.buttonText}>Enter as USER</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#FF3B30' }]} 
            onPress={() => handleSelectRole('admin')}
          >
            <Text style={styles.buttonText}>Enter as ADMIN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#FF9500' }]} 
            onPress={() => handleSelectRole('vendor')}
          >
            <Text style={styles.buttonText}>Enter as VENDOR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          Note: This is a standalone UI mode. Some actions may cause errors if they strictly require backend connection. Most data is mocked or handled via fixed states.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 350,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 40,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
