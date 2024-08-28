export interface JobTag {
  tag_id: number;
  tag_desc: String;
}

export interface JobData {
  id: String;
  jobTitle: String;
  companyName: String;
  jobLocation: String;
  salary: String;
  workType: String;
  shortDesc: String;
  jobTags: JobTag[];
}
