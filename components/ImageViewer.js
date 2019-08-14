import React, { Component } from 'react'
import { StyleSheet, Image, ImageBackground, Text } from 'react-native'
import PropTypes from 'prop-types'

const ROOT_URL = 'https://comic-editor.s3.eu-north-1.amazonaws.com/'

export default class ImageViewer extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        //images: PropTypes.array,
        images: PropTypes.object,
        activeImageIndex: PropTypes.number,
    };

    static defaultProps = {
        images: [],
        activeImageIndex: 0,
    };

    getImagesToPreload = () => {
        return this.props.images.splice(this.props.activeImageIndex, 2);
        //return this.props.images;
        //return this.props.images.slice(this.props.activeImageIndex, 2);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.activeImageIndex !== this.props.activeImageIndex) {
            return true
        }

        if(nextProps.images !== this.props.images) {
            return true
        }
        return false

    }


    render() {
        //console.log('ImageViewer')
        //console.log(this.props.images)
        //console.log(this.props.activeImageIndex)
        //console.log('----')
        const activeImage = this.props.images[this.props.activeImageIndex];
         //       <URLImage src={activeImage.source} key={activeImage.key} />
        return (
          <>
            <Text> Image: {this.props.activeImageIndex}</Text>
            <ImageBackground style={styles.image} source={{uri: encodeURI(ROOT_URL + activeImage.source)}}/>
          </>
                  );
    }
}

//style={{width: activeImage.width, height: activeImage.height}}

let styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  }
});

{/*
            <Image style={{width: 66, height: 58}} source={{uri: activeImage.source}}/>
                this.getImagesToPreload().map((preloadImage) => {
                    return (<Image visible={false} key={preloadImage.key} source={{uri: preloadImage.source}}/>)
                })*/}
