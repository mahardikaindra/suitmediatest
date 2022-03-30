import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, FlatList, View,  TouchableOpacity } from 'react-native';
import Back from '../assets/back.png';
import Maps from '../assets/map.png';
import Snackbar from 'react-native-snackbar';

const Navbar: () => Node = (props) =>  {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => props.goBack()}>
        <View style={styles.back}>
          <Image source={Back} resizeMode="cover" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <Text style={styles.navbarTitle}>{props.title}</Text>
      <TouchableOpacity>
        <View style={styles.back}>
          <Image source={Maps} resizeMode="cover" style={styles.icon} />
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

  useEffect(() => {
    getUsersFromApiAsync(page);
  }, []);

  const getUsersFromApiAsync = (page) => {
    setLoading(true);
    return fetch(`https://reqres.in/api/users?page=${page}&amp;per_page=10`)
     .then((response) => response.json())
     .then((json) => {
       if (page <= json.total_pages) {
         if (page > 1) {
           setPage(json.page)
           setDataSource([...dataSource, ...json.data]);
           setLoading(false);
         } else {
           setPage(json.page)
           setDataSource(json.data);
           setLoading(false);
         }
       } else {
         Snackbar.show({
           text: 'Failed fetching data',
           duration: Snackbar.LENGTH_SHORT,
         });
         setDataSource([]);
         setLoading(false);
       }
     })
     .catch((error) => {
       console.error(error);
       Snackbar.show({
         text: 'Failed fetching data',
         duration: Snackbar.LENGTH_SHORT,
       });
       setDataSource([]);
       setLoading(false);
     });
  };
  const refreshUsersFromApiAsync = () => {
    setRefresh(true);
    return fetch('https://reqres.in/api/users?page=1&amp;per_page=10')
     .then((response) => response.json())
     .then((json) => {
       setDataSource(json.data);
       setRefresh(false);
     })
     .catch((error) => {
       console.error(error);
       Snackbar.show({
         text: 'Failed fetching data',
         duration: Snackbar.LENGTH_SHORT,
       });
       setDataSource([]);
       setRefresh(false);
     });
  };

  const navigateToHome = () => {
    props.navigation.navigate("Home")
  }

  const renderContent = ({item}) => {
    return (
      <View style={styles.contentContainer}>
        <Image source={{uri: `${item.avatar}`}} resizeMode="contain" style={styles.avatar}/>
        <View>
          <Text style={styles.username}>{item.first_name} {item.last_name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar title="Users" goBack={() => props.navigation.goBack()} />
      <View style={styles.list}>
        {
          isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={dataSource}
              renderItem={renderContent}
              ItemSeparatorComponent={() => (<View style={styles.separator}/> )}
              ListFooterComponent={() => (<ActivityIndicator style={styles.activityIndicator}/> )}
              showsVerticalScrollIndicator={false}
              onRefresh={() => refreshUsersFromApiAsync()}
              refreshing={isRefreshing}
              onEndReachedThreshold={0.8}
              onEndReached={() => setTimeout(() => {
                getUsersFromApiAsync(2)
              }, 2000)}
            />
          )
        }
      </View>
    </View>
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
})
export default UserScreen;
