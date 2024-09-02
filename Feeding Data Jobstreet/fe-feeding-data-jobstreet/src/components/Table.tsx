import "../index.css";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../state/job/jobSlice";
import {
  openDeleteConfirmationDialog,
  openDetailJobDialog,
  openEditJobDialog,
} from "../state/dialog/dialogSlice";
import { selectJob } from "../state/job/selectedJobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const NoDataScreen = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">No Data Available</h2>
        <p className="mt-2 text-gray-500">There is currently no data to display.</p>
      </div>
    </div>
  );
};

export const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, currentPage, activeFilter } = useSelector(
    (state: RootState) => state.job
  );

  useEffect(() => {
    dispatch(fetchData({ page: currentPage, activeFilter: activeFilter }));
  }, [dispatch, currentPage, activeFilter]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if(data.length == 0) {
    return NoDataScreen();
  }

  return (
    <>
      {loading && (
        <div className="fixed bg-gray-900 bg-opacity-50 flex justify-center items-center w-full min-h-[68vh]">
          <FontAwesomeIcon icon={faSpinner} spin size="10x" color="white" />
        </div>
      )}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-sky-600 text-white">
            <th className="py-2">Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job, index) => (
            <tr key={index} className="even:bg-sky-100">
              <td className="py-3">{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.jobLocation}</td>
              <td>{job.salary}</td>
              <td className="text-center">{job.jobTags[0].tag_desc}</td>
              <td>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      dispatch(selectJob(job));
                      dispatch(openDetailJobDialog());
                    }}
                    className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-700 p-2 text-center mr-1 min-w-[3em] rounded-md text-white"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(selectJob(job));
                      dispatch(openEditJobDialog());
                    }}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 text-center mr-1 min-w-[3em] rounded-md text-white"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => {
                      console.log("Delete Clicked");
                      dispatch(selectJob(job));
                      dispatch(openDeleteConfirmationDialog());
                    }}
                    className="bg-red-500 hover:bg-red-600 active:bg-red-700 p-2 text-center mr-1 min-w-[3em] rounded-md text-white"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
