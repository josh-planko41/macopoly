/**
 * 
 * Chance card component
 * Defines the chance card list and lists getter and setter functions
 * 
 */

import React from 'react';

export const chanceCards = [
    { name : "Start another semester (collect $200)", result: player => collect(200, player)},
    { name : "Go to a football game at Macalester Stadium", result: player => move(24, player)}, 
    { name : "Visit an friend in Kirk Hall", result : player => move(11, player)}, 
    { name : "Take Route 63 down Grand Ave", result : player => move(5, player)}, 
    { name : "Your parents send you grocery money", result : player => collect(150, player)},
    { name : "Work out in the LC", result : player => move(39, player)},  
    { name : "Go to Duprison", result : player => imprison(player)}, 
    { name : "Your friend pays their debts (gain $50)", result : player => collect(50, player)}
    // { name : "Visit public safety or facilities", result : player => nearestUtilAndMove(player)}, 
    // { name : "Go to the nearest public transit", result : player => nearestTransitAndMove(24, player)}, 
    // { name : "Get out of Duprison", result : player => leavePrison(player)}, 
    // { name : "Pay out poker debts (owe $50)", result : player => payTo(50, player, reciever)}, 
    // { name : "Go back 3 spaces", result : player => move(player.getPropertyIndex() - 3, player)},
]


export function collect(amount, player) {
    // increment owners balance by amount
}

export function move(spaceIndex, player) {
    // move player to specified space index
}

export function nearestUtilAndMove(player) {
    // find nearest utility and move player there
}

export function nearestTransitAndMove(player) {
    // find nearest transit and move player there
}

export function leavePrison(player) {
    // allow player to leave prison without paying or rolling doubles
}

export function imprison(player) {
    // send player to prison and update their status
}

export function payTo(amount, player, receiver) {
    // player pays amount to receiver
}

// export default  chanceCards