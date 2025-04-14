import { app, globalShortcut } from 'electron';
import { join } from 'path';
import { captureRegion } from './screenshot';
import { registerShortcuts } from './hotkey';

app.whenReady().then(() => {
  registerShortcuts(captureRegion);
  console.log('Screenshot app is running. Press Ctrl+Alt+L or Ctrl+Alt+R to capture.');
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
