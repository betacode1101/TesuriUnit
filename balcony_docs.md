# Tài Liệu Kỹ Thuật: Ứng dụng Mô Phỏng 3D Lan Can Nhôm (Balcony Corner 3D Simulator)

## 1. Giới thiệu tổng quan
Balcony Corner 3D Simulator là một ứng dụng web mô phỏng tương tác 3D cực kỳ trực quan dành cho sản phẩm lan can nhôm bộ phận góc của công ty. Ứng dụng cho phép người dùng thay đổi kích thước linh hoạt, kiểm tra trực quan sản phẩm dưới dạng khối 3D (Isometric), và xuất bản vẽ AutoCAD `.dxf` gồm 3 khung nhìn chuẩn kỹ thuật. Đặc biệt, tài liệu dự án được tự động hóa đồng bộ lên thư viện thông minh Google NotebookLM.

## 2. Thông số kỹ thuật & Vật liệu đa dạng
- **Chiều cao (H):** 1100 mm (Cho phép người dùng tùy biến kéo thả tự do qua thanh Slider từ `300mm` đến `1200mm`).
- **Cạnh trái (DL) / Cạnh phải (DR):** Tiêu chuẩn 180 mm. Khoảng an toàn: `150mm - 350mm`.
- **Hệ thống Vật liệu (Material Picker):** Hỗ trợ chuyển đổi nhanh hai phong cách kiến trúc:
  - `Song nhôm truyền thống (Balusters)`: Tính toán rải đều các trụ nhôm mảnh với khoảng hở an toàn tiêu chuẩn 120mm.
  - `Kính Cường Lực (Glass Panels)`: Ứng dụng hiệu ứng quang học xuyên thấu tĩnh điện (Glassmorphism) vắt trọn vào khe ray trên dưới, gỡ bỏ hoàn toàn trụ chia, tạo cảm giác hiện đại.

## 3. Các tính năng cốt lõi (Core Features)

### a) Mô hình hóa tham số 3D (Parametric 3D Modeling)
- Vận hành trên sức mạnh của **Three.js** cùng hệ sinh thái **React Three Fiber**.
- Tùy biến thời gian thực: Khi người thiết kế thay đổi thông số H, DL, DR hay Tùy chọn Vật liệu, lan can sẽ lập tức biến hình (morph) trước mắt. Chiều dài cột, vị trí hở và tỷ lệ khung kính tự thay đổi mà không cần tải lại mô hình.
- Chuột trái xoay khối xoay 360 độ, chuột giữa (middle-click) pan tịnh tiến.

### b) Cơ chế Cảnh báo Kỹ thuật Tự Động (Smart Diagnostics)
- Bộ Text 3D định vị nổi sát nền nhà hiển thị **Đen Trầm** khi thông số L/R chuẩn (150-350mm).
- Kích thước >350mm: Chữ nhuộm **Đỏ** báo động độ vươn cành nhôm quá dài (nguy cơ rung lắc, võng nứt kết cấu).
- Kích thước <150mm: Chữ chuyển **Tím** báo hiệu nhôm bị vụn hẹp, máy cắt góc CNC rất khó đưa lưởi vào thi công.
- **Workflow Báo Cáo**: Nếu phát hiện Out-of-standard, app xuất hiện Box Alert đỏ và kích hoạt Copy Auto Mail (Ghi nhận thông số Length, H và Loại Kính hiện hành) để thầu thợ Gửi Yêu Cầu Kỹ Thuật về tổ chuyên môn tại `baronvn7197@gmail.com`.

### c) Công cụ Xuất Bản Vẽ Kỹ Thuật CAD (Advanced DXF Drafting)
Hệ thống tự động sinh file DXF chuẩn cấu trúc đồ họa nguyên thủy của CAD, thay thế hoàn toàn các phương pháp xuất đa giác 2D kém chất lượng:
- **3 Khung Nhìn Tuyệt Đối (3-View Layout)**: 
  1. Mặt Bằng Top-Down (vẽ cả tiết diện kính hoặc trụ nhôm).
  2. Hình Chiếu Đứng Mặt Trái (L Face).
  3. Hình Chiếu Đứng Mặt Phải (R Face).
- **Hệ Thống True Dimensions Tự Động**: Toàn bộ kích thước được khai báo bằng lệnh thực thể `DIMENSION` gốc (Aligned Dimension) thay vì vẽ nét đứt thủ công. Mã ngầm `$DIMSCALE` = `20` và `$DIMTXT` = `3.5` (Text size) được tiêm trực tiếp vào Data Header giúp AutoCAD tự phóng to kích cỡ đường Gióng, Mũi Tên và Số đo lớn gấp 20 lần – cực kỳ sắc nét trên mô hình lan can hàng nghìn milimét mà không cần can thiệp tay.

## 4. Ngăn xếp công nghệ & Tự Động Hóa
- **Web Frontend**: React 18, Vite.
- **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`.
- **CAD Vector Engine**: `@tarikjabiri/dxf` (Công cụ xuất DXF chuyên sâu cho Javascript với khả năng thao tác Entities Dimension đa lớp).
- **AI Docs Automation Pipeline**: Kịch bản Python tự động vượt rào bảo vệ (Headless Browser) của Chrome để tương tác với thư viện CLI Google Auth, đẩy file Markdown thô này vĩnh viễn vào bộ não NotebookLM AI.
- **Giao diện bóng bẩy (UI/UX)**: Vanilla CSS, UI Glassmorphism, hiệu ứng Focus vòng sáng xanh (Neon Blue), micro-animations chuyên nghiệp.
