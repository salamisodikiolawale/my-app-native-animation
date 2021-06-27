import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Dimensions, Alert} from "react-native";

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [topPosition, setTopPosition] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0)
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  console.log(pan.x, pan.y)
  const {height, width} = Dimensions.get('window');
  const centerX = height/2;
  const centerY = width/2;
  let dPosition = { dx: pan.x, dy: pan.y };
//   if((pan.x._value < width/2 && pan.x._value >= 0) && (pan.y._value < height/2 && pan.y._value >= 0)){
//       Alert.alert("You")
//   }
  const panResponder = useRef(
      
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
          console.log('panResponder')
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (evt, gesturesState)=>{
          let touches = evt.nativeEvent.touches;
          if(touches.length == 1){
                setTopPosition(touches[0].pageY - centerY),
                setLeftPosition(touches[0].pageX - centerX)
          }
       [null,dPosition],
       {useNativeDriver: false}
       
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View 
    style={styles.container}
        onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setW(width)
        setH(height)
    }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,
    borderColor:'red',
    marginTop:35
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default App;