import {
  faBuilding,
  faClock,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JobData } from "../typeDef";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { closeDetailJobDialog } from "../state/dialog/dialogSlice";

interface DetailJobProps {
  jobData: JobData;
}

export const DetailJobDialog: React.FC<DetailJobProps> = ({ jobData }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="overlay">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h1 className="font-bold text-2xl mb-1">{jobData.jobTitle}</h1>
        <h2 className="text-lg mb-3">{jobData.companyName}</h2>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            className="min-w-[16px]"
            icon={faBuilding}
            color="grey"
          />
          <p className="ml-3">{jobData.jobLocation}</p>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faClock} color="grey" />
          <p className="ml-3">{jobData.workType}</p>
        </div>
        {jobData.salary && (
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faMoneyBill} color="grey" />
            <p className="ml-3">{jobData.salary}</p>
          </div>
        )}

        <div className="mt-2">{jobData.shortDesc}</div>
        <button
          onClick={() => dispatch(closeDetailJobDialog())}
          className="mt-4 bg-green-500 hover:bg-green-600 active:bg-green-700 p-2 text-center mr-1 w-full rounded-md text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};
