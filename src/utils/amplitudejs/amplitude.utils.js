import Amplitude from "myamplitudejs2";
export const initAmplitude = () => {
  window.Amplitude = Amplitude;
  Amplitude.init({
    songs: [],
    debug: true,
    callbacks: {
      stop: function () {
        console.log("Audio has been stopped.");
      },
      ended: function () {
        console.log("ended");
      },
      progress: function (e) {
        console.log("progress", e);
      },
      playing: function (e) {
        console.log("playing", e);
      },
      loadstart: function (e) {
        console.log("loadStart", e);
      },
    },
  });
  Amplitude.setDebug(true);
};
export const addSong = (songObj) => {
  Amplitude.removeSong(0);
  Amplitude.addSong(songObj);
  Amplitude.bindNewElements();
};
export const bindElements = () => {
  Amplitude.bindNewElements();
};
export const getPlayerState = () => {
  return Amplitude.getPlayerState();
};
export const setRepeat = (globalRepeatState) => {
  Amplitude.setRepeat(globalRepeatState);
};
export const setRepeatSong = (repeatSongState) => {
  Amplitude.setRepeatSong(repeatSongState);
};
export const setRepeatPlaylist = (playlistKey, playlistRepeatState) => {
  Amplitude.setRepeatPlaylist(playlistKey, playlistRepeatState);
};
export const playNow = (song) => {
  Amplitude.playNow(song);
  Amplitude.getConfig().active_playlist = undefined; // reset current playlist to undefined when play an individual song to disable next and prev button
};
export const pause = () => {
  Amplitude.pause();
};
export const resume = () => {
  Amplitude.play();
};
//playlist utils
export const addPlaylist = (data, songs = []) => {
  return Amplitude.addPlaylist(
    data.name,
    data,
    songs.length === 0 ? data.songs : songs
  );
};
export const addSongToPlaylist = (songObject, playlistKey) => {
  // ? check if song is already in playlist
  let canAddSongToPlaylist = true;
  // console.log("playlistKey", playlistKey);
  if (Amplitude.getConfig().playlists[playlistKey] !== undefined) {
    if (
      typeof Amplitude.getConfig().playlists[playlistKey].songs === "object"
    ) {
      Amplitude.getConfig().playlists[playlistKey].songs.forEach((song) => {
        if (song.id === songObject.id) {
          canAddSongToPlaylist = false;
        }
      });
    } else if (
      Amplitude.getConfig().playlists[playlistKey].songs === undefined
    ) {
      Amplitude.getConfig().playlists[playlistKey].songs = [];
      Amplitude.getConfig().playlists[playlistKey].songs.forEach((song) => {
        if (song.id === songObject.id) {
          canAddSongToPlaylist = false;
        }
      });
    }
  }
  canAddSongToPlaylist && Amplitude.addSongToPlaylist(songObject, playlistKey);
};
export const playPlaylistSongAtIndex = (playlistIndex, playlistKey) => {
  Amplitude.playPlaylistSongAtIndex(playlistIndex, playlistKey);
};
export const getSongPlayedPercentage = () => {
  return Amplitude.getSongPlayedPercentage();
};
export const getActiveSongMetadata = () => {
  return Amplitude.getActiveSongMetadata();
};
export const getAmplitude = () => {
  return Amplitude;
};
