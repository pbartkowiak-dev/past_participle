import React, { useEffect, useState } from "react";
import { getVerbsGrouped } from "./data/verbs";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
	const [selectedVerbGroups, setSelectedVerbGroups] = useState([]);
	const [selectedVerbs, setSelectedVerbs] = useState([]);

	useEffect(() => {
		const verbsGrouped = getVerbsGrouped();
		const selectedGroups = verbsGrouped.filter((group, index) => selectedVerbGroups.includes(String(index)));
		const flatList = selectedGroups.flat();
		setSelectedVerbs(flatList);
	}, [selectedVerbGroups]);

	const store = {
		selectedVerbGroups,
		setSelectedVerbGroups,
		selectedVerbs
	};

	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	);
}
