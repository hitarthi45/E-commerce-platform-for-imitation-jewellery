function Inventory() {
  return (
    <div className="page-container">
      <h2>Inventory Management</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ring</td>
            <td>5</td>
            <td style={{ color: "red" }}>Low Stock</td>
          </tr>
          <tr>
            <td>Necklace</td>
            <td>25</td>
            <td style={{ color: "green" }}>In Stock</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;