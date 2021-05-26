// middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // if not logged in, redirect to login form
    res.redirect('/vender');
}

function isLoggedInCustomer(req, res, next) {

    if (req.session.email) {
        return next();
    }
    // if not logged in, redirect to login form
    res.redirect('/customer/login');
}

function isSelectedVan(req, res, next) {
    if (req.session.vanId) {
        return next();
    }
    res.redirect('/customer');
}


// export the function
module.exports = {
    isLoggedIn,
    isLoggedInCustomer,
    isSelectedVan
}