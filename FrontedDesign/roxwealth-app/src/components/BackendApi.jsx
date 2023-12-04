export async function getRestaurantData() {
  try {
    const response = await fetch('http://localhost:3000/restaurant');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);

    // Log the full response for further investigation
    console.error('Full response:', await error.response.text());

    throw error; // Rethrow the error to propagate it to the caller
  }
}
