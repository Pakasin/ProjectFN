import { useState, useEffect } from "react";
import './Home1.css';

export default function Home1() {
  const [products, setProducts] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับ loading
  const [error, setError] = useState(""); // เพิ่ม state สำหรับข้อผิดพลาด

  useEffect(() => {
    // จำลองการโหลดข้อมูลจาก API
    const fetchProducts = async () => {
      try {
        const fetchedProducts = [
          { id: 1, name: "YONEX Astrox 99", brand: "YONEX", price: 5000, image: "astrox99.jpg" },
          { id: 2, name: "VICTOR Thruster K 9900", brand: "VICTOR", price: 4500, image: "thruster_k9900.jpg" },
          { id: 3, name: "Kawasaki King K8", brand: "Kawasaki", price: 3200, image: "king_k8.jpg" },
          { id: 4, name: "YONEX Nanoflare 700", brand: "YONEX", price: 4800, image: "nanoflare700.jpg" },
          { id: 5, name: "VICTOR Auraspeed 90K", brand: "VICTOR", price: 4600, image: "auraspeed90k.jpg" },
          { id: 6, name: "YONEX Duora 10", brand: "YONEX", price: 5200, image: "duora10.jpg" },
          { id: 7, name: "VICTOR Brave Sword 12", brand: "VICTOR", price: 4700, image: "bravesword12.jpg" },
          { id: 8, name: "Kawasaki Honor S6", brand: "Kawasaki", price: 3300, image: "honors6.jpg" },
          { id: 9, name: "YONEX Voltric Z Force II", brand: "YONEX", price: 5600, image: "voltriczforce2.jpg" },
          { id: 10, name: "VICTOR Hypernano X 900", brand: "VICTOR", price: 4800, image: "hypernanox900.jpg" },
          { id: 11, name: "Kawasaki Power Control X", brand: "Kawasaki", price: 3500, image: "powercontrolx.jpg" },
          { id: 12, name: "YONEX ArcSaber 11", brand: "YONEX", price: 5400, image: "arcsaber11.jpg" },
        ];
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later."); // แสดงข้อผิดพลาด
        console.error(err);
      } finally {
        setLoading(false); // หยุด loading
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (filterBrand === "" || product.brand === filterBrand) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">เลือกซื้อไม้แบดมินตัน</h1>
      <div className="flex justify-center gap-4 mb-4">
        <select
          onChange={(e) => setFilterBrand(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">ทุกแบรนด์</option>
          <option value="YONEX">YONEX</option>
          <option value="VICTOR">VICTOR</option>
          <option value="Kawasaki">Kawasaki</option>
        </select>
        <input
          type="number"
          placeholder="ราคาขั้นต่ำ"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="p-2 border rounded w-24"
          min="0"
        />
        <input
          type="number"
          placeholder="ราคาสูงสุด"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="p-2 border rounded w-24"
          min="0"
        />
      </div>

      {loading ? (
        <p className="text-center">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg text-center">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">ยี่ห้อ: {product.brand}</p>
              <p className="text-red-500 font-bold">฿{product.price}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}