import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

function Paginate({ pages, page, isAdmin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((currentPage) => {
          return (
            <Pagination.Item
              active={currentPage + 1 === page}
              key={currentPage + 1}
              as={Link}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${currentPage + 1}`
                    : `/page/${currentPage + 1}`
                  : `/admin/productlist/${currentPage + 1}`
              }
            >
              {currentPage + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;
