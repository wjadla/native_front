import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions, TextInput,Pressable} from 'react-native';
import styles from './styles';
import svg, { Image, Svg, Ellipse, ClipPath } from 'react-native-svg';
import Animated, {useSharedValue, useAnimatedStyle,interpolate,withDelay, withTiming, withSequence, withSpring} from 'react-native-reanimated';
import React, {useState} from 'react'

export default function App() {
  
  const {height, width } = Dimensions.get("window");
  
  const imagePosition = useSharedValue(1);

  const formButtonScale = useSharedValue(1);

  const [isRegistering, setIsRegistering]= useState(false);


  const imageAnimatedStyle =  useAnimatedStyle(()=>{
    const interpolation = interpolate(
      imagePosition.value, [0, 1], [-height /2 , 0])
    return {
      transform: [{translateY:  withTiming(interpolation, {duration: 1000})}]
    }
  })

  
  const loginHandler= () => {
      imagePosition.value = 0
      if(isRegistering) {
          setIsRegistering(false)
      }
  }

  const registerHandler= () => {
    imagePosition.value = 0
    if(!isRegistering) {
      setIsRegistering(true)
  }
}

  const buttonAnimatedStyle = useAnimatedStyle (() =>{
    const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
    return {
      opacity : withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
    }
  })

  const formAnimatedStyle = useAnimatedStyle (() =>{
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1,{duration:800})) : withTiming(0,{duration:300})
    }
  })

  const closeButtonContainerStyle = useAnimatedStyle (() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming (imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [{rotate: withTiming(interpolation + "deg", {duration: 1000})}]
    }
  })

  const formButtonAnimtedStyle = useAnimatedStyle (() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })
  
  return (
    <View style={styles.container}>
      <Animated.View style= {[StyleSheet.absoluteFill, imageAnimatedStyle]}>
     <Svg height={height } width={width}>
      <ClipPath id="clipPathId">
        <Ellipse cx={width / 2} rx={height} ry={height}/>
      </ClipPath>
      <Image href={require("./assets/Alteca_Toulouse.png")}
      width={width + 210 } 
      height={height + 100  }
      preserveAspectRatio="xMidyMid slice"
      clipPath="url(#clipPathId)"
      />
     </Svg>
     <View style= {styles.closeButtonContainer}>
      <Text onPress={() => imagePosition.value = 1}>X</Text>
     </View>
     </Animated.View>
     <View style={styles.bottomCotainer}>
      <Animated.View style={buttonAnimatedStyle}>
      <Pressable style={styles.button} onPress={loginHandler}>
        <Text style={styles.buttonText} >LOG IN</Text>
      </Pressable>
      </Animated.View>
     
      <Animated.View style={buttonAnimatedStyle}>
      <Pressable style={styles.button} onPress={registerHandler}>
        <Text style={styles.buttonText} >REGISTER</Text>
      </Pressable>
      </Animated.View>
    <Animated.View></Animated.View>
      <Animated.View style={[styles.fromInputContainer , formAnimatedStyle]}>
        <TextInput placeholder="Email" 
        placeholderTextColor="black" 
        style={styles.textInput}/>
        {isRegistering && (
          <TextInput placeholder="Nom" 
           placeholderTextColor="black"
           style={styles.textInput}/>
        )}
        
        <TextInput placeholder="Password" 
        placeholderTextColor="black" 
        style={styles.textInput}/>
        <Animated.View style= {[styles.formButton, formButtonAnimtedStyle]}>
            <Pressable onPress={() => formButtonScale.value =
               withSequence(withSpring(1.5), withSpring(1))}>
            <Text style={styles.buttonText}>{isRegistering ? 'REGISTER' : 'LOG IN'}</Text>
            </Pressable>
            
        </Animated.View>

      </Animated.View>
     </View>
    </View>
  );
}


