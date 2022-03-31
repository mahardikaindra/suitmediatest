import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, FlatList, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Back from '../assets/back.png';
import Maps from '../assets/map.png';
import List from '../assets/ic_show_list.png';
import Snackbar from 'react-native-snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Navbar: () => Node = (props) =>  {
  const [viewRight, setViewRight] = useState(props.mapView)
  const rightContent = props.mapView ? List : Maps

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => props.goBack()}>
        <View style={styles.back}>
          <Image source={Back} resizeMode="cover"  />
        </View>
      </TouchableOpacity>
      <Text style={styles.navbarTitle}>{props.title}</Text>
      <TouchableOpacity onPress={() => props.changeView()}>
        <View style={styles.back}>
          <Image source={rightContent} resizeMode="contain" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const UserScreen: () => Node = (props) =>  {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [mapView, setView] = useState(false);

  useEffect(() => {
    getUsersFromApiAsync(page);
  }, []);

  useEffect(() => {
    if (props.dataUsers.page) {
      setPage(props.dataUsers.page);
      setTotalPage(props.dataUsers.total_pages);
    }
  }, [props.dataUsers.page]);

  const getUsersFromApiAsync = async (page) => {
    await setLoading(true);
    try {
      const result = await props.fetchingDataUser(page);
      await setLoading(false);
      if (!result) {
        Snackbar.show({
          text: 'Failed fetching data',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      await setLoading(false);
      Snackbar.show({
        text: 'Failed fetching data',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      await setLoading(false);
    }
  };

  const navigateToHome = () => {
    props.navigation.navigate("Home")
  }

  const renderContent = ({item}) => {
    return (
      <TouchableOpacity onPress={async () => {
          await props.selectedUser(item)
          await props.navigation.goBack()
        }}>
        <View style={styles.contentContainer}>
          <Image source={{uri: `${item.avatar}`}} resizeMode="contain" style={styles.avatar}/>
          <View>
            <Text style={styles.username}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Navbar title="Users"
          mapView={mapView}
          changeView={() => setView(!mapView)}
          goBack={() => props.navigation.goBack()} />
        <View style={styles.list}>
          {
            isLoading ? <ActivityIndicator /> : mapView ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            ) : (
              <FlatList
                data={props.dataUsers.data}
                extraData={props.dataUsers.data}
                renderItem={renderContent}
                ItemSeparatorComponent={() => (<View style={styles.separator}/> )}
                ListFooterComponent={() => {
                  if (props.dataUsers.data.length < props.dataUsers.total) {
                    return (
                      <ActivityIndicator style={styles.activityIndicator}/>
                    );
                  }
                  else {
                    return null;
                  }
                }}
                showsVerticalScrollIndicator={false}
                onRefresh={() => getUsersFromApiAsync(page)}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.8}
                onEndReached={() => {
                  if (props.dataUsers.page < props.dataUsers.total_pages) {
                    setTimeout(() => {
                      getUsersFromApiAsync(props.dataUsers.page + 1)
                    }, 1000)
                  }
                }}
                />
            )
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {

  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    marginRight: 20,
  },
  back: {

  },
  icon: {
    height: 20,
    width: 20,
  },
  list: {
    padding: 18,
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
  contentContainer: {
    flexDirection: 'row',
    marginVertical: 18/2,
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#E2E3E4',
    height: 1,
  },
  username:{
    fontFamily: 'Poppins-SemiBold',
    color: '#04021D',
    fontSize: 20,
  },
  email:{
    fontFamily: 'Poppins-Medium',
    color: '#686777',
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
  },
  safeAreaView: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  dataUsers: state.dataUsers,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
