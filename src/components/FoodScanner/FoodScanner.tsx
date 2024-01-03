import { FC, useEffect, useRef } from "react";
import Quagga from "quagga";

const FoodScanner: FC = () => {
	const scanner = useRef(null);

	useEffect(() => {
		// Check if the scanner ref has a current value before using it
		if (scanner.current) {
			Quagga.init(
				{
					inputStream: {
						name: "Live",
						type: "LiveStream",
						target: scanner.current
					},
					area: {
						// defines rectangle of the detection/localization area
						top: "0%", // top offset
						right: "0%", // right offset
						left: "0%", // left offset
						bottom: "0%" // bottom offset
					},
					decoder: {
						readers: [
							"ean_reader",
							"ean_8_reader",
							"upc_reader",
							{
								format: "ean_reader",
								config: {
									supplements: ["ean_5_reader", "ean_2_reader"]
								}
							}
						]
					}
				},
				function (err: any) {
					if (err) {
						console.log(err);
						return;
					}
					console.log("Initialization finished. Ready to start");
					Quagga.start();

					let lastResult: string;

					Quagga.onProcessed((result: any) => {
						var drawingCtx = Quagga.canvas.ctx.overlay,
							drawingCanvas = Quagga.canvas.dom.overlay;

						console.log(result);
						if (result) {
							if (result.boxes) {
								drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
								result.boxes
									.filter(function (box: any) {
										return box !== result.box;
									})
									.forEach(function (box: any) {
										Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
									});
							}

							if (result.box) {
								Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
							}
							if (result.codeResult && result.codeResult.code) {
								Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: "red", lineWidth: 3 });
							}
						}
					});

					Quagga.onDetected((result: any) => {
						// barcode.value = result.codeResult.code;
						console.log(result.codeResult.code);

						if (lastResult !== result.codeResult.code) {
							lastResult = result.codeResult.code;

							// getProductData(lastResult);

							Quagga.stop();
						}
					});
				}
			);
		}
	}, []); // Removed the dependency array since scanner.current won't change

	return (
		<>
			<div className="rounded-xl overflow-hidden [&>canvas]:hidden [&>br]:hidden" ref={scanner}></div>
		</>
	);
};

export default FoodScanner;
