import { useState } from "react";
import styles from "../styles/pagination.module.css";

import React from "react";
interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  // puts 1, 2, ... total_pagination_pages into the pageNumbers array
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); ++i) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  // sets the active page and current page to the page number desired
  const handlePageClick = (number: number) => {
    setActivePage(number);
    paginate(number);
  };
  return (
    <div>
      <nav>
        <ul className={styles.pagination}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <div
                className={number === activePage ? styles.active : styles.link}
                onClick={() => {
                  handlePageClick(number);
                  paginate(number);
                }}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
