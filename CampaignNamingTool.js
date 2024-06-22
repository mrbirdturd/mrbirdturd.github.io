import React, { useState } from 'react';
import { TextInput, Select, Button, Box, Text, Group } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

const CampaignNamingTool = () => {
  const [region, setRegion] = useState('');
  const [outcome, setOutcome] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const clipboard = useClipboard({ timeout: 500 });

  const generateCampaignName = () => {
    const currentYear = new Date().getFullYear();
    if (!region || !outcome || !type) {
      alert("Please select all picklist values.");
      return;
    }
    if (description.length < 4) {
      alert("Description must be at least 4 characters.");
      return;
    }
    const yearRangePattern = `(${currentYear}|${currentYear + 1}|${currentYear + 2})\\d{4}`;
    const datePattern = new RegExp(`^(?:${yearRangePattern}|evergreen)$`, 'i');
    if (!datePattern.test(date)) {
      alert(`Please enter a valid date in YYYYMMDD format within the range of ${currentYear} to ${currentYear + 2} or use 'Evergreen'.`);
      return;
    }
    setCampaignName(`${region}_${outcome}_${type}_${description}_${date}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box style={{ width: '100%', maxWidth: '500px' }}>
        <Select
          label="Region"
          placeholder="Select Region"
          value={region}
          onChange={setRegion}
          data={['Global', 'NAMER', 'LATAM', 'EMEA', 'APAC']}
        />
        <Select
          label="Outcome"
          placeholder="Select Outcome"
          value={outcome}
          onChange={setOutcome}
          data={['Acquisition', 'Expansion', 'Retention', 'Brand']}
        />
        <Select
          label="Type"
          placeholder="Select Type"
          value={type}
          onChange={setType}
          data={['Event', 'Webinar', 'PaidSearch', 'PaidDisplay', 'PaidSocial', 'OrganicSearch', 'OrganicSocial', 'Email', 'WebReferral', 'DirectMail', 'Content', 'ContentSyndication', 'SalesProspecting']}
        />
        <TextInput
          label="Brief Description"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <TextInput
          label="Date (YYYYMMDD or Evergreen)"
          placeholder="Enter date in YYYYMMDD for launch date of time-bound campaigns, otherwise use Evergreen"
          value={date}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
        <Button onClick={generateCampaignName} style={{ backgroundColor: '#9e00f0', color: '#fff', marginTop: '10px' }}>
          Generate Campaign Name
        </Button>
        {campaignName && (
          <Group position="apart" style={{ marginTop: '10px' }}>
            <Text style={{ fontWeight: 'bold' }}>Campaign Name:</Text>
            <Text style={{ color: '#9e00f0' }}>{campaignName}</Text>
            <Button
              onClick={() => clipboard.copy(campaignName)}
              style={{ backgroundColor: '#9e00f0', color: '#fff' }}
            >
              {clipboard.copied ? 'Copied' : 'Copy'}
            </Button>
          </Group>
        )}
      </Box>
    </div>
  );
};

export default CampaignNamingTool;
