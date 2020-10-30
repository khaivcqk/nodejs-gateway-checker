// This program only for the target testing

const transactionModel = require("./model/logs.model.js");
const nonceModel = require("./model/nonce.model.js");
const web3 = require("./model/web3.model.js");
async function Pending1() {
    const data = await transactionModel.find({
        "status": "FAIL"
    })
    //console.log(data);
    data.forEach(async element => {
        await transactionModel.updateOne({ _id: element._id }, { status: "PENDING" })
    });
}

async function Pending2() {
    const data = await transactionModel.find({
        "status": 'SUCCESS'
    })
    //console.log(data);
    data.forEach(async element => {
        await transactionModel.updateOne({ _id: element._id }, { status: "PENDING" })
    });
}
async function Pending3() {
    const data = await transactionModel.find({
        "checkedTimes": 50
    })
    //console.log(data);
    data.forEach(async element => {
        await transactionModel.updateOne({ _id: element._id }, { checkedTimes: 0 })
    });
}
Pending1()
Pending2()
Pending3()