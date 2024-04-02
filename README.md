# Zone Safe

## Overview

Zone Safe is a web application designed to provide real-time monitoring of environmental conditions and potential hazards in different zones. The application consists of multiple sections, each dedicated to monitoring specific parameters such as temperature, pH level, and noise level. It helps users stay informed about the safety status of various zones and take necessary actions accordingly.

## Features

- **Temperature Monitoring**: Provides temperature readings along with an indication of whether the temperature is optimal for certain activities.
- **pH Level Monitoring**: Displays the pH level of the soil and indicates whether it is suitable for crop cultivation.
- **Noise Level Monitoring**: Alerts users about the presence of loud noises in the vicinity.
- **Dynamic Page Rendering**: Automatically switches between safe and danger views based on real-time data.

## Installation

1. Clone the repository to your local machine:

    ```
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```
    cd TfHCI
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Navigate to the Vue.js directory:
   ```
   cd TfHCI
   ```

5. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Connect the following I/O devices to the Raspberry Pi:
   - Waveshare 3.5 inch LCD display v2.0 (rev B)
   - LM393 light sensitive diode
   - DHT22 temperature/humidity sensor
  
2. Connect the following to a micro:bit:
   - LM393 based soil pH sensor
   - KY037 microphone
  
3. Connect the micro:bit and RPi using a USB cable to allow for a serial interface

4. Start the server:

    ```
    npm run serve
    ```

5. Start the frontend:
   ```
    cd TfHCI
    npm run serve
    ```
  
6. Open a web browser and go to the URL displayed in the terminal instance running the frontend to access the application.

   

## Components

- **TemperatureView**: Displays current temperature readings and provides information about whether the temperature is optimal for specific activities.
- **PhView**: Shows the pH level of the soil and indicates whether it is suitable for crop cultivation.
- **NoiseView**: Alerts users about the presence of loud noises nearby.
- **LightSignals**: Can be used to read and interpret information being sent through flashing lights.

## Technologies Used

- Vue.js: Frontend framework for building user interfaces.
- Express.js: Backend framework for creating server-side applications.
- Node.js: JavaScript runtime environment for executing server-side code.
- HTML/CSS: Markup and styling languages for designing web pages.

## Contributing

This project was created as a submission for the Technologies for Human Computer Interaction course at Newcastle University, UK. 
Contributions are welcome! Feel free to open issues or submit pull requests to contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Authors
Nirmal Karthikeyan
Michael Sherin 
JiongYu Zhang
Aditya Singh
