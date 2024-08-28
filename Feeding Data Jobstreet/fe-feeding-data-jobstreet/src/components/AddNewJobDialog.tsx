import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { closeAddJobDialog } from "../state/dialog/dialogSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const AddNewJobDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.jobTag);

  return (
    <div className="overlay">
      <div className="relative bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Job</h2>
        <button
          onClick={() => dispatch(closeAddJobDialog())}
          className="absolute right-4 top-4"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <form className="max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Enter Job Title"
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Job Location"
            />
          </div>
          <div className="form-group">
            <label>Salary Range</label>
            <div className="flex align-middle items-center">
              <input
                className="mr-2"
                type="number"
                id="salaryFrom"
                name="salaryFrom"
                placeholder="Start From"
              />
              <p className="text-center">To</p>
              <input
                className="mx-2 box-border"
                type="number"
                id="salaryTo"
                name="salaryTo"
                placeholder="Until"
              />
              <select>
                <option value="per month">Monthly</option>
                <option value="per year">Yearly</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Work Type</label>
            <select>
              <option value="Full time">Full Time</option>
              <option value="Kontrak">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <label>Short Description</label>
            <textarea
              className="box-border h-[5em]"
              id="shortDesc"
              name="shortDesc"
              placeholder="Enter Short Description"
            />
          </div>
          <div className="form-group">
            <label>Job Tag</label>
            <select>
              {data.map((jobTag, index) => (
                <option key={index} value={jobTag.tag_id}>
                  {jobTag.tag_desc}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-2 text-center mr-1 w-full rounded-md text-white"
          >
            Add New Job
          </button>
        </form>
      </div>
    </div>
  );
};
