import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		topOffset,
		topOffsetUnit,
		tabletBreakpoint,
		mobileBreakpoint,
		offsetWidth,
	} = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div
			{...blockProps}
			data-sticky="true"
			data-top-offset={`${topOffset}${topOffsetUnit}`}
			data-tablet-breakpoint={tabletBreakpoint}
			data-mobile-breakpoint={mobileBreakpoint}
			style={{
				position: 'relative',
				width: offsetWidth ? `${offsetWidth}%` : 'auto',
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}
