/**
 *曾经有一份真诚的爱情放在我面前，
 *我没有珍惜，
 *等我失去的时候我才后悔莫及，
 *人世间最痛苦的事莫过于此。
 *如果上天能够给我一个再来一次的机会，
 *我会对那个女孩子说三个字：我爱你。
 *如果非要在这份爱上加上一个期限，
 *我希望是……一万年！
 */
function formatDate(value) {
  let now = new Date(value)
  let month = now.getMonth() + 1 >= 10 ? now.getMonth() : '0' + now.getMonth()
  let date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()
  let hour = now.getHours() >= 10 ? now.getDate() : '0' + now.getDate()
  let minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()
  let second = now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds()
  return month + '-' + date + '  ' + hour + ':' + minute + ':' + second
}
function formatPlayCount(count) {
  return Number.parseInt(count)
}
export {formatDate, formatPlayCount}
