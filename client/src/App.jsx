import { useState, useEffect } from "react";
import "./App.css";
import CartItem from "./components/CartItem";
import CardItem from "./components/CardItem";

function App() {
  const [dataWarung, setDataWarung] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fungsi untuk mendapatkan data warung
  async function getData() {
    const url = "https://actually-infrequent-dugout.glitch.me/Warung";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setDataWarung(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    getData();
  }, []);

  // Fungsi untuk menambahkan item ke dalam cart
  function addToCart(Warung) {
    // Periksa jika item sudah ada dalam cart
    const existingItem = cart.find((item) => item.id === Warung.id);
  
    if (existingItem) {
      // Jika item sudah ada, tambahkan jumlahnya
      setCart(cart.map((item) =>
        item.id === Warung.id
          ? { ...item, quantity: item.quantity + 1 } // Menambahkan 1 ke jumlah
          : item
      ));
    } else {
      // Jika item belum ada, tambahkan ke cart dengan jumlah 1
      setCart([...cart, { ...Warung, quantity: 1 }]);
    }
  
    setSelectedItem(Warung);
    setShowModal(true);
  }
  function handleOrderNow() {
    alert("Pesanan Anda berhasil dipesan!");
    setCart([]); // Mengosongkan cart setelah pesanan
  }
  

  // Fungsi untuk menghapus item dari cart
  function removeFromCart(itemToRemove) {
  setCart((prevCart) => {
    return prevCart
      .map((item) =>
        item.id === itemToRemove.id
          ? { ...item, quantity: item.quantity - 1 } // Kurangi jumlah
          : item
      )
      .filter((item) => item.quantity > 0); // Hapus item jika jumlahnya 0
  });
}


  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-primary bg-gradient sticky-top shadow-lg ">
        <div className="container d-flex align-items-center">
          {/* Logo di kiri */}
          <a className="navbar-brand" href="#" >
            <img
              src="/logopadang.jpg"
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-text-center"
            />
            <span className="navbar-text ml-4" style={{ color: "#FFFFFF" }}>
              WarungOnline.com
            </span>
          </a>

          {/* Teks di tengah */}
          {/* <div className="mx-auto">
            <span className="navbar-text" style={{ color: "#FFFFFF" }}>
              WarungOnline.com
            </span>
          </div> */}

          {/* Tombol Cart di kanan */}
          <button
            className="btn btn-warning"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Cart - {cart.length}
          </button>
        </div>
      </nav>

     {/* Jumbotron Section with Background Image */}
      <div
        className="text-white text-center p-5 mt-0"
        style={{
          backgroundImage: "url('https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/07/16062938/Ragam-Makanan-Khas-Indonesia-yang-Lezat-dan-Kaya-Nutrisi.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="display-4 fw-bold">Selamat Datang di Warung Online</h1>
        <p className="lead">
        Pesan sekarang dan rasakan pengalaman berbelanja yang lebih mudah!
        </p>
      </div>

        

      {/* Tampilan Produk */}
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {dataWarung.map((Warung, index) => (
            <CardItem
              Warung={Warung}
              key={index}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Drawer Cart */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          {cart.map((el, i) => (
          <CartItem cart={el} key={i} removeFromCart={removeFromCart} />
          ))}

          {/* Tombol Pesan Sekarang */}
          {cart.length > 0 && (
            <button
              className="btn btn-success mt-3"
              onClick={() => handleOrderNow()}>
              Pesan Sekarang
            </button>
          )}
        </div>
      </div>

      {/* Modal Konfirmasi */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Konfirmasi</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Item <strong>{selectedItem?.foodName || "Item"}</strong> berhasil
                ditambahkan ke cart.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-primary text-white py-4 mt-5 shadow" >
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} WARUNG ONLINE. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
