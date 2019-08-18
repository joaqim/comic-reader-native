import React from 'react';
import { ScrollView, StyleSheet, Text, Dimensions, View, Image, StatusBar, TouchableOpacity, PanResponder } from 'react-native';

import ImageViewer from '../components/ImageViewer';
import CarouselPager from 'react-native-carousel-pager';

import { getImagesArray, getComicDatabaseAsync } from '../utils/comicUtils.js';

import axios from 'axios'
const comic_name = 'Vol.28 Ch.0263 - Pirate Nami and the Sky Knight vs. Vice Captains Hotori and Kotori (gb) [PowerManga]';
//const comic_name = 'Vol.33 Ch.0308 - Obstacle Warfare (gb) [PowerManga]'


const w = Dimensions.get('window')




export default class ComicScreen extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      img_arr: [],
      page_nr: 0,
      pages: [],
      page: {},
      data_loaded: false,
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,

      onShouldBlockNativeResponder: (evt, gestureState) => false,
      //onMoveShouldSetPanResponder: (evt, gestureState) => true,
      //onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderRelease: ({nativeEvent: { touches } }, { x0, y0, moveX }) => {
        // if on right side of screen
        console.warn('change Page')
        if (x0 > (Dimensions.get('window').width / 2)){
          this.nextPage();
        } else {
          this.prevPage();
        }

      }
    })
  }


  prevPage() {
    let new_page_nr = this.state.page_nr-1
    this.setState({page_nr: new_page_nr})
    this.imageViewer.scrollToIndex(new_page_nr)
  }

  nextPage() {
    let new_page_nr = this.state.page_nr+1
    this.setState({page_nr: new_page_nr})
   this.imageViewer.scrollToIndex(new_page_nr)
  }


  refreshPages = (data=undefined, page_nr=undefined) => {
    if(data == undefined) {
      console.error('refreshPages: data is undefined')
      return
    }
    if(page_nr == undefined ) {
      page_nr = this.state.page_nr
    }

    //let pages = loadComic(data['One Piece - Digital Colored Comics'], comic_name)
    //let page = pages[page_nr]
    let pages = []
    let page = {}

    let img_data = data['One Piece - Digital Colored Comics'][comic_name]
    //let img_arr = Object.entries(img_data)

 //   let img_arr = Object.keys(img_data).map(i => img_data[parseInt(i, 10)])
    const toNumericPairs = input => {
      const entries = Object.entries(input);
      return entries.map(entry => Object.assign(entry, { 0: +entry[0] }));
    }

    /*
    img_arr =  []
    Object.entries(img_data).map(([key, source], i) => {
      img_arr[parseInt(key, 10)] = source
    })
    */

    //let img_arr = toNumericPairs(img_data)
//    img_arr.pop()

    img_arr = getImagesArray(img_data)

    //console.log(img_arr[0])

    this.setState({
      page_nr: page_nr,
      pages: pages,
      page: page,

      img_arr: img_arr,
      data: data,
      data_loaded: true,
    })
  }

  //getKey = (key) => {return ("navigation" in this.props ? this.props.navigation.state.params.data[key] : [])}

  componentDidMount() {
    if (this.props.data_loaded) {
      refreshPages(data=this.props.data)
      return
    }

    /**/
    {axios.get('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json')
          .then(response => {

            //this.props.navigation.navigate('Comic', { data: response.data, data_loaded: true })
            //this.props.navigation.setParams({
              //'data': response.data,
              //'page_nr': this.state.page_nr})
            this.refreshPages(response.data)
          })
    }
    /**/
    //this.refreshPages(getComicDatabaseAsync().data);
    StatusBar.setHidden(true);
  }
  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    //console.log(this.state.img_arr[this.state.page_nr])

    return (
      <View //style={{flex: 1}}
      {...this._panResponder.panHandlers}
      style={styles.container}>

      <ImageViewer
      ref={ref => {this.imageViewer = ref}}
        //activeImageIndex={this.state.page_nr}
        images={this.state.img_arr}
        style={styles.image}
        />
      </View>
    );
    return (
      <View
      {...this._panResponder.panHandlers}
      style={styles.container}>
      <Text>ComicScreen</Text>
      {(this.state.data_loaded && true) ?

       <>
        <TouchableOpacity
        {...this._panResponder.panHandlers}
        style={styles.image}
        />
        <ImageViewer
        {...this._panResponder.panHandlers}
        activeImageIndex={parseInt(this.state.page_nr)}
        images={this.state.img_arr}
        style={styles.image}
        />
        </>
 : null}

      </View>
    );
  }
}

//<Image src={'comics/current/Vol.28+Ch.0263+-+Pirate+Nami+and+the+Sky+Knight+vs.+Vice+Captains+Hotori+and+Kotori+(gb)+%5BPowerManga%5D/001.png'}/>
ComicScreen.navigationOptions = {
  title: 'Comic',
  header: null
};

/*
   <Image
   source={{uri: encodeURI('https://comic-editor.s3.eu-north-1.amazonaws.com/One Piece - Digital Colored Comics/comics/current/Vol.28+Ch.0263+-+Pirate+Nami+and+the+Sky+Knight+vs.+Vice+Captains+Hotori+and+Kotori+(gb)+%5BPowerManga%5D/007.png')}}
   style={styles.image}
   />
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  }
});
