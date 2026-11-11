/* ==========================================================================
   楽然的小窝 — 全站共用脚本 (assets/js/main.js)
   --------------------------------------------------------------------------
   由 index.html / portfolio.html / 404.html 共用，无第三方依赖。
   功能：① 页头滚动收起阴影；② 页脚年份自动更新；
        ③ 微信公众号弹层（可一键复制微信号）。
   所有逻辑都做了元素存在性判断，任一页面缺少对应节点也不会抛错。
   ========================================================================== */
(function () {
    'use strict';

    /* ---------- 1. 页头滚动状态（passive + rAF 节流） ---------- */
    function initHeaderScroll() {
        var header = document.querySelector('.site-header');
        if (!header) return;

        var ticking = false;

        function update() {
            header.classList.toggle('scroll', window.scrollY > 50);
            ticking = false;
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(update);
            } else {
                window.setTimeout(update, 16);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        update(); // 刷新后停留在中部时也能正确进入收起态
    }

    /* ---------- 2. 页脚年份 ---------- */
    function initYear() {
        var nodes = document.querySelectorAll('[data-current-year]');
        var year = String(new Date().getFullYear());
        Array.prototype.forEach.call(nodes, function (node) {
            node.textContent = year;
        });
    }

    /* ---------- 3. 微信弹层 ---------- */
    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).catch(function () {
                return legacyCopy(text);
            });
        }
        return legacyCopy(text);
    }

    function legacyCopy(text) {
        return new Promise(function (resolve, reject) {
            var area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', 'readonly');
            area.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
            document.body.appendChild(area);
            area.select();
            var ok = false;
            try {
                ok = document.execCommand('copy');
            } catch (err) {
                ok = false;
            }
            document.body.removeChild(area);
            ok ? resolve() : reject(new Error('copy-failed'));
        });
    }

    function selectNodeText(node) {
        if (!node) return false;
        try {
            var range = document.createRange();
            range.selectNodeContents(node);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        } catch (err) {
            return false;
        }
    }

    function showToast(message) {
        var toast = document.querySelector('.toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('is-visible');
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toast.classList.remove('is-visible');
        }, 2200);
    }

    function initWechatDialog() {
        var dialog = document.getElementById('wechat-dialog');
        if (!dialog) return;

        var openers = document.querySelectorAll('[data-open-wechat]');
        var closers = dialog.querySelectorAll('[data-close-wechat]');
        var copyBtn = dialog.querySelector('[data-copy-wechat]');
        var supportsDialog = typeof dialog.showModal === 'function';

        Array.prototype.forEach.call(openers, function (btn) {
            btn.addEventListener('click', function () {
                if (supportsDialog) {
                    dialog.showModal();
                } else {
                    dialog.setAttribute('open', ''); // 老内核兜底
                }
            });
        });

        Array.prototype.forEach.call(closers, function (btn) {
            btn.addEventListener('click', function () {
                if (supportsDialog) {
                    dialog.close();
                } else {
                    dialog.removeAttribute('open');
                }
            });
        });

        // 点击遮罩区域关闭
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog && supportsDialog) dialog.close();
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var wechatId = copyBtn.getAttribute('data-copy-wechat') || '';
                var idNode = dialog.querySelector('.wx-dialog__id');
                copyText(wechatId).then(function () {
                    showToast('已复制：' + wechatId);
                }).catch(function () {
                    // 剪贴板不可用（非安全上下文、旧内核、无权限）时退化为"帮用户选中"
                    if (selectNodeText(idNode)) {
                        showToast('已选中公众号名称，请按 Ctrl+C（Mac 为 ⌘+C）复制');
                    } else {
                        showToast('复制失败，请手动选择上方名称复制');
                    }
                });
            });
        }
    }

    /* ---------- 4. 初始化 ---------- */
    function init() {
        initHeaderScroll();
        initYear();
        initWechatDialog();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
