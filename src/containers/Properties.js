/**
 * Properties Data
 * Contains the list of properties on the board with their details along with setter functions
 */

import React from 'react';


const properties = [

    // top row of properties, left -> right
    {index : 0, name : "Start a New Semester", color : "white", isActive:false},
    {index : 1, name : "Turck Hall", color : "#8E7CC3", price : 60, baseRent: 3, floors: 0, owner: null, isActive:false},
    {index : 2, name : "Chance", color : "white", isActive:false},
    {index : 3, name : "Doty Hall", color : "#8E7CC3", price : 60, baseRent: 3, floors: 0, owner: null, isActive:false},
    {index : 4, name : "Activity Fee", color : "white", taxAmount : 200, isActive:false},
    {index : 5, name : "Route 63", color : "gray", price : 200, owner: null, isActive:false},
    {index : 6, name : "Bigelow Hall", color : "#6EA8DC", price : 100, baseRent: 6, floors: 0, owner: null, isActive:false},
    {index : 7, name : "Chance", color : "white", isActive:false},
    {index : 8, name : "Wallace Hall", color : "#6EA8DC", price : 100, baseRent: 6, floors: 0, owner: null, isActive:false},
    {index : 9, name : "30 Mac", color : "#6EA8DC", price : 120, baseRent: 8, floors: 0, owner: null, isActive:false},

    // right column of properties, top -> bottom
    {index : 10, name : "Duprison + Just Visiting", color : "white", isActive:false},
    {index : 11, name : "Kirk Hall", color : "#C27BA0", price : 140, baseRent: 10, floors: 0, owner: null, isActive:false},
    {index : 12, name : "Facilities", color : "black", price : 150, owner: 1, isActive:false},
    {index : 13, name : "George Draper Dayton Hall", color : "#C27BA0", price : 140, baseRent: 10, floors: 0, owner: null, isActive:false},
    {index : 14, name : "Grand Cambridge Apartments", color : "#C27BA0", price : 160, baseRent: 12, floors: 0, owner: null, isActive:false},
    {index : 15, name : "A Line", color : "gray", price : 200, owner: null, isActive:false},
    {index : 16, name : "Humanities", color : "#F7B16B", price : 180, baseRent: 14, floors: 0, owner: null, isActive:false},
    {index : 17, name : "Chance", color : "white", isActive:false},
    {index : 18, name : "Weyerhaeuser Hall (Adimission Office)",color : "#F7B16B", price : 180, floors: 0, baseRent: 16, owner: null, isActive:false},
    {index : 19, name : "Carnegie Hall", color : "#F7B16B", price : 200, baseRent: 18, floors: 0, owner: null, isActive:false},
    
    // bottom row of properties, right -> left
    {index : 20, name : "Free Parking", color : "white", isActive:false},
    {index : 21, name : "Hayden Courts", color : "red", price : 220, baseRent: 18, floors: 0, owner: null, isActive:false},
    {index : 22, name : "Chance", color : "white", isActive:false},
    {index : 23, name : "Nicholson Field", color : "red", price : 220, baseRent: 18, floors: 0, owner: null, isActive:false},
    {index : 24, name : "Macalester Stadium", color : "red", price : 240, baseRent: 20, floors: 0, owner: null, isActive:false},
    {index : 25, name : "B Line", color : "gray", price : 200, owner: null, isActive:false},
    {index : 26, name : "President's Home", color : "#FFFF00", price : 260, baseRent: 22, floors: 0, owner: 1, isActive:false},
    {index : 27, name : "Memorial Chapel", color : "#FFFF00", price : 260, baseRent: 22, floors: 0, owner: 1, isActive:false},
    {index : 28, name : "Public Safety", color : "black", price : 150, owner: 1, isActive:false},
    {index : 29, name : "Old Main", color : "#FFFF00", price : 280, baseRent: 24, floors: 0, owner: 1, isActive:false},

    // left column of properties, bottom -> top
    {index : 30, name : "Go To Duprison", color : "white", isActive:false},
    {index : 31, name : "Dewitt Wallace Library", color : "#92C47D", price : 300, baseRent: 26, floors: 0, owner: null, isActive:false},
    {index : 32, name : "Olin-Rice Science Center", color : "#92C47D", price : 300, baseRent: 26, floors: 0, owner: null, isActive:false},
    {index : 33, name : "Chance", color : "white", isActive:false},
    {index : 34, name : "Campus Center", color : "#92C47D", price : 320, baseRent: 28, floors: 0, owner: null, isActive:false},
    {index : 35, name : "Green Line", color : "gray", price : 200, owner: null, isActive:false},
    {index : 36, name : "Chance", color : "white", isActive:false},
    {index : 37, name : "Janet Wallace Fine Arts Center", color : "#3B77D8", price : 350, baseRent: 35, floors: 0, owner: null, isActive:false},
    {index : 38, name : "MacBooks", color : "white", taxAmount : 75, isActive:false},
    {index : 39, name : "Leonard Center", color : "#3B77D8", price : 400, baseRent: 50, floors: 0, owner: null, isActive:false},
];


// getters and setters (to be changed to accommodate for where the pawns are)

function getOwner(index) {
    return properties[index].owner;
}

function getPrice(index) {
    return properties[index].price;
}

function getColor(index) {
    return properties[index].color;
}

function getName(index) {
    return properties[index].name;
}

function setOwner(index, player) {
    properties[index].owner = player;
}

export {properties, getOwner, getPrice, getColor, getName, setOwner};