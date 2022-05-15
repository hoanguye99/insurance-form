import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto my-10 flex justify-center ">
      <table className="border-collapse table-auto border border-slate-500 shadow">
        <thead>
          <tr>
            <th>Đối tượng Bảo hiểm</th>
            <th>Loại hình bảo hiểm</th>
            <th>Số tiền bảo hiểm</th>
            <th>Phí bảo hiểm thực thu (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={4}>Xe máy</td>
            <td rowSpan={2}>
              Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên
              thứ 3
            </td>
            <td>Về người: 150 triệu đồng/người/vụ</td>
            <td rowSpan={2}>30.000đ</td>
          </tr>
          <tr>
            <td>Về tài sản: 50 triệu đồng/vụ</td>
          </tr>
          <tr>
            <td rowSpan={2}>
              Bảo hiểm tai nạn người ngồi trên xe (không bắt buộc)
            </td>
            <td>Số người: 02</td>
            <td rowSpan={2}>10.000đ</td>
          </tr>
          <tr>
            <td>Số tiền bảo hiểm: 05 triệu đồng/người/vụ</td>
          </tr>
          <tr>
            <td colSpan={3}>Tổng</td>
            <td>40.000đ</td>
          </tr>

          <tr>
            <td rowSpan={4}>Ô tô 6 chỗ trở xuống</td>
            <td rowSpan={2}>
              Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên
              thứ 3
            </td>
            <td>Về người: 150 triệu đồng/người/vụ</td>
            <td rowSpan={2}>370.000đ</td>
          </tr>
          <tr>
            <td>Về tài sản: 100 triệu đồng/vụ</td>
          </tr>
          <tr>
            <td rowSpan={2}>
              Bảo hiểm tai nạn người ngồi trên xe (không bắt buộc)
            </td>
            <td>Số người: 05</td>
            <td rowSpan={2}>30.000đ</td>
          </tr>
          <tr>
            <td>Số tiền bảo hiểm: 10 triệu đồng/người/vụ</td>
          </tr>
          <tr>
            <td colSpan={3}>Tổng</td>
            <td>400.000đ</td>
          </tr>

          <tr>
            <td rowSpan={4}>Ô tô 7 chỗ - dưới 11 chỗ</td>
            <td rowSpan={2}>
              Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên
              thứ 3
            </td>
            <td>Về người: 150 triệu đồng/người/vụ</td>
            <td rowSpan={2}>675.000đ</td>
          </tr>
          <tr>
            <td>Về tài sản: 100 triệu đồng/vụ</td>
          </tr>
          <tr>
            <td rowSpan={2}>
              Bảo hiểm tai nạn người ngồi trên xe (không bắt buộc)
            </td>
            <td>Số người: 07</td>
            <td rowSpan={2}>52.000đ</td>
          </tr>
          <tr>
            <td>Số tiền bảo hiểm: 10 triệu đồng/người/vụ</td>
          </tr>
          <tr>
            <td colSpan={3}>Tổng</td>
            <td>727.000đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default About
