export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return [data, null]; // Always return an iterable array
  } catch (error) {
    return [null, error]; // Ensure it returns an array even when failing
  }
};
