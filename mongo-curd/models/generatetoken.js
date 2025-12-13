let jwt=require("jsonwebtoken");
let secretkey="bholupandit"
function Generatetoken(existinguser){
    let payload={
        id:existinguser._id,
        email:existinguser.email,
        role:existinguser.role
    }
return jwt.sign(payload,secretkey,{expiresIn:'2h'});

}
module.exports=Generatetoken;