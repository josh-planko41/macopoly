/**
 * Properties Data
 * Contains the list of properties on the board with their details along with setter functions
 */

import React from 'react';


const properties = [

    // top row of properties, left -> right
    {index : 0, name : "Start a New Semester", color : "white"},
    {index : 1, name : "Turck Hall", color : "#8E7CC3", price : 60, owner: null},
    {index : 2, name : "Community Chest", color : "white"},
    {index : 3, name : "Doty Hall", color : "#8E7CC3", price : 60, owner: null},
    {index : 4, name : "Activity Fee", color : "white", price : 200},
    {index : 5, name : "Route 63", color : "gray", price : 200, owner: null},
    {index : 6, name : "Bigelow Hall", color : "#6EA8DC", price : 100, owner: null},
    {index : 7, name : "Chance", color : "white"},
    {index : 8, name : "Wallace Hall", color : "#6EA8DC", price : 100, owner: null},
    {index : 9, name : "30 Mac", color : "#6EA8DC", price : 120, owner: null},

    // right column of properties, top -> bottom
    {index : 10, name : "Duprison + Just Visiting", color : "white"},
    {index : 11, name : "Kirk Hall", color : "#C27BA0", price : 140, owner: null},
    {index : 12, name : "Facilities", color : "black", price : 150, owner: null},
    {index : 13, name : "George Draper Dayton Hall", color : "#C27BA0", price : 140, owner: null},
    {index : 14, name : "Grand Cambridge Apartments", color : "#C27BA0", price : 160, owner: null},
    {index : 15, name : "A Line", color : "gray", price : 200, owner: null},
    {index : 16, name : "Humanities", color : "#F7B16B", price : 180, owner: null},
    {index : 17, name : "Community Chest", color : "white"},
    {index : 18, name : "Weyerhaeuser Hall (Adimission Office)",color : "#F7B16B", price : 180, owner: null},
    {index : 19, name : "Carnegie Hall", color : "#F7B16B", price : 200, owner: null},
    
    // bottom row of properties, right -> left
    {index : 20, name : "Free Parking", color : "white"},
    {index : 21, name : "Hayden Courts", color : "red", price : 220, owner: null},
    {index : 22, name : "Chance", color : "white"},
    {index : 23, name : "Nicholson Field", color : "red", price : 220, owner: null},
    {index : 24, name : "Macalester Stadium", color : "red", price : 240, owner: null},
    {index : 25, name : "B Line", color : "gray", price : 200, owner: null},
    {index : 26, name : "President's Home", color : "#FFFF00", price : 260, owner: null},
    {index : 27, name : "Memorial Chapel", color : "#FFFF00", price : 260, owner: null},
    {index : 28, name : "Public Safety", color : "black", price : 150, owner: null},
    {index : 29, name : "Old Main", color : "#FFFF00", price : 280, owner: null},

    // left column of properties, bottom -> top
    {index : 30, name : "Go To Duprison", color : "white"},
    {index : 31, name : "Dewitt Wallace Library", color : "#92C47D", price : 300, owner: null},
    {index : 32, name : "Olin-Rice Science Center", color : "#92C47D", price : 300, owner: null},
    {index : 33, name : "Community Chest", color : "white"},
    {index : 34, name : "Campus Center", color : "#92C47D", price : 320, owner: null},
    {index : 35, name : "Green Line", color : "gray", price : 200, owner: null},
    {index : 36, name : "Chance", color : "white"},
    {index : 37, name : "Janet Wallace Fine Arts Center", color : "#3B77D8", price : 350, owner: null},
    {index : 38, name : "MacBooks", color : "white", price : 75, owner: null},
    {index : 39, name : "Leonard Center", color : "#3B77D8", price : 400, owner: null},
    
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