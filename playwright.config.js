module.exports = {
    use: {
        baseURL: "https://www.saucedemo.com",
    },
    reporter:[
        ['list'],
        ['html',{outputFolder:'playwright-report'}]
    ]
};