import React from 'react';

// Perimeter layout on an 11x11 grid (rows and cols are 1-based).
// Order: top row left->right (cols 1..11), right column top->bottom (rows 2..10, col 11),
// bottom row right->left (cols 11..1, row 11), left column bottom->top (rows 10..2, col 1).
export const properties = [
    /* top row left -> right (11 squares) */
    { name: "Free Parking", color: "white", price: null, owner: null, row: 1, col: 1 },
    { name: "Hayden Courts", color: "red", price: 220, owner: null, row: 1, col: 2 },
    { name: "Chance", color: "white", price: null, owner: null, row: 1, col: 3 },
    { name: "Nicholson Field", color: "red", price: 220, owner: null, row: 1, col: 4 },
    { name: "Macalester Stadium", color: "red", price: 240, owner: null, row: 1, col: 5 },
    { name: "B Line", color: "gray", price: 200, owner: null, row: 1, col: 6 },
    { name: "President's Home", color: "#FFFF00", price: 260, owner: null, row: 1, col: 7 },
    { name: "Weyerhaeuser Memorial Chapel", color: "#FFFF00", price: 260, owner: null, row: 1, col: 8 },
    { name: "Public Safety", color: "black", price: 150, owner: null, row: 1, col: 9 },
    { name: "Old Main", color: "#FFFF00", price: 280, owner: null, row: 1, col: 10 },
    { name: "Go To Duprison", color: "white", price: null, owner: null, row: 1, col: 11 },

    { name: "Carnegie Hall", color: "#F7B16B", price: 200, owner: null, row: 2, col: 1 },
    { name: "Dewitt Wallace Library", color: "#92C47D", price: 300, owner: null, row: 2, col: 11 },
    { name: "Weyerhaeuser Hall (Adimission Office)", color: "#F7B16B", price: 180, owner: null, row: 3, col: 1 },
    { name: "Olin-Rice Science Center", color: "#92C47D", price: 300, owner: null, row: 3, col: 11 },
    { name: "Community Chest", color: "white", price: null, owner: null, row: 4, col: 1 },
    { name: "Community Chest", color: "white", price: null, owner: null, row: 4, col: 11 },
    { name: "Humanities", color: "#F7B16B", price: 180, owner: null, row: 5, col: 1 },
    { name: "Campus Center", color: "#92C47D", price: 320, owner: null, row: 5, col: 11 },
    { name: "A Line", color: "gray", price: 200, owner: null, row: 6, col: 1 },
    { name: "Green Line", color: "gray", price: 200, owner: null, row: 6, col: 11 },
    { name: "Grand Cambridge Apartments", color: "#C27BA0", price: 160, owner: null, row: 7, col: 1 },
    { name: "Chance", color: "white", price: null, owner: null, row: 7, col: 11 },
    { name: "George Draper Dayton Hall", color: "#C27BA0", price: 140, owner: null, row: 8, col: 1 },
    { name: "Janet Wallace Fine Arts Center", color: "#3B77D8", price: 350, owner: null, row: 8, col: 11 },
    { name: "Facilities", color: "black", price: 150, owner: null, row: 9, col: 1 },
    { name: "MacBooks", color: "white", price: 75, owner: null, row: 9, col: 11 },
    { name: "Kirk Hall", color: "#C27BA0", price: 140, owner: null, row: 10, col: 1 },
    { name: "Leonard Center", color: "#3B77D8", price: 400, owner: null, row: 10, col: 11 },


    { name: "Duprison + Just Visiting", color: "white", price: null, owner: null, row: 11, col: 1 },
    { name: "30 Mac", color: "#6EA8DC", price: 120, owner: null, row: 11, col: 2 },

    { name: "Wallace Hall", color: "#6EA8DC", price: 100, owner: null, row: 11, col: 3 },
    { name: "Chance", color: "white", price: null, owner: null, row: 11, col: 4 },
    { name: "Bigelow Hall", color: "#6EA8DC", price: 100, owner: null, row: 11, col: 5 },
    { name: "Route 63", color: "gray", price: 200, owner: null, row: 11, col: 6 },
    { name: "Activity Fee", color: "white", price: 200, owner: null, row: 11, col: 7 },
    { name: "Doty Hall", color: "#8E7CC3", price: 60, owner: null, row: 11, col: 8 },
    { name: "Community Chest", color: "white", price: null, owner: null, row: 11, col: 9 },
    { name: "Turck Hall", color: "#8E7CC3", price: 60, owner: null, row: 11, col: 10 },
    { name: "Pass Go To the Left", color: "white", price: null, owner: null, row: 11, col: 11}
]