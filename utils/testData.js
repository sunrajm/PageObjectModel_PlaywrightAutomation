const users={
    standard:{
        username:"standard_user",
        password:"secret_sauce",
    },
    locked:{
        username:"locked_out_user",
        password:"secret_sauce"
    },
    invalid:{
        username:"wrong_user",
        password:"wrong_password",
    }
};

const errorMessage={
    lockedUser:"Epic sadface: Sorry, this user has been locked out.",
    invalidUser:"Epic sadface: Username and password do not match any user in this service",
    emptyUsername:"Epic sadface: Username is required",
    emptyPassword:"standard_user",
};

module.exports={users,errorMessage};