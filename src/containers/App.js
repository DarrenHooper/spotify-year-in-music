import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import Title from '../components/Title/Title.jsx';
import List from '../components/List/List.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        console.log(params)
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: !!token,
            nowPlaying: { name: 'Not Checked', albumArt: '' },
            topArtists: []
        }
    }
    componentDidMount() {
        this.getTopArtists()
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url
                    }
                });
            })
    }

    getTopArtists(time_range) {
        spotifyApi.getMyTopArtists({time_range: 'long_term', limit: 50})
            .then((response) => {
                console.log(response);
                this.setState({
                    topArtistsLifetime: response.items.map(a => a.name)
                })
            });
        spotifyApi.getMyTopArtists({time_range: 'medium_term', limit: 50})
            .then((response) => {
                console.log(response);
                this.setState({
                    topArtists6Months: response.items.map(a => a.name)
                })
            });
        spotifyApi.getMyTopArtists({time_range: 'short_term', limit: 50})
            .then((response) => {
                console.log(response);
                this.setState({
                    topArtists4Weeks: response.items.map(a => a.name)
                })
            });
    }

    render() {
        return (
            <div className="App">
                <Title title_text={"Your Year(s) in Spotify"}/>
                <a href='http://localhost:8888' > Login to Spotify </a>
                <div>
                    Now Playing: { this.state.nowPlaying.name }
                </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
                </div>
                { this.state.loggedIn &&
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
                }
                <Tabs>
                    <TabList>
                        <Tab>Artists</Tab>
                        <Tab>Genres</Tab>
                        <Tab>Songs</Tab>
                        <Tab>Activity</Tab>
                        <Tab>Recommendations</Tab>
                        <Tab>Playlist Converter</Tab>
                    </TabList>

                    <TabPanel>
                        <List list_elements={this.state.topArtistsLifetime} list_title={'Top Artists (Lifetime):'}/>
                        <List list_elements={this.state.topArtists6Months} list_title={'Top Artists (6 Months):'}/>
                        <List list_elements={this.state.topArtists4Weeks} list_title={'Top Artists (4 Weeks):'}/>

                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default App;
