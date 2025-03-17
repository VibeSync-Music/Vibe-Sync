export const fetchData = async (url, options = {}) => {
  try {
    // pass along the options to fetch
    const response = await fetch(url, options);

    // Throw an error if the response was not 2xx - let the catch statement handle it
    if (!response.ok)
      throw new Error(
        `Fetch failed. ${response.status} ${response.statusText}`
      );

    // Guard clause: make sure that the content type of the response is JSON before reading it
    const contentType = response.headers.get("content-type");
    if (contentType === null || !contentType.includes("application/json")) {
      // If the contentType of the response is not JSON, read the stream as plain text
      const textData = await response.text();
      return textData;
    }

    // Otherwise read the stream as JSON
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    // if there was an error, log it and return the error
    console.error(error.message);
    return error;
  }
};
