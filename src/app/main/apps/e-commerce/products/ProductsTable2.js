import React, { useState, useEffect } from "react";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';

const useOperationRecords = (moduleName, operationName) => {
    const [schema, setSchema] = useState(null);
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const baseUrl = `http://192.168.1.104:4001/api/modules/module`;
        const url = `${baseUrl}/${moduleName}/v1/operation/${operationName}/records`;

        (async () => {
            const response = await fetch(url);

            if (!response.ok) {
                const text = await response.text();
                console.log(`server error ${url} ${text}`);
                return;
            }

            const { operationSchema, results } = await response.json();

            setSchema(operationSchema);
            setRecords(results);
        })();
    }, [moduleName, operationName]);

    return { schema, records };
};

const useOperationTableInfo = (moduleName, operationName) => {
    const { schema, records } = useOperationRecords(moduleName, operationName);

    const [columns, setColumns] = useState(null);
    const [rows, setRows] = useState(null);

    useEffect(() => {
        if (!schema || !records) return;

        const columnNames = schema.fields.map(field => field.name);

        const columns = schema.fields.map(field => {
            return <span>{field.name.toUpperCase()}</span>
        });

        const rows = records.map(record => {
            return Object.entries({
                ...columnNames.reduce((obj, name) => {
                    return { ...obj, [name]: null };
                }, {}),
                ...record
            }).map(([key, value], index) => {
                let render = <code>{key}: {JSON.stringify(value || null)}</code>;
                const [fieldSchema] = schema.fields.filter(field => field.name === key);
                if (fieldSchema) {
                    const { type, mode } = fieldSchema;

                    if (type === "string") {
                        const unknown = <em>no disponible</em>;
                        render = <span>{value || unknown}</span>;
                        if (mode === "email") {
                            render = <a href={`mailto:${value}`}>{value || unknown}</a>;
                        }
                    } else if (type === "number") {
                        render = <Chip label={value} color="secondary" variant="outlined" size="small" />;
                    } else if (type === "boolean") {
                        render = (
                            value ? (
                                <Icon className="text-green text-20">check_circle</Icon>
                            ) : (
                                    <Icon className="text-red text-20">remove_circle</Icon>
                                )
                        );
                    } else if (type === "id") {
                        render = <Chip label={value} color="primary" variant="outlined" />;
                    }
                }
                return render;
            });
        })

        setColumns(columns);
        setRows(rows);

    }, [schema, records]);

    return { columns, rows };
};

const useOperationTable = (moduleName, operationName) => {
    const [render, setRender] = useState(<code>Esperando...</code>);

    const { columns, rows } = useOperationTableInfo(moduleName, operationName);

    useEffect(() => {
        if (!columns || !rows) return;
        setRender(
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column, index) => (
                                <TableCell key={`column-${index}`}>{column}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((cells, index) => (
                            <TableRow key={`row-${index}`}>
                                {
                                    cells.map((cell, index) => (
                                        <TableCell key={`cell-${index}`}>{cell}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }, [columns, rows]);

    return render;
};

export default props => {
    const table = useOperationTable("staff", "generaldata");

    return table;
};