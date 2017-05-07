var express = require('express');
var fs = require('fs');
var datafile = 'server/data/customers.json';
var router = express.Router();

/* GET all books and POST new books */
router.route('/')
    .get(function(req, res) {
        var data = getCustomersData();
        res.send(data);
    })

    .post(function(req, res) {

        var data = getCustomersData();
        var customerId = getNextAvailableID(data);

        var newCustomer = {
            customerId: customerId,
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            phone: req.body.phone,
            description: req.body.description
        };

        data.push(newCustomer);

        saveCustomersData(data);

//        res.set('Content-Type', 'application/json');
        res.status(201).send(newCustomer);
    });


/* GET, PUT and DELETE individual books */
router.route('/:id')

    .get(function(req, res) {

        //console.log('Retrieving book id: ' + req.params.id);

        var data = getCustomersData();

        var matchingCustomers = data.filter(function(customer) {
            return customer.customerId == req.params.id;
        });

        if(matchingCustomers.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(matchingCustomers[0]);
        }
    })

    .delete(function(req, res) {

        var data = getCustomersData();

        var pos = data.map(function(e) {
            return e.customerId;
        }).indexOf(parseInt(req.params.id, 10));

        if (pos > -1) {
            data.splice(pos, 1);
        } else {
            res.sendStatus(404);
        }

        saveCustomersData(data);
        res.sendStatus(204);

    })

    .put(function(req, res) {

        var data = getCustomersData();

        var matchingCustomers = data.filter(function(customer) {
            return customer.customerId == req.params.id;
        });

        if(matchingCustomers.length === 0) {
            res.sendStatus(404);
        } else {
            var customerToUpdate = matchingCustomers[0];
            customerToUpdate.name = req.body.name;
            customerToUpdate.email = req.body.email;
            customerToUpdate.photo = req.body.photo;
            customerToUpdate.phone = req.body.phone;
            customerToUpdate.description = req.body.description;
            saveCustomersData(data);
            res.sendStatus(204);
        }
    });

function getNextAvailableID(allBooks) {
    var maxID = 0;
    allBooks.forEach(function(element, index, array) {
        if(element.customerId > maxID) maxID = element.customerId;
    });
    return (maxID+1);
}

function getCustomersData() {
    var data = fs.readFileSync(datafile, 'utf8');
    return JSON.parse(data);
}

function saveCustomersData(data) {
    fs.writeFile(datafile, JSON.stringify(data, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = router;