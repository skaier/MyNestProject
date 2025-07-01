# NestJS 项目

## 项目概述
这是一个基于NestJS框架的后端API项目，主要功能包括用户管理和文件管理。

## 技术栈
- **核心框架**: NestJS 11.x
- **数据库**: TypeORM + MySQL
- **文件存储**: 阿里云OSS
- **日志系统**: Winston
- **API文档**: Swagger
- **测试框架**: Jest
- **代码风格**: ESLint + Prettier

## 项目结构
```
src/
├── app.controller.ts       # 根控制器
├── app.module.ts           # 根模块
├── app.service.ts          # 根服务
├── common/                 # 公共模块
│   ├── interceptors/       # 拦截器
│   └── logger/             # 日志模块
├── dto/                    # 数据传输对象
├── file-management/        # 文件管理模块
├── main.ts                 # 应用入口
└── users/                  # 用户管理模块
```

## 环境要求
- Node.js 16+
- MySQL 5.7+
- npm 8+

## 安装与运行

1. 安装依赖
```bash
npm install
```

2. 配置环境变量
复制`.env.example`文件并重命名为`.env`，然后根据实际情况修改配置。

3. 运行开发服务器
```bash
npm run start:dev
```

4. 生产环境构建与运行
```bash
npm run build
npm run start:prod
```

## API文档
项目集成了Swagger文档，启动服务后访问：
```
http://localhost:4000/doc
```

## 开发指南

### 代码风格检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

### 运行测试
```bash
npm test
```

### 测试覆盖率
```bash
npm run test:cov
```

### 调试模式
```bash
npm run start:debug
```
