function MenuChoice(selection)
{
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section1").style.display = "none";
    document.getElementById("section1").style.position = "absolute";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section2").style.position = "absolute";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section3").style.display = "none";
    document.getElementById("section3").style.position = "absolute";
    
    switch(selection)
    {
        case "Customers":
            document.getElementById("section1").style.visibility = "visible";
            document.getElementById("section1").style.display = "block";
            document.getElementById("section1").style.position = "relative";
            break;
        case "Order History":
            document.getElementById("section2").style.visibility = "visible";
            document.getElementById("section2").style.display = "block";
            document.getElementById("section2").style.position = "relative";
            break;
        case "About":
            document.getElementById("section3").style.visibility = "visible";
            document.getElementById("section3").style.display = "block";
            document.getElementById("section3").style.position = "relative";
            break;
        case "None":
            //No menu item selected, so no section will be displayed
            break;
        default:
            alert("Please select a different menu option");
    }
}