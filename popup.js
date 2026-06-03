document.getElementById('ext-name').textContent = CONFIG.extensionName;

const statusBadge = document.getElementById('status-badge');
const currentTagEl = document.getElementById('current-tag-value');
const tagInput = document.getElementById('tag-input');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const tagError = document.getElementById('tag-error');

function setStatus(tag) {
  if (tag) {
    statusBadge.textContent = 'Active';
    statusBadge.className = 'badge active';
    currentTagEl.textContent = tag;
    currentTagEl.className = 'tag-value';
    clearBtn.disabled = false;
  } else {
    statusBadge.textContent = 'Inactive';
    statusBadge.className = 'badge inactive';
    currentTagEl.textContent = 'Not set';
    currentTagEl.className = 'tag-value empty';
    clearBtn.disabled = true;
  }
}

// Load current state
chrome.storage.local.get(['referralTag'], function(result) {
  const tag = CONFIG.demo ? result.referralTag : CONFIG.referralTag;
  setStatus(tag || null);
  if (tag) tagInput.value = tag;
});

// Show correct controls
if (CONFIG.demo) {
  document.getElementById('demo-controls').style.display = 'block';
  document.getElementById('company-controls').style.display = 'none';
} else {
  document.getElementById('demo-controls').style.display = 'none';
  document.getElementById('company-controls').style.display = 'block';
}

function validateTag(val) {
  return val && /^[a-zA-Z0-9-]+-\d+$/.test(val);
}

saveBtn.addEventListener('click', function() {
  const val = tagInput.value.trim();
  if (!validateTag(val)) {
    tagError.style.display = 'block';
    return;
  }
  tagError.style.display = 'none';
  saveBtn.disabled = true;
  saveBtn.textContent = 'Applying...';

  chrome.runtime.sendMessage({ type: 'SET_TAG', tag: val }, function(resp) {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Apply Tag';
    if (resp && resp.ok) {
      setStatus(val);
    }
  });
});

clearBtn.addEventListener('click', function() {
  clearBtn.disabled = true;
  chrome.runtime.sendMessage({ type: 'CLEAR_TAG' }, function(resp) {
    if (resp && resp.ok) {
      tagInput.value = '';
      setStatus(null);
    } else {
      clearBtn.disabled = false;
    }
  });
});

tagInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') saveBtn.click();
  tagError.style.display = 'none';
});
