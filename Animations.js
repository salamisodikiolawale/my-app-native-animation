import React, { useRef,useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Alert,Dimensions } from "react-native";

const App = () => {
  
  const pan = useRef(new Animated.ValueXY()).current;
  const [state, setState] = useState({
    panX:0,
    panY:0,
    widthSmall:0,
    heightSmall:0
  });
  console.log(pan.x._value, pan.y._value)
  const {height, width} = Dimensions.get('window');
  function move(panX, panY){
    console.log('Center',window.Math.round((width/2)-state.widthSmall/2), window.Math.round((height/2)-state.heightSmall/2), '|||',  window.Math.round(panX._value), window.Math.round(panY._value))
    if((window.Math.round(panX._value) === window.Math.round(((width/2)-75)) && (window.Math.round(panY._value) === window.Math.round((height/2)-75)))){
    Alert.alert("Centre")
  }
  }
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }],{useNativeDriver: false}),
      onPanResponderRelease: () => {
        // pan.flattenOffset();
        
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setState({widthSmall : width, heightSmall: height})
    }}
        onTouchMove={() => move(pan.x, pan.y)}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {  
   
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  
  }
});

export default App;