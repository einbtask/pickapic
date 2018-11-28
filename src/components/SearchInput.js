import React, { Component } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }
    
    render() {
        return (
         <div className="mb-5">    
          <input className="search-input"
          placeholder="Search"
           value={this.state.term}
           onChange={event => this.onInputChange(event.target.value)}/> 
           <i className="fas fa-search"></i>
         </div>
        );
    }

    onInputChange (term) {
        this.setState({term});
        this.props.onTermChange(term);
        

    }
}
export default SearchInput;