
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DoorSchema = new Schema({
  // 門禁編碼
  doorNo: {
    type: String,
    trim: true,
    required: true
  },
  // 樓號
  building: {
    type: String,
    trim: true,
    required: true
  },
  // 單元號
  unit: {
    type: String,
    trim: true,
    required: true
  }
  // // 废弃, 弃用
  // deprecated: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  versionKey: false
})

DoorSchema.index({ doorNo: 1 }, { unique: true })
DoorSchema.index({ building: 1, unit: 1 }, { unique: true })
module.exports = DoorSchema
