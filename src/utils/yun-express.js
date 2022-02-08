const axios = require("axios")
const httpRequest = axios.create({
  baseURL: "https://new.yuntrack.com/YunTrackAPI/Track",
  timeout: 10000,
  headers: {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'Authorization': 'Nebula token:undefined',    
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36',
    'Content-Type': 'application/json',
    'Sec-GPC': '1',
    'Origin': 'https://new.yuntrack.com',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': ' https://new.yuntrack.com/Track/Detailing?id=YT2203821266034482',
    'Accept-Language': 'en-US,en;q=0.9',
  }
})

module.exports = function () {
  return Object.freeze({
    queryOrder
  })
  async function queryOrder({ order, getRaw = false}) {
    try {
    const result = await httpRequest({
      method: 'POST',
      url: '/Query',
      data: { NumberList: [order], CaptchaVerification: "" }    
    })
    return getRaw ? result.data : _treatResult(result.data)
    } catch(error) {
      return error.response.data
    }
  }
  function _treatResult(result) {
    const lastEvent = result.ResultList[0].TrackInfo.LastTrackEvent
    const msg = `Status: ${lastEvent.ProcessContent}\nLocation: ${lastEvent.ProcessLocation}\nDate: ${lastEvent.ProcessDate}`
    return msg
  }
}
