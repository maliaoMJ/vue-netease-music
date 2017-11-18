function formatDurationTime(time) {
  let temp = parseInt(time)
  let result = parseInt(temp / 1000)
  return result
}
const formatSongsData = function(Songs) {
  var URLs = []
  var SongsIds = []
  let formatSongsData = []
  for (let i = 0; i < Songs.length; i++) {
    SongsIds.push(Songs[i].id)
    let song = Songs[i]
    let tempSongObj = {
      id: song.id,
      name: song.name,
      singer: song.ar[0].name,
      singerId: song.ar[0].id,
      durationTime: formatDurationTime(song.dt),
      imgUrl: song.al.picUrl,
      albumName: song.al.name
    }
// 获取URL
    const URLSTRINGS = SongsIds.join(',')
    this.$http.get(`http://114.67.151.28:3000/music/url?id=${URLSTRINGS}`)
      .then(response => {
        URLs = response.data.data
      })
      .catch(error => {
        console.log('format playlist data is error ' + error)
      })
    formatSongsData.push(tempSongObj)
  }
  setTimeout(() => {
    if (formatSongsData.length === URLs.length) {
      for (let i = 0; i < formatSongsData.length; i++) {
        for (let k = 0; k < URLs.length; k++) {
          if (formatSongsData[i].id === URLs[k].id) {
            formatSongsData[i].MP3URL = URLs[k].url
          }
        }
      }
    } else {
      console.log('get url mount is not equal playlist music mount')
    }
  }, 2500)
  // console.log(formatSongsData)
  if (formatSongsData.length === 0) {
  }
  return formatSongsData
}

export {formatSongsData}
