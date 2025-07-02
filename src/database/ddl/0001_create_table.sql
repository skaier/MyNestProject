-- 创建用户表
CREATE TABLE `user_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像URL，存储相对路径如/uploads/avatars/avatar_1.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`), 
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 添加示例数据
INSERT IGNORE INTO user_table (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQmpC3n6cVJwW6vJX8bPzVYl2HdO', 'admin'),
('Test User', 'user@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQmpC3n6cVJwW6vJX8bPzVYl2HdO', 'user');

-- 创建文件表
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `file_key` varchar(255) DEFAULT NULL,
  `storage_type` enum('local','s3','oss') NOT NULL DEFAULT 'local',
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci