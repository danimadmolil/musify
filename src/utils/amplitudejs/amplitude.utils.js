import Amplitude from "myamplitudejs2";
export const initAmplitude = () => {
  window.Amplitude = Amplitude;
  Amplitude.init({
    songs: [{ url: "", name: "dani" }],
    debug: true,
    callbacks: {
      stop: function () {
        console.log("Audio has been stopped.");
      },
      ended: function () {
        console.log("ended");
      },
    },
  });
  Amplitude.setDebug(true);
};
export const addSong = (songObj) => {
  if (Amplitude.getConfig().songs.length === 0) {
    console.log("amp if", Amplitude.getConfig());
    Amplitude.addSong(songObj);
    console.log("amp if aftere addSong", window.Amplitude.getConfig());
    Amplitude.playNow(songObj);
    Amplitude.bindNewElements();
  } else {
    console.log("amp else", Amplitude.getConfig());

    Amplitude.addSong(songObj);
  }
  Amplitude.bindNewElements();
};
export const bindElements = () => {
  Amplitude.bindNewElements();
};
export const getPlayerState = () => {
  return Amplitude.getPlayerState();
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
export const addPlaylist = (key, data, songs) => {
  Amplitude.addPlaylist(key, data, songs);
};
export const addSongToPlaylist = (songObject, playlistKey) => {
  Amplitude.addSongToPlaylist(songObject, playlistKey);
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