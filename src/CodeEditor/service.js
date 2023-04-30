import axios from "axios";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

const baseurl = "https://corsproxy.io/?https://api.jdoodle.com/v1";
//const sockjsurl = "https://api.jdoodle.com/js/sockjs.js";
//const webstompurl = "https://api.jdoodle.com/js/webstomp.js";
const clientId = "145221a39e7456395d87bad5398c30fa";
const clientSecret = "bc60cad70b782e6785c0aead6418d7839211b9642468d7e87a9f2af52412314e";

export async function getToken() {
    let url = baseurl + "/auth-token"
    let tokenResponse
    await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          clientId: clientId,
          clientSecret: clientSecret,
        },
      })
      .then(res => {
        tokenResponse = res.data
        localStorage.setItem("editorToken", tokenResponse)
      })
      .catch(err => console.error(err));
     return tokenResponse
}

export async function testCode(code) {
    let url = baseurl + '/execute'
    let result
    await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          clientId: clientId,
          clientSecret: clientSecret,
          script: code,
          language: "nodejs"
        },
    }).then(res => {
      result = res.data
    })
    console.log(result)
    return result
}

export function linkSocket(){
  let socketClient = webstomp.over(new SockJS(`${baseurl} + "stomp"`))
  return socketClient
}

export function gerUrl(){
  return baseurl
}

export function getRandomQues(min, max){
  let result = []
  function getRandom(){
      return Math.floor(Math.random() * (max - min + 1)) + min
  }
  while(result.length < 5) {
      let num = getRandom()
      if(result.indexOf(num) < 0) {
          result.push(num)
      }
  }
  return result
}