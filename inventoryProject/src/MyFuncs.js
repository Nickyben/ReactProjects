export const toTitleCase=(str) =>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } ); }

export const dashed=(str)=>{
  return(
    str.replace(' ', '-')
  )
}

export const unDashed = (str) => {
	return str.replace('-',' ' );
};