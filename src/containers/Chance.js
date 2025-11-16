/**
 * 
 * Chance card component
 * Defines the chance card list and lists getter and setter functions
 * 
 */

import React from 'react';

const chanceCards = [
    { name : "Start another semester (collect $200)", owner: null, result : collect(200, owner)},
    { name : "Go to a football game at Macalester Stadium", owner: null, result : move(24, owner)}, 
    { name : "Visit an friend in Kirk Hall", owner: null, result : move(11, owner)}, 
    { name : "Visit public safety or facilities", owner: null, result : nearestUtilAndMove(owner)}, 
    { name : "Go to the nearest public transit", owner: null, result : nearestTransitAndMove(24, owner)}, 
    { name : "Your friend pays their debts (gain $50)", owner: null, result : collect(50, owner)}, 
    { name : "Get out of Duprison", owner: null, result : leavePrison(owner)}, 
    { name : "Go back 3 spaces", owner: null, result : move(owner.getPropertyIndex() - 3, owner)}, 
    { name : "Go to Duprison", owner: null, result : imprison(owner)}, 
    { name : "Work out in the LC", owner: null, result : move(39, owner)}, 
    { name : "Pay out poker debts (owe $50)", owner: null, result : payTo(50, owner, reciever)}, 
    { name : "Take Route 63 down Grand Ave", owner: null, result : move(5, owner)}, 
    { name : "Your parents send you grocery money", owner: null, result : collect(150, owner)}

]

function collect(amount, player) {
    // increment owners balance by amount
}

function move(spaceIndex, player) {
    // move player to specified space index
}

function nearestUtilAndMove(player) {
    // find nearest utility and move player there
}

function nearestTransitAndMove(player) {
    // find nearest transit and move player there
}

function leavePrison(player) {
    // allow player to leave prison without paying or rolling doubles
}

function imprison(player) {
    // send player to prison and update their status
}

function payTo(amount, player, receiver) {
    // player pays amount to receiver
}
