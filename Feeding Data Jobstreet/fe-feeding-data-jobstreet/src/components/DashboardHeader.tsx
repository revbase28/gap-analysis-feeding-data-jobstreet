import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchJobTagData } from "../state/jobTag/jobTagSlice";
import { changeFilter } from "../state/job/jobSlice";
import { exportJobToExcel } from "../state/job/exportJobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import {
  openAddJobDialog,
  openGenerateJobDialog,
} from "../state/dialog/dialogSlice";

export const DashboardHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector((state: RootState) => state.jobTag);
  const { activeFilter } = useSelector((state: RootState) => state.job);
  const { exportLoading } = useSelector((state: RootState) => state.exportJob);

  useEffect(() => {
    dispatch(fetchJobTagData());
  }, [dispatch]);

  const handleFilterDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(changeFilter(parseInt(event.target.value)));
  };

  return (
    <>
      <div className="block py-3 pt-3">
        <h1 className="text-3xl font-bold mb-3">Job Vacancy Dashboard</h1>
        <div className="flex justify-between align-middle">
          <div className="flex">
            <select
              value={activeFilter}
              onChange={handleFilterDropdownChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2"
            >
              <option value={-1}>Search By Tag</option>
              {data.map((jobTag, index) => (
                <option key={index} value={jobTag.tag_id}>
                  {jobTag.tag_desc}
                </option>
              ))}
            </select>
            <button
              disabled={exportLoading}
              onClick={() => dispatch(exportJobToExcel(activeFilter))}
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white"
            >
              {exportLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Export to xlsx"
              )}
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => dispatch(openGenerateJobDialog())}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white"
            >
              Generate Job
            </button>
            <button
              onClick={() => dispatch(openAddJobDialog())}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white"
            >
              Add New Job
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
