export interface JobTag {
  tag_id: number;
  tag_desc: String;
}

export interface JobData {
  id: string;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  salary: string;
  workType: string;
  shortDesc: string;
  jobTags: JobTag[];
}
