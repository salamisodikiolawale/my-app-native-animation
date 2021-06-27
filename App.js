import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animation from './Animations';

export default function App() {
  return (
      <Animation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'blue'
  },
});
