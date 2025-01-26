// A small interface for user settings
interface UserSettings {
  openOnStartup: boolean;
  savedTabs: string[];
}
  
const DEFAULT_SETTINGS: UserSettings = {
  openOnStartup: false,
  savedTabs: [],
};

// Helper: get settings from Chrome Storage
async function getSettings(): Promise<UserSettings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["tabberSettings"], (result) => {
      resolve(result.tabberSettings || DEFAULT_SETTINGS);
    });
  });
}

// Helper: set settings to Chrome Storage
async function setSettings(settings: UserSettings): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ tabberSettings: settings }, () => {
      resolve();
    });
  });
}

function sanitizeUrl(rawUrl: string) {
  if(!/^https?:\/\//i.test(rawUrl)) {
      return "https://" + rawUrl;
  }
  return rawUrl;
}

// Opens all saved tabs
async function openAllSavedTabs() {
  const settings = await getSettings();
  for (const url of settings.savedTabs) {
    let finalUrl = sanitizeUrl(url);
    chrome.tabs.create({ url: finalUrl });
  }
}

// On install, optionally set defaults
chrome.runtime.onInstalled.addListener(async () => {
  const currentSettings = await getSettings();
  if (!currentSettings) {
    await setSettings(DEFAULT_SETTINGS);
  }
});

// On Chrome startup, if user enabled "open on startup"
chrome.runtime.onStartup.addListener(async () => {
  const settings = await getSettings();
  if (settings.openOnStartup && settings.savedTabs.length > 0) {
    openAllSavedTabs();
  }
});

// Shortcut listener
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open_saved_tabs") {
    await openAllSavedTabs();
  }
});
