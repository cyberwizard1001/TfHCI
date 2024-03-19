import express from 'express';
import { Gpio } from 'onoff';
import sensor from 'node-dht-sensor';
import { SerialPort } from 'serialport';
import cors from 'cors';

const app = express();
const port = 3000; 

// Enable CORS for all routes
app.use(cors());

const lightInputPin = new Gpio(16, 'in');
const dhtPin = 26;

sensor.initialize({
    test: {
        fake: {
            temperature: 21,
            humidity: 60
        }
    }
});

// Function to read light sensitivity
const readLightSensor = () => {
    const value = lightInputPin.readSync();
    console.log('Light Sensitivity:', value);
    return value;
};

// Function to read DHT22 sensor
const readDHT22Sensor = () => {
    return new Promise((resolve, reject) => {
        sensor.read(22, dhtPin, (err, temperature, humidity) => {
            if (!err) {
                console.log('Temperature:', temperature.toFixed(2) + '°C');
                resolve({ temperature: temperature.toFixed(2), humidity: humidity.toFixed(2) });
            } else {
                console.error('Error reading DHT22 sensor:', err);
                reject(err);
            }
        });
    });
};

class Serial {
    constructor(path = '/dev/ttyACM0') {
        this.port = null;
        this.lineBuffer = '';
        this.lineHandler = null;

        this.port = new SerialPort({
            path: path,
            baudRate: 115200,
        }, (err) => {
            if (err) {
                console.log('SERIAL-ERROR: Problem opening the port: ' + err.message);
            }
        });

        this.port.addListener('data', (chunk) => {
            this.lineBuffer = this.lineBuffer.concat(chunk);
            for (;;) {
                const lineEnd = this.lineBuffer.indexOf('\n');
                if (lineEnd < 0) break;
                const removeCr = (lineEnd > 0 && this.lineBuffer[lineEnd - 1] == '\r');
                const line = this.lineBuffer.slice(0, removeCr ? lineEnd - 1 : lineEnd);
                this.lineBuffer = this.lineBuffer.slice(lineEnd + 1);

                if (line.startsWith('Sound level: ')) {
                    this.soundLevel = parseFloat(line.slice(13)); // Extract numerical value
                }

                if (this.lineHandler) {
                    this.lineHandler(line);
                }
            }
        });
    }

    setLineHandler(handler) {
        this.lineHandler = handler;
    }

    write(message) {
        this.port.write('' + message + '\n', (err) => {
            if (err) {
                return console.log('SERIAL-ERROR: Problem writing: ' + err.message);
            }
        });
    }
}

const serial = new Serial('/dev/ttyACM0');
let latestSerialData = ''; // Variable to store the last received line
let soundLevel = 0; // Variable to store the sound level

// Set up the line handler to continuously capture the latest line
serial.setLineHandler((line) => {
    console.log('RECV: ' + line);
    latestSerialData = line; // Update the variable with the latest received line

    if (line.startsWith('Sound level: ')) {
        soundLevel = parseFloat(line.slice(13)); // Extract numerical value
    }
});

app.get('/light', (req, res) => {
    const lightValue = readLightSensor();
    res.json({ lightSensitivity: lightValue });
});

app.get('/temperature', async (req, res) => {
    try {
        const sensorData = await readDHT22Sensor();
        res.json(sensorData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read temperature sensor' });
    }
});

app.get('/serial', (req, res) => {
    res.json({ data: latestSerialData });
});

app.get('/sound', (req, res) => {
    res.json({ soundLevel });
});

app.get('/ph', (req, res) => {
    res.json({ phLevel: latestSerialData.startsWith('Sound level: ') ? '' : latestSerialData });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
