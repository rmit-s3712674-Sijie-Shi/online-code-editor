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
        setResult('')
        //if there is not a title, set button disabled
        title ? setDisableButton(false) : setDisableButton(true)
        //if have a title, set code editor value to a saved value, or a prepared code framework
        title ? setFunctionStructure(() => getSavedCode(title)) : setFunctionStructure(() => "Please select a question")
        //reset those parameters when component distroyed
        return () => {
            setResult('')
            setCodeState('')
            setFunctionStructure('')
            setInputValue('')
        }
    }, [testing, title])

    useEffect(() => {
        socketClient.connect({}, onWsConnection, onWsConnectionFailed)
    })

    //set ref for auto saving
    useEffect(() => {
        savedCallBack.current = saveCode
    })

    //call auto saving and kill the interval when component distroyed
    useEffect(() => {
        function tick() {
            savedCallBack.current()
        }
        let id = setInterval(tick, 20000);
        return () => clearInterval(id)
    },[])

    //save value to state, send value to websocket
    const onChange = useCallback((value, viewupdate) => {
        setCodeState(value)
        socketClient.send('/app/execute-ws-api-token', value, { message_type: 'input' })
    }, [])

    //test code with entered parameter
    const submitTestCode = useCallback(() => {
        setDisableButton(true)
        testCode(codeState + `console.log(test(${inputValue}))`)
        .then(res => {
            setResult(res.output)
        })
        .then(() => setDisableButton(false))
    }, [codeState, inputValue])

    //test code with five cases
    const submitCode = useCallback(() => {
        setDisableButton(true)
        setResult()
        //let testCases = data[id].testing
        let finish = finished
        let testResult = []
        let pass = 0
        let failed = 0
        testing ? testing.forEach((res, index) => {
            let input = JSON.stringify(res.input)
            //integrate code
            let code = codeState + `console.log(test(${input}))`
            testCode(code)
            .then(result => {
            //trim received data
            //data receive always be a string,
            //if result contain array, there will be many redundant spaces, and hard to be trimmed
            //so currently only the test with string and number results are considered as valid tests
            result.output.replace('/n').trim() === res.result?.toString() ?  pass += 1 :  failed += 1

            //if all 5 test passed, show congrets message, otherwise show the number of failed test
            if(pass >= 5) {
                testResult = `Congrets! You have passed all 5 test cases!`
                finish[id] = true
                setFinished(finish)
                console.log(finished)
            } else if(failed < 5) {
                testResult = `You have ${pass} test cases passed, ${failed} failed.`
            } else {
                testResult = `You have ${pass} test cases passed, ${failed} failed, try it again!`
            }
            
            setResult(testResult)
            if(index === 4) {
                setDisableButton(false)
            }
        }).catch(err => {
            console.error(err)
        }) 
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
    //websocket connection
    //check https://docs.jdoodle.com/integrating-compiler-ide-to-your-application/compiler-api/websocket-api
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
        socketClient.send('/app/execute-ws-api-token', data, { message_type: 'execute', token: token })
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