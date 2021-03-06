import React, { Component } from 'react';
import { arrayEquals } from './functions';

import Icon from './icon';

class Slideshow extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imageList: props.imgs,
            currentImageIndex: 0,
            lastIndex: props.imgs.length - 1,
        }
    }

    componentDidUpdate() {
        const { imgs } = this.props;

        if(imgs && !arrayEquals(imgs, this.state.imageList)) {
            this.setState({ 
                imageList: imgs, 
                currentImageIndex: 0,
                lastIndex: imgs.length - 1,
            });
        }
    }

    // arrayEquals(a, b) {
    //     if (a === b) return true;
    //     if (a == null || b == null) return false;
    //     if (a.length !== b.length) return false;

    //     for(var i = 0; i < a.length; i++){
    //         if(a[i] !== b[i]) return false;
    //     }
    //     return true;
    // }

    selectImage = (event, index) => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        event.target.classList.add('active');
        this.setState({currentImageIndex: index});
    }
    
    moveFoward = () => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        const { currentImageIndex, lastIndex } = this.state;
        let index;
        if(currentImageIndex == lastIndex) {
            index = 0;
        }
        else {
            index = currentImageIndex + 1;
        }
        document.querySelectorAll('.slideshow__bulletpoint__bullet')[index].classList.add('active');
        this.setState({currentImageIndex: index});
    }
    
    moveBackward = () => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        const { currentImageIndex, lastIndex } = this.state;
        let index;
        if(currentImageIndex == 0) {
            index = lastIndex;
        }
        else {
            index = currentImageIndex - 1;
        }
        document.querySelectorAll('.slideshow__bulletpoint__bullet')[index].classList.add('active');
        this.setState({currentImageIndex: index});
    }

    toggleOverlay = (event) => {
        let target = event.target;
        while(target.id != 'slideshow__image-container'){
            target = target.parentElement;
        }

        if(target.classList.contains('overlay'))
           target.classList.remove('overlay');
        else
            target.classList.add('overlay');
    }
    
    render() {
        const { className, imgs } = this.props;
        const { imageList, currentImageIndex } = this.state;

        return (
            <div className={`${className} slideshow ${imageList.length == 0 ? 'hidden' : ''}`}>
                <div id="slideshow__image-container" className='slideshow__image-container' onClick={this.toggleOverlay}>
                    <img className='slideshow__image-container__image' src={imageList[currentImageIndex]} />
                </div>
                <div onClick={this.moveBackward} className={`slideshow__back-control ${imageList.length == 1 ? 'hidden' : ''}`}>
                    <Icon className='slideshow__back-control__icon' icon='angle-left' />
                </div>
                <div className={`slideshow__bulletpoint ${imageList.length == 1 ? 'hidden' : ''}`}>
                    {
                        imageList.map((img, index) => {
                            const active = index == 0 ? 'active' : '';
                            return (
                                <div key={index} className={`slideshow__bulletpoint__bullet ${active}`} onClick={(event) => this.selectImage(event, index)}></div>
                            )
                        })
                    }
                </div>
                <div onClick={this.moveFoward} className={`slideshow__foward-control ${imageList.length == 1 ? 'hidden' : ''}`}>
                    <Icon className='slideshow__foward-control__icon' icon='angle-right' />
                </div>
            </div>
        )
    }
}

export default Slideshow;