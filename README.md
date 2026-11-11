---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 68351e8883f4ca552ec68decd8ca1358_86f6c9a0dd8611f19232525400248c00
    ReservedCode1: Tk+q5Sdoxs9GrxVSOHBpntISGRv1BdFyllKBL8+ZRRJk6svNOjFdSDMctIrEZHjZwi4DE81F42AkU04I2JFkBrYGV+JsY2CONhyWpmxl6FdEDWc4p+h9faGMsKb0jOHfrvu5ajw9X3ukiEbYV+hYD7c8EbKOREo5dUa4haGFUt4jLxO7DdXFa7Gr4Ws=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 68351e8883f4ca552ec68decd8ca1358_86f6c9a0dd8611f19232525400248c00
    ReservedCode2: Tk+q5Sdoxs9GrxVSOHBpntISGRv1BdFyllKBL8+ZRRJk6svNOjFdSDMctIrEZHjZwi4DE81F42AkU04I2JFkBrYGV+JsY2CONhyWpmxl6FdEDWc4p+h9faGMsKb0jOHfrvu5ajw9X3ukiEbYV+hYD7c8EbKOREo5dUa4haGFUt4jLxO7DdXFa7Gr4Ws=
---

# 楽然的小窝

自由插画师的个人主页与作品集，纯静态站点（HTML5 + 原生 CSS + 原生 JS），无框架、无构建、无依赖安装。

线上地址：<https://leran-lab.github.io/personal-website/>

## 目录结构

```
personal-website/
├─ index.html            首页（个人介绍 + 社交入口 + 微信公众号弹层）
├─ portfolio.html        作品集
├─ 404.html              自定义 404 页（GitHub Pages 自动接管站内错误路径）
├─ favicon.ico           站点图标（16/32/48/64/128/256）
├─ favicon.svg           SVG 图标（现代浏览器优先使用）
├─ apple-touch-icon.png  iOS 添加到主屏图标（180×180）
├─ robots.txt            爬虫规则
├─ sitemap.xml           站点地图
├─ .gitignore
├─ README.md
└─ assets/
   ├─ css/main.css       全站共用样式（唯一一份，改样式只改这里）
   ├─ js/main.js         全站共用脚本（页头滚动、年份、微信弹层）
   ├─ avatar-440.webp    头像 440×440 WebP（2 倍图，约 16 KB）
   ├─ og-cover.jpg       分享卡片封面 1200×630
   ├─ works/             作品图目录（待放入真实作品）
   └─ originals/         图片源文件留档（已被 .gitignore 排除，不入版本库）
```

## 本地预览

直接双击 `index.html` 即可；若需要与线上一致的行为（相对路径、404 页、SEO 检查），建议起一个本地静态服务器：

```powershell
cd C:\Users\Administrator\Desktop\personal-website
python -m http.server 8080
# 然后访问 http://localhost:8080/
```

## 设计约定

- **颜色**：统一走 `assets/css/main.css` 顶部 `:root` 变量。主色 `--primary` 为 `#2563eb`（白底对比度 5.17:1、浅蓝底 4.58:1，满足 WCAG AA 正文 4.5:1），改色前请重新核算对比度。
- **固定页头**：`.site-header` 高度约 105 px，首屏区块 `padding-top` 使用 `clamp(120px, 18vh, 200px)`，保证手机横屏等矮视口下内容不被遮挡。
- **断点**：`1440`（大屏放宽版心）/ `1024`（平板）/ `768`（手机竖屏）/ `520`、`380`（窄屏按钮收缩）/ `max-height: 480px`（横屏矮视口）。
- **动效**：尊重 `prefers-reduced-motion`，该媒体查询下头像外框停止旋转、所有过渡降到 0.01 ms。
- **打印**：`@media print` 下隐藏页头、社交区与装饰，渐变标题回落为纯色，作品卡片加边框避免跨页断开。
- **可访问性**：每页有 `skip-link`、`<main id="main">`、`aria-current="page"`、社交按钮 `aria-label`、装饰性 SVG 一律 `aria-hidden="true"`。

## 部署（GitHub Pages）

1. 仓库 Settings → Pages → Source 选择 **Deploy from a branch**；
2. Branch 选 `main`，目录选 **/ (root)**；
3. 保存后等待构建完成，访问 <https://leran-lab.github.io/personal-website/> 应返回 200。

提交前建议自查：

```powershell
git status
git diff --stat
```

## 待办（上线前需人工处理）

- [ ] 作品区 6 张图当前为 `picsum.photos` 第三方占位图，需替换为真实作品（建议导出到 `assets/works/`，单张 ≤150 KB、宽 800 px，格式 WebP，并同步修改 `alt`）。
- [ ] 4 个社交链接（微博 / B站 / 小红书 / 抖音）仍指向平台首页占位地址，需替换为个人主页真实地址。
- [ ] 微信公众号弹层中的名称若与实际公众号不一致需更新（`index.html` 内 `data-copy-wechat` 与展示文案两处）。
- [ ] 如需绑定自定义域名，添加 `CNAME` 文件，并同步更新 `canonical`、`og:url`、`og:image`、`sitemap.xml`、`robots.txt` 内的域名，以及 `404.html` 中的 `/personal-website/` 前缀。
- [ ] GitHub Pages 尚未启用（线上实测 404），按上文「部署」步骤开启。
- [ ] 头像原图（10 MB）仍在 git 历史中，若需彻底瘦身需 `git filter-repo` 改写历史——属破坏性操作，执行前务必整仓备份。

## 常用校验

- 横向溢出：`document.documentElement.scrollWidth === window.innerWidth`（375 / 390 / 414 / 812×375 / 1280×600 / 1440 逐一确认）。
- 首屏传输量目标 ≤ 400 KB（当前主页约 20 KB 图片 + 约 22 KB 样式脚本 + 图标，Font Awesome 依赖已移除）。
- 头像文件：`assets/avatar-440.webp` 应 ≤ 60 KB 且真实格式为 WebP，与扩展名一致。
*（内容由AI生成，仅供参考）*
