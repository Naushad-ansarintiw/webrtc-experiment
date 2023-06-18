const express = require('express');
const router = express.Router();
const Boy = require('../models/boySchema.js');
const Girl = require('../models/girlSchema.js');
const Check = require('../models/checkSchema.js');



// -----------------ROUTES--------------------

// --------------Finding the Stranger to peer up---------------------
router.post('/', async (req, res) => {
    const { talkOption, myuniqueID } = req.body;
    console.log(talkOption, myuniqueID + "in the post route");
    try {
        if (talkOption === 'Boy') {
            const stranger = await Boy.find({});
            console.log(stranger);
            if (stranger.length > 0) {
                console.log("Inside");
                var randomNumber = Math.floor(Math.random() * stranger.length);
                // console.log(randomNumber);
                // console.log(stranger[randomNumber]);
                while (true) {
                    const checkAvailability = await Check.findOne({ uuid: stranger[randomNumber].uuid });
                    if (checkAvailability) {
                        randomNumber = Math.floor(Math.random() * stranger.length);
                        console.log("DJflkjsldj");
                    }
                    else {
                        // when connection is established between two peers the push them into the check Schema
                        const strangerUuid = stranger[randomNumber].uuid;
                        const strangerCheck = new Check({ uuid: strangerUuid });
                        await strangerCheck.save();
                        break;
                    }
                }

                res.status(200).json({ "user": stranger[randomNumber] });
            }
            else {
                res.status(404).json({ "error": "User not found" });
                console.log("No data in database");
            }
        }
        else if (talkOption === 'Girl') {
            const stranger = await Girl.find({});
            if (stranger.length > 0) {
                const randomNumber = Math.floor(Math.random() * stranger.length);
                console.log(randomNumber);
                console.log(stranger[randomNumber]);
                while (true) {
                    const checkAvailability = await Check.findOne({ uuid: stranger[randomNumber].uuid });
                    if (checkAvailability) {
                        randomNumber = Math.floor(Math.random() * stranger.length);
                        console.log("DJflkjsldj");
                    }
                    else {
                        const strangerUuid = stranger[randomNumber].uuid;
                        const strangerCheck = new Check({ uuid: strangerUuid });
                        await strangerCheck.save();
                        break;
                    }
                }

                res.status(200).json({ "user": stranger[randomNumber] });
            }

            else {
                res.status(404).json({ "error": "User not found" });
                console.log("No data in database");
            }
        }
        else {
            const userCheck = new Check({ uuid: myuniqueID });
            await userCheck.save();
            console.log("one User");
        }
    } catch (error) {
        res.status(500).json({ "error": "Invalid" });
        console.error(error.message);
    }
});


// -----------------------------saved the user unique id  -------------------------
router.post('/name', async (req, res) => {
    try {
        const { gender, myuniqueID, talkOption } = req.body;
        console.log({ gender, myuniqueID, talkOption });

        if (gender === 'Boy') {
            const boy = new Boy({ name: gender, uuid: myuniqueID, talk: talkOption });
            await boy.save();
            res.status(200).json({ success: "True" });
        }
        else if (gender === 'Girl') {
            const girl = new Girl({ name: gender, uuid: myuniqueID, talk: talkOption });
            await girl.save();
            res.status(200).json({ success: "True" });
        }
    } catch (error) {
        res.status(500).json({ error: "Invalid" });
        console.log(error.message);
    }

});

// ---------------check if user is peerd or not --------------------------

router.post('/check', async (req, res) => {
    try {
        const { myuniqueID } = req.body;
        console.log(myuniqueID);
        const check = await check.findOne({ uuid: myuniqueID });
        console.log(check);
        if (check) {
            res.status(200).json({ message: "True" });
        }
        else {
            res.status(200).json({ message: "False" });
        }
    } catch (error) {
        res.status(500).json({ error: "Invalid" });
        console.log(error.message);
    }
});

module.exports = router;