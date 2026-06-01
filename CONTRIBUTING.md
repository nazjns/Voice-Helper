# Quy định đóng góp mã nguồn cho nhóm Voice-Helper

Để đảm bảo mã nguồn không bị xung đột (conflict), yêu cầu tất cả các thành viên tuân thủ nghiêm ngặt quy trình sau:

## 1. Quy trình phân nhánh (Branching)
* `main`: Nhánh chứa sản phẩm hoàn chỉnh cuối cùng để giảng viên chấm điểm. Tuyệt đối không code trực tiếp tại đây.
* `develop`: Nhánh phối hợp chung để ghép nối giao diện và xử lý logic AI.
* Khi làm tính năng mới: Các thành viên tự tách nhánh con riêng từ nhánh `develop` theo cú pháp `feature/ten-tinh-nang` (Ví dụ: `feature/hoang-backend`, `feature/khai-frontend`).

## 2. Quy tắc viết Commit Message
Viết tin nhắn commit rõ ràng, có nghĩa và sử dụng các tiền tố tiêu chuẩn:
* `feat: ...` khi thêm tính năng mới (Ví dụ: `feat: tích hợp mic realtime`).
* `fix: ...` khi sửa lỗi bug (Ví dụ: `fix: sửa lỗi giao diện lật thẻ`).
* `docs: ...` khi cập nhật tài liệu, hướng dẫn hoặc file readme.

## 3. Quy trình gộp code (Merge Code)
Sau khi hoàn thành và kiểm thử tính năng trên máy cục bộ (local):
1. Đẩy nhánh `feature/...` cá nhân lên GitHub.
2. Tạo một **Pull Request (PR)** yêu cầu gộp từ nhánh của mình vào nhánh `develop`.
3. tiến hành kiểm tra (Review code) và thực hiện bấm **Merge** nếu không có lỗi phát sinh.
