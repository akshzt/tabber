# Tabber

**Tabber** is a minimal Chrome Extension that helps you **manage and restore saved tabs** with a sleek UI. Built with **React + TypeScript**, styled using **TailwindCSS** (ShadCN / Radix UI components), it leverages the **Chrome Storage** and **Tabs** APIs to keep your browsing organized.

## Features

- **Save a List of Tabs**: Easily add or remove URLs to your “saved” list.  
- **Open on Startup**: Automatically launch your saved tabs when Chrome starts.  
- **Keyboard Shortcut**: Assign a shortcut (default: `Ctrl+Shift+Y` | `Cmd+Shift+Y`) to open all saved tabs instantly.  
- **Minimal & Modern UI**: Built with Tailwind for a clean, intuitive popup.  
- **Manifest V3**: Uses the latest Chrome Extension APIs, including a service-worker–based background script.

## Tech Stack

- **Frontend**: React + TypeScript  
- **Styling**: Tailwind (ShadCN / Radix UI)  
- **Build Tool**: Vite  
- **Chrome APIs**: Storage, Tabs, Commands  
- **Manifest V3**: Service Worker background script

## Prerequisites

- **Node.js** (v16+ recommended)  
- **npm** or **yarn** (examples below use npm)

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/akshzt/tabber.git
   cd tabber
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Build**    
    ```bash
    npm run build
    ```  
    This outputs the extension files into the `dist/` folder.
    

4. **Load the extension into Chrome**  
   1. Go to `chrome://extensions`  
   2. Enable **Developer mode**  
   3. Click **Load unpacked** and select the `dist/` folder  
   4. The **Tabber** icon should appear in your toolbar. Click it to open the popup.

5. **Try it out**  
   - **Add** a few URLs in the popup.  
   - **Toggle** “Open on Startup” if you want those tabs to launch whenever Chrome starts.  
   - **Use** the keyboard shortcut (`Ctrl+Shift+Y` by default) to open your saved tabs instantly.  

## Development Workflow

Because this is a **Chrome Extension** (MV3), you can’t fully “hot-reload” the background script or popup in the extension environment. However, you can:

- **Build + Reload**:  
  1. Use `npm run build` to generate the updated `dist/` folder.  
  2. **Reload** your extension at `chrome://extensions`.  
  3. Reopen the popup.

## Known Limitations

1. **No Full Hot Reload**: With MV3’s service-worker background, you must rebuild and reload to see changes in the extension environment.  
2. **Chrome-Only**: Built primarily for Chrome. It may work on other Chromium-based browsers, but not guaranteed.  

## Contributing

1. **Fork** this repository  
2. **Create** a feature branch (`git checkout -b my-feature`)  
3. **Commit** changes (`git commit -m "Add new feature"`)  
4. **Push** to GitHub (`git push origin my-feature`)  
5. **Create Pull Request** on the main repo

## License

This project is licensed under the [MIT License](LICENSE). 
