//
//	js-collapse-0.js	2023-09-15		usp
//

export function initPage ( container ) {
	const collapsibleBlocks = document.querySelectorAll( "[cbc]+div" );
	for ( const block of collapsibleBlocks ) {
		// Assign click event handler
		// Set initial controller state
		const controller = block.previousElementSibling;
		if ( controller.getAttribute( "cbc" ) === "" ) {
			const node = controller.closest( "[cbc-default]" );
			if ( node ) controller.setAttribute( "cbc", node.getAttribute( "cbc-default" ));
			else controller.setAttribute( "cbc", "expanded" );
			}
		}
	}

initPage( );