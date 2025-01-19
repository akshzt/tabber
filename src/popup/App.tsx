import React, { useState, useEffect } from "react";

import { Button } from "@/popup/components/ui/button";
import { Switch } from "@/popup/components/ui/switch";

interface UserSettings {
  openOnStartup: boolean;
  savedTabs: string[];
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    openOnStartup: false,
    savedTabs: [],
  });
  const [newTab, setNewTab] = useState("");

  // Fetch stored settings on mount
  useEffect(() => {
    chrome.storage.sync.get(["tabberSettings"], (result) => {
      if (result.tabberSettings) {
        setSettings(result.tabberSettings);
      }
    });
  }, []);

  // Update Chrome storage whenever settings change
  useEffect(() => {
    chrome.storage.sync.set({ tabberSettings: settings });
  }, [settings]);

  // Toggle the openOnStartup setting
  const handleToggleStartup = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, openOnStartup: checked }));
  };

  // Add a new tab to the list
  const handleAddTab = () => {
    if (!newTab.trim()) return;
    setSettings((prev) => ({
      ...prev,
      savedTabs: [...prev.savedTabs, newTab],
    }));
    setNewTab("");
  };

  // Remove a tab by index
  const handleRemoveTab = (index: number) => {
    setSettings((prev) => {
      const updated = [...prev.savedTabs];
      updated.splice(index, 1);
      return { ...prev, savedTabs: updated };
    });
  };

  return (
    <div className="p-4 w-80 text-sm space-y-4">
      <div className="flex items-center justify-between">
        <img src="../../public/logo.svg" alt="Tabber Logo" className="h-8" />
        <h1 className="font-bold text-xl">Tabber</h1>
      </div>

      <div className="flex items-center justify-between">
        <span>Open on Startup</span>
        <Switch checked={settings.openOnStartup} onCheckedChange={handleToggleStartup} />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Saved Tabs</h2>
        {settings.savedTabs.map((url, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="truncate w-44">{url}</span>
            <Button variant="destructive" size="sm" onClick={() => handleRemoveTab(idx)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newTab}
          onChange={(e) => setNewTab(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="https://example.com"
        />
        <Button onClick={handleAddTab}>Add</Button>
      </div>
    </div>
  );
};

export default App;
