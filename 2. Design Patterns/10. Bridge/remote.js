"use strict";
class Tv {
    constructor() {
        this.enabled = false;
        this.volume = 50;
        this.channel = 1;
    }
    isEnabled() {
        return this.enabled;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    getVolume() {
        return this.volume;
    }
    setVolume(percent) {
        this.volume = Math.max(0, Math.min(100, percent)); // Ensure volume is between 0 and 100
    }
    getChannel() {
        return this.channel;
    }
    setChannel(channel) {
        this.channel = channel;
    }
}
class Radio {
    constructor() {
        this.enabled = false;
        this.volume = 50;
        this.channel = 1;
    }
    isEnabled() {
        return this.enabled;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    getVolume() {
        return this.volume;
    }
    setVolume(percent) {
        this.volume = Math.max(0, Math.min(100, percent)); // Ensure volume is between 0 and 100
    }
    getChannel() {
        return this.channel;
    }
    setChannel(channel) {
        this.channel = channel;
    }
}
class RemoteControl {
    constructor(device) {
        this.device = device;
    }
    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        }
        else {
            this.device.enable();
        }
    }
    volumeDown() {
        this.device.setVolume(this.device.getVolume() - 10);
    }
    volumeUp() {
        this.device.setVolume(this.device.getVolume() + 10);
    }
    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1);
    }
    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}
class AdvancedRemoteControl extends RemoteControl {
    mute() {
        this.device.setVolume(0);
    }
}
// Client code
const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePower();
const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.mute();
