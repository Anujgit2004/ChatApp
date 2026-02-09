let jwt=require("jsonwebtoken");
let secretkey="jwt1234"
function Generatetoken(existinguser){
    let payload={
        id:existinguser._id,
        email:existinguser.email,
        role:existinguser.role
    }
return jwt.sign(payload,secretkey,{expiresIn:'2h'});

}
module.exports=Generatetoken;