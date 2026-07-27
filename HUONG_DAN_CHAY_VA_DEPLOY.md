# Hướng dẫn chạy và triển khai Portfolio Data Engineer

Tài liệu này dành cho dự án **Hoang Minh Hai — Data Engineer Portfolio**.

## 1. Yêu cầu bắt buộc

- **Node.js 20.19.x hoặc Node.js 22.x**. Khuyến nghị: Node.js 20.19 LTS.
- **npm 10 trở lên**.
- Git nếu muốn đẩy code lên GitHub.
- Không cần cài cơ sở dữ liệu.
- Không cần API key để xem website lần đầu.

Kiểm tra phiên bản:

```bash
node -v
npm -v
```

Nếu Node.js thấp hơn 20.19, hãy cập nhật trước khi chạy.

> Nên giải nén dự án vào đường dẫn ngắn, không dấu, ví dụ `D:\Projects\hoang-minh-hai-portfolio` để tránh lỗi công cụ trên Windows.

## 2. Chạy nhanh trên Windows PowerShell

Mở PowerShell trong thư mục dự án rồi chạy:

```powershell
Copy-Item .env.example .env.local
npm ci
npm run doctor
npm run dev
```

Mở trình duyệt tại:

```text
http://localhost:3000
```

Dừng server bằng `Ctrl + C`.

Muốn điện thoại trong cùng mạng Wi-Fi truy cập bản chạy trên máy tính:

```powershell
npm run dev:host
```

Sau đó mở địa chỉ IP LAN của máy tính, ví dụ `http://192.168.1.10:3000`. Windows Firewall có thể yêu cầu cho phép Node.js truy cập mạng riêng.

## 3. Chạy nhanh trên macOS hoặc Linux

```bash
cp .env.example .env.local
npm ci
npm run doctor
npm run dev
```

Mở `http://localhost:3000`.

Để thiết bị khác trong cùng mạng truy cập:

```bash
npm run dev:host
```

## 4. Kiểm tra toàn bộ trước khi deploy

Chạy lần lượt:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Hoặc dùng lệnh tổng hợp:

```bash
npm run check
```

Sau khi build thành công, chạy bản production trên máy:

```bash
npm run start
```

Mở `http://localhost:3000` và kiểm tra:

- Trang chủ, About, Experience, Projects, Skills, Contact.
- Sáu trang case study.
- Nút View Resume và Download Resume.
- Chuyển light/dark theme.
- Menu điện thoại.
- Link GitHub và ORCID.
- Form liên hệ hoặc nút gửi email trực tiếp.

## 5. Biến môi trường

Tạo `.env.local` từ `.env.example`.

Cấu hình tối thiểu khi chạy local:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_USERNAME=Hai2310
GITHUB_USERNAME=Hai2310
CONTACT_TO_EMAIL=minhhaiit1k68@gmail.com
```

### GitHub API

Website đọc repository công khai mà không cần token. Có thể thêm token chỉ ở phía server để tăng giới hạn API:

```env
GITHUB_TOKEN=github_pat_xxx
```

Không bao giờ dùng tên `NEXT_PUBLIC_GITHUB_TOKEN`.

### Form liên hệ với Resend

```env
RESEND_API_KEY=re_xxx
CONTACT_FROM_EMAIL=Portfolio <portfolio@your-domain.com>
CONTACT_TO_EMAIL=minhhaiit1k68@gmail.com
```

`CONTACT_FROM_EMAIL` phải là email/domain đã xác minh trong Resend. Sau khi sửa `.env.local`, khởi động lại server.

### Form liên hệ với Formspree

```env
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
CONTACT_TO_EMAIL=minhhaiit1k68@gmail.com
```

Endpoint được giữ ở server, không dùng tiền tố `NEXT_PUBLIC_`.

### Chống spam và giới hạn request

Local hoặc một máy chủ đơn dùng bộ giới hạn trong bộ nhớ. Với Vercel nhiều instance, nên cấu hình Upstash Redis:

```env
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

Cho phép origin gửi form:

```env
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

`NEXT_PUBLIC_SITE_URL` luôn được tự động cho phép.

## 6. Deploy Vercel để mọi người mở link xem

### Bước 1 — Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Complete Data Engineer portfolio"
git branch -M main
git remote add origin https://github.com/Hai2310/your-portfolio-repository.git
git push -u origin main
```

Thay URL repository bằng repository thật của bạn.

### Bước 2 — Import vào Vercel

