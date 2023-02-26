startRepeatedScrape();


function startRepeatedScrape() {
    setInterval(tallyKeywords, 4000);
}


async function tallyKeywords() {
    const messageEls    = getMessageEls();
    const chatHeaderEl  = getChatHeaderEl();
    let keywordBoxEl    = getKeywordBoxEl();

    if (messageEls === null || chatHeaderEl === null) {
        return;
    }

    if (keywordBoxEl === null) {
        keywordBoxEl = createKeywordBox();
    }

    const tally = {};

    for (const messageEl of messageEls) {
        // Extract text from element
        let text = messageEl.textContent;

        if (text === null || text === undefined || text.length === 0) {
            continue;
        }

        // Tokenize text
        let words = text.split(/\s+/);

        for (let word of words) {
            // Normalize casing
            word = word.toLowerCase();

            if (word.length === 0) {
                continue;
            }

            // Add word to tally
            if (tally[word] === undefined) {
                tally[word] = 1;
            } else {
                tally[word] += 1;
            }
        }
    }


    updateKeywordBox(keywordBoxEl, tally);
}


function updateKeywordBox(keywordBoxEl, tally) {
    keywordBoxEl.textContent = '';

    let tallyRecords = [];

    for (let [word, count] of Object.entries(tally)) {
        tallyRecords.push({ word, count });
    }

    tallyRecords.sort((a, b) => {
        if (a.count >= b.count) {
            return -1;
        } else {
            return 1;
        }
    });


    for (const {word, count} of tallyRecords) {
        const keywordEl = document.createElement('div');
        keywordEl.className = 'keyword';

        const wordEl = document.createElement('strong');
        wordEl.textContent = `${word}`;

        const countEl = document.createElement('span');
        countEl.textContent = `${count}`;

        keywordEl.appendChild(wordEl);
        keywordEl.appendChild(countEl);
        keywordBoxEl.appendChild(keywordEl);
    }

}


function createKeywordBox() {
    const keywordBoxEl = document.createElement('div');
    keywordBoxEl.id = 'keywordBox';

    const chatHeaderEl = getChatHeaderEl();
    if (chatHeaderEl === null) {
        return;
    }

    chatHeaderEl.appendChild(keywordBoxEl);
    return keywordBoxEl;
}


function getMessageEls() {
    const MESSAGE_SELECTOR = '.x1fc57z9';
    return document.querySelectorAll(MESSAGE_SELECTOR);
}


function getChatHeaderEl() {
    const CHAT_HEADER_SELECTOR = '.x1u998qt.x1vjfegm';
    return document.querySelector(CHAT_HEADER_SELECTOR);
}


function getKeywordBoxEl() {
    const KEYWORD_BOX_SELECTOR = '#keywordBox';
    return document.querySelector(KEYWORD_BOX_SELECTOR);
}
