import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    console.log(url)
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }


  activeSong(id) {
    let activeSong = ProxyState.songs.find(s => s.id === id)
    ProxyState.activeSong = activeSong
    console.log(ProxyState.activeSong)
    // let url = await "https://itunes.apple.com/search?callback=?&term=";
    // let response = await url.get(_id)
    // ProxyState.activeSong = new activeSong(response.data)
  }
  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong() {
    console.log()
    //TODO you only have an id, you will need to find it in the store before you can post it
    let response = await sandBoxApi.post('', ProxyState.playlist)
    ProxyState.playlist = [...ProxyState.playlist, new playlist(response.data)]
    console.log(ProxyState.playlist)
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
  }
}


export const songsService = new SongsService();
