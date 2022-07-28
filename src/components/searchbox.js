import React, {Component} from 'react'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class SearchBox extends Component {

    state = {
        search_query: ''
    }

    updateSearchQuery = event => {
        this.setState({search_query: event.target.value});
        this.props.sendSearchQueryToParent(event.target.value);
        //console.log(this.state.search_query)

    }


    render() {


        return (

            <div className="input-group mx-auto justify-content-center mb-5">
                <button id="search-button" type="button" className="btn btn-primary">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
                <div className="form-outline">
                    <input value={this.state.search_query} onChange={this.updateSearchQuery} id="search-input"
                           type="search" id="form1"
                           className="form-control" placeholder="Search..."/>

                </div>

            </div>


        )
    }
}

export default SearchBox