1. Đăng nhập Vercel.
2. Chọn **Add New → Project**.
3. Import repository vừa đẩy lên GitHub.
4. Framework Preset để **Next.js**.
5. Build Command giữ `npm run build`.
6. Install Command giữ `npm ci` hoặc mặc định của Vercel.
7. Thêm các biến môi trường.

Bắt buộc cho production:

```env
NEXT_PUBLIC_SITE_URL=https://ten-project-cua-ban.vercel.app
NEXT_PUBLIC_GITHUB_USERNAME=Hai2310
GITHUB_USERNAME=Hai2310
CONTACT_TO_EMAIL=minhhaiit1k68@gmail.com
ALLOWED_ORIGINS=https://ten-project-cua-ban.vercel.app
```

Thêm Resend hoặc Formspree khi muốn form gửi trực tuyến.

8. Nhấn **Deploy**.
9. Sau khi có URL thật, sửa `NEXT_PUBLIC_SITE_URL` và `ALLOWED_ORIGINS` theo đúng URL rồi **Redeploy**.

Website không có đăng nhập; bất kỳ ai có link đều xem được.

## 7. Gắn tên miền riêng

Trong Vercel:

1. Mở project → **Settings → Domains**.
2. Thêm domain.
3. Cập nhật DNS theo hướng dẫn của Vercel.
4. Đổi biến môi trường:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

5. Redeploy để canonical URL, sitemap, Open Graph và JSON-LD dùng domain mới.

## 8. Chạy bằng Docker

Tạo `.env.local`, sau đó:

```bash
docker compose --env-file .env.local up --build -d
```

Mở `http://localhost:3000`.

Xem log:

```bash
docker compose logs -f portfolio
```

Dừng:

```bash
docker compose down
```

Build thủ công với URL production:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  --build-arg NEXT_PUBLIC_GITHUB_USERNAME=Hai2310 \
  -t hmh-portfolio .

docker run --rm -p 3000:3000 --env-file .env.local hmh-portfolio
```

Các biến `NEXT_PUBLIC_*` phải được truyền ở **build time**, vì Next.js đóng gói chúng khi chạy `next build`.

## 9. Chạy Playwright E2E

Cài Chromium một lần:

```bash
npx playwright install chromium
```

Linux CI có thể dùng:

```bash
npx playwright install --with-deps chromium
```

Chạy:

```bash
npm run test:e2e
```

## 10. Cập nhật nội dung cá nhân

- Cấu hình chính: `src/config/siteConfig.ts`
- Nội dung hồ sơ: `src/data/profile.ts`
- Kinh nghiệm: `src/data/experience.ts`
- Dự án: `src/data/projects.ts`
- Kỹ năng: `src/data/skills.ts`
- Override repository: `src/data/projectOverrides.ts`
- CV: `public/HoangMinhHai_DataEngineer_CV.pdf`
- Ảnh đại diện: `public/profile.jpg`

Không đổi tên file CV nếu không đồng thời sửa `siteConfig.ts`.

## 11. Lỗi thường gặp

### `npm ci` báo lỗi registry hoặc DNS

Kiểm tra mạng và registry:

```bash
npm config get registry
```

Kết quả phải là:

```text
https://registry.npmjs.org/
```

Thiết lập lại:

```bash
npm config set registry https://registry.npmjs.org/
```

Sau đó:

```bash
rm -rf node_modules
npm cache verify
npm ci
```

PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm cache verify
npm ci
```

### `EBADENGINE`

Node.js không đúng phiên bản. Dùng Node.js 20.19.x hoặc 22.x.

### GitHub hiển thị dữ liệu fallback

GitHub API tạm lỗi hoặc bị giới hạn. Website vẫn hoạt động bằng snapshot cục bộ. Thêm `GITHUB_TOKEN` ở server để tăng giới hạn.

### Form chỉ hiện nút email trực tiếp

Chưa cấu hình Resend/Formspree hoặc biến môi trường chưa được redeploy. Đây là fallback có chủ đích, không phải lỗi giao diện.

### Canonical URL vẫn là localhost

Sửa `NEXT_PUBLIC_SITE_URL` trong Vercel rồi redeploy. Với Docker, truyền biến này bằng build argument.

### Ảnh/CV không hiển thị

Kiểm tra đúng hai file:

```text
public/profile.jpg
public/HoangMinhHai_DataEngineer_CV.pdf
```

Tên file phân biệt chữ hoa/chữ thường trên Linux/Vercel.
