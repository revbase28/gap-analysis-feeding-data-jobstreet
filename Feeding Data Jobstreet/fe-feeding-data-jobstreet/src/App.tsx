import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

import { Table } from "./components/Table";
import { DashboardHeader } from "./components/DashboardHeader";
import { PaginationNavigator } from "./components/PaginationNavigator";
import { GenerateJobDialog } from "./components/GenerateJobDialog";
import { AddNewJobDialog } from "./components/AddNewJobDialog";

function App() {
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.job
  );

  const { isGenerateJobDialogShown, isAddJobDialogShown } = useSelector(
    (state: RootState) => state.dialog
  );

  return (
    <>
      <DashboardHeader />
      <Table />
      <PaginationNavigator totalPages={totalPages} currentPage={currentPage} />
      {isGenerateJobDialogShown && <GenerateJobDialog />}
      {isAddJobDialogShown && <AddNewJobDialog />}
    </>
  );
}

export default App;
