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
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section4").style.display = "none";
    document.getElementById("section4").style.position = "absolute";
    document.getElementById("section5").style.visibility = "hidden";
    document.getElementById("section5").style.display = "none";
    document.getElementById("section5").style.position = "absolute";    
    
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
        case "Current Orders":
            document.getElementById("section3").style.visibility = "visible";
            document.getElementById("section3").style.display = "block";
            document.getElementById("section3").style.position = "relative";
            break;
        case "Update Order Info":
            document.getElementById("section4").style.visibility = "visible";
            document.getElementById("section4").style.display = "block";
            document.getElementById("section4").style.position = "relative";
            break;        
        case "About":
            document.getElementById("section5").style.visibility = "visible";
            document.getElementById("section5").style.display = "block";
            document.getElementById("section5").style.position = "relative";
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
    var displaytable = "<table><tr><th>Customer ID</th><th>Company Name</th><th>City</th><th>Current Orders</th></tr>";
    var count = 0;
    var customerid = "";
    var companyname = "";
    var city = "";
    for(count = 0;count < result.GetAllCustomersResult.length;count ++)
    {
        customerid = result.GetAllCustomersResult[count].CustomerID;
        companyname = '<a href="javascript:Orders(' + "'" + customerid + "');" + '">';
        companyname += result.GetAllCustomersResult[count].CompanyName;
        companyname += '</a>';
        city = result.GetAllCustomersResult[count].City;
        currentorders = '<button onclick="CurrentOrders(' + "'" + customerid + "')" + '">Current Orders</button>';
        displaytable += "<tr><td>" + customerid + "</td><td>" + companyname + "</td><td>" + city + "</td><td>" + currentorders + "</td></tr>";
    }
    displaytable += "</table>";
    document.getElementById("customerlistdisplay").innerHTML = displaytable;
}

function GetOrders()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custidinput").value;
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
}

function Orders(customerid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    var input = document.getElementById("custidinput");
    input.value = "";
    document.getElementById("menu").selectedIndex = "2";
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OrdersOutput(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OrdersOutput(result)
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

function GoBack()
{
    MenuChoice("Customers");
    document.getElementById("menu").selectedIndex = "1";
}

function GetCurrentOrders()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custidinput2").value;
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GetCurrentOrdersOutput(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GetCurrentOrdersOutput(result)
{
    var displaytable = "<table><tr><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th></tr>";
    var count = 0;
    for(count = 0;count < result.GetOrdersForCustomerResult.length;count ++)
    {
        orderid = result.GetOrdersForCustomerResult[count].OrderID;
        shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
        shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
        shipname = result.GetOrdersForCustomerResult[count].ShipName;
        shippostcode = result.GetOrdersForCustomerResult[count].ShipPostcode;
        displaytable += "<tr><td>" + orderid + "</td><td>" + shipaddress + "</td><td>" + shipcity + "</td><td>" + shipname + "</td><td>" + shippostcode + "</td></tr>";
    }
    displaytable += "</table>";
    document.getElementById("customercurrentordersdisplay").innerHTML = displaytable;
}

function CurrentOrders(customerid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += customerid;
    var input = document.getElementById("custidinput2");
    input.value = "";
    document.getElementById("menu").selectedIndex = "3";
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            CurrentOrdersOutput(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function CurrentOrdersOutput(result)
{
    var displaytable = "<table><tr><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Update Order</th></tr>";
    var count = 0;
    for(count = 0;count < result.GetOrdersForCustomerResult.length;count ++)
    {
        orderid = result.GetOrdersForCustomerResult[count].OrderID;
        shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
        shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
        shipname = result.GetOrdersForCustomerResult[count].ShipName;
        shippostcode = result.GetOrdersForCustomerResult[count].ShipPostcode;
        getorderinfo = '<button onclick="GetOrderInfo(' + "'" + orderid + "')" + '">Update Order</button>';
        displaytable += "<tr><td>" + orderid + "</td><td>" + shipaddress + "</td><td>" + shipcity + "</td><td>" + shipname + "</td><td>" + shippostcode + "</td><td>" + getorderinfo + "</td></tr>";
    }
    displaytable += "</table>";
    document.getElementById("customercurrentordersdisplay").innerHTML = displaytable;
    MenuChoice("Current Orders");
}

function GetOrderInfo(orderid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    url += orderid;
    document.getElementById("menu").selectedIndex = "4";
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            GetOrderInfoOutput(result);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GetOrderInfoOutput(result)
{
    document.getElementById("orderid").value = result[0].OrderID;
    document.getElementById("orderid").disabled = "true";
    document.getElementById("shipaddress").value = result[0].ShipAddress;
    document.getElementById("shipcity").value = result[0].ShipCity;
    document.getElementById("shipname").value = result[0].ShipName;
    document.getElementById("shippostcode").value = result[0].ShipPostcode;
    MenuChoice("Update Order Info");
}

function UpdateOrderInfo()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
    var orderid = Number(document.getElementById("orderid").value);
    var shipaddress = document.getElementById("shipaddress").value;
    var shipcity = document.getElementById("shipcity").value;
    var shipname = document.getElementById("shipname").value;
    var shippostcode = document.getElementById("shippostcode").value;
    var parameters = '{"OrderID":' + orderid + ',"ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipName":"' + shipname + '","ShipPostcode":"' + shippostcode + '"}';
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            console.log(result);
            UpdateOrderInfoResult(result);
            MenuChoice("Customers");
            document.getElementById("menu").selectedIndex = "1";
        }
    }
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(parameters);
}

function UpdateOrderInfoResult(result)
{
    switch(result)
    {
        case 1:
            alert("This order's information has been successfully updated!");
            break;
        case 0:
            alert("This order's information failed to update.");
             break;
        case -2:
            alert("This order's information failed to update because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The order ID entered could not be found.");
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}