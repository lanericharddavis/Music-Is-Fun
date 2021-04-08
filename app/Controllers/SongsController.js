import { ProxyState } from "../AppState.js";
import { songsService } from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  let songs = ProxyState.songs
  songs.forEach(s => {
    template += `<li onclick="app.songsController.activeSong(${s.id})">Title:${s.title} || Artist:${s.artist}</li>`
    document.getElementById('songs').innerHTML = template
  });

}

function _drawActiveSong() {
  console.log(ProxyState.activeSong)
  let song = ProxyState.activeSong
  let template = `
    <div>
     ${song.title}
      <img src="${song.albumArt}"></img>
      <audio controls>
      <source src="${song.preview}"></source>
      </audio>
      <div>
        <button class="btn btn-success btn-large" onclick="app.songsController.addSong()">Add To Playlist</button>
      </div>
    </div>
    `
  document.getElementById('activeSong').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActiveSong)
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong() {
    console.log()
    try {
      await songsService.addSong()
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }


  activeSong(id) {
    songsService.activeSong(id)
  }
}
