function CartItem({ cart, removeFromCart }) {
  return (
    <div className="d-flex p-2 gap-2 border rounded-4" key={cart.id}>
      <img
        src={cart.imageUrl}
        alt="Warung-poster"
        style={{
          width: "80px",
          height: "100px",
          objectFit: "cover",
        }}
        className="rounded-4"
      />
      <div>
        <h5 className="card-title">{cart.foodName}</h5>
        <p className="card-text">
          {cart.price} x {cart.quantity} {/* Menampilkan jumlah */}
        </p>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeFromCart(cart)} // Menghapus item dari cart
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default CartItem;
