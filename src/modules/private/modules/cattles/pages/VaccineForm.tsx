import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const VaccineFormPage = (): ReactElement => {
	return (
		<Box
			sx={{
				flexGrow: 1,
				backgroundColor: "whitesmoke",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography variant="h3">VaccineForm</Typography>
		</Box>
	);
};

export default VaccineFormPage;
