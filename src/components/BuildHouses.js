
export default function BuildHouses({buildableSets, onConfirm}){

    if (buildableSets.length === 0){
        return (
            <div className="buildHousesNotAllowed-window">
                <h2>You don't have any property sets to build houses on.</h2>
                <h3>Tips: You have to own all properties of the same color to build houses</h3>
            </div>
        );
    }

    else{
        return(
            <div>
                {/* Build Houses Implementation goes here. */}
            </div>
        );
    }

}