---
title: JXL Manga Readers
description: Manga readers with JPEG XL / JXL support for Android, iOS & PC
customDescription: Manga readers with JPEG XL / JXL support for Android, iOS & PC
outline: [2,3]
---

<GradientCard title="JXL Manga Readers" description="Manga readers with JPEG XL / JXL support for Android, iOS & PC" theme="turquoise" variant="thin"/>

## Readers

### Android
- [Mihon](https://mihon.app/) [:mdi-github:](https://github.com/mihonapp/mihon)
  - [Yokai](https://mihon.app/forks/Yokai/) :glowing-star: [:mdi-github:](https://github.com/null2264/yokai)
  - [Komikku](https://github.com/komikku-app/komikku)
- [Komelia](https://github.com/Snd-R/Komelia) <Badge type="info" text="Komga" />

### iOS
- [YACReader](https://apps.apple.com/app/id635717885) :glowing-star::mdi-credit-card::mingcute-chrome-fill: [:tf:](https://testflight.apple.com/join/5zhB7sRP)
- [Panels](https://apps.apple.com/us/app/panels-comic-reader/id1236567663) :mdi-cart::mingcute-chrome-fill:

### PC
- **Dedicated**
  - [NeeView](https://bitbucket.org/neelabo/neeview/wiki/Home) :ic-baseline-window:
  - [YACReader](https://www.yacreader.com/) :ic-baseline-window::ic-baseline-apple::mingcute-linux-fill: :warning: [:mdi-github:](https://github.com/YACReader/yacreader) <tooltip>For some lossy original images it won't work. Kinda random.</tooltip>
  - [Komelia](https://github.com/Snd-R/Komelia) :ic-baseline-window::mingcute-linux-fill: <Badge type="info" text="Komga" />
  - [MComix](https://sourceforge.net/projects/mcomix/files/) :ic-baseline-window::mingcute-linux-fill: :warning: <tooltip>Doesn't work when the source is lossy image</tooltip>
- **Photo Viewer**
  - [XnView MP](https://www.xnview.com/en/xnviewmp/) :ic-baseline-window::ic-baseline-apple::mingcute-linux-fill::mingcute-chrome-fill:
  - [Picview](https://picview.org/) :ic-baseline-window: [:mdi-github:](https://github.com/Ruben2776/PicView/)
  - [Bandiview](https://en.bandisoft.com/bandiview/) :ic-baseline-window::mdi-credit-card::mingcute-chrome-fill:

## Guide

### Neeview
1. Install [**jxl-winthumb**](https://github.com/saschanaz/jxl-winthumb).
2. Open Neeview -> Option -> Settings -> File Types.
3. Click **Add** in Image file extensions and add `.jxl`. Done.

### YACReader
1. Download `plugin_for_qt6_x_x.zip` from [**here**](https://github.com/novomesk/qt-jpegxl-image-plugin) & unzip it. `qjpegxl6.dll` will be inside it.
2. Go to `C:\Program Files\YACReader\imageformats\` and put `qjpegxl6.dll` there. Done.