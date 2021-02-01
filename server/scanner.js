"use strict";
const os = require('os');
const ping = require('net-ping');
const net = require('net');

async function scan() {

}

function getInterface() {
    // 'interface' is a reserved word in strict mode, so it's abbreviated here. 
    const intfs = os.networkInterfaces();
    const platform = os.platform();
    let chosenIntfs = [];

    if (platform === "linux" || platform === "win32") {
        for (const intf in intfs) {
            // Typical Windows interfaces will be called "Wi-Fi" or "Ethernet". Linux has a scheme with a prefix of either "en" or "wl"
            if (intf === 'Ethernet' || intf === 'Wi-Fi' || intf.substring(0,2) === 'en' || intf.substring(0,2) === 'wl') {
                for (const netData of intfs[intf]) {
                    // Only support IPv4 for now
                    if (netData.family === 'IPv4') {
                        chosenIntfs.push({[intf] : netData});
                    }
                }
            }
        } 
    }

    return chosenIntfs[0];
} 

function getAddresses() {
    // Get network addresses
}


module.exports = scan;