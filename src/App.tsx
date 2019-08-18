import { createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './containers/Home';
import Settings from './containers/Settings';
import ComicScreen from './containers/ComicScreen';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import PageList from './components/PageList';

import { getComicDatabaseAsync, getComicDatabase } from './utils/comicUtils';

//const response = getComicDatabase()
//const comic_data = response.data
const comic_data = undefined

const App = createDrawerNavigator({
  //const App = createBottomTabNavigator({
  Comic: {
    screen: ComicScreen,
  },
  Settings: {
    screen: Settings,
  },

  
}, {

    //contentComponent: PageList
    contentComponent: ({ navigation }) => (
      <PageList navigation={navigation}
                data={comic_data}
      />)

}
);

export default App;
