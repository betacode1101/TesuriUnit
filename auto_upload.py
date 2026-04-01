from notebooklm_tools.cli.utils import get_client
from notebooklm_tools.services import sources as sources_service
from pathlib import Path

def main():
    try:
        with get_client(None) as client:
            print("Đang lấy mã ID thực tế (UUID) từ Google chờ chút...")
            
            # Quét hệ thống API lấy danh sách notebooks cá nhân
            from notebooklm_tools.services import notebooks as notebooks_service
            notebooks = notebooks_service.list_notebooks(client)["notebooks"]
            
            if not notebooks:
                print("Lỗi: Không tìm thấy dự án nào trong NotebookLM của bạn.")
                return
                
            # Hàm tạo dự án dường như bị lỗi trả về Title trống, nên ta sẽ nhắm mục tiêu vào 
            # Dự án được tương tác gần nhất/mới tạo nhất (vị trí đầu tiên trong mảng)
            target_notebook = notebooks[0]
            notebook_id = target_notebook["id"]
            
            print(f"-> Đã khóa mục tiêu Notebook ID: {notebook_id}")
            
            file_path = Path(r"C:\Baron\Antigravity Projects\First app\balcony_docs.md")
            text_content = file_path.read_text(encoding="utf-8")
            
            print(f"Đang đẩy file rưỡi '{file_path.name}' lên đám mây...")
            result = sources_service.add_source(
                client,
                notebook_id,
                "text",
                text=text_content,
                title=file_path.name,
                wait=True,
            )
            
            print("\n==== TỰ ĐỘNG HÓA THÀNH CÔNG 100% ====")
            print("Mã tham chiếu văn bản (Source ID):", result.get("source_id"))
            
    except Exception as e:
        # Bắt lỗi chuẩn và in ra toàn bộ Call Stack để tôi debug nếu vẫn trục trặc
        import traceback
        print("FATAL ERROR:")
        traceback.print_exc()

if __name__ == "__main__":
    main()
