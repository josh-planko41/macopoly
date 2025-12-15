import React from "react";
/**
 * Function for displaying the Jail window.
 * @param {Object} player - The player object containing the player's information.
 */

export default function Jail(player) {
  return (
    <div className="jail-container">
      <h2>Duprison</h2>
      <p>
        You've messed up room selection. You now have to stay in Duprison until
        you roll doubles, pay a $50 fine, or use a "Get Out of Duprison Free"
        card.
      </p>
      <img src="/images/duprison.png" alt="Duprison" className="jail-image" />
    </div>
  );
}