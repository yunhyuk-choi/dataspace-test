import { memo } from "react";
import RouteBreadcrumb from "./RouteBreadcrumb";

function PageHeader() {
  return <RouteBreadcrumb />;
}

export default memo(PageHeader);
