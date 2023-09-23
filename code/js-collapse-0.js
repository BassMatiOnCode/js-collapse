//
//	js-collapse-0.js	2023-09-15		usp
//

export function setInitialState ( controller ) {
	//	Searches for a parent that defines the default controller state.
	//	If there is none, the controller state is set to expanded.
	const node = controller.closest( "[cbc-default]" );
	if ( node ) controller.setAttribute( "cbc", node.getAttribute( "cbc-default" ));
	else controller.setAttribute( "cbc", "expanded" );
	}
export function getContainer( controller ) {
	switch ( controller.tagName ) {
	case "H1" :
	case "H2" :
	case "H3" :
	case "H4" :
	case "H5" :
	case "DT" :
		return controller.nextElementSibling ;
	case "LI" :
		return controller.querySelector( `LI > ${controller.parentNode.tagName}` );
		}
	}
export function getController ( container ) {
	switch ( container.tagName ) {
	case "DD" :
	case "DIV" :
		return container.previousElementSibling;
	case "OL" :
	case "UL" :
		return container.parentNode ;
		}
	}
function collapse ( controller ) { 
	const container = getContainer( controller );
	container.style.height = window.getComputedStyle( container ).height ;
	window.requestAnimationFrame( ( ) => {
	window.requestAnimationFrame( ( ) => {
		// Set controller state and start collapsing 
		console.log( "Collapsing from " + container.style.height );
		controller.setAttribute( "cbc", "collapsing" );
		container.style.removeProperty( "height" );
		} ) ;
		} ) ;
	} ;
 function expand ( controller ) {
	const container = getContainer( controller );
	controller.setAttribute( "cbc", "expanding" );
	const height = window.getComputedStyle( container ).height ;
	container.style.height = "0px" ;
	window.requestAnimationFrame( ( ) => {
	window.requestAnimationFrame( ( ) => {
		container.style.height = height ;
		console.log( "Expanding to " + container.style.height );
		} ) ;
		} ) ;
	} ;
export function controllerClickHandler ( evt ) {
	switch ( evt.target.getAttribute( "cbc" )) {
	case "expanded" :
		collapse( evt.target );
		break;
	case "collapsed" :
		expand( evt.target );
		break;
		}
	evt.preventDefault( );
	evt.stopPropagation( );
	}
export function transitionEndHandler ( evt ) {
	//	Updates controller state and container style cleanup 
	//	Note: "this" points to the controller
	switch ( this.getAttribute( "cbc" )) {
	case "expanding" :
		this.setAttribute( "cbc", "expanded" );
		evt.target.style.removeProperty( "height" );
		break;
	case "collapsing" :
		console.log( "Container collapsed" );
		this.setAttribute( "cbc", "collapsed" );
		break;
		}
	evt.preventDefault( );
	evt.stopPropagation( );
	}
export function initPage ( container=document.body ) {
	//	Initializes all controllers on the page at the time of call.
	//	If collapsible structures are added later, they must be initialized with container set to their parent element. This avoids re-initializing the document multiple times.
	const controllers = container.querySelectorAll( "[cbc]" );
	for ( const controller of controllers ) {
		controller.addEventListener( "click", controllerClickHandler );
		getContainer( controller ).addEventListener( "transitionend", transitionEndHandler.bind( controller ));
		if ( controller.getAttribute( "cbc" ) === "" ) setInitialState( controller );
		}
	}

initPage( );