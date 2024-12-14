function CardItem({ Warung, addToCart }) {
  return (
    <>
      <div className="col p-3  ">
        <div className="card shadow-sm">
          <img
            src={Warung.imageUrl}
            className="card-img-top"
            alt="image-poster"
            style={{ height: "300px", objectFit: "cover", padding: "10px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{Warung.foodName}</h5>
            <p className="card-text"> Rp. {Warung.price}
            </p>
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={"#modal" + Warung.id}
            >
              Lihat Detail
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={"modal" + Warung.id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {Warung.foodName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Rp.
              {Warung.price}
              </p>
              <img
                src={Warung.imageUrl}
                className="card-img-top"
                alt="image-poster"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(Warung);
                }}
                type="button"
                className="btn btn-primary"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardItem;
