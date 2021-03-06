import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { selectAllModelapis } from './modelapisSlice';
import _ from "lodash";


export function ModelapisList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const modelapis = useSelector(selectAllModelapis);

  const title = "Model Apis";
  const goToModelapis = (d) => {
    history.push(`/modelapis/${d.id}`);
  }

  const options = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: goToModelapis,
  };
  const columns = [
    {
      id: "name",
      headerText: "Name",
      sortable: true,
      type: "text",
      style: "normal",
    },
    {
      id: "stage",
      headerText: "Stage",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "version",
      headerText: "Version",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "state",
      headerText: "State",
      type: "text",
      sortable: true,
      style: "normal",
    },{
      headerText: "Created At",
      id: "create_at",
      sortable: true,
      style: "normal",
      type: "text",
    }
  ]

  let tableOptions = options;
  const tableColumns = columns;

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: modelapis.length + ' items'}));
  }, [modelapis, title]);

  const parseDate = modelapis.map((mdl) => {
    const d = new Date(mdl.last_start);
    const c = new Date(mdl.create_at);
    return {
        id: mdl.id,
        name: mdl.metadata.name,
        model: mdl.spec.model,
        stage: mdl.spec.stage,
        version: mdl.spec.version,
        state: _.capitalize(mdl.state),
        create_at: c.toLocaleString(),
        last_start: d.toLocaleString()
      };
  })

  return  (
    <Fragment>
      <TableCozy
        columns={tableColumns}
        data={parseDate}
        options={tableOptions}
      />
    </Fragment>
  );
}
