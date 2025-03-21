const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setSongs = (newSongs) => {
  setLocalStorageKey("songs", newSongs);
};

export const getSongs = () => {
  const storedSongs = getLocalStorageKey("songs");
  return storedSongs || {};
};

export const addSong = (newSong) => {
  const storedSongs = getSongs();

  storedSongs[newSong.id] = newSong;

  setSongs(storedSongs);

  return newSong;
};

export const deleteSongById = (id) => {
  const storedSongs = getSongs();
  delete storedSongs[id];
  setSongs(storedSongs);
};
