import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ComicScreen from '../screens/ComicScreen';

import PageList from '../components/PageList';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createDrawerNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createDrawerNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';


const ComicStack = createDrawerNavigator(
	{
		Comic: ComicScreen
	},
	{
		//contentComponent: PageList
	  contentComponent: ({ navigation }) => (
        <PageList navigation={navigation}/>),

	},
	config
);

ComicStack.navigationOptions = {
  tabBarLabel: 'Comic',
  header: null,
  tabBarVisible: false
  /*
  tabBarIcon: ({ focused }) => (
   <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
  */
};

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

//const tabNavigator = createBottomTabNavigator({
const tabNavigator = createStackNavigator({
  ComicStack,
  HomeStack,
  LinksStack,
  SettingsStack,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: false//navigation.state.routes[navigation.state.index].routeName === 'Comic'
  })
}
);




tabNavigator.path = '';

export default tabNavigator;
