# Fork 维护指南

本仓库是 [ValueMelody/melody-auth](https://github.com/ValueMelody/melody-auth) 的 fork（部署名 **Signet**）。
本文说明我们改了什么、改动放在哪、以及如何从上游同步代码。

## Fork 起点

- Tag：`melody-auth-v1.3.8`（上游最后一个合入的提交）
- 查看我们的全部净改动：`git diff melody-auth-v1.3.8..main`

## 改动约定

1. **所有对上游文件的修改，尽量在改动行/块附近带 `[signet]` 标记注释**
   （`# [signet]` / `// [signet]` / `{/* [signet] */}`）。合并冲突时见标记即知是本侧改动。
2. **新增功能优先放新文件**（如 `admin-panel/components/CopyValue.tsx`、
   `components/SystemLinksTable.tsx`、`translations/zh.json`），新文件不产生合并冲突。
3. 配置文件（wrangler.toml 等）直接改，带 `[signet]` 注释。

## 改动清单（相对上游）

### 纯新增（零冲突）

| 文件 | 说明 |
|---|---|
| `admin-panel/translations/zh.json` | 管理后台中文翻译 |
| `admin-panel/components/CopyValue.tsx` | 通用复制按钮组件 |
| `admin-panel/components/SystemLinksTable.tsx` | 概览页系统链接表（路径显示 + 复制 + 说明列） |
| `design.pen` | 界面设计稿（pen.dev） |

### 修改的上游文件

| 文件 | 改动 | 冲突预期 |
|---|---|---|
| `server/wrangler.toml` | 部署配置：worker 名、自定义域名、D1/KV ID、AUTH_SERVER_URL、语言 zh/en、邮件相关开关（未配邮件商） | 上游加配置项时会冲突，保留 `[signet]` 行 + 接受上游新增即可 |
| `server/package.json` | migration 脚本的数据库名 melody-auth → signet | 偶发 |
| `admin-panel/wrangler.toml` | worker 名、自定义域名、运行时变量 | 同上 |
| `admin-panel/i18n/routing.ts` / `request.ts` | locales 改为 `['zh', 'en']`，默认 zh | 上游很少动 |
| `admin-panel/app/[lang]/dashboard/page.tsx` | 配置表加说明列；系统链接表替换为组件调用 | 主要冲突点，标记已注明 |
| `admin-panel/translations/en.json` / `fr.json` | brand 改 Signet + `dashboard.configDescriptions` 块 + `common.copy/copied` | JSON 冲突按「两侧 key 都保留」处理 |
| `.gitignore` | 忽略 `.codegraph/` | 无风险 |

### 未改动的部分

- `server/src/**` 全部业务代码 —— 服务端零改动，上游更新直接合入
- docs、sdks、shared 未动

## 从上游同步

```bash
git fetch upstream
git merge upstream/main
# 冲突处理原则：
#   - 见 [signet] 标记 → 本侧改动，保留我们的值（可与上游新增合并）
#   - 翻译 JSON → 两侧 key 都保留
#   - dashboard/page.tsx → 保留 SystemLinksTable 调用与说明列，接受上游其余改动
```

同步后如上游新增了配置项（wrangler.toml [vars]），需要重新部署才生效：

```bash
cd server && npm run prod:deploy
cd ../admin-panel && npm run cf:build && npm run cf:deploy
```

## 部署速查

| 操作 | 命令 |
|---|---|
| auth server | `cd server && npm run prod:deploy` |
| 数据库迁移 | `cd server && npm run prod:migration:apply` |
| admin panel | `cd admin-panel && npm run cf:build && npm run cf:deploy` |
| S2S secret | 已配置为 Worker secret（不在仓库中） |

- auth 服务：https://signet.wenonly.cn
- 管理后台：https://admin.signet.wenonly.cn（默认中文 `/zh`）
- 首个管理员：用户 id=1（1325772089@qq.com，super_admin）
