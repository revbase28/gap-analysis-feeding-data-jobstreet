import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  closeAddJobDialog,
  closeEditJobDialog,
} from "../state/dialog/dialogSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { base_url, FormType, rupiahFormat } from "../const";
import axios from "axios";
import { changeFilter, fetchData } from "../state/job/jobSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { JobData } from "../typeDef";

interface FormErrors {
  jobTitle?: string;
  companyName?: string;
  jobLocation?: string;
  salary?: string;
  shortDesc?: string;
}

interface FormDialogProps {
  formType: FormType;
  jobData?: JobData;
}

interface ExtractedSalaryValue {
  minAmount: string;
  maxAmount: string;
  salaryType: string;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  formType,
  jobData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.jobTag);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    salaryStart: "",
    salaryTo: "",
    salaryType: "per month",
    workType: "Full Time",
    shortDesc: "",
    jobTag: 1,
  });

  const extractValue = (input: string): ExtractedSalaryValue | null => {
    const regex =
      /Rp\s*([\d.,]+)\s*(?:–|–|–|-)?\s*(Rp\s*([\d.,]+))?\s*(per month|per year)/;
    const match = input.match(regex);

    if (match) {
      // Convert string ke number dan hilangkan tanda koma/titik
      const minAmount = match[1] ? match[1].replace(/[,.]/g, "") : "";
      const maxAmount = match[3] ? match[3].replace(/[,.]/g, "") : "";
      const salaryType = match[4] ? match[4] : "";

      return {
        minAmount,
        maxAmount,
        salaryType,
      };
    }

    return {
      minAmount: "",
      maxAmount: "",
      salaryType: "",
    };
  };

  useEffect(() => {
    if (formType === FormType.EDIT_JOB) {
      let extractedSalaryValue = extractValue(jobData!.salary);

      setFormData({
        jobTitle: jobData!.jobTitle,
        companyName: jobData!.companyName,
        jobLocation: jobData!.jobLocation,
        salaryStart: extractedSalaryValue!.minAmount,
        salaryTo: extractedSalaryValue!.maxAmount,
        salaryType: extractedSalaryValue!.salaryType,
        workType: jobData!.workType,
        shortDesc: jobData!.shortDesc,
        jobTag: jobData!.jobTags[0].tag_id,
      });
    }
  }, []);

  const [formError, setFormError] = useState<FormErrors>({});

  const addOrEditJobRequest = async () => {
    const salaryStart = formData.salaryStart
      ? rupiahFormat.format(parseInt(formData.salaryStart))
      : "";

    const salaryTo = formData.salaryTo
      ? rupiahFormat.format(parseInt(formData.salaryTo))
      : "";

    const salaryString =
      salaryStart && salaryTo
        ? salaryStart + " - " + salaryTo + " " + formData.salaryType
        : salaryStart
        ? salaryStart + " " + formData.salaryType
        : "";

    const data = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      jobLocation: formData.jobLocation,
      salary: salaryString,
      workType: formData.workType,
      shortDesc: formData.shortDesc,
      jobTags: [formData.jobTag],
    };

    try {
      if (formType == FormType.ADD_JOB) {
        await axios.post(base_url + "job", data);
      } else {
        await axios.patch(base_url + "job/" + jobData!.id, data);
      }

      // Fetch job with recently generated tag
      dispatch(changeFilter(formData.jobTag));
      dispatch(fetchData({ page: 0, activeFilter: formData.jobTag }));
      setLoading(false);

      dispatch(closeAddJobDialog());
      dispatch(closeEditJobDialog());
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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      addOrEditJobRequest();
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.jobTitle) {
      newErrors.jobTitle = "Job Title is Required";
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company Name is Required";
    }

    if (!formData.jobLocation) {
      newErrors.jobLocation = "Job Location is Required";
    }

    if (
      formData.salaryStart &&
      formData.salaryTo &&
      parseInt(formData.salaryTo) < parseInt(formData.salaryStart)
    ) {
      newErrors.salary = "Salary range is not valid";
    } else if (!formData.salaryStart && formData.salaryTo) {
      newErrors.salary = "Salary start is not specified";
    }

    if (!formData.shortDesc) {
      newErrors.shortDesc = "Short Description is Required";
    }

    setFormError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="overlay">
      <div className="relative bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {" "}
          {formType == FormType.ADD_JOB ? "Add New Job" : "Edit Job"}
        </h2>
        <button
          onClick={() => {
            dispatch(closeAddJobDialog());
            dispatch(closeEditJobDialog());
          }}
          className="absolute right-4 top-4"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto overflow-x-hidden"
        >
          <div className="form-group">
            <label>
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Enter Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            {formError.jobTitle && (
              <p className="text-red-600">{formError.jobTitle}</p>
            )}
          </div>
          <div className="form-group">
            <label>
              Company Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
            {formError.companyName && (
              <p className="text-red-600">{formError.companyName}</p>
            )}
          </div>
          <div className="form-group">
            <label>
              Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobLocation"
              name="jobLocation"
              placeholder="Enter Job Location"
              value={formData.jobLocation}
              onChange={handleChange}
            />
            {formError.jobLocation && (
              <p className="text-red-600">{formError.jobLocation}</p>
            )}
          </div>
          <div className="form-group">
            <label>Salary Range</label>
            <div className="flex align-middle items-center">
              <input
                className="mr-2"
                type="number"
                id="salaryStart"
                name="salaryStart"
                placeholder="Start From"
                value={formData.salaryStart}
                onChange={handleChange}
              />
              <p className="text-center">To</p>
              <input
                className="mx-2 box-border"
                type="number"
                id="salaryTo"
                name="salaryTo"
                placeholder="Until"
                value={formData.salaryTo}
                onChange={handleChange}
              />
              <select
                value={formData.salaryType}
                name="salaryType"
                onChange={handleChange}
              >
                <option value="per month">Monthly</option>
                <option value="per year">Yearly</option>
              </select>
            </div>
            {formError.salary && (
              <p className="text-red-600">{formError.salary}</p>
            )}
          </div>
          <div className="form-group">
            <label>
              Work Type <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.workType}
              name="workType"
              onChange={handleChange}
            >
              <option value="Full time">Full Time</option>
              <option value="Kontrak">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Short Description <span className="text-red-600">*</span>
            </label>
            <textarea
              className="box-border h-[5em]"
              id="shortDesc"
              name="shortDesc"
              placeholder="Enter Short Description"
              value={formData.shortDesc}
              onChange={handleChange}
            />
            {formError.shortDesc && (
              <p className="text-red-600">{formError.shortDesc}</p>
            )}
          </div>
          <div className="form-group">
            <label>
              Job Tag <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.jobTag}
              name="jobTag"
              onChange={handleChange}
            >
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
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : formType == FormType.ADD_JOB ? (
              "Add New Job"
            ) : (
              "Edit Job"
            )}
          </button>
          {error != null && (
            <div className="flex justify-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
