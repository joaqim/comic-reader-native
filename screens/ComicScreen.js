import React from 'react';
import { ScrollView, StyleSheet, Text, Dimensions, View, Image, StatusBar } from 'react-native';

import ImageViewer from '../components/ImageViewer';

import axios from 'axios'
const comic_name = 'Vol.28 Ch.0263 - Pirate Nami and the Sky Knight vs. Vice Captains Hotori and Kotori (gb) [PowerManga]';


const w = Dimensions.get('window')




export default class ComicScreen extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      img_arr: [],
      page_nr: 7,
      pages: [],
      page: {},
      data_loaded: false,
    };
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

    let img_arr = data['One Piece - Digital Colored Comics'][comic_name]
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

    {axios.get('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json')
          .then(response => {
            //this.props.navigation.navigate('Comic', { data: response.data, data_loaded: true })
            this.props.navigation.setParams({
              'data': response.data,
              'page_nr': this.state.page_nr})
            this.refreshPages(response.data)
          })
    }
    StatusBar.setHidden(true);
  }
  componentWillUnmount() {
    StatusBar.setHidden(false);
  }
  
  render() {
    //console.log(this.state.img_arr[this.state.page_nr])
  return (
    <View style={styles.container}>
	<Text>ComicScreen</Text>
    {(this.state.data_loaded && true) ? <ImageViewer
      activeImageIndex={this.state.page_nr}
      images={this.state.img_arr}
      style={styles.image}
      /> : null}

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
