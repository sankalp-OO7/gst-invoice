import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
// ✅ Simulate __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ✅ Optional: Catch any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});
const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Update if you use TypeScript or .ts extension
        },
    });
    console.log('Creating window with preload script:', path.join(__dirname, 'preload.js'));
    if (process.env.NODE_ENV !== 'production') {
        try {
            setTimeout(async () => {
                await win.loadURL('http://localhost:3000').catch((err) => console.error('Failed to load:', err));
            }, 1000);
        }
        catch (err) {
            console.error('Failed to load URL:', err);
        }
    }
    else {
        win.loadFile(path.join(__dirname, 'index.html'));
    }
};
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
