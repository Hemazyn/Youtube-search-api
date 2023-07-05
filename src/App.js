import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';


class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  }
  componentDidMount() {
    this.handleSumit('Master React JS');
  }
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }
  handleSumit = async (searchTerm) => {
    const response = await youtube.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyCOFVEX3Y1itxog7ljJnqekISfkY_r-68M',
        q: searchTerm,
      }
    });
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <Grid justifyContent="center" container spacing={10} >
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSumit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };
};

export default App;
