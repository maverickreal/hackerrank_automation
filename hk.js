const pup = require('puppeteer-core'),
    codeObj = require('./code.js');

let page, browserOpen = pup.launch({
    headless: false,
    args: ['--start-maximised']
});

const loginLink = 'https://www.hackerrank.com/auth/login',
    loginMail = 'kmahboul.dz.397l@btcmod.com', loginPassword = 'blahblah';

const waitForClick = (selector, page) => new Promise((res, rej) => {
    let waitForModulePromise = page.waitForSelector(selector);
    waitForModulePromise.then(() => page.click(selector)).then(() => res()).catch(() => rej());
});

const quesSolve = (page, ques, ans) => new Promise((res, rej) => {
    let quesBeClicked = ques.click();
    quesBeClicked.then(() => {
        let focusedEditorPromise = waitForClick('.monaco-editor.no-user-select.vs', page);
        return focusedEditorPromise;
    }).then(() => waitForClick('.checkbox-input', page)
    ).then(() => page.waitForSelector('textarea.custominput', page)).then(() => page.type('textarea.custominput', ans, { delay: 10 })
    ).then(() => {
        let ctrlPressed = page.keyboard.down('Control');
        return ctrlPressed;
    }).then(() => {
        let aPressed = page.keyboard.down('A', { delay: 100 });
        return aPressed;
    }).then(() => {
        let xPressed = page.keyboard.press('X', { delay: 100 });
        return xPressed;
    }).then(() => {
        let ctrlReleased = page.keyboard.up('Control');
        return ctrlReleased;
    }).then(() => {
        let realEditorfocused = waitForClick('.monaco-editor.no-user-select.vs', page);
        return realEditorfocused;
    }).then(() => {
        let ctrlPressed = page.keyboard.down('Control');
        return ctrlPressed;
    }).then(() => {
        let aPressed = page.keyboard.press('A', { delay: 100 });
        return aPressed;
    }).then(() => {
        let vPressed = page.keyboard.press('V', { delay: 100 });
        return vPressed;
    }).then(() => {
        let ctrlReleased = page.keyboard.up('Control');
        return ctrlReleased;
    }).then(() => {
        return page.click('.hr-monaco__run-code', { delay: 50 });
    }).then(() => res()).catch(() => rej());
});

browserOpen.then(browserObj => browserObj.newPage()).then(newTab => {
    page = newTab;
    return newTab.goto(loginLink);
}).then(() => {
    let mailEntered = page.type('input[id="input-1"]', loginMail, { delay: 50 });
    return mailEntered;
}).then(() => {
    let passwordEntered = page.type('input[type="password"]', loginPassword, { delay: 50 });
    return passwordEntered;
}).then(() => {
    let clickLoginPromise = page.click('button[data-analytics="LoginPassword"]', { delay: 50 });
    return clickLoginPromise;
}).then(() => {
    let clickOnAlgorithms = waitForClick('.topic-card a[data-attr1="algorithms"]', page);
    return clickOnAlgorithms;
}).then(() => {
    let goToWarmup = waitForClick('input[value="warmup"]', page);
    return goToWarmup;
}).then(() => {
    let waitThreeSeconds = page.waitFor(3000);
    return waitThreeSeconds;
}).then(() => {
    let allQues = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 });
    return allQues;
}).then((allQues) => {
    //console.log(allQues.length);
    let quesSolved = quesSolve(page, allQues[0], codeObj.answers[0]);
    return quesSolved;
});