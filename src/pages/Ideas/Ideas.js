import { useEffect, useState } from "react";

import "./Ideas.css";

import banner from "../../pics/banner.jpg";

function Ideas() {
  const [show, setShow] = useState(10);
  const [sortNew, setSortNew] = useState(true);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [maxPage, setMaxPage] = useState(100);
  const [paginationRange, setPaginationRange] = useState({ min: 1, max: 5 });

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  useEffect(() => {
    if (page < 3) {
      setPaginationRange({ min: 1, max: 5 });
    } else if (page > Math.ceil(maxPage / show) - 3) {
      setPaginationRange({
        min: Math.ceil(maxPage / show) - 5,
        max: Math.ceil(maxPage / show),
      });
    } else {
      setPaginationRange({ min: page - 2, max: page + 2 });
    }
  }, [page, show]);

  useEffect(() => {
    fetch(
      `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${show}&append=small_image&sort=${
        sortNew ? "" : "-"
      }published_at`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((resp) => {
        console.log("SUCCESS");
        return resp.json();
      })
      .then((result) => {
        setCards(result.data);
        setMaxPage(result.meta.total);
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      });
  }, [show, page, sortNew]);

  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="text text-center">
          <h1>Ideas</h1>
          <p>Where all our great things begin</p>
        </div>
        <div className="triangle"></div>
      </div>
      <div className="list-post container my-4">
        <div className="controls d-flex justify-content-between align-items-center">
          <p>
            Showing {page * show - show + 1} - {page * show} of {maxPage}
          </p>
          <div className="filters d-flex justify-content-end align-items-center">
            <p>Show per page:</p>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {show}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setPage(Math.ceil((page * show) / 10));
                      setShow(10);
                    }}
                  >
                    10
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setPage(Math.ceil((page * show) / 20));
                      setShow(20);
                    }}
                  >
                    20
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setPage(Math.ceil((page * show) / 50));
                      setShow(50);
                    }}
                  >
                    50
                  </a>
                </li>
              </ul>
            </div>
            <p>Sort by:</p>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortNew ? "Newest" : "Oldest"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" onClick={() => setSortNew(true)}>
                    Newest
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => setSortNew(false)}
                  >
                    Oldest
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center g-4 my-3">
          {cards.map((post, idx) => {
            return (
              <div
                className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                key={idx}
                onClick={() =>
                  window.open("https://suitmedia.com/ideas/" + post.slug)
                }
              >
                <div className="card">
                  <img
                    src={
                      post.small_image[0] !== undefined &&
                      post.small_image[0].url
                    }
                    loading="lazy"
                  />
                  <div className="info">
                    <p>
                      {new Date(
                        post.updated_at.slice(0, 10)
                      ).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h6>{post.title}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => setPage(1)}
                aria-label="Start"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
                aria-label="Previous"
              >
                <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            {range(paginationRange.min, paginationRange.max, 1).map(
              (number) => {
                return (
                  <li className="page-item" key={number}>
                    <a
                      className={`page-link ${page === number && "active"}`}
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </a>
                  </li>
                );
              }
            )}

            <li className="page-item">
              <a
                className="page-link"
                onClick={() => {
                  if (page + 1 <= Math.ceil(maxPage / show)) setPage(page + 1);
                }}
                aria-label="Next"
              >
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => setPage(Math.ceil(maxPage / show))}
                aria-label="Last"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Ideas;
