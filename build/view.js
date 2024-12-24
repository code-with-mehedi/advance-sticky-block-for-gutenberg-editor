/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
//document.addEventListener('DOMContentLoaded', () => {
//	const stickyElements = document.querySelectorAll('.wp-block-create-block-advance-sticky-block-for-gutenberg-editor[data-sticky="true"]');

//	stickyElements.forEach(stickyElement => {
//		let isStuck = false;
//		let originalTop = null;

//		window.addEventListener('scroll', () => {
//			const topOffsetStr = stickyElement.getAttribute('data-top-offset') || '0px'; // Default to 0px
//			let topOffset = 0;

//			// Parse the top offset value
//			if (topOffsetStr.endsWith('px')) {
//				topOffset = parseFloat(topOffsetStr);
//			} else if (topOffsetStr.endsWith('em')) {
//				topOffset = parseFloat(topOffsetStr) * parseFloat(getComputedStyle(document.documentElement).fontSize);
//			} else if (topOffsetStr.endsWith('%')) {
//				const parent = stickyElement.parentNode;
//				if (!parent) return;
//				const parentHeight = parent.offsetHeight;
//				topOffset = (parseFloat(topOffsetStr) / 100) * parentHeight;
//			} else {
//				topOffset = parseFloat(topOffsetStr); // Assume px if no unit
//			}

//			const parent = stickyElement.parentNode;
//			if (!parent) return;

//			const parentRect = parent.getBoundingClientRect();
//			const parentTop = window.scrollY + parentRect.top;
//			const parentBottom = parentTop + parentRect.height;
//			const stickyHeight = stickyElement.offsetHeight;
//			const scrollTop = window.scrollY;

//			if (originalTop === null) {
//				originalTop = stickyElement.offsetTop;
//			}

//			if (scrollTop + topOffset > parentTop && scrollTop + topOffset + stickyHeight < parentBottom) {
//				if (!isStuck) {
//					stickyElement.style.position = 'fixed';
//					stickyElement.style.top = topOffset + 'px';
//					stickyElement.style.width = parentRect.width + 'px';
//					stickyElement.style.left = parentRect.left + 'px';
//					stickyElement.style.marginTop = '0px';
//					isStuck = true;
//				}
//			} else if (scrollTop + topOffset <= parentTop && isStuck) {
//				stickyElement.style.position = 'relative';
//				stickyElement.style.top = originalTop + 'px';
//				stickyElement.style.width = 'auto';
//				stickyElement.style.left = 'auto';
//				stickyElement.style.marginTop = '0px';
//				isStuck = false;
//			} else if (scrollTop + topOffset + stickyHeight >= parentBottom && isStuck) {
//				stickyElement.style.position = 'absolute';
//				stickyElement.style.top = (parentRect.height - stickyHeight) + 'px';
//				stickyElement.style.width = parentRect.width + 'px';
//				stickyElement.style.left = '0';
//				stickyElement.style.marginTop = '0px';
//				isStuck = false;
//			}
//		});
//	});
//});

document.addEventListener('DOMContentLoaded', () => {
  const stickyElements = document.querySelectorAll('.wp-block-create-block-advance-sticky-block-for-gutenberg-editor[data-sticky="true"]');
  stickyElements.forEach(stickyElement => {
    let isStuck = false;
    let originalTop = null;
    const handleStickyBehavior = () => {
      const viewportWidth = window.innerWidth;

      // Determine the offset based on viewport size
      let topOffsetStr;
      if (viewportWidth <= 768) {
        topOffsetStr = stickyElement.getAttribute('data-top-offset-mobile') || '0px';
      } else if (viewportWidth <= 1024) {
        topOffsetStr = stickyElement.getAttribute('data-top-offset-tablet') || '0px';
      } else {
        topOffsetStr = stickyElement.getAttribute('data-top-offset') || '0px';
      }
      let topOffset = 0;

      // Parse the top offset value
      if (topOffsetStr.endsWith('px')) {
        topOffset = parseFloat(topOffsetStr);
      } else if (topOffsetStr.endsWith('em')) {
        topOffset = parseFloat(topOffsetStr) * parseFloat(getComputedStyle(document.documentElement).fontSize);
      } else if (topOffsetStr.endsWith('%')) {
        const parent = stickyElement.parentNode;
        if (!parent) return;
        const parentHeight = parent.offsetHeight;
        topOffset = parseFloat(topOffsetStr) / 100 * parentHeight;
      } else {
        topOffset = parseFloat(topOffsetStr); // Assume px if no unit
      }
      const parent = stickyElement.parentNode;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const parentTop = window.scrollY + parentRect.top;
      const parentBottom = parentTop + parentRect.height;
      const stickyHeight = stickyElement.offsetHeight;
      const scrollTop = window.scrollY;
      if (originalTop === null) {
        originalTop = stickyElement.offsetTop;
      }

      // Sticky behavior logic
      if (scrollTop + topOffset > parentTop && scrollTop + topOffset + stickyHeight < parentBottom) {
        if (!isStuck) {
          stickyElement.style.position = 'fixed';
          stickyElement.style.top = topOffset + 'px';
          stickyElement.style.width = parentRect.width + 'px';
          stickyElement.style.left = parentRect.left + 'px';
          stickyElement.style.marginTop = '0px';
          isStuck = true;
        }
      } else if (scrollTop + topOffset <= parentTop && isStuck) {
        stickyElement.style.position = 'relative';
        stickyElement.style.top = originalTop + 'px';
        stickyElement.style.width = 'auto';
        stickyElement.style.left = 'auto';
        stickyElement.style.marginTop = '0px';
        isStuck = false;
      } else if (scrollTop + topOffset + stickyHeight >= parentBottom && isStuck) {
        stickyElement.style.position = 'absolute';
        stickyElement.style.top = parentRect.height - stickyHeight + 'px';
        stickyElement.style.width = parentRect.width + 'px';
        stickyElement.style.left = '0';
        stickyElement.style.marginTop = '0px';
        isStuck = false;
      }
    };

    // Update sticky behavior on scroll and resize
    window.addEventListener('scroll', handleStickyBehavior);
    window.addEventListener('resize', handleStickyBehavior);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map