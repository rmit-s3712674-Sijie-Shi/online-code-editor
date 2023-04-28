import axios from "axios";

const baseurl = "https://corsproxy.io/?https://api.jdoodle.com/v1";
//const sockjsurl = "https://api.jdoodle.com/js/sockjs.js";
//const webstompurl = "https://api.jdoodle.com/js/webstomp.js";
const clientId = "fa726691d3392385b477ae05cfc0d906";
const clientSecret = "a3ee7b63c35f71705025234a910fb3b65b2f4ce560f0cf9cead6233c89133fd9";

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
    // const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //     body: {
    //         clientId: clientId,
    //         clientSecret: clientSecret,
    //     }
    // })

    // const result = await response.json()
    // console.log(result)

    //return result
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