import React from 'react';
import ImageItem from './ImageItem';


const Images = (props)=> {
    if (!props.images.length && props.results){
        return (<h4>There are no results <span role="img" aria-label="crying">😭</span><br></br> Try again... <span role="img" aria-label="cool">😎</span></h4>);
    }
    if (!props.images.length && props.loading){
       return <div className="loading"></div>;
    }

    const ImageItems = props.images.map((image) => {
        return (
            <ImageItem
            key = {image.id}
            image = {image} />
        );
    });

    return (
        <div className="main container d-flex flex-wrap justify-content-center">{ImageItems}</div>
    );
}
export default Images;






