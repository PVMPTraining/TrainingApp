"use client";

import axios from "axios";
import { useState } from "react";

const useFetchFood = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [keywordValue, setKeywordValue] = useState("");
	const [foodData, setFoodData] = useState<any>([]);
	const [fetchError, setFetchError] = useState<any>("");

	const key = "XJcXXLCXJTV0b9zmSP2bDxFOD1tjiCoC2uXUgMye";

	const foodFetchHandler = async () => {
		try {
			setIsLoading(true);
			const response = axios.get(
				`https://api.nal.usda.gov/fdc/v1/foods/search?query=${keywordValue}&dataType=Foundation&pageSize=25&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${key}`
			);

			const data = (await response).data;
			setFoodData(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			setFetchError(err);
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, keywordValue, setKeywordValue, foodData, setFoodData, fetchError, setFetchError, foodFetchHandler };
};

export default useFetchFood;
