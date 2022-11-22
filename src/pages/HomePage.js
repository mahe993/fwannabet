import { Box } from "@mui/material";
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NewsTab from "../tabs/NewsTab";
import BetlinesTab from "../tabs/BetlinesTab";
import DateAndTime from "../components/DateAndTime";

const HomePage = () => {
  const [pageValue, setPageValue] = useState(0);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="WannaBet™" />
      <Box className="date-time-row" width="95vw" mb={-2}>
        <DateAndTime />
      </Box>
      <Box width="100%" bgcolor="transparent">
        <Tabs
          value={pageValue}
          onChange={(event, newValue) => {
            setPageValue(newValue);
          }}
          centered
          TabIndicatorProps={{ sx: { backgroundColor: "red" } }}
          textColor="inherit"
        >
          <Tab label="News" />
          <Tab label="Betlines" />
        </Tabs>
      </Box>
      <Box>{pageValue === 0 ? <NewsTab /> : <BetlinesTab />}</Box>
    </Box>
  );
};

export default HomePage;
