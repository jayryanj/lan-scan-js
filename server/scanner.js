"use strict";
const os = require('os');
const ping = require('net-ping');
const net = require('net');


async function scan() {

    const intf = getInterface();
    const addresses = getAddresses(intf.address, intf.netmask, intf.bits);

}


function getInterface() {

    // 'interface' is a reserved word in strict mode, so it's abbreviated here. 
    const intfs = os.networkInterfaces();
    const platform = os.platform();
    let intfNames, intfName, intfData;

    if (platform === "linux" || platform === "win32") {
        intfNames = Object.keys(intfs);
        intfName = intfNames.find(intf => {
            return (intf == "Ethernet" || intf == "Wi-Fi" || intf.substring(0,2) == "en" || intf.substring(0, 2) == "wl" || intf.substring(0,3) ===  "eth")
        }); 

        intfData = intfs[intfName].find(net => {
            return net.family === "IPv4"
        })
    }

    return {
        name: intfName,
        address: intfData.address,
        netmask: intfData.netmask,
        bits: 32 - parseInt(intfData.cidr.split('/')[1])
    };

} 


function getAddresses(hostAddress, netmask, bits) {

    let addresses = [];

    // Arrow function for splitting an addresss into its individual bytes and convert to decimals
    const convertAddress = (ipv4) => ipv4.split('.').map((byte) => parseInt(byte));

    const hostAddressByteArray = convertAddress(hostAddress);
    const netmaskByteArray = convertAddress(netmask);

    // Calculate the network address by taking the bitwise AND of the subnet mask and the host address
    let netAddressByteArray = hostAddressByteArray.map((addressByte, index) => {return addressByte & netmaskByteArray[index] });

    let a = 5;

    for (let n = 0; n < 2**bits; n++) {
        // IPv4 address = a.b.c.d (i.e., 192.168.0.5 which means a = 192, b = 168, c = 0, d = 5)
        let d = netAddressByteArray[3] + n;
        let c = netAddressByteArray[2] + Math.floor(d / 256);
        let b = netAddressByteArray[1] + Math.floor(c / 256);
        let a = netAddressByteArray[0] + Math.floor(b / 256);

        let address = `${a % 256}.${b % 256}.${c % 256}.${d % 256}`;

        addresses.push(address);
    }
    
    // Remove the network address (first address) and broadcast address (last address)
    addresses.shift();
    addresses.pop();

    return addresses;
    
}


scan()

module.exports = scan;