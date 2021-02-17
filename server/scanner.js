"use strict";

const os = require('os');
const ping = require('net-ping');
const net = require('net');
const EventEmitter = require('events');


async function getResults() {
    let results = await scan();
    console.log(results)
}
 
/**
 * Scans the network using ICMP Echo to scan the network.
 */
async function scan() {
    const options = {
        networkProtocol: ping.NetworkProtocol.ipv4,
        retries: 2,
        timeout: 3000,
        ttl: 128
    }

    const discoveredHosts = [];

    const intf = getInterface();
    const addresses = getAddresses(intf.address, intf.netmask, intf.bits);

    const session = ping.createSession(options);

    for(const host of addresses) {
        session.pingHost(host, (error, target, sent, rcvd) => {
            if(error) {
                console.log(`${target}: ${error}`);
            } else {
                console.log(`${target}: Alive (time=${rcvd - sent}ms)`);
                discoveredHosts.push(target);
            }
        });
    }

    return discoveredHosts;
}



/**
 * Chooses and returns a network interface to scan. 
 * 
 * @returns an object containing info on the host network interface
 * 
 */
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

        // Only support IPv4
        intfData = intfs[intfName].find(net => {
            return net.family === "IPv4"
        })
    }

    return {
        name: intfName,
        address: intfData.address,
        netmask: intfData.netmask,
        bits: 32 - parseInt(intfData.cidr.split('/')[1]) // Gets the bits out of CIDR notation (the bits come after '/')
    };

} 


/** 
 * Gets all possible IPv4 addresses in the network to scan.
 * 
 * @param {string} hostAddress - the host's IPv4 address
 * @param {string} netmask  - the network's subnet mask
 * @param {int} bits - bits available from CIDR notation
 * 
 * @returns an array of IP addresses
 */
function getAddresses(hostAddress, netmask, bits) {

    const addresses = [];

    // Function for splitting an addresss into an array of its individual octets
    const convertAddress = (ipv4) => ipv4.split('.').map((byte) => parseInt(byte));

    const hostAddressOctets = convertAddress(hostAddress);
    const netmaskOctets = convertAddress(netmask);

    // Calculate the network address by taking the bitwise AND of the subnet mask and the host address
    const netAddressOctets = hostAddressOctets.map((addressByte, index) => {
        return addressByte & netmaskOctets[index] 
    });

    for (let n = 0; n < 2**bits; n++) {
        // IPv4 address is split into 4 octets: x.x.x.x (i.e., 192.168.0.2) where each octet (x) is an int between 0-255
        const octetOne = netAddressOctets[3] + n;
        const octetTwo = netAddressOctets[2] + Math.floor(octetOne / 256);
        const octetThree = netAddressOctets[1] + Math.floor(octetTwo / 256);
        const octetFour = netAddressOctets[0] + Math.floor(octetThree / 256);

        const address = `${octetFour % 256}.${octetThree % 256}.${octetTwo % 256}.${octetOne % 256}`;

        addresses.push(address);
    }
    
    // Remove the network address (first address) and broadcast address (last address)
    addresses.shift();
    addresses.pop();

    return addresses;
    
}

getResults();

module.exports = scan;