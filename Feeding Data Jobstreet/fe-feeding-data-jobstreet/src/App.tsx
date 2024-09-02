import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

import { Table } from "./components/Table";
import { DashboardHeader } from "./components/DashboardHeader";
import { PaginationNavigator } from "./components/PaginationNavigator";
import { GenerateJobDialog } from "./components/GenerateJobDialog";
import { FormDialog } from "./components/FormDialog";
import { FormType } from "./const";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { DetailJobDialog } from "./components/DetailJobDialog";

function App() {
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.job
  );

  const {
    isGenerateJobDialogShown,
    isAddJobDialogShown,
    isEditJobDialogShown,
    isDeleteConfirmatioDialogShown,
    isDetailJobDialogShown,
  } = useSelector((state: RootState) => state.dialog);

  const { selectedJob } = useSelector((state: RootState) => state.selectedJob);

  return (
    <>
      <DashboardHeader />
      <Table />
      <PaginationNavigator totalPages={totalPages} currentPage={currentPage} />
      {isGenerateJobDialogShown && <GenerateJobDialog />}
      {isAddJobDialogShown && <FormDialog formType={FormType.ADD_JOB} />}
      {isEditJobDialogShown && (
        <FormDialog formType={FormType.EDIT_JOB} jobData={selectedJob} />
      )}
      {isDeleteConfirmatioDialogShown && (
        <DeleteConfirmationDialog jobId={selectedJob!.id} />
      )}
      {isDetailJobDialogShown && <DetailJobDialog jobData={selectedJob!} />}
    </>
  );
}

export default App;
