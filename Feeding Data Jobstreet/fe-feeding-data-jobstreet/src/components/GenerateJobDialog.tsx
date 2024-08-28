import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { AppDispatch, RootState } from "../state/store";
import { useState } from "react";
import axios from "axios";
import { base_url } from "../const";
import { changeFilter, fetchData } from "../state/job/jobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { closeGenerateJobDialog } from "../state/dialog/dialogSlice";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const GenerateJobDialog = () => {
  const { data } = useSelector((state: RootState) => state.jobTag);
  const [tag, setTag] = useState(-1);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleFilterDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTag(parseInt(event.target.value));
  };

  const generateJob = async () => {
    setLoading(true);
    setError(null);

    const params = {
      params: {
        tagId: tag,
      },
    };
    try {
      await axios.post(base_url + "job/generate", null, params);

      // Fetch job with recently generated tag
      dispatch(changeFilter(tag));
      dispatch(fetchData({ page: 0, activeFilter: tag }));
      setLoading(false);
      dispatch(closeGenerateJobDialog());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error handling
        setError(err.response?.data.message || "An error occurred");
      } else if (err instanceof Error) {
        // General error handling
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="relative bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Generate Jobs
        </h2>
        <button
          onClick={() => dispatch(closeGenerateJobDialog())}
          className="absolute right-4 top-4"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div>
          <select
            value={tag}
            onChange={handleFilterDropdownChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2"
          >
            <option value={-1}>Select Tag</option>
            {data.map((jobTag, index) => (
              <option key={index} value={jobTag.tag_id}>
                {jobTag.tag_desc}
              </option>
            ))}
          </select>
          <button
            onClick={generateJob}
            disabled={tag == -1}
            className="w-full my-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-orange-300 p-2 text-center mr-1 rounded-md text-white"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Generate"}
          </button>
          {error != null && (
            <div className="flex justify-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
