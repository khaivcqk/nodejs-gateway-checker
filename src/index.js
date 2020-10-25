const transactionModel = require("./model/logs.model.js");
const nonceModel = require("./model/nonce.model.js");
const web3 = require("./model/web3.model.js");

async function Checker() {
    const data = await transactionModel.find({
        "status": 'PENDING'
    })

    data.forEach(async element => {
        const receipt = await web3.eth.getTransactionReceipt(element.txID);
            // have receipt
            if (receipt){
                //receipt.status return true
                if (receipt.status){
                    await transactionModel.updateOne({ _id: element._id }, { status: "SUCCESS"  })
                }
                //receipt.status return false
                else {
                    await transactionModel.updateOne({ _id: element._id }, { status: "FAIL" })
                    const nonce = await web3.eth.getTransactionCount(receipt.from);
                    //update nonce
                    nonceModel.set(receipt.from, nonce)
                }
            }
            //no receipt
            else {
                // ChekedTimes===50
                if (element.checkedTimes == 50) {
                    await transactionModel.updateOne({ _id: element._id },  { status: "FAIL" })
                    // Update Nonce
                    const nonce = await web3.eth.getTransactionCount(receipt.from)
                    nonceModel.set(receipt.from, nonce)
                }
                // CheckedTimes < 50
                else {
                    await transactionModel.updateOne({ _id: element._id }, { checkedTimes: element.checkedTimes + 1 } )
                }
            }
    });
}
Checker();
// set time to repeat: 100ms
setInterval(Checker, 100);
