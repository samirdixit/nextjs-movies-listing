"use client";
import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { getAllMovies } from "../../services/movieService";
import { toast } from "react-toastify";
import MovieCard from "../MovieCard/MovieCard";

const PaginatedItems = ({ itemsPerPage, edit, setEdit, setEditData }) => {
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  //  for detting the  details for edit case
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMovies();
        if (response.status_code == 200) {
          setItems(response.payload);
        } else {
          toast.error("Failed to fetch modvies  !!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((movie, index) => (
            <Col key={index} className="mb-4">
              <MovieCard
                title={movie.title}
                id={movie._id}
                publishing_year={movie.publishing_year}
                image={movie.image}
                edit={edit}
                setEdit={setEdit}
                setEditData={setEditData}
              />
            </Col>
          ))}
      </>
    );
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <Items currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Prev"
            className="pagination-wrapper"
          />
        </>
      ) : (
        <Col className="text-center w-100">Loading...</Col>
      )}
    </>
  );
};

export default PaginatedItems;
