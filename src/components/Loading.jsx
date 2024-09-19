import { Mosaic } from "react-loading-indicators"; // Importing the Mosaic loading indicator from the react-loading-indicators library

// Creating a functional component called Loading that returns a Mosaic loading indicator
const Loading = () => (
  <Mosaic 
    color="#000000" // Setting the color of the Mosaic indicator to black
    size="large"    // Setting the size of the Mosaic indicator to large
    text=""         // No text displayed below the Mosaic indicator
    textColor="#000" // Setting the text color (even though the text is empty)
  />
);

export default Loading; // Exporting the Loading component to be used in other parts of the app
