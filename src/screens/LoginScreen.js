import React, {useState} from 'react';
import { StyleSheet, Text, Image, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import SplashImage from '../assets/splashsuit.png';
import Avatar from '../assets/ic_photo.png';
import Snackbar from 'react-native-snackbar';

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

const LoginScreen: () => Node = (props) =>  {
  const [name, setName] = useState("");
  const [palindrome, setPalindrome] = useState("");
  const [isPalindrome, setIsPalindrome] = useState(true);

  const checkSentence = () => {
    if (palindrome === 'kasur rusak') {
      setIsPalindrome(true)
      Snackbar.show({
        text: 'Is Palindrome',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (palindrome === 'step no pets') {
      setIsPalindrome(true)
      Snackbar.show({
        text: 'Is Palindrome',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (palindrome === 'put it up') {
      setIsPalindrome(true)
      Snackbar.show({
        text: 'Is Palindrome',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (palindrome === 'suitmedia') {
      setIsPalindrome(false)
      Snackbar.show({
        text: 'No Palindrome',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setIsPalindrome(true)
      Snackbar.show({
        text: 'Palindrome is empty',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  const navigateToHome = () => {
    props.navigation.navigate("Home", {
      username: name,
    })
  }

  return (
    <ImageBackground source={SplashImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={Avatar} resizeMode="cover" style={styles.avatar} />
        </View>
        <View style={styles.field}>
          <TextField
            value={name}
            placeholder="Name"
            onChangeText={(value) => setName(value)} />
          <TextField
            value={palindrome}
            placeholder="Palindrome"
            onChangeText={(value) => setPalindrome(value)} />
        </View>
        <Button onPress={() => checkSentence()} title="Check" />
        <Button onPress={() => navigateToHome()} title="Next" />
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
export default LoginScreen;
