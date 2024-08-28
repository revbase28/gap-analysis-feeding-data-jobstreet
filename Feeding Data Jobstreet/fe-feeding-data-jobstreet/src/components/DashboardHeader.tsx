import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchJobTagData } from "../state/jobTag/jobTagSlice";

export const DashboardHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobTag
  );

  useEffect(() => {
    dispatch(fetchJobTagData());
  }, [dispatch]);

  return (
    <>
      <div className="block py-3 pt-3">
        <h1 className="text-3xl font-bold mb-3">Job Vacancy Dashboard</h1>
        <div className="flex justify-between align-middle">
          <div className="flex">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2">
              <option>Search By Tag</option>
              {data.map((jobTag, index) => (
                <option key={index} value={jobTag.tag_id}>
                  {jobTag.tag_desc}
                </option>
              ))}
            </select>
            <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white">
              Export to xlsx
            </button>
          </div>
          <div className="flex">
            <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white">
              Generate Job
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 text-center mr-1 min-w-[5em] rounded-md text-white">
              Add New Job
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
