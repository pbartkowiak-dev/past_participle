import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Box, styled } from '@mui/material';

const Input = styled(TextField)(() => ({
	minWidth: '360px',
	'& .MuiTextField-root': {
		fontSize: 43
	}
}));

function QuizView() {
	const [inputValue, setInputValue] = useState();
	const [currentVerb, setCurrentVerb] = useState({});
	const [showTranslation, setShowTranslation] = useState(false);

	useEffect(() => {
		setCurrentVerb({
			infinitiv: "werden",
			imperfekt: "wurde",
			partizip_ii: "geworden",
			translation_pol: "stawać się, zostawać",
		})
	});

	return (
		<Container sx={{textAlign: 'center', marginTop: 10 }}>
			<Typography variant={"h3"}>{currentVerb.infinitiv}</Typography>
			<Box sx={{height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{showTranslation
					? <Typography variant={"h5"}>{currentVerb.translation_pol}</Typography>
					: <Typography variant={"h5"}
								  role="button"
								  sx={{
									  display: 'inline-block',
									  color: 'lightgray',
									  cursor: 'pointer',
									  marginTop: 1
								  }}
								  onClick={() => setShowTranslation(true)}>Click to show translation</Typography>
				}
			</Box>
			<Box sx={{ marginTop: 2 }}>
				<Input id="outlined-basic" label="Enter Past Participle Form" variant="outlined" value={inputValue} />
			</Box>
		</Container>
	);
}

export default QuizView;
