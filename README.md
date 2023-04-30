# An online javascript code test

This is an online code test with an online javascript code editor. It fully depends on [JDoole](https://docs.jdoodle.com/) and [react-codemirror](https://github.com/uiwjs/react-codemirror). There will be five random questions, and you can submit your answers and will be examined by JDoole API.

---

## How to use

```
// you need node js to start this project
npm install
npm start
```

### After start APP

You will see a login page, and you can enter the page directly by press login button, because this project hasn't been linked with any other servers.

### After enter main page

You will see a left panel with a question list, and a code editor on the right side. Once you click on a question, you can start to modify and test your code.

### Test code

You can enter a parameter and press test button to see if you can get the result you want.

### Save your code

You can either save the code manually by pressing save button, or you can leave it to auto saving function which can save your code every 20s automatically.

### Submit your anwser

If you are really confidence with your solution, you can press submit button, and the system will provide if your job can pass all of the five test cases or not. Note: because this APP is using free [JDoole API](https://www.jdoodle.com/compiler-api/), only 200 times everyday to check your work.

### Once you finished

You will get a result page.
## Dependencies

React.js
react-router-dom
react-joyride
reactour/tour
sockjs-client
webstomp-client
react-codemirror

## TODO

This APP is an ongoing project, several features to be finished in the future.

1. add register user and integrate it with backend service
2. add more thorough test cases for questions
3. add multi-user features
4. fix websocket CORS issue
5. support other languages