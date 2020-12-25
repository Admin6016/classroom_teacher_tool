// /**
//  * 解密时间戳
//  * @param timestamp
//  * @return
//  */
// public static Long Decrypt(Long timestamp){
//   Integer day = new Date().getDate();
//   Integer hour = new Date().getHours();
//   return timestamp / day * hour;
// }
//
// /**
//  * 加密时间戳
//  * @param timestamp
//  * @return
//  */
// public static Long Encrypt(Long timestamp){
//   Integer day = new Date().getDate();
//   Integer hour = new Date().getHours();
//   return timestamp * day / hour;
// }

const Decrypt = function(timestamp) {
  return timestamp / new Date().getDate() * new Date().getHours()
}

const Encrypt = function(timestamp) {
  return timestamp * new Date().getDate() / new Date().getHours()
}
export default {
  Encrypt,
  Decrypt
}
