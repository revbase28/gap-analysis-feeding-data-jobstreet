import "../index.css";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../state/job/jobSlice";

export const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, currentPage, activeFilter } = useSelector(
    (state: RootState) => state.job
  );

  useEffect(() => {
    dispatch(fetchData({ page: currentPage, activeFilter: activeFilter }));
  }, [dispatch, currentPage, activeFilter]);

  if (loading) {
    return <p className="text-red-400">Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
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
            <td>{job.jobTags[0].tag_desc}</td>
            <td>
              <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
