import { FC, useState } from "react";
import { fetchBrandedFood, fetchCoreFood, setActivePaginatePage } from "@/src/utils/redux/slices/foodFetch/foodFetchSlice";
import { AppDispatch, RootState } from "@/src/utils/redux/store";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

interface ResultsPaginateProps {}

const ResultsPaginate: FC<ResultsPaginateProps> = ({}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { coreFoodData, brandFoodData, chosenFoodCategory, keywordValue, activePaginatePage } = useSelector((state: RootState) => state.foodFetch);

	const pageCount = coreFoodData ? coreFoodData.totalPages : brandFoodData ? brandFoodData.page_count : 0;

	const pageChangeFetchHandler = (targetPage: number) => {
		if (chosenFoodCategory === "core") {
			dispatch(fetchCoreFood({ keywordValue: keywordValue, page: targetPage + 1 }));
		}
		if (chosenFoodCategory === "brand") {
			dispatch(fetchBrandedFood({ keywordValue: keywordValue, page: targetPage + 1 }));
		}
	};

	return (
		<>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				previousLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
				nextLinkClassName="text-xl px-2.5 py-2 bg-blue-500 rounded-md text-white"
				pageClassName=" bg-black text-white text-sm px-2.5 py-2 rounded-md"
				className="flex text-sm items-center justify-center gap-2 self-center text-black"
				activeClassName="bg-blue-500"
				pageCount={pageCount}
				onPageChange={(data) => {
					pageChangeFetchHandler(data.selected);
					dispatch(setActivePaginatePage(data.selected));
				}}
				forcePage={activePaginatePage}
				// onPageActive={(number) => brandedFetchHandler(number.selected + 1)}
				// onClick={(number) => console.log(number)}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</>
	);
};

export default ResultsPaginate;
