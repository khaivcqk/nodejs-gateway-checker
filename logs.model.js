//import mongoose from 'mongoose';
//import DBConfig from '../config/database.config';
const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/TEST',{ useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema
const transactionSchema = new Schema({
        // "job": "",
        // "rawTX": "",
        // "verified": null,
        status: {type: String},
        checkedTimes: {},
        txID: {type: String}
});
transactionSchema.set('toJSON', { vituals: true });
module.exports =  mongoose.model('transaction', transactionSchema, 'transaction');

