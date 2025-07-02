# NestJS 项目

## 项目概述
这是一个基于NestJS的企业级后端应用，提供文件管理和用户管理功能。项目采用模块化架构，使用TypeORM进行数据持久化，集成了Winston日志系统和Swagger API文档。

## 技术栈
- **框架**: NestJS
- **数据库**: MySQL + TypeORM
- **文件存储**: 阿里云OSS
- **日志**: Winston
- **API文档**: Swagger
- **测试**: Jest

## 项目结构
```
├── src
│   ├── app.module.ts        # 主应用模块
│   ├── file-management      # 文件管理模块
│   │   ├── controllers      # 控制器
│   │   ├── services         # 服务层
│   │   ├── strategies       # 文件存储策略
│   │   └── interfaces       # 接口定义
│   └── users                # 用户管理模块
│       ├── dto              # 数据传输对象
│       ├── entities         # 数据库实体
│       ├── controllers      # 控制器
│       └── services         # 服务层
├── test                     # 测试代码
├── database                 # 数据库迁移和种子
└── uploads                  # 本地文件存储
```

## 环境要求
- Node.js 16+
- MySQL 5.7+
- Redis (可选)

## 安装与运行

1. 安装依赖:
```bash
npm install
```

2. 复制环境变量文件:
```bash
cp .env.example .env
```

3. 配置环境变量:
```bash
# 编辑.env文件配置数据库等信息
```

4. 运行开发服务器:
```bash
npm run start:dev
```

5. 访问API文档:
```
http://localhost:3000/api
```

## 部署

1. 构建项目:
```bash
npm run build
```

2. 生产环境运行:
```bash
npm run start:prod
```
 