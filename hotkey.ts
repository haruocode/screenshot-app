import { globalShortcut } from 'electron';

export function registerShortcuts(captureRegion: (side: 'main') => void) {
    // globalShortcut.register('Command+Shift+Left', () => {
    //     captureRegion('left');
    // });

    // メインだけにする
    globalShortcut.register('Command+Shift+Right', () => {
        captureRegion('main');
    });
}