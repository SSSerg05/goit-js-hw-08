/// for work with localStorage
// Save
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

/// for work with localStorage
// Load
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

/// for work with localStorage
// Delete key
const remove = key => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Delete key state error: ", error.message);
  }
};

/// for work with localStorage
// Clear
const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Clear state error: ", error.message);
  }
};

export default {
  save,
  load,
  clear,
  remove,
};
