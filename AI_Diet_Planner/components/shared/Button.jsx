import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '@/shared/Colors';

export default function Button({ title, onPress, icon, loading = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        borderRadius: 15,
        opacity: loading ? 0.7 : 1, // Optional: visual feedback
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text style={{ fontSize: 18, color: Colors.WHITE, textAlign: 'center' }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
