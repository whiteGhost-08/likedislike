if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require("./utils/ExpressError")
const mongoose = require("mongoose");
const User = require("./models/user");
const Problem = require("./models/problem")

const ID = process.env.ID;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/server';
app.use(cors({
    origin: "https://codeforces.com"
}));

app.use(express.json());
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch((error) => {
        console.log("oh no!! ", error);
    })

app.post('/', wrapAsync(async (req, res, next) => {
    try {
        const { bringProblems = [], userHandle = " ", loginStatus = " ", Id } = req.body;
        if (Id !== ID) {
            return next(new ExpressError(401, "Not authorised"));
        }
        const probData = []
        const vis = []
        if (bringProblems.length > 100) {
            return next(new ExpressError(406, "Incorrect data received"));
        }
        // check validity 
        for (let problem of bringProblems) {
            if (typeof problem !== 'string' || problem.length > 6) {
                return next(new ExpressError(406, "Incorrect data received"));
            }
        }
        // find the problems
        for (let problem of bringProblems) {
            const foundP = await Problem.findById(problem);
            if (foundP) {
                probData.push(foundP);
            }
        }
        // find the problems user reviewed
        if (loginStatus === "Logout" || loginStatus === 'Выйти') {

            if (typeof userHandle !== 'string' || userHandle.length > 24 || userHandle.length < 3) {
                return next(new ExpressError(406, "Incorrect data recived"));
            }
            for (let problem of bringProblems) {
                const liked = await User.findById(problem + "L" + userHandle)
                const disliked = await User.findById(problem + "D" + userHandle)
                if (liked) {
                    vis.push([problem, "L"]);
                } 
                else if (disliked) {
                    vis.push([problem, "D"]);
                }
            }
        }
        const dataToSend = {probData, vis};
        res.send(dataToSend);
    }
    catch(e) {
        return next(e);
    }
}))

app.patch('/', wrapAsync(async (req, res, next) => {

    const { id = " ", userHandle = " ", value = " ", Id} = req.body;
    if (Id !== ID) {
        return next(new ExpressError(401, "Not authorised"));
    }
    if ((value !== "L" && value !== "D") || userHandle.length < 3 || userHandle.length > 24 || id.length > 6) {
        return next(new ExpressError(406, "Incorrect data recieved"))
    }
    try {
        // save the current porblem if not present 
        let currProb = await Problem.findById(id);
        if (!currProb) {
            currProb = new Problem({
                _id: id,
                likes: 0,
                dislikes: 0
            });
        }
        let opposite = "L";
        if (value === "L") {
            opposite = "D";
        }
        const duplicate = await User.findById(id + value + userHandle);
        if (duplicate) {
            return next(new ExpressError(400, "Can't be done more than once"))
        }
        const currUser = await User.findById(id + opposite + userHandle);
        if (currUser) {
            await User.findByIdAndDelete(id + opposite + userHandle);
            currProb.decreaseValue(opposite);
        }
        currProb.increaseValue(value);
        const newUser = new User({_id : `${id}${value}${userHandle}`});
        await newUser.save();
        await currProb.save();
        res.status(200).send("operation successful");
    }
    catch (e) {
        return next(e);
    }
}))

app.all("*", (req, res, next) => { 
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
})
const port = process.env.PORT || 3000;
app.listen(port, (() => {
    console.log(`app is listening to port ${port}`)
}))