//document.addEventListener("DOMContentLoaded", () => {
//	const stickyElements = document.querySelectorAll(
//		".wp-block-create-block-advance-sticky-block-for-gutenberg-editor[data-sticky='true']"
//	);
	//const parseTopOffset = (value, parentElement) => {
	//	if (!value) return 0; // Default to 0 if no value is provided
	//	if (!parentElement) {
	//		console.error("Parent element is not defined for the sticky element.");
	//		return 0;
	//	}
	//	if (value.endsWith("px")) {
	//		return parseFloat(value); // Return value in px
	//	} else if (value.endsWith("em")) {
	//		const fontSize = parseFloat(getComputedStyle(parentElement).fontSize);
	//		return parseFloat(value) * fontSize; // Convert em to px
	//	} else if (value.endsWith("%")) {
	//		return (parseFloat(value) / 100) * window.innerHeight; // Convert % to px relative to viewport height
	//	} else {
	//		return parseFloat(value); // Assume it's px if no unit is provided
	//	}
	//};

//	window.addEventListener("scroll", () => {
//		stickyElements.forEach((stickyElement) => {
//			const topOffset = stickyElement.getAttribute("data-top-offset") || 0;
//			const parent = stickyElement.parentElement;
//			const parentRect = parent.getBoundingClientRect();
//			const parentTop = window.scrollY + parentRect.top;
//			const parentBottom = parentTop + parent.offsetHeight;
//			const stickyHeight = stickyElement.offsetHeight;
//			const scrollTop = window.scrollY + parseTopOffset(topOffset, parent); // Combined scroll and offset

//			// Calculate new position based on scrollTop relative to parent
//			let newPosition = "fixed";
//			if (scrollTop < parentTop) {
//				newPosition = "relative";
//				stickyElement.style.top = "0";
//			} else if (scrollTop + stickyHeight > parentBottom) {
//				const bottomOffset = parentBottom - scrollTop;
//				console.log(bottomOffset);
//				stickyElement.style.top = `${bottomOffset}px`;
//				//stickyElement.style.top = `${bottomOffset}px`;
//			} else {
//				stickyElement.style.top = "0"; // Stick within parent bounds
//			}

//			// Apply smooth transition for a nicer effect
//			stickyElement.style.transition = "transform 0.2s ease-in-out";
//			stickyElement.style.transform = newPosition === "fixed" ? `translateY(${topOffset}px)` : "none";
//		});
//	});
//});

const stickyElements = document.querySelectorAll(
	".wp-block-create-block-advance-sticky-block-for-gutenberg-editor[data-sticky='true']"
);
const parseTopOffset = (value, parentElement) => {
	if (!value) return 0; // Default to 0 if no value is provided
	if (!parentElement) {
		console.error("Parent element is not defined for the sticky element.");
		return 0;
	}
	if (value.endsWith("px")) {
		return parseFloat(value); // Return value in px
	} else if (value.endsWith("em")) {
		const fontSize = parseFloat(getComputedStyle(parentElement).fontSize);
		return parseFloat(value) * fontSize; // Convert em to px
	} else if (value.endsWith("%")) {
		return (parseFloat(value) / 100) * window.innerHeight; // Convert % to px relative to viewport height
	} else {
		return parseFloat(value); // Assume it's px if no unit is provided
	}
};
window.addEventListener("scroll", () => {
	stickyElements.forEach((stickyElement) => {
		const rect = stickyElement.getBoundingClientRect();
		const topOffset = parseTopOffset(stickyElement.getAttribute("data-top-offset"), stickyElement.parentElement) || 0;
		const sectionTop = rect.top + window.scrollY; // Convert to absolute scroll position
		const sectionBottom = sectionTop + stickyElement.offsetHeight;
		const parentElement = stickyElement.parentElement;
		const parentRect = parentElement.getBoundingClientRect();
		const parentTop = parentRect.top + window.scrollY;
		const parentBottom = parentTop + parentElement.offsetHeight;
		const stickyHeight = stickyElement.offsetHeight;

		const scrollTop = window.scrollY;

		// Apply the logic for sticky behavior
		if (scrollTop + topOffset >= sectionTop && scrollTop + topOffset + stickyHeight < parentBottom) {
			console.log(topOffset);
			stickyElement.style.position = 'fixed';
			stickyElement.style.top = topOffset + 'px';
			stickyElement.style.width = `${parentElement.offsetWidth}px`; // Ensure the width matches the parent
		} else if (scrollTop + topOffset + stickyHeight >= parentBottom) {
			stickyElement.style.position = 'absolute';
			//stickyElement.style.top = `${parentElement.offsetHeight - stickyHeight}px`; // Align with the bottom of the parent
		} else {
			stickyElement.style.position = 'relative';
			stickyElement.style.top = '0';
			stickyElement.style.width = ''; // Reset width when not sticky
		}
	});
});

