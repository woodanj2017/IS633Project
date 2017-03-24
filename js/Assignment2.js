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
            GetCustomers();
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

function GetCustomers()
{
    var objRequest = new XMLHttpRequest();
    var url =  "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GetCustomersOutput(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GetCustomersOutput(result)
{
    var displaytable = "<table><tr><th>Customer ID</th><th>Company Name</th><th>City</th></tr>";
    var count = 0;
    var customerid = "";
    var companyname = "";
    var city = "";
    for(count = 0;count < result.GetAllCustomersResult.length;count ++)
    {
        customerid = result.GetAllCustomersResult[count].CustomerID;
        companyname = '<a href="javascript:GetOrders(' + "'" + customerid + "'):" + '">';
        companyname += result.GetAllCustomersResult[count].CompanyName;
        companyname += '</a>';
        city = result.GetAllCustomersResult[count].City;
        displaytable += "<tr><td>" + customerid + "</td><td>" + companyname + "</td><td>" + city + "</td></tr>";
    }
    displaytable += "</table>";
    document.getElementById("customerlistdisplay").innerHTML = displaytable;
}

function GetOrders(customerid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GetOrdersOutput(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GetOrdersOutput(result)
{
    var displaytable = "<table><tr><th>Product Name</th><th>Total</th></tr>";
    var count = 0;
    for(count = 0;count < result.length;count ++)
    {
        displaytable += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    displaytable += "</table>";
    document.getElementById("orderhistorydisplay").innerHTML = displaytable;
    MenuChoice("Order History");
}

