const users = {
    standard: {
        username: "standard_user",
        password: "secret_sauce",
    },
    locked: {
        username: "locked_out_user",
        password: "secret_sauce"
    },
    invalid: {
        username: "wrong_user",
        password: "wrong_password",
    }
};

const errorMessage = {
    lockedUser: "Epic sadface: Sorry, this user has been locked out.",
    invalidUser: "Epic sadface: Username and password do not match any user in this service",
    emptyUsername: "Epic sadface: Username is required",
    emptyPassword: "Epic sadface: Password is required",
};

const productNames = {
    backpack: "sauce-labs-backpack",
    bikeLight: "sauce-labs-bike-light",
    boltTShirt: "sauce-labs-bolt-t-shirt",
    fleeceJacket: "sauce-labs-fleece-jacket",
    onesie: "sauce-labs-onesie",
    redTShirt: "test.allthethings()-t-shirt-(red)"
};

const products = {
    backpack: "Sauce Labs Backpack",
    bikeLight: "Sauce Labs Bike Light",
    boltTShirt: "Sauce Labs Bolt T Shirt",
    fleeceJacket: "Sauce Labs Fleece Jacket",
    onesie: "Sauce Labs Onesie",
    redTShirt: "Test.allthethings() T Shirt (Red)"
};

const shippingInfo = {
    valid: {
        firstName: 'Jhon',
        lastName: 'Doe',
        postalCode: '12345',
    },
    missingFirstName: {
        firstName: '',
        lastName: 'Doe',
        postalCode: '12345',
    },
    missingLastName: {
        firstName: 'Jhon',
        lastName: '',
        postalCode: '12345',
    },
    missingPostalCode: {
        firstName: 'Jhon',
        lastName: 'Doe',
        postalCode: '',
    },
};

module.exports = { users, errorMessage, productNames, products, shippingInfo};