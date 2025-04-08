// ✅ Correct ES module export
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default fetchData; // ✅ ES module default export
