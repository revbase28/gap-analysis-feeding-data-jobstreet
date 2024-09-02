import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { closeDeleteConfirmationDialog } from "../state/dialog/dialogSlice";
import axios from "axios";
import { base_url } from "../const";
import { useState } from "react";
import { fetchData } from "../state/job/jobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface DeleteConfirmationDilogProps {
  jobId: string;
}

export const DeleteConfirmationDialog: React.FC<
  DeleteConfirmationDilogProps
> = ({ jobId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeFilter } = useSelector((state: RootState) => state.job);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteJob = async () => {
    try {
      await axios.delete(base_url + "job/" + jobId);

      // Fetch job with recently generated tag
      dispatch(fetchData({ page: 0, activeFilter: activeFilter }));
      setLoading(false);

      dispatch(closeDeleteConfirmationDialog());
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
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          Do you really want to delete this item? This process cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(closeDeleteConfirmationDialog())}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={deleteJob}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Delete"}
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
