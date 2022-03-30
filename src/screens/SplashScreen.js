import React from 'react';
import { StyleSheet, Text, Image, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import SplashImage from '../assets/splashsuit.png';
import Avatar from '../assets/ic_photo.png';

const Button: () => Node = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={styles.button}>
        <Text style={styles.titleButton}>{props.title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const TextField: () => Node = (props) => {
  return (
    <View style={styles.textFieldContainer}>
      <TextInput
        {...props}
        style={styles.textField}
      />
    </View>
  );
}

const SplahScreen: () => Node = () =>  {
  return (
    <ImageBackground source={SplashImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={Avatar} resizeMode="cover" style={styles.avatar} />
        </View>
        <View style={styles.field}>
          <TextField placeholder="Name" />
          <TextField placeholder="Palindrome" />
        </View>
        <Button onPress={() => {}} title="Check" />
        <Button onPress={() => {}} title="Next" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  avatar: {},
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  button: {
    backgroundColor: '#2B637B',
    borderRadius: 12,
    minHeight: 12*4,
    marginVertical: 15/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
  },
  field: {
    marginVertical: 18*2,
  },
  textFieldContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    minHeight: 12*4,
    marginVertical: 15/2,
    paddingHorizontal: 12/2,
    justifyContent: 'center',
  },
  textField: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 16,
    fontWeight: '500',
  },
  titleButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
})
export default SplahScreen;
