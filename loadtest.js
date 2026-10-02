import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10000 },
    { duration: '30s', target: 20000 },
    { duration: '30s', target: 30000 },
  ],
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.05', abortOnFail: true }], // หยุดรันทันทีถ้า Error เกิน 5%
    http_req_duration: ['p(95)<500'], // Latency p95 ไม่ควรเกิน 500ms
  },
};


export default function () {
    // ยิงไปที่ API สำหรับทดสอบประสิทธิภาพโดยเฉพาะ (ไม่พึ่ง Database)
    const res = http.get('http://localhost:5000/api/v1/loadtest');

    // ตรวจสอบว่า API ตอบกลับมาสำเร็จ (200 OK)
    check(res, { 
        'status is 200 OK': (r) => r.status === 200 
    });

    // หน่วงเวลา 1 วินาทีต่อ 1 รอบ (จำลองพฤติกรรมคนกดใช้งานจริงๆ)
    sleep(1);
}