import React from 'react';

class PrevNext extends React.Component {
	render(){
		return(
			<div className='theCont'>
			<span className='floatLeft'>
				<button className='bigger'
				//eslint-disable-next-line
				onClick={ ()=>{ 
					if(this.props.searchPage >= 1){
						this.props.search(
							this.props.searchValue, 
							this.props.whatToSearch,
							this.props.searchPage-1
						);
						window.scrollTo(0, 110);
					}
				}}>←Prev</button>
			</span>
			<span className='floatRight'>
				<button className='bigger'
				//eslint-disable-next-line
				onClick={ ()=>{ 
					if(this.props.moreToSearch){
						this.props.search(
							this.props.searchValue, 
							this.props.whatToSearch,
							this.props.searchPage+1
						);
						window.scrollTo(0, 110);
					}
				}}>Next→</button>
			</span>
			</div>
		);
	}
}

export default PrevNext;