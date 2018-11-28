import React from 'react';

const ImageItem = ({image})=> {
    let imageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_q.jpg`;
    let imageLink = `https://www.flickr.com/photos/${image.owner}/${image.id}`;
    return (
        <div className="fade-in m-3">
            <a href={imageLink} target="_blank" rel="noopener noreferrer">
                <img className="image-item" src={imageUrl} alt={image.title}/>
            </a>
            <i className="fas fa-external-link-alt"></i>
        </div>
    );
};

export default ImageItem;
