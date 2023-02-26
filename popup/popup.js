startPopup();


async function startPopup() {
    const loadMoreBtn = document.querySelector('#loadMoreBtn');

    if (loadMoreBtn !== null) {
        loadMoreBtn.addEventListener('click', injectLoadMore);
    }
}


async function injectLoadMore() {
    const loadMoreBtn = document.querySelector('#loadMoreBtn');
    
    startLoading();
    const tabId = await getActiveTabId();

    await chrome.scripting.executeScript({
        func: loadMore,
        target: {tabId},
    });
    stopLoading();

    function startLoading() {
        loadMoreBtn.setAttribute('disabled', true);
        loadMoreBtn.textContent = 'Loading..';
    }

    function stopLoading() {
        loadMoreBtn.removeAttribute('disabled');
        loadMoreBtn.textContent = 'Load more messages';
    }
}


async function loadMore() {
    return new Promise((resolve, reject) => {
        const CHAT_AREA_SELECTOR = '.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3';
        const LOAD_AMOUNT = 4;
        const LOAD_INTERVAL_MS = 1500;

        /*
        * There are 2 elements using this selector
        *   1. Sidebar bar of all chat threads
        *   2. Chat area itself
        * 
        * This query assumes both exist simultaneously.
        */
        const chatAreaEl = document.querySelectorAll(CHAT_AREA_SELECTOR)[1];

        let loadCount = 0;
        const loadIntervalId = setInterval(load, LOAD_INTERVAL_MS);
        
        function load() {
            if (chatAreaEl.length === 0) {
                stopLoading();
                reject();
                return;
            }
            
            chatAreaEl.scrollTo(0, 0);

            loadCount++;
            if (loadCount >= LOAD_AMOUNT) {
                stopLoading();
            }
        }

        function stopLoading() {
            clearInterval(loadIntervalId);
            resolve();
        }
    });
}


async function getActiveTabId() {
    const [tab] = await chrome.tabs.query({ active: true });

    if (tab === undefined) {
        console.error('Active tab not found');
        return undefined;
    }

    return tab.id;
}
