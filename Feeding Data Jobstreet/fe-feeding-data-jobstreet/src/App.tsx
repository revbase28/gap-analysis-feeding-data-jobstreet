import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

import { Table } from "./components/Table";
import { DashboardHeader } from "./components/DashboardHeader";
import { PaginationNavigator } from "./components/PaginationNavigator";

function App() {
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.job
  );

  return (
    <>
      <DashboardHeader />
      <Table />
      <PaginationNavigator totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}

export default App;
