
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CardHistorySchema = new Schema({
  cardId: {
    type: ObjectId,
    ref: 'Card',
    required: true
  },
  // 八达通卡号, 通过读卡器获取
  // "00 00 00 00 01 83 BD 5C "
  cardNo: {
    type: String,
    required: true
  },
  // 拥有的门 (数组)
  doorIds: [{
    type: ObjectId,
    ref: 'Door'
  }],
  // 用户名
  username: {
    type: String,
    trim: true,
    required: true
  },
  // 姓名
  realname: {
    type: String,
    trim: true,
    required: true
  },
  // 住户信息
  userInfo: {
    type: String
  }
}, {
  versionKey: false,
  // 换卡时间
  timestamps: true
})

module.exports = CardHistorySchema
