import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import TextField from "@mui/material/TextField";

export default function TimeField({ label, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        ampm={false}
        label={label}
        format="HH:mm"
        value={value ? dayjs(`2024-01-01T${value}`) : null}
        onChange={(newValue) => {
          if (!newValue) return;

          onChange(newValue.format("HH:mm"));
        }}
        slotProps={{
          textField: {
            // fullWidth: true,

            size: "small",
            inputProps: {
              readOnly: true,
            },
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",

                backgroundColor: "#ffffff",

                fontSize: "14px",
              },

              "& .MuiInputBase-input": {
                padding: "14px 16px",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
