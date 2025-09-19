class Battery {
  private chargingStatus = "idle";
  private batteryPercentage = 0;
  private chargingInterval: any;

  showBatteryPercentage(): string {
    return `Battery is charged to ${this.batteryPercentage}%`;
  }

  showChargingStatus(): string {
    return this.chargingStatus;
  }

  charge(): void {
    this.chargingStatus = "charging";
    this.chargingInterval = setInterval(
      () => this.batteryPercentage++,
      60 * 1000
    );
  }

  stopCharging(): void {    
    clearInterval(this.chargingInterval);
    this.chargingStatus = "idle";
  }
}

abstract class AlexaDevice {
  private battery: Battery | undefined;

  showBatteryPercentage(): string {
    return this.battery?.showBatteryPercentage() ?? "No Battery";
  }

  showChargingStatus(): string {
    return this.battery?.showChargingStatus() ?? "No Battery";
  }

  charge(): void {
    this.battery?.charge();
  }

  stopCharging(): void {
    this.battery?.stopCharging();
  }

  setBattery(battery: Battery): void {
    this.battery = battery;
  }

  show(): string {
    const batteryStatus = this.showBatteryPercentage();
    const chargingStatus = this.showChargingStatus();

    if (batteryStatus === "No Battery") {
      return chargingStatus === "charging"
        ? "Charging and no battery"
        : "No battery";
    }
    return chargingStatus === "charging"
      ? `Charging and battery percentage: ${batteryStatus}`
      : `Battery percentage: ${batteryStatus}`;
  }

  abstract play(): void;
}

class AlexaAudioDevice extends AlexaDevice {
  play(): void {
    console.log("playing Audio");
  }
}

class AlexaVideoDevice extends AlexaDevice {
  play(): void {
    console.log("playing Video");
  }
}

class AlexaAdvancedDevice extends AlexaDevice {
  play(): void {
    console.log("playing Audio and Video");
  }
}

const audioDevice = new AlexaAudioDevice();
const videoDevice = new AlexaVideoDevice();
const advDevice = new AlexaAdvancedDevice();
const audioBattery = new Battery();
audioDevice.setBattery(audioBattery);
const videoBattery = new Battery();
videoDevice.setBattery(videoBattery);
