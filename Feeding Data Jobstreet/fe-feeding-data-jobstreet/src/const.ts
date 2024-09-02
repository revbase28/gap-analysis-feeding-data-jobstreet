export const base_url = "http://localhost:8080/api/";
export const rupiahFormat = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export enum FormType {
  ADD_JOB,
  EDIT_JOB,
}
