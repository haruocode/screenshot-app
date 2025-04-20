# Screenshot App

画面の特定領域のスクリーンショットを自動的に撮影・保存するデスクトップアプリケーションです。

## 機能

- ホットキー（Command+Shift+Right）でスクリーンショットを撮影
- 指定された領域を自動的に切り取り
- 連番で画像を保存（jpg形式）
- `captures` フォルダに自動保存

## インストール方法

必要な依存パッケージをインストールします：

```bash
npm install
```

## 使用方法

1. アプリケーションを起動：
```bash
npm start
```

2. ホットキーでスクリーンショットを撮影：
   - `Command+Shift+Right`: メイン領域を撮影

## 設定

撮影する領域は `regions.json` で設定できます：

```json
{
  "main": { "left": 100, "top": 150, "width": 2700, "height": 1600 }
}
```

## 技術仕様

- TypeScript/Node.js
- Electron
- Sharp (画像処理)
- screenshot-desktop (スクリーンショット撮影)

## ライセンス

MIT