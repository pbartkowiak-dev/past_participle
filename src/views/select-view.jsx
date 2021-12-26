import React, { useContext } from 'react';
import { getVerbsGrouped } from '../data/verbs';
import { Typography, Container, List, ListItem, ListItemText, ListSubheader, styled, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import styledComponent from "styled-components";
import { StoreContext } from "../store";


const DivGrid = styledComponent.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px 10px;
`;

const StyledListItemText = styled(ListItemText)(() => ({
	'& .MuiTypography-root': {
		lineHeight: .8,
		fontSize: 13
	}
}));

function SelectView() {
	const store = useContext(StoreContext);
	const { selectedVerbGroups, setSelectedVerbGroups } = store;
	const verbsGrouped = getVerbsGrouped();

	const handleCheck = ({ target }) => {
		const { value, checked } = target;

		if (checked) {
			setSelectedVerbGroups([
				...selectedVerbGroups,
				value
			]);
		} else {
			setSelectedVerbGroups(
				selectedVerbGroups.filter(selectedIndex => selectedIndex !== value)
			);
		}
	};

	return (
		<Container>
			<Typography variant="h4" as={"h1"} sx={{margin: '20px 0'}}>Select Verb Groups</Typography>
			<DivGrid>
				{verbsGrouped.map((group, index) => (
					<List dense={true} key={index} subheader={
						<ListSubheader component="div" sx={{paddingLeft: 0}}>
							<FormGroup>
								<FormControlLabel control={
									<Checkbox
										name={String(index)}
										value={String(index)}
										onChange={handleCheck}
										checked={selectedVerbGroups.includes(String(index))}
									/>
								} label={`Group ${index + 1}`} />
							</FormGroup>
						</ListSubheader>
					}>
						{
							group.map(verb => (
								<ListItem key={verb.infinitiv} sx={{
									padding: 0
								}}>
									<StyledListItemText>{verb.infinitiv} ({verb.translation_pol})</StyledListItemText>
								</ListItem>
							))
						}
					</List>
				))}
			</DivGrid>
		</Container>
	);
}

export default SelectView;
