import { useDispatch } from "react-redux";
import "../index.css";
import { AppDispatch } from "../state/store";
import { nextPage, prevPage, toPage } from "../state/job/jobSlice";

interface PaginationNavigatorProps {
  totalPages: number;
  currentPage: number;
}

const renderPageNumber = (
  totalPages: number,
  currentPage: number,
  dispatch: any
) => {
  let li = [];
  // {1 2 3 4 5}
  if (totalPages <= 5) {
    for (let index = 0; index < totalPages; index++) {
      li.push(
        <li
          key={index}
          className={index == currentPage ? "active" : ""}
          onClick={() => dispatch(toPage(index))}
        >
          {index + 1}
        </li>
      );
    }
  } else {
    // {1 2 3 4 .. 10}
    if (currentPage < 3) {
      for (let index = 0; index < 4; index++) {
        li.push(
          <li
            key={index}
            className={index == currentPage ? "active" : ""}
            onClick={() => dispatch(toPage(index))}
          >
            {index + 1}
          </li>
        );
      }
      li.push(<li>..</li>);
      li.push(
        <li
          key={totalPages - 1}
          className={totalPages - 1 == currentPage ? "active" : ""}
          onClick={() => dispatch(toPage(totalPages - 1))}
        >
          {totalPages}
        </li>
      );
    } else if (currentPage >= 3) {
      // {1 .. 3 4 5 .. 10}
      if (totalPages - currentPage > 3) {
        li.push(
          <li
            key={0}
            className={0 == currentPage ? "active" : ""}
            onClick={() => dispatch(toPage(1))}
          >
            1
          </li>
        );
        li.push(<li>..</li>);
        for (let index = currentPage - 1; index <= currentPage + 1; index++) {
          li.push(
            <li
              key={index}
              className={index == currentPage ? "active" : ""}
              onClick={() => dispatch(toPage(index))}
            >
              {index + 1}
            </li>
          );
        }
        li.push(<li>..</li>);
        li.push(
          <li
            key={totalPages - 1}
            className={totalPages - 1 == currentPage ? "active" : ""}
            onClick={() => dispatch(toPage(totalPages - 1))}
          >
            {totalPages}
          </li>
        );
      } else {
        // {1 .. 8 9 10}
        li.push(
          <li
            key={0}
            className={0 == currentPage ? "active" : ""}
            onClick={() => dispatch(toPage(1))}
          >
            1
          </li>
        );
        li.push(<li>..</li>);
        for (let index = totalPages - 3; index < totalPages; index++) {
          li.push(
            <li
              key={index}
              className={index == currentPage ? "active" : ""}
              onClick={() => dispatch(toPage(index))}
            >
              {index + 1}
            </li>
          );
        }
      }
    }
  }
  return li;
};

export const PaginationNavigator: React.FC<PaginationNavigatorProps> = ({
  totalPages,
  currentPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="pagination">
      <ul>
        <li onClick={() => dispatch(prevPage())}>Prev</li>
        {renderPageNumber(totalPages, currentPage, dispatch)}
        <li onClick={() => dispatch(nextPage())}>Next</li>
      </ul>
    </div>
  );
};
