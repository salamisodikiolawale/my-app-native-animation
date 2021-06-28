import React, { useEffect, useRef,useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Alert,Dimensions } from "react-native";


const {height, width} = Dimensions.get('window');
//Largeur et hauteur de la case
heightSmall = 150;
whidthSmall = 150;
//Detection du point central
const center_top = Math.round((height/2)-(heightSmall/2));
const center_left = Math.round((width/2)-(whidthSmall/2));

// console.log(center_left,center_top);

const Animat = () => {

    const [show_dash, setShow_dash] = useState(false);

    const pan= useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(

      PanResponder.create({
  
        onMoveShouldSetPanResponder: () => true,
  
        //detection de l'objet
        onPanResponderGrant: () => {

          setTimeout(()=>{
            setShow_dash(true);
          },100)

          pan.setOffset({
            x:pan.x._value,
            y: pan.y._value
          });

        },
        //Pendant le deplacement
        onPanResponderMove: Animated.event(
          [null, { dx: pan.x, dy: pan.y }],
          {useNativeDriver: false}
        ),
        //Pendant le relachement
        onPanResponderRelease: () => {
          setShow_dash(false);
          move(pan.x, pan.y);
          pan.flattenOffset();
        },
      
      })
    ).current;


  function move(panX, panY){

    const panX_str = Math.round(JSON.stringify(panX));
    const panY_str = Math.round(JSON.stringify(panY));

    const tolerance = 5;
    // console.log('Center',center_left,center_top, '|||', panX_str,  panY_str);

    if (  
      (panY_str>=center_top-tolerance && panY_str <=center_top+tolerance) 
      &&
      (panX_str>=center_left-tolerance && panX_str <=center_left+tolerance) 
    ) {
      alert("TU ES AU CENTRE");
    }

  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          backgroundColor: "tomato",
          borderRadius: 5,
          height: 150,
          width: 150,
          position:'absolute',
          transform: [{ translateX: pan.x }, { translateY: pan.y}]
        }}
        {...panResponder.panHandlers}
      >
   
      </Animated.View>
      {show_dash &&  <View style={styles.area}></View>}
     
    </View>
  );
}

const styles = StyleSheet.create({

  area : {
    position:'absolute',
    height: 150,
    width: 150,
    borderRadius: 5,
    top:center_top,
    left:center_left,
    borderRadius: 5,
    borderWidth:2,
    borderStyle: 'dashed',
    borderColor:'red',
  },
});

export default Animat;