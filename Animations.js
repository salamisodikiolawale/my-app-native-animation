// Components/Tests.js
import React, { useRef, useState } from "react";
import { PanResponder, Dimensions, View,StyleSheet, Alert, Animated  } from 'react-native'

export default class Animations extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: 0,
      leftPosition: 0,
      width:0,
      height: 0
    }
    //const pan = new Animated.ValueXY();
    var {height, width} = Dimensions.get('window');
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
      //   onPanResponderGrant: () => {
      //     console.log('panResponder')
      //   pan.setOffset({
      //     x: pan.x._value,
      //     y: pan.y._value
      //   });
      // },
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches;
            let directionH = touches[0].pageY - this.state.height/2;
            let directionW = touches[0].pageX - this.state.width/2;
            if (touches.length == 1) {
              if(( directionH < this.state.height/2 && directionH>=0) && 
                 ( directionW < this.state.width/2  &&  directionW>=0)){
                  this.setState({
                    topPosition: directionH,
                    leftPosition: directionW
                  })
                  const centerX = this.state.width/2;
                  const centerY = this.state.height/2;
                  console.log("direction",directionW, directionH)
                  if(directionH == centerY && directionH == centerY){
                    Alert.alert('Hello')
                  }
                   console.log("center",centerX, centerY)
                  //console.log(directionH + "  "+directionW +" "+height/2+"    "+width/2+"  "+this.state.width+"    "+this.state.height)
              }
                
            }
        }
    })
  }

  render() {
    return (
      <View 
        style={styles.main_container}
        onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({width:width, height:height})
        }}
      >
        <View
          {...this.panResponder.panHandlers}
          style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    borderWidth:1,
    borderColor:'red',
    marginTop:40,
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

