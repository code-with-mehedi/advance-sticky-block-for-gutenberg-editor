import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		topOffset,
		topOffsetUnit,
		tabletBreakpoint,
		mobileBreakpoint,
		topOffsetTablet,
		topOffsetUnitTablet,
		topOffsetMobile,
		topOffsetUnitMobile,
	} = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div
			{...blockProps}
			data-sticky="true"
			data-top-offset={`${topOffset}${topOffsetUnit}`} // Desktop offset
			data-top-offset-tablet={`${topOffsetTablet}${topOffsetUnitTablet}`} // Tablet offset
			data-top-offset-mobile={`${topOffsetMobile}${topOffsetUnitMobile}`} // Mobile offset
			data-tablet-breakpoint={tabletBreakpoint} // Tablet breakpoint
			data-mobile-breakpoint={mobileBreakpoint} // Mobile breakpoint
			style={{
				position: 'relative',
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}
