import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TextInput, View,  TouchableOpacity } from 'react-native';
import Avatar from '../assets/avatar.png';
import Back from '../assets/back.png';
import Snackbar from 'react-native-snackbar';
import { WebView } from 'react-native-webview';

const Navbar: () => Node = (props) =>  {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => props.goBack()}>
        <View style={styles.back}>
          <Image source={Back} resizeMode="cover" style={styles.avatar} />
        </View>
      </TouchableOpacity>
      <Text style={styles.navbarTitle}>{props.title}</Text>
      <View />
    </View>
  );
}


const WebScreen: () => Node = (props) =>  {
  const [avatar, setAvatar] = useState("tasd");

  const navigateToUser = () => {
    props.navigation.navigate("User");
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Navbar title="" goBack={() => props.navigation.goBack()}/>
        <WebView
          source={{ uri: 'https://suitmedia.com/' }}
          style={{ marginTop: 20 }}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {},
  avatarContainer: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {

  },
  button: {
    backgroundColor: '#2B637B',
    borderRadius: 12,
    minHeight: 12*4,
    marginVertical: 15/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 18,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginVertical: 18*2,
  },
  navbar: {
    backgroundColor: 'white',
    minHeight: 40,
    padding: 18,
    alignItems: 'center',
    flexDirection:'row',
    elevation: 3,
    justifyContent: 'space-between',
  },
  navbarTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#2B637B',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: 'grey',
    textAlign: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
  link: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#2B637B',
    textAlign: 'center',
    textDecorationLine:'underline',
  },
  titleButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  username:{
    fontFamily: 'Poppins-SemiBold',
    color: '#04021D',
    fontSize: 20,
  },
  welcome:{
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  welcomeContainer: {
    flex: 0.3,
    padding: 18,
    alignItems: 'flex-start',
  }
})
export default WebScreen;
