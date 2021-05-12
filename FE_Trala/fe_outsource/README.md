Các file data static hiện có 3 ngày là 06, 07, 08 tháng 4 năm 2021

Sau khởi động server bằng cách chạy file main.py, data của ngày mặc định được trả về đang là ngày 07/04/2021,
khoảng thời gian mặc định là 9h -> 15h
Có thể lấy data của ngày khác, request api POST http://localhost:5025/api/{endpoint}
với body là 1 object JSON dạng:
{
"day": "2021_04_06",
"rangeTime": ["09:00:00", "15:00:00"]
}

với day là ngày format "YYYY:MM:DD",
rangeTime là khoảng thời gian gian bắt đầu, kết thúc; format ["HH:MM:SS", "HH:MM:SS"]

Ví dụ:

- Lấy data Phái sinh ngày 08:

  POST http://localhost:5025/api/ps-outbound
  {
  "day": "2021_04_08",
  }

---

- Lấy data Buy up, Sell down ngày 06 + thời gian từ 11h -> 13h:

  POST http://localhost:5025/api/busd-nn-outbound
  {
  "day": "2021_04_06",
  "rangeTime": ["11:00:00", "13:00:00"]
  }

---

- Lấy data Arbit Unwind ngày 07 + thời gian từ 14h -> 15h:

  POST http://localhost:5025/api/arbit-unwind-outbound
  {
  "rangeTime": ["14:00:00", "15:00:00"]
  }
