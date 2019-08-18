import React, { Component } from 'react'
import { StyleSheet, Image, ImageBackground, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import CarouselPager from 'react-native-carousel-pager';
import { ViewPager } from 'react-native-viewpager-carousel'

const ROOT_URL = 'https://comic-editor.s3.eu-north-1.amazonaws.com/'

export default class ImageViewer extends Component {
    constructor(props) {
        super(props)
      this.getImagesToPreload = this.getImagesToPreload.bind(this);
      this._renderPages = this._renderPages.bind(this);
    }

    static propTypes = {
        images: PropTypes.array,
        //images: PropTypes.object,
        activeImageIndex: PropTypes.number,
        initialPageIndex: PropTypes.number,
    };

    static defaultProps = {
        images: undefined,
        activeImageIndex: 0,
        initialPageIndex: 0,
    };

  scrollToIndex(value) {
    this.viewPager.scrollToIndex(value)
  }

    getImagesToPreload = () => {
        //return this.props.images.splice(this.props.activeImageIndex, 2);
        return this.props.images;
        //return this.props.images.slice(this.props.activeImageIndex, 2);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.activeImageIndex !== this.props.activeImageIndex) {
          //this.viewPager.scrollToIndex(this.nextProps.activeImageIndex)
          //return true
        }

        if(nextProps.images !== this.props.images) {
            return true
        }
        return false

    }


  componentDidMount() {
    //this.scrollToIndex(this.props.images.length - this.props.initialPage)
    //this.scrollToIndex(3)
  }

  _renderPage({data}) {
    return (
              //<View key={data.key}>
              //<Text>Key: {data.key}, Source: {data.source}</Text>
              //</View>
      <>
              <Text>Key: {data.key}, Source: {data.source}</Text>
      <ImageBackground key={'im' + data.key} source={{uri: encodeURI(ROOT_URL + data.source)}} style={styles.imagebackground} />
      </>
    )
  }
  _renderPages() {
    //return Object.entries(this.getImagesToPreload()).map(([key, source], i) => {

    //return this.getImagesToPreload().map(([key, source]) => {


        return (
          this.getImagesToPreload().map((preloadImage) => {
            return (
              <View key={'im' + preloadImage.key}>
              <Text>Key: {preloadImage.key}, Source: {preloadImage.source}</Text>
              </View>
            )})

        )
  }

          //<CarouselPager ref={ref => this.carousel = ref} initialPage={this.props.activeImageIndex}> </CarouselPager>
  // <ImageBackground key={preloadImage.key} source={{uri: encodeURI(ROOT_URL + preloadImage.source)}} style={styles.imagebackground} />
  //<Text>Key: {preloadImage.key}, Source: {preloadImage.source}</Text>

  //<CarouselPager ref={ref => this.carousel = ref} initialPage={this.props.activeImageIndex}>
  //</CarouselPager>
  render() {
    console.warn('ImageViewer')
    console.warn(this.props.activeImageIndex)
    console.warn(this.props.images[this.props.images.length-this.props.activeImageIndex])
    //console.warn(this.props.images)
    console.warn('----')
    //const activeImage = this.props.images[this.props.images.length-this.props.activeImageIndex];
    //       <URLImage src={activeImage.source} key={activeImage.key} />

    const initialPage = this.props.images[this.props.images.length-this.props.initialPageIndex];

    console.log(this.props.activeImageIndex)
    return (
      <ViewPager
      ref={ref => this.viewPager = ref}
      dev={true}
      //initialPage={initialPage}
      //initialPage={activeImage}
      data={this.props.images}
      initialPage={initialPage}
      //style={{flex: 1}}
      //style={styles.imagebackground}
      renderPage={this._renderPage}
      fullScreen={true}
      />
    )

    return (
      <>
      <Text> Image: {this.props.activeImageIndex}</Text>

      {(this.props.images !== undefined && true ) ?
       //<View style={{flex: 1}}>
       this._renderPages()
        //</View>
     : null}

      { false ? <ImageBackground style={styles.imagebackground} source={{uri: encodeURI(ROOT_URL + activeImage.source)}}/> : null}

      </>
    );
  }
}

/*
<CarouselPager ref={ref => this.carousel = ref} initialPage={this.props.activeImageIndex}>
{this.getImagesToPreload().map((preloadImage) => {
  return (<Image key={'im' + preloadImage.key} source={{uri: preloadImage.source}}/>)}
)}
</CarouselPager>
*/

//style={{width: activeImage.width, height: activeImage.height}}

let styles = StyleSheet.create({
  imagebackground: {
    width: '100%',
    height: '100%',
  }
});

{/*
    <Image style={{width: 66, height: 58}} source={{uri: activeImage.source}}/>
    this.getImagesToPreload().map((preloadImage) => {
    return (<Image visible={false} key={preloadImage.key} source={{uri: preloadImage.source}}/>)
    })*/}
