


## Maintenance Calls

```json
{
  "currentTimeStamp": {
    "tm_sec": 4,
    "tm_min": 6,
    "tm_hour": 0,
    "tm_mday": 1,
    "tm_mon": 0,
    "tm_year": 70
  },
  "serialNum": -1798889149,
  "batteryInfo": {
    "batteryLevelPercent": 100,
    "predictedBatteryCapacity": 100,
    "totalNumBatteryCharges": 0
  },
  "maintReason": 5,
  "powerPathUsageState": 2,
  "nearestAPMACAddr": -1,
  "nearestAPRSSIdBm": 186,
  "numBatteryCharges": 1,
  "numMotionDet": 1,
  "currentUtil": {
    "util5min": 50,
    "util1hr": 50,
    "util1day": 50,
    "util1week": 50,
    "util1month": 50,
    "util6months": 50
  },
  "batteryChargeTimestamp": {
    "tm_sec": 49,
    "tm_min": 1,
    "tm_hour": 0,
    "tm_mday": 10,
    "tm_mon": 0,
    "tm_year": 70
  },
  "motionDetStartTimestamp": {
    "tm_sec": 49,
    "tm_min": 1,
    "tm_hour": 0,
    "tm_mday": 8,
    "tm_mon": 0,
    "tm_year": 70
  },
  "chokePointInfo": {
    "numChokePointDet": 0
  },
  "bleEvents": {
    "numBleConnect": 0,
    "numBleDevFind": 0
  }
}
```

## Current Data

```json
{
  "currentHeader": {
    "currentTimeStamp": {
      "tm_sec": 4,
      "tm_min": 6,
      "tm_hour": 0,
      "tm_mday": 1,
      "tm_mon": 0,
      "tm_year": 70
    },
    "numBlocks": 1
  },
  "currentUtilization": {
    "0": {
      "currentUtilHeader": {
        "startTimestamp": {
          "tm_sec": 4,
          "tm_min": 6,
          "tm_hour": 1,
          "tm_mday": 1,
          "tm_mon": 0,
          "tm_year": 70
        },
        "numSamples": 10
      },
      "currentUtilMeasurements": {
        "0": {
          "currentRms": 10,
          "utilVal": 20,
          "usageState": 0
        },
        "1": {
          "currentRms": 20,
          "utilVal": 30,
          "usageState": 1
        },
        "2": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "3": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "4": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "5": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "6": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "7": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "8": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        },
        "9": {
          "currentRms": 2000,
          "utilVal": 100,
          "usageState": 3
        }
      }
    }
  }
}
```

## Powertag INFO 

```json
{
  "customerID": 1279,
  "serialNum": 123321,
  "deviceID": 20,
  "hardwareVersion": 288,
  "wifiMacAddr": -1798889149,
  "tagConfigState": 2,
  "hwPeripherals": 32,
  "hostFirmwareVer": 261,
  "wifiFirmwareVer": 256,
  "bleFirmwareVer": 256,
  "powerPathConfigVer": 256,
  "factoryTestTime": {
    "tm_sec": 0,
    "tm_min": 0,
    "tm_hour": 0,
    "tm_mday": 1,
    "tm_mon": 0,
    "tm_year": 70
  },
  "configTime": {
    "tm_sec": 49,
    "tm_min": 1,
    "tm_hour": 0,
    "tm_mday": 1,
    "tm_mon": 0,
    "tm_year": 70
  }
}
```
