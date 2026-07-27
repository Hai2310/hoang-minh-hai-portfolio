# Báo cáo rà soát và hoàn thiện mã nguồn

## Các hạn chế quan trọng đã phát hiện

1. Thiếu `.env.example` dù README yêu cầu.
2. `package-lock.json` trỏ tới registry nội bộ, khiến máy người dùng có thể không cài được dependency.
3. PDF CV trong dự án không phải CV gốc đầy đủ.
4. Thiếu ảnh hồ sơ thật dù thiết kế hỗ trợ ảnh.
5. Dùng Google Font từ mạng làm build dễ lỗi trong môi trường bị chặn internet.
6. Docker chưa truyền `NEXT_PUBLIC_*` ở build time nên canonical/SEO có thể bị đóng gói sai.
7. Endpoint liên hệ thiếu kiểm tra origin, giới hạn kích thước body và cơ chế rate limit dùng chung cho serverless.
8. Formspree để dưới biến `NEXT_PUBLIC_*` dù không cần công khai.
9. Repository không nhận diện được bị gán nhầm vào Data Engineering.
10. Nội dung streaming có mâu thuẫn giữa tuyên bố exactly-once và phần kế hoạch tương lai.
11. Case study ngân hàng chưa phân biệt đủ rõ phần triển khai nội bộ với repository công khai đã làm sạch.
12. Thiếu trang global error/loading, page transition, CI và công cụ kiểm tra cấu hình.
13. Sitemap dùng thời điểm build làm `lastModified` cho mọi URL, tạo tín hiệu cập nhật không chính xác.
14. README chưa có hướng dẫn Windows chi tiết và mô tả một số tính năng bảo mật chưa chính xác.

## Nội dung đã bổ sung/sửa

- Thêm `.env.example`, `.nvmrc`, `.npmrc` và `scripts/doctor.mjs`.
- Chuẩn hóa lockfile về `https://registry.npmjs.org/`.
- Thay CV bằng bản gốc và thêm ảnh hồ sơ trích từ CV.
- Bỏ phụ thuộc tải Google Fonts; dùng system font stack để build ổn định hơn.
- Thêm CSP, HSTS production, Permissions Policy, nosniff, referrer policy và các header liên quan.
- Nâng cấp contact API: Zod, honeypot, body limit, content-type check, origin allowlist, rate limit, timeout và lỗi an toàn.
- Hỗ trợ Upstash Redis rate limit cho Vercel nhiều instance; vẫn có fallback trong bộ nhớ cho local.
- Giữ Formspree ở server bằng `FORMSPREE_ENDPOINT`.
- Thêm phân loại GitHub `Other` để không gắn nhầm dự án.
- Thêm trạng thái triển khai trung thực cho IMDb và MB Bank POC.
- Thêm global loading/error, page transition và modal dùng lại.
- Thêm GitHub Actions CI.
- Sửa Docker build arguments cho biến public.
- Thêm hướng dẫn chạy/deploy tiếng Việt đầy đủ.
- Thêm `SECURITY.md` và cập nhật tài liệu vận hành.

## Kiểm tra cần chạy trên máy có internet

```bash
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
```

`npm run check` bao gồm doctor, lint, typecheck, unit test và production build. Có thể chạy thêm `npm run format:check` để kiểm tra định dạng.

## Kết quả kiểm tra trong phiên hoàn thiện

Đã kiểm tra thành công:

- `node scripts/doctor.mjs`.
- Cấu trúc và cú pháp biệt lập của 77 file TypeScript/TSX bằng TypeScript compiler API: không có lỗi cú pháp.
- 73 file mã nguồn/test không có import nội bộ bị thiếu.
- `package.json` và phần root của `package-lock.json` khớp dependency, tên và phiên bản.
- Lockfile không còn URL registry nội bộ.
- Snapshot GitHub có 29 repository.
- CV là PDF A4 3 trang, không mã hóa và không chứa JavaScript nhúng.
- Ảnh hồ sơ là JPEG 375 × 375 hợp lệ.

Chưa thể chạy `npm ci`, ESLint, typecheck đầy đủ, Vitest và `next build` ngay trong sandbox vì cổng npm nội bộ của môi trường kiểm tra trả về **HTTP 503 Service Temporarily Unavailable** cho nhiều tarball dependency. Đây là hạn chế mạng của sandbox, không phải lỗi dependency được xác định từ mã nguồn. Lockfile đã được đổi về registry npm chính thức để chạy bình thường trên máy cá nhân, GitHub Actions hoặc Vercel có kết nối npm.
