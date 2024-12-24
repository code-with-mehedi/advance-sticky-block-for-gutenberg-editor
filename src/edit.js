import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';


export default function Edit({ attributes, setAttributes }) {
	const {
		topOffset,
		topOffsetUnit,
		tabletBreakpoint,
		mobileBreakpoint,
		topOffsetUnitTablet,
		topOffsetTablet,
		topOffsetMobile,
		topOffsetUnitMobile,
	} = attributes;

	const blockProps = useBlockProps();

	useEffect(() => {
		const stickyElements = document.querySelectorAll('[data-sticky="true"]');
		const updateStickyBehavior = () => {
			stickyElements.forEach((stickyElement) => {
				const parent = stickyElement.closest('.wp-block-create-block-sticky-block');
				if (!parent) return;

				const parentTop = parent.offsetTop;
				const parentHeight = parent.offsetHeight;
				const elementHeight = stickyElement.offsetHeight;
				const scrollTop = window.scrollY;

				if (
					scrollTop >= parentTop + parseFloat(topOffset || 0) &&
					scrollTop < parentTop + parentHeight - elementHeight
				) {
					stickyElement.style.position = 'fixed';
					stickyElement.style.top = topOffset + topOffsetUnit;
				} else {
					stickyElement.style.position = 'relative';
					stickyElement.style.top = 'auto';
					stickyElement.style.width = 'auto';
				}
			});
		};

		window.addEventListener('scroll', updateStickyBehavior);
		return () => {
			window.removeEventListener('scroll', updateStickyBehavior);
		};
	}, [topOffset, topOffsetUnit, tabletBreakpoint, mobileBreakpoint]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Sticky Settings', 'sticky-block')}>
					<TextControl
						label={__('Top Offset', 'sticky-block')}
						value={topOffset}
						onChange={(value) => setAttributes({ topOffset: value })}
					/>
					<SelectControl
						label={__('Offset Unit', 'sticky-block')}
						value={topOffsetUnit}
						options={[
							{ label: 'Pixels (px)', value: 'px' },
							{ label: 'Em', value: 'em' },
							{ label: 'Percentage (%)', value: '%' },
						]}
						onChange={(value) => setAttributes({ topOffsetUnit: value })}
					/>
					<RangeControl
						label={__('Tablet Breakpoint (px)', 'sticky-block')}
						value={tabletBreakpoint}
						onChange={(value) => setAttributes({ tabletBreakpoint: value })}
						min={480}
						max={1024}
					/>
					// add top offset for tablet
					<TextControl
						label={__('Top Offset for Tablet', 'sticky-block')}
						value={topOffsetTablet}
						onChange={(value) => setAttributes({ topOffsetTablet: value })}
					/>
					<SelectControl
						label={__('Offset Unit for Tablet', 'sticky-block')}
						value={topOffsetUnitTablet}
						options={[
							{ label: 'Pixels (px)', value: 'px' },
							{ label: 'Em', value: 'em' },
							{ label: 'Percentage (%)', value: '%' },
						]}
						onChange={(value) => setAttributes({ topOffsetUnitTablet: value })}
					/>
					
					<RangeControl
						label={__('Mobile Breakpoint (px)', 'sticky-block')}
						value={mobileBreakpoint}
						onChange={(value) => setAttributes({ mobileBreakpoint: value })}
						min={320}
						max={479}
					/>
					<TextControl
						label={__('Top Offset for Mobile', 'sticky-block')}
						value={topOffsetMobile}
						onChange={(value) => setAttributes({ topOffsetMobile: value })}
					/>
					<SelectControl
						label={__('Offset Unit for Mobile', 'sticky-block')}
						value={topOffsetUnitMobile}
						options={[
							{ label: 'Pixels (px)', value: 'px' },
							{ label: 'Em', value: 'em' },
							{ label: 'Percentage (%)', value: '%' },
						]}
						onChange={(value) => setAttributes({ topOffsetUnitMobile: value })}
					/>

				</PanelBody>
			</InspectorControls>
			<div
				{...blockProps}
				data-sticky="true"
				style={{
					position: 'relative',
				}}
			>
				<InnerBlocks />
			</div>
		</>
	);
}
