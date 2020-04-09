import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import axios from 'axios';

import { SearchBar , VideoDetails , VideoList } from './Components';

class App extends Component {

    state = {
        videos: [] ,
        selectedVideo:null
    }

    onVideoSelect = ( video ) => {
        this.setState({ selectedVideo: video });
    }

    handleSubmit = async ( searchTerm ) => {    
         await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            maxResults: 3,
            key:  'AIzaSyD3Y2khwK7pcGcp9h0GHvGEosD8V5lJARM',
            q: searchTerm
        }
        }).then( ( res ) => this.setState({ videos:res.data.items , selectedVideo: res.data.items[0] })
        ).catch( err => console.log( err )
        )
             }

    render() {
        const { selectedVideo , videos } = this.state;
        return (
            <Grid justify="center" container spacing={ 10 }>
                <Grid item xs={ 12 }>
                    <Grid container spacing={ 10 }>
                        <Grid item xs={ 12 }>
                           <SearchBar onFormSubmit={ this.handleSubmit } />
                        </Grid>
                        <Grid item xs={ 8 }>
                            <VideoDetails video={ selectedVideo }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <VideoList videos={ videos } onVideoSelect={ this.onVideoSelect }/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        )
    }
}

export default App
