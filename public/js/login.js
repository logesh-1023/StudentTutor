function checkem(){
    let name=document.forms["myForm"]["email"].value;
    let a=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(name.match(a))
    {
        document.getElementById('em').innerHTML="&nbsp";
        document.forms["myForm"]["pass"].disabled=false;
        return true;
    }
    else
    {
        if(name==''){
            document.getElementById('em').innerHTML="The above field should not be empty";
            return false;
        }
        else{
            document.getElementById('em').innerHTML="The email is invalid";
            return false;
        }
    }
}
function checkpa(){
    let name=document.forms["myForm"]["pass"].value;
    let a=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/;    
    if(name.match(a))
    {
        document.getElementById('pn').innerHTML="&nbsp";
        document.getElementById('butt').disabled=false;
        return true;
    }
    else
    {
        if(name==''){
            document.getElementById('pn').innerHTML="The above field should not be empty";
            return false;
        }
        else{
            document.getElementById('pn').innerHTML="The password is invalid";
            return false;
        }
    }
}
