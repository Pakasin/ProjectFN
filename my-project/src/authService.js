export const login = async ({ username, password }) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'เกิดข้อผิดพลาด');
        }

        return data;  // ส่งข้อมูลที่ได้รับจาก API
    } catch (error) {
        throw new Error(error.message || 'เกิดข้อผิดพลาด');
    }
};
