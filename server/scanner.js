"use strict";
const os = require('os');
const ping = require('net-ping');
const net = require('net');

async function scan() {

    const intf = getInterface();
    //const addresses = getAddresses();
    
    console.log(intf[0]);
}

function getInterface() {
    // 'interface' is a reserved word in strict mode, so it's abbreviated here. 
    const intfs = os.networkInterfaces();
    const platform = os.platform();
    let intfNames;
    let result;


    if (platform === "linux" || platform === "win32") {
        intfNames = Object.keys(intfs);
        const chosenIntf = intfNames.find(intf => {
            return (intf == "Ethernet" || intf == "Wi-Fi" || intf.substring(0,2) == "en" || intf.substring(0, 2) == "wl")
        }); 

        const netData = intfs[chosenIntf].find(net => {
            return net.family === "IPv4"
        })

        result = {
            name: chosenIntf,
            address: netData.address,
            bits: 32 - parseInt(netData.cidr.slice(-2)) // The slice will break for large subnets
        }
    }

    return result;
} 

function getAddresses() {
    // Get network addresses
    // This function is going to be some interesting math
    // Total # of addressses can be calculated by taking 2^n where n is the bits available to the subnet 
}
console.log(getInterface());

module.exports = scan;