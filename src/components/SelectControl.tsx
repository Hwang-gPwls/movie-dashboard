import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRecoilState } from "recoil";

import { selectItems } from "../public/data";
import { selectedValueState } from "../recoils/movie/atom";

const SelectControl = () => {
  const [selectedValue, setSelectedValue] = useRecoilState(selectedValueState);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Select"
          onChange={handleChange}
        >
          {selectItems.map(item => (
            <MenuItem key={item.key} value={item.key}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectControl;
