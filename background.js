importScripts('config.js');

async function setRule(tag) {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: tag ? [{
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          transform: {
            queryTransform: {
              addOrReplaceParams: [{ key: "tag", value: tag }]
            }
          }
        }
      },
      condition: {
        requestDomains: ["amazon.com"],
        resourceTypes: ["main_frame"]
      }
    }] : []
  });
}

async function clearRule() {
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
}

chrome.runtime.onInstalled.addListener(async () => {
  if (!CONFIG.demo && CONFIG.referralTag) {
    await setRule(CONFIG.referralTag);
    await chrome.storage.local.set({ referralTag: CONFIG.referralTag, active: true });
  }
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'SET_TAG') {
    setRule(msg.tag)
      .then(() => chrome.storage.local.set({ referralTag: msg.tag, active: true }))
      .then(() => sendResponse({ ok: true }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true;
  }
  if (msg.type === 'CLEAR_TAG') {
    clearRule()
      .then(() => chrome.storage.local.remove(['referralTag', 'active']))
      .then(() => sendResponse({ ok: true }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true;
  }
});
