import { Gpio } from 'onoff';
import sensor from 'node-dht-sensor';
import { SerialPort } from 'serialport'
import {cors} from cors

const lightInputPin = new Gpio(16, 'in');
const dhtPin = 26;




const readLightSensor = () => {
    const value = lightInputPin.readSync();
    console.log('Light Sensitivity:', value);
};

sensor.initialize({
    test: {
      fake: {
        temperature: 21,
        humidity: 60
      }
    }
  });

  class Serial {
    constructor(path = '/dev/ttyACM0') {
        this.port = null
        this.lineBuffer = ''
        this.lineHandler = null
        
        this.port = new SerialPort({
            path: path,
            baudRate: 115200,
        }, (err) => {
            if (err) {
                console.log('SERIAL-ERROR: Problem opening the port: ' + err.message)
            }
        });

        this.port.addListener('data', (chunk) => {
            //console.log('SERIAL-CHUNK: ' + JSON.stringify(chunk));
            this.lineBuffer = this.lineBuffer.concat(chunk)
            for (;;) {
                const lineEnd = this.lineBuffer.indexOf('\n')
                if (lineEnd < 0) break
                // Special case: also remove CRLF \r\n when splitting at LF \n
                const removeCr = (lineEnd > 0 && this.lineBuffer[lineEnd - 1] == '\r')
                const line = this.lineBuffer.slice(0, removeCr ? lineEnd - 1 : lineEnd)
                this.lineBuffer = this.lineBuffer.slice(lineEnd + 1)

                //console.log(`SERIAL-RECV: ${line}`)
                if (this.lineHandler) {
                    this.lineHandler(line)
                }
            }
        })
    }

    setLineHandler(handler) {
        this.lineHandler = handler;
    }

    write(message) {
        this.port.write('' + message + '\n', (err) => {
            if (err) {
                return console.log('SERIAL-ERROR: Problem writing: ' + err.message)
            }
            //console.log('SERIAL: Written: ' + message)
        })
    }
}


const readDHT22Sensor = () => {
    sensor.read(22, dhtPin, (err, temperature, humidity) => {
        if (!err) {
            console.log('Temperature:', temperature.toFixed(2) + '°C');
        } else {
            console.error('Error reading DHT22 sensor:', err);
            console.log(err)
        }
    });
};

const serial = new Serial('/dev/ttyACM0')

setInterval(readLightSensor, 2000); // Read light sensitivity every 1205 milliseconds
setInterval(readDHT22Sensor, 2000); // Read DHT22 sensor every 2 seconds



// Handle any received lines from the serial port
serial.setLineHandler((line) => {
    console.log('RECV: ' + line)
})