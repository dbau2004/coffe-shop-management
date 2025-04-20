# Sử dụng Node.js 18 như là base image
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc trong container
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc cho dự án
RUN npm install

# Sao chép tất cả các tệp trong thư mục hiện tại vào container
COPY . .

# Mở cổng 3000 để có thể truy cập ứng dụng
EXPOSE 3000

# Lệnh mặc định để chạy ứng dụng React
CMD ["npm", "start"]