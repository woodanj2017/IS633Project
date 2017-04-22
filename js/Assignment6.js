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
    document.getElementById("section6").style.visibility = "hidden";
    document.getElementById("section6").style.display = "none";
    document.getElementById("section6").style.position = "absolute";
    document.getElementById("section7").style.visibility = "hidden";
    document.getElementById("section7").style.display = "none";
    document.getElementById("section7").style.position = "absolute";
    document.getElementById("section8").style.visibility = "hidden";
    document.getElementById("section8").style.display = "none";
    document.getElementById("section8").style.position = "absolute";
    document.getElementById("section9").style.visibility = "hidden";
    document.getElementById("section9").style.display = "none";
    document.getElementById("section9").style.position = "absolute";
    
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
        case "Add Customer":
            document.getElementById("section5").style.visibility = "visible";
            document.getElementById("section5").style.display = "block";
            document.getElementById("section5").style.position = "relative";
            break;
        case "Geolocation":
            document.getElementById("section6").style.visibility = "visible";
            document.getElementById("section6").style.display = "block";
            document.getElementById("section6").style.position = "relative";
            break;
        case "Camera":
            document.getElementById("section7").style.visibility = "visible";
            document.getElementById("section7").style.display = "block";
            document.getElementById("section7").style.position = "relative";
            break;
        case "Contact List":
            document.getElementById("section8").style.visibility = "visible";
            document.getElementById("section8").style.display = "block";
            document.getElementById("section8").style.position = "relative";
            break;
        case "About":
            document.getElementById("section9").style.visibility = "visible";
            document.getElementById("section9").style.display = "block";
            document.getElementById("section9").style.position = "relative";
            break;
        case "None":
            //No menu item selected, so no section will be displayed
            break;
        default:
            alert("Please select a different menu option");
    }
}

function GoToAddCustomer()
{
    MenuChoice("Add Customer");
    document.getElementById("menu").selectedIndex = "2";
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
    var displaytable = "<table><tr><th>Customer ID</th><th>Company Name</th><th>City</th><th>Current Orders</th><th>Delete Customer</th></tr>";
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
        deletecustomer = '<button onclick="ConfirmCustomerDelete(' + "'" + customerid + "')" + '">Delete Customer</button>';
        displaytable += "<tr><td>" + customerid + "</td><td>" + companyname + "</td><td>" + city + "</td><td>" + currentorders + "</td><td>" + deletecustomer + "</td></tr>";
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
    document.getElementById("menu").selectedIndex = "3";
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
    document.getElementById("menu").selectedIndex = "4";
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
    document.getElementById("menu").selectedIndex = "5";
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

function AddCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var customerid = document.getElementById("customerid").value;
    var companyname = document.getElementById("companyname").value;
    var customercity = document.getElementById("customercity").value;
    var parameters = '{"CustomerID":"' + customerid + '","CompanyName":"' + companyname + '","City":"' + customercity + '"}';
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            var outcome = result.WasSuccessful;
            var error = result.Exception;
//            console.log(result);
            AddCustomerResult(outcome, error);
            MenuChoice("Customers");
            document.getElementById("menu").selectedIndex = "1";
        }
    }
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(parameters);
}

function AddCustomerResult(outcome, error)
{
    switch(outcome)
    {
        case 1:
            alert("The operation was successful!");
            break;
        case 0:
            alert("The operation was not successful:\ "+ error);
             break;
        case -2:
            alert("This operation was not successful because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The operation was not successful because a record with the supplied  could not be found.");
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}

function ConfirmCustomerDelete(customerid)
{
    var check = confirm("Are you sure you want to delete this customer?");
    if(check == true)
    {
        DeleteCustomer(customerid);
    }
    else
    {
        alert("Action aborted.");
    }
}

function DeleteCustomer(customerid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    url += customerid;
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            var outcome = result.DeleteCustomerResult.WasSuccessful;
            var error = result.DeleteCustomerResult.Exception;
            CustomerDeleteResult(outcome, error);
            document.getElementById("menu").selectedIndex = "0";
            MenuChoice("Customers");
            document.getElementById("menu").selectedIndex = "1";
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
}

function CustomerDeleteResult(outcome, error)
{
    switch(outcome)
    {
        case 1:
            alert("The operation was successful!");
            break;
        case 0:
            alert("The operation was not successful:\ "+ error);
             break;
        case -2:
            alert("This operation was not successful because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The operation was not successful because a record with the supplied  could not be found.");
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}

function Location()
{
    var geo = navigator.geolocation;
    if(geo)
    {
        geo.getCurrentPosition(showPosition);
    }
    else
    {
        alert("Geolocation is not supported");
    }
}

function showPosition(position)
{
    document.getElementById("latitude").style.visibility = "visible";
    document.getElementById("latitude").style.display = "block";
    document.getElementById("longitude").style.visibility = "visible";
    document.getElementById("longitude").style.display = "block";
    document.getElementById("static-map").style.visibility = "visible";
    document.getElementById("static-map").style.display = "inline";
    var latitudelabel = "Latitude: " + position.coords.latitude;
    var longitudelabel = "Longitude: " + position.coords.longitude;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var mapurl = "http://maps.google.com/maps/api/staticmap?center=";
    mapurl = mapurl + latitude + "," + longitude;
    mapurl = mapurl + '&zoom=15&size=512x512&maptype=roadmap&sensor=true&markers=color:blue%7Clabel:A%7C';
    mapurl = mapurl + latitude + "," + longitude;
    mapurl = mapurl + '&key=AIzaSyCBPozFo_zT8y8fL-S18qHHJqzhHqd27vw';
    var imgElement = document.getElementById("static-map");
    imgElement.src = mapurl;
    document.getElementById("latitude").innerHTML = latitudelabel;
    document.getElementById("longitude").innerHTML = longitudelabel;
}

function CapturePhoto()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URl, saveToPhotoAlbum: true });
}

function onSuccess(imageURl)
{
    var picdisplay = document.getElementById("snapshot");
    document.getElementById("snapshot").style.visibility = "visible";
    document.getElementById("snapshot").style.display = "block";
    picdisplay.style.display = "block";
    picdisplay.src = imageURl;
}

function onFail(message)
{
    alert("Failed because: " + message);
}

function PickContact()
{
    navigator.contacts.pickContact(function(contact)
        {
            var contactinfo = "Contact Name: ";
            contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
            var count = 0;
            if(contact.phoneNumbers !== null)
            {
                for(count=0; count < contact.phoneNumbers.length; count++)
                {
                    contactinfo += contact.phoneNumbers[count].type + ": " + contact.phoneNumbers[count].value + "<br>";
                }
            }
            if(contact.emails !== null)
            {
                for(count=0; count < contact.emails.length; count++)
                {
                    contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
                }
            }
            document.getElementById("contactname").style.visibility = "visible";
            document.getElementById("contactname").innerHTML = contactinfo;
        }, function(err)
           {
            alert("Error: " + err);
           });
}

function SearchContacts()
{
    var options = new ContactFindOptions();
    options.filter = "Aldridge";
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.givenName, navigator.contacts.fieldType.familyName];
    var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts)
{
    alert('Found ' + contacts.givenName.value + contacts.familyName.value + ' contacts.');
}

function onError(contactError)
{
    alert('onError!');
}