import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import logo from './camera.png';
import Images from './components/Images';
import SearchInput from './components/SearchInput';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      pageNo: 1,
      totalPages: null,
      curTerm: "",
      loading: false,
      noResults: false
    };
  }

  imagesSearch(term, pageNumber = 1) {
    this.setState({loading: true, noResults: false});
    const flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&per_page=50&text=';
    fetch(flickerUrl + term + '&page=' + pageNumber.toString())
      .then(response => response.json())
      .then (data => {
        if (this.state.curTerm !== term){
          this.setState({
            images: data.photos.photo,
            curTerm: term,
            totalPages: data.photos.pages,
            pageNo: 2
          });
        }else{
          this.setState({
            images: this.state.images.concat(data.photos.photo),
            pageNo: this.state.pageNo + 1
            });
        }
        this.setState({
          loading: false
          });
          if(!this.state.images.length) {this.setState({noResults: true})}
      })
  }

  handleScroll = () => {
    if(!this.state.loading) {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
          if(this.state.pageNo <= this.state.totalPages){
          this.imagesSearch(this.state.curTerm, this.state.pageNo);
      }
    }
  }
  }

  componentDidMount(){
    this.imagesSearch("patisserie");
    window.addEventListener('scroll', this.handleScroll);
  }

  newTermHandle(term){
    this.setState({
      pageNo: 1,
      images:[]
    })
    this.imagesSearch(term);
  }
  
  render() {
  const searchDebounce = _.debounce((term) => {this.newTermHandle(term)}, 500);
    return (
      <div className="App">
        <header className="d-flex pr-2 pl-2 align-items-center mb-5">
          <span><img src={logo} alt="camera" className="img-fluid mr-2"></img></span>
          <h2 className="mt-4 mb-4">Pick your Pic</h2>
        </header>
        <SearchInput onTermChange={searchDebounce}/>
        <Images images={this.state.images} results={this.state.noResults} loading={() => this.setState({loading: false})}/> 
        
      </div>
    );
  }
} 

export default App;
