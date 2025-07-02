# NestJS 后台管理系统

## 项目概述
这是一个基于NestJS的后台管理系统，提供用户管理和文件处理功能。项目使用TypeORM连接MySQL数据库，支持数据库迁移，并集成了Swagger API文档。

## 技术栈
- **框架**: NestJS
- **数据库**: MySQL + TypeORM
- **文件存储**: 本地存储 + 阿里云OSS(预留)
- **日志**: Winston
- **API文档**: Swagger
- **Excel处理**: exceljs

## 功能特性

### 用户管理
- 用户CRUD操作
- 分页查询
- Excel导出
- 数据验证

### 文件管理
- 文件上传/下载
- 本地存储策略
- 阿里云OSS存储(预留)
- Excel导出服务

## 安装指南

1. 克隆项目
```bash
git clone <repository-url>
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
复制`.env.example`为`.env`并填写实际配置

4. 运行数据库迁移
```bash
npm run migration:run
```

5. 启动项目
```bash
npm run start:dev
```

## 使用说明

### API文档
访问 `http://localhost:4000/doc` 查看Swagger文档

### 环境变量配置
- `DB_HOST`: 数据库主机
- `DB_PORT`: 数据库端口
- `DB_USERNAME`: 数据库用户名
- `DB_PASSWORD`: 数据库密码
- `DB_DATABASE`: 数据库名称
- `UPLOAD_DIR`: 文件上传目录

## 开发脚本
- `npm run start`: 启动生产环境
- `npm run start:dev`: 启动开发环境
- `npm run test`: 运行测试
- `npm run migration:generate`: 生成迁移文件
- `npm run migration:run`: 运行迁移
- `npm run build`: 构建项目