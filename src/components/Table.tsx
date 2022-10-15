import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IMovie, ITVShow } from "../api/movie";
import { selectedMediaState } from "../recoils/movie/atom";

export interface Column {
  id:
    | "title"
    | "name"
    | "backdrop_path"
    | "vote_average"
    | "vote_count"
    | "release_date"
    | "first_air_date"
    | "overview";
  label: string;
  display: "table-cell" | "none";
  minWidth?: number;
  align?: "center";
}

const BodyRow = styled(TableRow)`
  cursor: pointer;
`;

interface ITableControlProps {
  columns: Column[];
  datas: IMovie[] | ITVShow[];
}

const TableControl = ({ columns, datas }: ITableControlProps) => {
  const setMedia = useSetRecoilState(selectedMediaState);

  const handleTableRowClick = (
    e: React.MouseEvent<HTMLElement>,
    id: number,
  ) => {
    const children = [].slice.call(e.currentTarget.children);
    const copyMedia: IMovie | ITVShow = {} as IMovie | ITVShow;

    children.forEach((child: HTMLElement) => {
      const [key, value] = [child.id, child.innerText];
      copyMedia[key] = value;
    });

    copyMedia["id"] = id;

    setMedia(copyMedia);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    display: column.display,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map(data => {
              return (
                <BodyRow
                  hover
                  tabIndex={-1}
                  key={data.id}
                  id={data.id.toString()}
                  onClick={e => handleTableRowClick(e, data.id)}
                >
                  {columns.map(column => {
                    return (
                      <TableCell
                        key={column.id}
                        id={column.id}
                        align={column.align}
                        style={{
                          display: column.display,
                        }}
                      >
                        {column.id === "backdrop_path" ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w342${
                              data[column.id]
                            }`}
                            alt="poster"
                          />
                        ) : (
                          data[column.id]
                        )}
                      </TableCell>
                    );
                  })}
                </BodyRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableControl;
