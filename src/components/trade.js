
/**
 * A component that displays a "Make a Trade" button.
 * When clicked, it will call the handleTrade function passed as a prop.
 * @param {function} handleTrade - A function to be called when the button is clicked.
 */
export default function MakeATrade({handleTrade}) {
    return(
    <div>
        <button onClick = { () => handleTrade}>Make a Trade</button>
    </div>
    );
}



