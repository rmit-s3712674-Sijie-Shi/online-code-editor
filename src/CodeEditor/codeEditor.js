import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { testCode, gerUrl } from "./service";
import "./codeEditor.css"
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import data from "../Question/questionList.json";
import GlobalContext from "../global-context";

let socketClient = webstomp.over(new SockJS(`${gerUrl()}/stomp`))

const CodeEditor = ({title, id, testing}) => {
    const [inputValue, setInputValue] = useState('')
    const [codeState, setCodeState] = useState('')
    const [result, setResult] = useState('')
    const [disableButton, setDisableButton] = useState()
    const savedCallBack = useRef()
    const [functionStructure, setFunctionStructure] = useState()
    const [finished, setFinished] = useContext(GlobalContext)

    useEffect(() => {
        console.log(testing)
        setResult('')
        title ? setDisableButton(false) : setDisableButton(true)
        title ? setFunctionStructure(() => getSavedCode(title)) : setFunctionStructure(() => "Please select a question")
        console.log(codeState)
        return () => {
            setResult('')
            setCodeState('')
            setFunctionStructure('')
            setInputValue('')
        }
    }, [testing, title])

    useEffect(() => {
        savedCallBack.current = saveCode
    })

    // useEffect(() => {
    //     socketClient.connect({}, onWsConnection, onWsConnectionFailed)
    // })

    useEffect(() => {
        function tick() {
            savedCallBack.current()
        }
        let id = setInterval(tick, 20000);
        return () => clearInterval(id)
    },[])

    const onChange = useCallback((value, viewupdate) => {
        console.log(value)
        setCodeState(value)
        //socketClient.send('/app/execute-ws-api-token', value, { message_type: 'input' })
    }, [])

    const submitTestCode = useCallback(() => {
        setDisableButton(true)
        testCode(codeState + `console.log(test(${inputValue}))`)
        .then(res => {
            setResult(res.output)
        })
        .then(() => setDisableButton(false))
    }, [codeState, inputValue])

    const submitCode = useCallback(() => {
        setDisableButton(true)
        setResult()
        //let testCases = data[id].testing
        let testResult = []
        let pass = 0
        let failed = 0
        console.log(testing)
        testing ? testing.forEach((res, index) => {
            let code = codeState + `console.log(test(${res.input}))`
            console.log(code)
            testCode(code)
            .then(result => {
            result.output.replace('/n') == res.result ?  pass += 1 :  failed += 1
            if(pass >= 5) {
                testResult = `Congrets! You have passed all 5 test cases!`
                setFinished(res => [...res, {
                    id: id,
                    finished: true
                }])
                console.log(finished)
            } else if(index < 4) {
                testResult = `You have ${pass} test cases passed, ${failed} failed, ${4-index} left.`
            } else {
                testResult = `You have ${pass} test cases passed, ${failed} failed, try it again!`
            }
            
            setResult(testResult)
            if(index === 4) {
                setDisableButton(false)
            }
        }).catch(err => console.error(err.response.data.error)) 
        }) : console.error(`lack of test cases`)
        setDisableButton(false)
    }, [codeState, finished, id, setFinished, testing])

    const saveCode = () => {
        if(title && codeState)
        console.log('saving...')
        sessionStorage.setItem(`${title}`, codeState)
    }

    const getSavedCode = (title) => {
        console.log(title)
        let code = sessionStorage.getItem(title)
        setCodeState(code)
        return code ? code : "function test(a){}"
    }

    const onWsConnection = () => {
        let token = localStorage.getItem("editorToken")
        socketClient.subscribe("/user/queue/execute-i", (message) => {
            let msgId = message.headers['message-id']
            let msgSeq = parseInt(msgId.substring(msgId.lastIndexOf('-') + 1))
    
            let statusCode = parseInt(message.headers.statusCode)
    
            if (statusCode === 201) {
              this.wsNextId = msgSeq + 1
              return
            }
    
            let t0
            try {
              t0 = performance.now()
              while ((performance.now() - t0) < 2500 && this.wsNextId !== msgSeq) {
    
              }
            } catch (e) {
    
            }
    
            if (statusCode === 204) {
              //executionTime = message.body
            } else if (statusCode === 500 || statusCode === 410) {
              //server error
              console.log("server error");
            } else if (statusCode === 206) {
              //outputFiles = JSON.parse(message.body)
              //returns file list - not supported in this custom api
            } else if (statusCode === 429) {
              //Daily limit reached
              console.log("daily limit reached");
            } else if (statusCode === 400) {
              //Invalid request - invalid signature or token expired - check the body for details
              console.log("invalid request - invalid signature or token expired");
            } else if (statusCode === 401) {
              //Unauthorised request
              console.log("Unauthorised request");
            } else {
              var txt = document.getElementById("result").value
              document.getElementById("result").value = txt + message.body
            }
    
            this.wsNextId = msgSeq + 1
        })

        let data = JSON.stringify({
            script:codeState,
            language: 'nodejs',
            versionIndex:4
        })
       // socketClient.send('/app/execute-ws-api-token', data, { message_type: 'execute', token: token })
    }
    const onWsConnectionFailed = (e) => {
        console.log("connection failed")
        console.log(e)
    }

    return (
        <div className="editorContainer">
            <div>{title ? title : "Choose a question on the left" }</div>
            <ReactCodeMirror value={functionStructure}
                extensions={[javascript({ typescript: true })]}
                onChange={onChange}
                placeholder={"enter your code here"}
                height="500px"
                width="700px"
                disabled={title? false: true}
            >
            </ReactCodeMirror>
            <div className="buttonContainer">
            <input className="testInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
            <button className="testButton" onClick={() => submitTestCode()} disabled={disableButton}>Test</button>
            <button className="saveButton" onClick={() => saveCode()} disabled={disableButton}>Save</button>
            <button className="testButton" onClick={() => submitCode()} disabled={disableButton}>submit</button>
            </div>
            <div className="resultSection">
                {result ? "Your result: \n" + result : "Your result: \n"}
            </div>
        </div>
    )
}

export default CodeEditor;